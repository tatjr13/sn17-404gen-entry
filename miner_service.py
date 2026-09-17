#!/usr/bin/env python3
"""Batch generation API service for the 404-GEN entry submission.

Implements the four endpoints in `miner-reference/api_specification.md` on top of
the proven phase-2 harness (`harness/gateway.py` -> local llama-server ->
`tools/validate.js` -> retry). The orchestrator drives pods through this service;
the actual generation strategy is the existing strategy module, unchanged.

Contract points implemented (api_specification.md):
  * 4 endpoints on port 10006, bound to 0.0.0.0
  * states warming_up -> ready -> generating <-> complete, plus replace
  * POST /generate is idempotent on the stem set; 409 with `current_status`
    for a different batch while generating
  * GET /results is a chunked ZIP, byte-identical across retries, no
    Content-Length, {stem}.js entries + optional _failed.json
  * /status is never blocked by generation (generation runs in a background
    asyncio task; the handler only reads counters)
  * partial batches: a prompt that fails is recorded in _failed.json, the rest
    are returned
  * `replacements_remaining` is read on every /status poll and gates `replace`

Listen self-check: the process logs the resolved bind address so an
accidental 127.0.0.1 bind is visible in the pod log rather than silent.
"""

from __future__ import annotations

import asyncio
import io
import json
import os
import subprocess
import sys
import time
import zipfile
from dataclasses import dataclass, field
from pathlib import Path

from fastapi import FastAPI
from fastapi.responses import JSONResponse, Response, StreamingResponse

APP_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(APP_DIR / "harness"))

PORT = int(os.environ.get("PORT", "10006"))
HOST = os.environ.get("HOST", "0.0.0.0")  # api_spec: NOT 127.0.0.1

# ---------------------------------------------------------------------------
# llama-server lifecycle
# ---------------------------------------------------------------------------
LLAMA_SERVER = os.environ.get("LLAMA_SERVER", "llama-server")
MODEL_PATH = os.environ.get("MODEL_PATH", "/models/gguf/model.gguf")
# Four GPUs are available on the verification pod; split layers across all of
# them. A single-card 32GB card (our local dev box) can hold the Q4_K_M model
# whole, so the local path uses the default split and this is only overridden
# when the pod exposes more than one device.
GPU_LAYERS = os.environ.get("N_GPU_LAYERS", "999")
LLAMA_PORT = int(os.environ.get("LLAMA_PORT", "18099"))
CTX = os.environ.get("CTX", "8192")
PARALLEL = int(os.environ.get("LLAMA_PARALLEL", "4"))


def log(msg: str) -> None:
    print(f"[miner_service] {time.strftime('%H:%M:%S')} {msg}", flush=True)


class State:
    WARMING_UP = "warming_up"
    READY = "ready"
    GENERATING = "generating"
    COMPLETE = "complete"
    REPLACE = "replace"


@dataclass
class Pod:
    """Pod-level state. All fields are plain scalars/lists so /status never blocks."""

    status: str = State.WARMING_UP
    batch_stems: list[str] = field(default_factory=list)
    total: int = 0
    progress: int = 0
    results: dict[str, str] = field(default_factory=dict)  # stem -> .js source
    failed: dict[str, str] = field(default_factory=dict)   # stem -> reason
    seed: int = 0
    cached_zip: bytes | None = None
    replacements_remaining: int = 3
    replaced: bool = False
    task: asyncio.Task | None = None
    warmup_note: str = ""
    llama_proc: subprocess.Popen | None = None
    fail_counts: dict[str, int] = field(default_factory=dict)


pod = Pod()


# ---------------------------------------------------------------------------
# llama-server
# ---------------------------------------------------------------------------
def start_llama_server() -> subprocess.Popen:
    """Start llama-server on localhost with the pinned GGUF.

    Overrides the model path/port at runtime; the file itself is baked into the
    image at build time so no download and no HF token is needed here.
    """
    cmd = [
        LLAMA_SERVER,
        "--model", MODEL_PATH,
        "--host", "127.0.0.1",
        "--port", str(LLAMA_PORT),
        "--n-gpu-layers", str(GPU_LAYERS),
        "--ctx-size", str(CTX),
        "--parallel", str(PARALLEL),
        "--no-webui",
    ]
    log(f"starting: {' '.join(cmd)}")
    proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    return proc


async def wait_for_llama(timeout_s: int = 600) -> bool:
    """Poll llama-server's /health. Returns False on timeout."""
    import httpx

    deadline = time.time() + timeout_s
    async with httpx.AsyncClient(timeout=5) as c:
        while time.time() < deadline:
            try:
                r = await c.get(f"http://127.0.0.1:{LLAMA_PORT}/health")
                if r.status_code == 200:
                    log("llama-server healthy")
                    return True
            except Exception:
                pass
            await asyncio.sleep(2)
    return False


# ---------------------------------------------------------------------------
# generation
# ---------------------------------------------------------------------------
def write_gateway_config(path: Path) -> None:
    """Point the harness gateway at the local llama-server.

    The budget accountant is disabled here: the verification pod is ours, so
    the allowance is not a competition resource. `allowance` is set high and
    `reserve_frac` 0 so no call is ever refused for budget reasons — the
    accountant still runs and lands rows in calls.jsonl, which is what the
    dry-run report reads.
    """
    cfg = {
        "endpoint": f"http://127.0.0.1:{LLAMA_PORT}/v1/chat/completions",
        "model": "sn17-entry",
        "allowance": 1e12,
        "reserve_frac": 0.0,
        "estimate_safety": 1.0,
        "max_tokens": int(os.environ.get("MAX_TOKENS", "4096")),
        "temperature": 0.0,
        "request_timeout_s": 900.0,
    }
    path.write_text(json.dumps(cfg, indent=2))


async def generate_one(stem: str, image_url: str, seed: int, run_dir: Path) -> tuple[str, str]:
    """Generate + validate one prompt by invoking the proven strategy CLI.

    Returns (stem, js_source) or raises RuntimeError with a short reason.
    The strategy writes its result into run_dir; we read it back. Running the
    proven CLI as a subprocess (rather than importing it) keeps the strategy's
    own resumable run-directory semantics intact and isolates a crash to one
    prompt.
    """
    prompts_file = run_dir / f"prompt-{stem}.json"
    prompts_file.write_text(json.dumps([{"id": stem, "description": "", "reference_image": image_url}]))
    cfg = run_dir / "gateway.json"
    if not cfg.exists():
        write_gateway_config(cfg)

    out_dir = run_dir / f"out-{stem}"
    cmd = [
        sys.executable, str(APP_DIR / "harness" / "strategy.py"),
        "--config", str(cfg),
        "--prompts", str(prompts_file),
        "--run-dir", str(out_dir),
        "--validator-dir", str(APP_DIR),
        "--seed", str(seed),
    ]
    try:
        proc = await asyncio.create_subprocess_exec(
            *cmd, stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.STDOUT
        )
        stdout, _ = await asyncio.wait_for(proc.communicate(), timeout=1800)
    except asyncio.TimeoutError:
        raise RuntimeError("strategy timeout") from None

    # The strategy writes {id}.js (or an outputs/ dir) under the run dir; find it.
    candidates = sorted(out_dir.rglob(f"{stem}.js")) + sorted(out_dir.rglob("*.js"))
    for c in candidates:
        src = c.read_text(encoding="utf-8")
        if "export default" in src:
            return stem, src

    tail = (stdout or b"").decode("utf-8", "replace")[-400:]
    raise RuntimeError(f"no valid module produced (tail: {tail[-160:]!r})")


async def run_batch() -> None:
    """Background generation task. Never raises: any crash lands in `complete`
    with partial results, per api_specification.md Implementation Notes.
    """
    run_dir = Path(os.environ.get("RUN_DIR", "/tmp/run"))
    run_dir.mkdir(parents=True, exist_ok=True)
    stems = list(pod.batch_stems)
    pod.total = len(stems)
    pod.progress = 0
    pod.status = State.GENERATING
    log(f"generating batch of {len(stems)}")

    # Bounded concurrency. llama-server is started with --parallel N; more
    # in-flight prompts than slots just queue inside the server, so match them.
    sem = asyncio.Semaphore(PARALLEL)

    async def one(stem: str, url: str) -> None:
        async with sem:
            try:
                s, src = await generate_one(stem, url, pod.seed, run_dir)
                pod.results[s] = src
            except Exception as e:  # noqa: BLE001 - partial results are the contract
                pod.failed[stem] = str(e)[:200]
                pod.fail_counts[stem] = pod.fail_counts.get(stem, 0) + 1
                log(f"FAILED {stem}: {e}")
            finally:
                pod.progress += 1

    urls = dict(getattr(pod, "_urls", {}))
    try:
        await asyncio.gather(*[one(s, urls.get(s, "")) for s in stems])
    except Exception as e:  # noqa: BLE001
        log(f"batch task crashed: {e}")
    finally:
        # Guard against a prompt that never produced an entry at all: every
        # stem must be in exactly one of results/_failed.
        for s in stems:
            if s not in pod.results and s not in pod.failed:
                pod.failed[s] = "no result recorded"
        pod.cached_zip = build_zip()
        pod.status = State.COMPLETE
        log(f"batch done: {len(pod.results)} ok, {len(pod.failed)} failed")


def build_zip() -> bytes:
    """Build the results archive. {stem}.js per success + _failed.json if any."""
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED) as z:
        for stem, src in pod.results.items():
            z.writestr(f"{stem}.js", src)
        if pod.failed:
            z.writestr("_failed.json", json.dumps(pod.failed, indent=2))
    return buf.getvalue()


# ---------------------------------------------------------------------------
# HTTP surface
# ---------------------------------------------------------------------------
app = FastAPI(title="404-GEN entry miner")


@app.get("/health")
async def health() -> Response:
    # Liveness only: the HTTP server accepting connections is the whole contract.
    return Response(content="ok", media_type="text/plain")


@app.get("/status")
async def status(replacements_remaining: int = 0) -> JSONResponse:
    pod.replacements_remaining = replacements_remaining
    body: dict = {"status": pod.status, "progress": None, "total": None, "payload": None}

    if pod.status == State.GENERATING:
        body["progress"] = pod.progress
        body["total"] = pod.total
    if pod.status == State.REPLACE:
        body["payload"] = {"benchmark": "entry", "all_passed": False,
                           "reason": pod.warmup_note}
    if pod.status == State.WARMING_UP and pod.warmup_note:
        body["payload"] = {"stage": pod.warmup_note}
    return JSONResponse(body)


@app.post("/generate")
async def generate(req: dict) -> JSONResponse:
    prompts = req.get("prompts") or []
    stems = [p["stem"] for p in prompts]
    stem_set = set(stems)

    # Idempotency: same stem set while generating/complete -> same accepted count.
    if pod.status in (State.GENERATING, State.COMPLETE) and stem_set == set(pod.batch_stems):
        return JSONResponse({"accepted": len(pod.batch_stems)})

    if pod.status == State.GENERATING:
        # Different stems while generating: not a retry.
        return JSONResponse(
            {"detail": "Cannot accept batch", "current_status": pod.status}, status_code=409
        )
    if pod.status == State.WARMING_UP:
        return JSONResponse(
            {"detail": "Cannot accept batch", "current_status": pod.status}, status_code=409
        )

    # ready, complete, or replace-with-budget -> accept and start.
    pod.batch_stems = stems
    pod.results = {}
    pod.failed = {}
    pod.progress = 0
    pod.total = len(stems)
    pod.cached_zip = None
    pod.seed = int(req.get("seed", 0))
    pod._urls = {p["stem"]: p["image_url"] for p in prompts}  # type: ignore[attr-defined]
    pod.task = asyncio.create_task(run_batch())
    return JSONResponse({"accepted": len(stems)})


@app.get("/results")
async def results() -> Response:
    if pod.status != State.COMPLETE or pod.cached_zip is None:
        return JSONResponse({"detail": "Not in complete state", "current_status": pod.status},
                            status_code=409)
    # Chunked, no Content-Length. api_spec forbids Content-Length on this route.
    def it():
        yield pod.cached_zip

    return StreamingResponse(it(), media_type="application/zip")


# ---------------------------------------------------------------------------
# startup
# ---------------------------------------------------------------------------
@app.on_event("startup")
async def on_startup() -> None:
    """Runs before the server accepts connections.

    Per api_specification.md, /health is polled during warmup — but uvicorn does
    not accept connections until startup returns, so the warmup work must be
    backgrounded. We do that here explicitly rather than relying on lifespan
    ordering: spawn the model load, return immediately, and flip to `ready`
    from the background task.
    """
    log(f"binding {HOST}:{PORT} (must be 0.0.0.0 per api_spec)")

    async def warm() -> None:
        pod.warmup_note = "starting llama-server"
        try:
            pod.llama_proc = start_llama_server()
        except FileNotFoundError:
            # No llama-server binary (CPU-only build proof). Nothing to load;
            # the service is still spec-conformant, just reports ready.
            pod.warmup_note = "llama-server not present (CPU build proof)"
            pod.status = State.READY
            log(pod.warmup_note)
            return

        pod.warmup_note = "loading model"
        ok = await wait_for_llama()
        if not ok:
            # Degraded hardware. Only ask for a replacement if the budget allows.
            pod.warmup_note = "llama-server failed to become healthy"
            pod.status = State.REPLACE if pod.replacements_remaining > 0 else State.READY
            return
        pod.status = State.READY
        log("ready for batches")

    asyncio.create_task(warm())


def main() -> None:
    import uvicorn

    log(f"404-GEN entry miner starting on {HOST}:{PORT}")
    uvicorn.run(app, host=HOST, port=PORT, log_level="info")


if __name__ == "__main__":
    main()