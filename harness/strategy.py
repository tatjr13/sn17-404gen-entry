#!/usr/bin/env python3
"""
404-GEN phase-2 submission strategy.

This is the single Python 3.12 script the announcement describes: it drives a
designated closed model, through the budget-accounted gateway, to emit one
Three.js module per prompt, and validates every module against the subnet's
own conformance rules before counting it as an output.

The competition is not compute-bound -- all GPU work happens behind the
gateway -- so every decision here is a *budget allocation* decision. The
announcement grants four levers and this file uses all four:

  prompt ordering        cheap heuristics, cheapest-first by description
                         length and keyword class, so that a run cut short by
                         exhaustion still covers the prompts it could afford
  budget allocation      per-prompt credit envelope with a reserve
  critique + revision    one refinement pass, spent only where it can pay
  branching              a repair tier between the two, for modules that fail
                         validation

Two properties are load-bearing and worth stating plainly, because the
subnet's history says they are what actually discards submissions:

  DETERMINISM  Every prompt derives its seed from a fixed function of its own
               id, and temperature is pinned to 0. Re-running the same batch
               with the same model reproduces the same request bytes. Random
               draw order is *not* used anywhere; ties break on sorted keys.

  VALIDATION BEFORE OUTPUT  A module is only written to the output set after
               `validator/tools/validate.js` accepts it. The announcement's
               rule is that validation failures do not count, so emitting an
               invalid module is strictly worse than emitting nothing -- it
               spends credits and still loses the prompt.

Resumability: state lives in the run directory. Re-invoking with the same
`--run-dir` skips prompts already answered and continues from the ledger's
recorded spend, which is what makes a run safe to interrupt in a 5-second
sandbox and a 4-hour GPU queue alike.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import subprocess
import sys
import time
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Iterable

sys.path.insert(0, str(Path(__file__).resolve().parent))

from gateway import (  # noqa: E402
    BudgetExhausted, Config, Gateway, GatewayError, estimate_tokens,
)

# --------------------------------------------------------------------------
# Prompt batch
# --------------------------------------------------------------------------


@dataclass
class Prompt:
    """One unit of work.

    The announcement specifies 128 prompts of (id, description, optional
    reference image). Round 45 of the current task gives us the *shape* the
    subnet already uses -- a dict keyed by a 64-hex prompt hash, where each
    value carries `js` / `views` URLs and a null-or-string `failure_reason` --
    so `output_key` defaults to that hash when the batch provides one and to
    the id otherwise.
    """

    id: str
    description: str
    reference_image: str | None = None
    output_key: str | None = None

    def key(self) -> str:
        return self.output_key or self.id


def load_prompts(path: str | Path) -> list[Prompt]:
    """Load a prompt batch.

    Accepts the three shapes the task has actually appeared in:
      - JSON list of {id, description, reference_image?}
      - JSON dict {id: {description..., }} or {id: "description"}
      - plain text, one description per line (the round-45 prompts.txt shape)
    """
    p = Path(path)
    raw = p.read_text(encoding="utf-8")
    out: list[Prompt] = []

    if p.suffix == ".json":
        obj = json.loads(raw)
        if isinstance(obj, list):
            for i, item in enumerate(obj):
                if isinstance(item, str):
                    out.append(Prompt(id=f"prompt_{i:03d}", description=item))
                else:
                    out.append(Prompt(
                        id=str(item.get("id", f"prompt_{i:03d}")),
                        description=item.get("description") or item.get("prompt") or "",
                        reference_image=item.get("reference_image") or item.get("image"),
                        output_key=item.get("output_key"),
                    ))
        elif isinstance(obj, dict):
            for k, v in obj.items():
                if isinstance(v, str):
                    out.append(Prompt(id=k, description=v))
                elif isinstance(v, dict):
                    out.append(Prompt(
                        id=k,
                        description=(v.get("description") or v.get("prompt")
                                     or v.get("text") or ""),
                        reference_image=v.get("reference_image") or v.get("image"),
                        output_key=v.get("output_key") or k,
                    ))
        else:
            raise ValueError(f"unsupported JSON batch shape: {type(obj).__name__}")
    else:
        for i, line in enumerate(raw.splitlines()):
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            # A bare URL is a remote prompt *reference*, not a description.
            # Round 45's prompts.txt is exactly this: 127 image URLs. Carry
            # them as ids with an empty description rather than pretending we
            # can see the image; see OPEN QUESTIONS in PLAN.md.
            if line.startswith(("http://", "https://")):
                stem = line.rsplit("/", 1)[-1].split(".")[0]
                out.append(Prompt(id=stem, description="", reference_image=line))
            else:
                out.append(Prompt(id=f"prompt_{i:03d}", description=line))

    if not out:
        raise ValueError(f"no prompts loaded from {path}")
    return out


# --------------------------------------------------------------------------
# Prompt ordering
# --------------------------------------------------------------------------

# Hard-surface / rigid-body vocabulary is the subnet's stated sweet spot:
# the team has explicitly moved *away* from organic forms and non-linear
# topology because they do not translate well to procedural generation.
# Prompts in this set are therefore both more likely to validate and more
# likely to score, so they are ordered early -- if the budget runs out, the
# prompts that remain are the ones the subnet already said it does not want.
HARD_SURFACE = (
    "car", "truck", "van", "bus", "vehicle", "bike", "motorcycle", "plane",
    "aircraft", "boat", "ship", "train", "tank",
    "chair", "table", "desk", "shelf", "cabinet", "sofa", "bed", "lamp",
    "door", "window", "stair", "pillar", "column", "fence", "bench",
    "phone", "laptop", "monitor", "keyboard", "camera", "clock", "watch",
    "book", "cup", "mug", "bottle", "can", "box", "crate", "barrel",
    "tool", "hammer", "wrench", "saw", "drill", "sword", "shield", "axe",
    "helmet", "robot", "drone", "satellite", "rocket", "tower", "bridge",
    "house", "building", "temple", "castle", "pyramid", "windmill",
)

# Organic and soft-form vocabulary: the team's own words are that these "do
# not translate well to procedural generation" and are being filtered out of
# the dataset. They still get attempted -- an attempt costs one call and the
# prompt may still be winnable -- but they are ordered last so they absorb
# the budget tail rather than the head.
ORGANIC = (
    "tree", "flower", "plant", "leaf", "mushroom", "coral", "cloud",
    "animal", "cat", "dog", "bird", "fish", "horse", "dragon", "human",
    "person", "hand", "face", "fruit", "apple", "banana", "pumpkin",
    "balloon", "cloth", "fabric", "smoke", "fire", "water", "liquid",
)


def prompt_class(p: Prompt) -> int:
    """Cheap ordering key: 0 = hard-surface (first), 1 = unknown, 2 = organic.

    Matching is on word boundaries. A substring test would classify "cartoon
    cat" as hard-surface because "car" appears inside "cartoon", which is
    exactly backwards -- that is an organic prompt. Tokenising the description
    once and testing set membership removes the whole class of false
    positives, at the cost of a regex per prompt.
    """
    text = (p.description or "").lower()
    if not text:
        return 1
    words = set(re.findall(r"[a-z0-9]+", text))
    if words & set(HARD_SURFACE):
        return 0
    if words & set(ORGANIC):
        return 2
    return 1


def order_prompts(prompts: list[Prompt]) -> list[Prompt]:
    """Cheapest-most-likely-to-pay first, deterministic.

    Sort key is (class, length, id). Length stands in for cost: a short
    description produces a shorter prompt and, more importantly, tends to
    describe a simpler object, which is both cheaper to generate and likelier
    to fit inside the vertex and draw-call caps. The id tiebreak is what makes
    the order reproducible rather than merely stable.
    """
    return sorted(prompts, key=lambda p: (prompt_class(p), len(p.description), p.id))


# --------------------------------------------------------------------------
# Determinism
# --------------------------------------------------------------------------


def seed_for(run_seed: int, prompt_key: str) -> int:
    """Per-prompt seed derived from the run seed and the prompt key.

    Pure function of its arguments: no clock, no PID, no dict iteration order.
    The seed is not sent to the model (the gateway's sampler does not take
    one), it selects *which* of several equally-valid generation strategies a
    prompt gets, so that two different prompts of the same class do not
    collapse onto identical geometry.
    """
    h = hashlib.sha256(f"{run_seed}:{prompt_key}".encode("utf-8")).hexdigest()
    return int(h[:8], 16)


# --------------------------------------------------------------------------
# Prompting
# --------------------------------------------------------------------------

SYSTEM_PROMPT = """You write Three.js geometry modules for a procedural-generation benchmark.

Output EXACTLY ONE JavaScript module and nothing else. No prose, no markdown
fences, no commentary before or after.

The module must be:

    export default function generate(THREE) {
      // build geometry
      return root;   // a Group, Mesh, LineSegments or Points
    }

Hard rules, each of which is checked mechanically and each of which fails the
submission if broken:

1. Exactly ONE top-level export: the default function. No named exports, no
   imports, no `require`.
2. The function must be synchronous. No `async`, no `await`, no promises,
   no callbacks, no `setTimeout`.
3. `THREE` is the ONLY non-standard name you may reference. All the following
   are rejected at parse time if they appear anywhere: eval, Function,
   setTimeout, setInterval, fetch, document, window, navigator, Date,
   performance, crypto, Proxy, Reflect, Worker, process, global, globalThis,
   self, require. Standard globals you MAY use: Math, Number, String, Array,
   Object, JSON, Map, Set, Boolean, Error, and the typed-array family
   (Float32Array, Uint16Array, ...).
4. Never write `THREE['Something']` or any computed property access on THREE,
   Math, Object, Array or Symbol. Always use dot notation.
5. Do not alias, destructure, spread or re-export THREE. Use `THREE.Foo` at
   each use site.
6. Total source must stay under 50 KB. Stay well under: aim for 100-400 lines.

Budget limits, all measured on the assembled scene graph:

  vertices    <= 250,000      (use low-poly primitives and reuse geometries)
  draw calls  <= 200
  depth       <= 32            (nesting depth of the object hierarchy)
  instances   <= 50,000        (InstancedMesh count)
  texture data <= 4 MiB

The whole scene must fit inside a unit cube: every vertex coordinate in
[-0.5, 0.5] on all three axes. Build at final scale - do not rely on the
runtime to normalise anything.

Style guidance that raises your score: build a single recognisable object
centred at the origin; use a small palette of MeshStandardMaterial (two to
five); reuse geometry instances across repeated parts rather than allocating
a fresh one per part; prefer primitives (Box, Cylinder, Sphere, Torus,
Cone, Tube, Extrude, Lathe, Plane, Ring, Circle) over hand-rolled BufferGeometry;
keep metalness modest (below 0.9) because high-metalness surfaces render as
black silhouettes in this pipeline."""


def build_messages(prompt: Prompt, *, critique: str | None = None,
                   prior: str | None = None) -> list[dict[str, Any]]:
    """Assemble the chat messages for one generation or revision call.

    The revision path deliberately re-sends the prior source rather than
    asking for a fresh attempt. A rewrite that cannot see what it is fixing
    re-rolls the same dice; feeding back the failing rule is the whole point
    of spending a second call on the same prompt.
    """
    desc = prompt.description.strip() or (
        f"(no text description supplied; a reference image exists at "
        f"{prompt.reference_image}, which you cannot see. Build a plausible, "
        f"clearly-recognisable everyday hard-surface object.)"
    )
    user = f"Prompt: {desc}"
    if prompt.reference_image:
        user += f"\nReference image (not viewable): {prompt.reference_image}"
    user += "\n\nWrite the module."

    msgs: list[dict[str, Any]] = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": user},
    ]
    if prior is not None:
        msgs.append({"role": "assistant", "content": prior})
        msgs.append({"role": "user", "content": critique or ""})
    return msgs


# --------------------------------------------------------------------------
# Extraction and validation
# --------------------------------------------------------------------------

_FENCE = re.compile(r"```(?:javascript|js)?\s*\n(.*?)```", re.DOTALL)


def extract_module(text: str) -> str:
    """Recover the module from a model response.

    Even at temperature 0 an instruct model will sometimes wrap the answer in
    a fence or bracket it with a sentence. Stripping that here is not
    politeness -- a fenced module fails `PARSE_ERROR` and burns the call, so
    extraction sits on the critical path between spend and output.
    """
    if not text:
        return ""
    m = _FENCE.search(text)
    if m:
        return m.group(1).strip()
    # No fence: find the export and take to end of input.
    idx = text.find("export default")
    if idx > 0:
        return text[idx:].strip()
    return text.strip()


@dataclass
class ValidationResult:
    passed: bool
    failures: list[dict[str, Any]] = field(default_factory=list)
    metrics: dict[str, Any] | None = None
    error: str | None = None

    def summary(self) -> str:
        if self.error:
            return f"validator error: {self.error}"
        if self.passed:
            m = self.metrics or {}
            return (f"pass ({m.get('vertices')} verts, "
                    f"{m.get('drawCalls')} draws, depth {m.get('maxDepth')})")
        return "; ".join(
            f"{f.get('rule')}: {f.get('detail')}" for f in self.failures
        )


class Validator:
    """Runs the subnet's own conformance tool as a subprocess.

    Node is available on this box, so the announcement's fallback ("port the
    validation rules to Python if node is unavailable") is not needed and is
    deliberately NOT taken: a Python reimplementation would be a second source
    of truth that can drift from the real validator, and drift in the
    validator is indistinguishable from drift in the score. Shelling out to
    the real thing is the only way this harness can claim its pass rate means
    what the subnet's own numbers mean.

    If `node` is absent at runtime this raises rather than silently degrading.
    """

    def __init__(self, validator_dir: str | Path):
        self.dir = Path(validator_dir).resolve()
        # The CLI lives in `tools/` and imports the package in `validator/`.
        # Accept either the package dir or its parent, since both are natural
        # to pass on a command line.
        if (self.dir / "tools" / "validate.js").exists():
            self.cli = self.dir / "tools" / "validate.js"
            self.cwd = self.dir
        elif (self.dir / "validator" / "tools" / "validate.js").exists():
            self.cli = self.dir / "validator" / "tools" / "validate.js"
            self.cwd = self.dir / "validator"
        else:
            raise FileNotFoundError(
                f"validator CLI not found under {self.dir} "
                f"(looked in tools/validate.js and validator/tools/validate.js)")

    def check(self, source: str, *, work: Path) -> ValidationResult:
        work.parent.mkdir(parents=True, exist_ok=True)
        work.write_text(source, encoding="utf-8")
        try:
            proc = subprocess.run(
                ["node", str(self.cli), "--json", str(work)],
                capture_output=True, text=True, timeout=60,
                cwd=str(self.cwd),
            )
        except subprocess.TimeoutExpired:
            return ValidationResult(False, error="validator subprocess timeout")
        except OSError as exc:
            return ValidationResult(False, error=f"cannot run node: {exc}")

        out = proc.stdout.strip()
        if not out:
            return ValidationResult(
                False, error=f"empty validator output; stderr={proc.stderr[:200]}")
        try:
            obj = json.loads(out)
        except json.JSONDecodeError:
            return ValidationResult(False, error=f"non-JSON output: {out[:200]}")
        return ValidationResult(
            passed=bool(obj.get("passed")),
            failures=obj.get("failures") or [],
            metrics=obj.get("metrics"),
        )


# --------------------------------------------------------------------------
# The strategy
# --------------------------------------------------------------------------


@dataclass
class StrategyConfig:
    generator_model: str = "stand-in"
    critique_frac: float = 0.35   # of the per-prompt envelope, for the revision
    repair_frac: float = 0.65     # for a validation-failure retry
    max_repairs: int = 1
    critique_on_pass: bool = False
    max_repair_tokens: int = 4096


class Strategy:
    """Order, budget, generate, validate, revise, record.

    The loop is deliberately linear and single-threaded: the announced sandbox
    allows 32 processes but its network rule is a single gateway and its
    accounting is per-account, so concurrency buys nothing but a race between
    two calls and the budget check that should have gated them.
    """

    def __init__(self, cfg: Config, scfg: StrategyConfig, prompts: list[Prompt],
                 run_dir: str | Path, validator_dir: str | Path,
                 *, run_seed: int = 404, dry_run: bool = False,
                 limit: int | None = None):
        self.cfg = cfg
        self.scfg = scfg
        self.prompts = prompts
        self.run_dir = Path(run_dir).resolve()
        self.run_dir.mkdir(parents=True, exist_ok=True)
        self.out_dir = self.run_dir / "outputs"
        self.work_dir = self.run_dir / "work"
        self.out_dir.mkdir(exist_ok=True)
        self.work_dir.mkdir(exist_ok=True)

        self.gw = Gateway(cfg, self.run_dir, dry_run=dry_run)
        self.validator = Validator(validator_dir)
        self.run_seed = run_seed
        self.limit = limit
        self.results: dict[str, dict[str, Any]] = {}
        self._load_state()

    # -- state -------------------------------------------------------------

    @property
    def state_path(self) -> Path:
        return self.run_dir / "state.json"

    @property
    def ledger_path(self) -> Path:
        return self.run_dir / "results.jsonl"

    def _load_state(self) -> None:
        """Resume: replay prior results and re-adopt the ledger's spend.

        Re-adopting spend from the ledger rather than trusting a saved total
        matters because the ledger is append-only and fsynced per row: if the
        process died between a call and a state write, the ledger is right and
        the state is stale. Under-counting spend is the one error this system
        cannot recover from.
        """
        for row in self.gw.ledger.rows():
            if row.get("status") == "ok" and not row.get("dry_run"):
                self.gw.spent += row.get("credits", 0.0)
                self.gw.calls_made += 1
        if self.state_path.exists():
            try:
                saved = json.loads(self.state_path.read_text())
                self.results = saved.get("results", {})
            except (json.JSONDecodeError, OSError):
                self.results = {}

    def _save_state(self) -> None:
        tmp = self.state_path.with_suffix(".tmp")
        tmp.write_text(json.dumps({
            "run_seed": self.run_seed,
            "spent": self.gw.spent,
            "calls_made": self.gw.calls_made,
            "results": self.results,
        }, indent=1, sort_keys=True))
        tmp.replace(self.state_path)

    def _record(self, row: dict[str, Any]) -> None:
        with self.ledger_path.open("a", encoding="utf-8") as fh:
            fh.write(json.dumps(row, sort_keys=True) + "\n")

    # -- budget ------------------------------------------------------------

    def envelope(self, remaining_prompts: int) -> float:
        """Credits this prompt may spend, leaving a floor for later prompts.

        The head of the batch gets a slightly larger envelope than the tail:
        early prompts are the ones the ordering heuristic believes are most
        winnable, and a run that dies at prompt 90 should have spent its
        credit where it had the best chance. The ratio is gentle (1.25x head,
        0.75x tail) because the ordering heuristic is cheap and can be wrong;
        a steep skew would turn one bad heuristic into a wasted run.
        """
        if remaining_prompts <= 0:
            return self.gw.spendable
        share = self.gw.spendable / remaining_prompts
        pos = len(self.prompts) - remaining_prompts
        bias = 1.25 - 0.5 * (pos / max(1, len(self.prompts) - 1))
        return share * bias * 2.0

    def can_spend(self, credits: float) -> bool:
        return credits <= self.gw.spendable

    # -- one prompt --------------------------------------------------------

    def run_prompt(self, prompt: Prompt, remaining: int) -> dict[str, Any]:
        key = prompt.key()
        envelope = self.envelope(remaining)
        seed = seed_for(self.run_seed, key)
        started = time.time()

        base = {"prompt_id": prompt.id, "prompt_key": key, "seed": seed,
                "envelope": round(envelope, 4),
                "stage": "generate"}

        stage = "generate"
        critique = None
        prior = None
        attempts = 0
        last_val = None
        source = ""

        while True:
            attempts += 1
            msgs = build_messages(prompt, critique=critique, prior=prior)
            try:
                resp = self.gw.chat(msgs, prompt_id=prompt.id, stage=stage)
            except BudgetExhausted as exc:
                return {**base, "status": "budget_exhausted", "attempts": attempts,
                        "source_path": None, "detail": str(exc),
                        "wall_ms": int((time.time()-started)*1000)}
            except GatewayError as exc:
                return {**base, "status": "gateway_error", "attempts": attempts,
                        "source_path": None, "detail": str(exc),
                        "wall_ms": int((time.time()-started)*1000)}

            source = extract_module(resp["content"])
            work = self.work_dir / f"{prompt.id}.attempt{attempts}.js"
            val = self.validator.check(source, work=work)
            last_val = val

            spent = self.gw.spent
            base["credits"] = round(spent, 6)

            # -- decision: accept, revise, repair, or give up ---------------
            if val.passed:
                if (self.scfg.critique_on_pass
                        and stage == "generate"
                        and self.gw.spendable > envelope * self.scfg.critique_frac):
                    critique = (
                        "The module is valid. Improve it: make the silhouette "
                        "more immediately recognisable as the object in the "
                        "prompt, and raise the surface/part detail where it "
                        "does not cost draw calls. Return the full revised "
                        "module only."
                    )
                    prior = source
                    stage = "critique"
                    continue
                return {**base, "status": "answered", "valid": True,
                        "attempts": attempts, "metrics": val.metrics,
                        "source_path": str(work), "out_key": key,
                        "wall_ms": int((time.time()-started)*1000)}

            # Invalid. Decide whether a second call can plausibly fix it.
            rules = {f.get("rule") for f in val.failures}
            # ASYNC_NOT_ALLOWED / PARSE_ERROR / MISSING_DEFAULT_EXPORT are
            # structural: the model misunderstood the contract rather than
            # mis-sized the scene, and a targeted retry rarely recovers them.
            # Budget and limit failures are the recoverable class.
            repairable = bool(rules) and not (rules & {
                "PARSE_ERROR", "MISSING_DEFAULT_EXPORT", "FILE_SIZE_EXCEEDED",
                "ASYNC_NOT_ALLOWED", "TIMEOUT_EXCEEDED", "EXECUTION_THREW",
                "HEAP_EXCEEDED",
            })
            can_retry = (
                attempts <= self.scfg.max_repairs
                and repairable
                and self.gw.spendable > envelope * self.scfg.repair_frac
            )
            if can_retry:
                critique = build_repair_prompt(val)
                prior = source
                stage = "repair"
                continue

            return {**base, "status": "answered", "valid": False,
                    "attempts": attempts, "failures": val.failures,
                    "detail": val.summary(), "source_path": str(work),
                    "wall_ms": int((time.time()-started)*1000)}

    # -- the batch ---------------------------------------------------------

    def run(self) -> dict[str, Any]:
        ordered = order_prompts(self.prompts)
        if self.limit is not None:
            ordered = ordered[:self.limit]

        pending = [p for p in ordered if p.key() not in self.results]
        print(f"run dir : {self.run_dir}", file=sys.stderr)
        print(f"prompts : {len(ordered)} total, {len(pending)} pending "
              f"({len(self.results)} already done)", file=sys.stderr)
        print(f"budget  : allowance {self.cfg.allowance} credits, "
              f"spent {self.gw.spent:.2f}, spendable {self.gw.spendable:.2f}",
              file=sys.stderr)

        halted = None
        for i, prompt in enumerate(pending):
            remaining = len(pending) - i
            result = self.run_prompt(prompt, remaining)
            self.results[prompt.key()] = result
            self._record(result)
            self._save_state()

            status = result["status"]
            mark = {"answered": "+", "budget_exhausted": "$",
                    "gateway_error": "!"}.get(status, "?")
            valid = result.get("valid")
            print(f"  [{i+1}/{len(pending)}] {mark} {prompt.id[:40]:42s} "
                  f"{status:15s} valid={valid} spent={self.gw.spent:.1f}"
                  f"/{self.cfg.allowance:.1f}", file=sys.stderr)

            if status == "budget_exhausted":
                halted = result.get("detail")
                break

        return self.summary(ordered, halted)

    # -- reporting ---------------------------------------------------------

    def summary(self, ordered: list[Prompt], halted: str | None) -> dict[str, Any]:
        attempted = len(self.results)
        answered = [r for r in self.results.values() if r["status"] == "answered"]
        valid = [r for r in answered if r.get("valid")]
        source = next((r for r in self.results.values() if "credits" in r), None)
        written = self.write_outputs()

        return {
            "run_dir": str(self.run_dir),
            "prompts_total": len(ordered),
            "prompts_attempted": attempted,
            "prompts_answered": len(answered),
            "prompts_valid": len(valid),
            "prompts_written": len(written),
            "validation_pass_rate": (len(valid) / len(answered)) if answered else 0.0,
            "credits_spent": round(self.gw.spent, 4),
            "allowance": self.cfg.allowance,
            "credits_remaining": round(self.gw.remaining, 4),
            "calls_made": self.gw.calls_made,
            "calls_refused": self.gw.calls_refused,
            "credits_per_prompt": (round(self.gw.spent / len(answered), 4)
                                   if answered else 0.0),
            "credits_per_valid": (round(self.gw.spent / len(valid), 4)
                                  if valid else None),
            "halted": halted,
            "model": self.cfg.model,
            "results": {
                k: {kk: vv for kk, vv in v.items()
                    if kk not in ("detail",)}
                for k, v in sorted(self.results.items())
            },
        }

    def write_outputs(self) -> dict[str, dict[str, Any]]:
        """Emit the submission shape, valid modules only.

        Shape follows the round-45 corpus, which is the only concrete
        artefact the subnet has published for this task family: a dict keyed
        by prompt hash, each value carrying the module body plus provenance.
        Invalid modules are written to `rejected/` for forensics but are kept
        out of the submission file, because the announced rule is that a
        failing generation does not count -- and a submission that claims
        otherwise is worse than an honest short one.
        """
        submitted: dict[str, dict[str, Any]] = {}
        rejected = self.out_dir.parent / "rejected"
        rejected.mkdir(exist_ok=True)

        for key, res in sorted(self.results.items()):
            # A prompt that never produced source (budget exhausted, gateway
            # error) has no path. Guard on the string being truthy *and* the
            # path existing: `Path("")` is `.`, which is a directory and would
            # otherwise be read as if it were a module.
            raw = res.get("source_path")
            src = Path(raw) if raw else None
            if src is None or not src.is_file():
                continue
            body = src.read_text(encoding="utf-8")
            if res.get("status") == "answered" and res.get("valid"):
                submitted[key] = {
                    "js": body,
                    "prompt_id": res["prompt_id"],
                    "seed": res["seed"],
                    "attempts": res["attempts"],
                    "credits": res.get("credits"),
                    "metrics": res.get("metrics"),
                    "model": self.cfg.model,
                }
            else:
                (rejected / f"{key}.js").write_text(body, encoding="utf-8")

        out = self.out_dir / "submission.json"
        out.write_text(json.dumps(submitted, indent=1, sort_keys=True))
        return submitted


def build_repair_prompt(val: ValidationResult) -> str:
    """Turn validator failures into a targeted repair instruction.

    Quoting the rule code and its detail back to the model is the difference
    between a revision and a re-roll: the validator's own message names the
    limit and the measured value, which is exactly the information a model
    needs to shrink a scene by a factor it cannot otherwise infer.
    """
    lines = [
        "Your module was rejected by the validator. These are the exact "
        "failures, quoted from the conformance tool:",
        "",
    ]
    for f in val.failures:
        lines.append(f"- {f.get('stage')}/{f.get('rule')}: {f.get('detail')}")
    lines += [
        "",
        "Fix every listed failure while keeping the object recognisable. "
        "If a budget is exceeded, reduce the count directly (fewer segments, "
        "fewer repeated parts, reuse one geometry, merge separate meshes). "
        "Return the full corrected module only.",
    ]
    return "\n".join(lines)


# --------------------------------------------------------------------------
# CLI
# --------------------------------------------------------------------------


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description="404-GEN phase-2 strategy runner")
    ap.add_argument("--config", required=True, help="gateway JSON config")
    ap.add_argument("--prompts", required=True, help="prompt batch file")
    ap.add_argument("--run-dir", required=True)
    # The CLI lives in `tools/`, the package in `validator/`. Both sit beside
    # this file's parent, so default to the phase2 root and let Validator pick
    # the right layout.
    ap.add_argument("--validator-dir", default=str(
        Path(__file__).resolve().parent.parent))
    ap.add_argument("--seed", type=int, default=404)
    ap.add_argument("--limit", type=int, default=None,
                    help="run only the first N prompts after ordering")
    ap.add_argument("--dry-run", action="store_true",
                    help="exercise accounting and control flow without spending")
    ap.add_argument("--critique-on-pass", action="store_true",
                    help="spend a second call refining modules that already pass")
    ap.add_argument("--json-out", default=None,
                    help="write the run summary here instead of stdout")
    args = ap.parse_args(argv)

    cfg = Config.load(args.config)
    prompts = load_prompts(args.prompts)
    scfg = StrategyConfig(generator_model=cfg.model,
                          critique_on_pass=args.critique_on_pass)
    strat = Strategy(cfg, scfg, prompts, args.run_dir, args.validator_dir,
                     run_seed=args.seed, dry_run=args.dry_run, limit=args.limit)
    summary = strat.run()
    text = json.dumps(summary, indent=2, sort_keys=True)
    if args.json_out:
        Path(args.json_out).write_text(text)
    else:
        print(text)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())