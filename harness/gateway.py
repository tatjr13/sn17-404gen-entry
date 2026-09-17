#!/usr/bin/env python3
"""
404-GEN phase-2 gateway: OpenAI-compatible chat client + budget accountant.

The announced phase hands each miner a *single, shared weighted-credit
allowance* spent against one designated closed-source model behind a
subscription gateway. Distinct weights apply to input / cached / cache-write /
output tokens, and reasoning tokens bill as output. This module is the piece
that turns "how much is left?" into a hard, arithmetic decision *before* the
call is issued, so the strategy can never overshoot the allowance.

Design constraints come straight from the announcement's sandbox:
  - 1 vCPU / 256 MiB RAM / 256 MiB tmp / 32 processes
  - no network except the gateway, no dynamic dependency downloads
  - strict sequential calls (no concurrency)

Accordingly this file uses only the Python 3.12 standard library, opens one
connection at a time, and keeps no more than one response body in memory.

Two accounting layers, deliberately kept separate:

  * estimate   -- chars/4 heuristic, computed from the request we are about to
                  send. Used for the *pre-flight* gate, because we must be able
                  to refuse a call before spending it.
  * settle     -- authoritative numbers from the response's `usage` block.
                  Used for the ledger and the running total.

The pre-flight gate compares the estimate against the *remaining* allowance with
a configurable safety margin. If the estimate cannot be afforded, the call is
refused and no bytes leave the process. After the call returns, the estimate is
reconciled against `usage`; a persistent underestimate is a bug worth surfacing,
so the ledger records both and a drift summary is available.

Stand-in model: a GGUF served by llama-server (OpenAI-compatible /v1/chat/
completions). The GGUF actually used is recorded in every run's metadata; see
PLAN.md for the candidate list and why the one in use was chosen.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import time
import urllib.error
import urllib.request
from dataclasses import dataclass, field, asdict
from pathlib import Path
from typing import Any, Iterable

# --------------------------------------------------------------------------
# Token-class weights
# --------------------------------------------------------------------------


@dataclass(frozen=True)
class Weights:
    """Per-token-class credit weights.

    Defaults mirror the shape of published frontier-model price ratios
    (input 1x, cache read ~0.1x, cache write ~1.25x, output ~4x). The real
    numbers arrive with the announcement; treat these as placeholders whose
    *ratios* are what the strategy is tuned against.
    """

    input: float = 1.0
    cached: float = 0.1
    cache_write: float = 1.25
    output: float = 4.0

    @classmethod
    def from_json(cls, obj: dict[str, Any]) -> "Weights":
        known = {f: float(obj[f]) for f in
                 ("input", "cached", "cache_write", "output") if f in obj}
        return cls(**known)

    def cost(self, *, input_tokens: int, cached_tokens: int,
             cache_write_tokens: int, output_tokens: int) -> float:
        """Credits for one call. Reasoning tokens arrive folded into output by
        the gateway's `usage` block, so no separate term is needed."""
        return (
            self.input * input_tokens
            + self.cached * cached_tokens
            + self.cache_write * cache_write_tokens
            + self.output * output_tokens
        )


# --------------------------------------------------------------------------
# Config
# --------------------------------------------------------------------------


@dataclass
class Config:
    endpoint: str = "http://127.0.0.1:8080/v1/chat/completions"
    model: str = "stand-in"
    allowance: float = 1000.0
    weights: Weights = field(default_factory=Weights)
    # Refuse a call whose *estimated* cost would push spend past
    # allowance * (1 - reserve_frac). The reserve keeps a tail of credit for
    # late-prompt revisions rather than draining on the first 128 calls.
    reserve_frac: float = 0.10
    # Safety factor applied to the pre-flight estimate. Cheap local stand-ins
    # tokenize differently from the eventual gateway; bias the gate to refuse
    # slightly early rather than overrun.
    estimate_safety: float = 1.25
    max_tokens: int = 4096
    temperature: float = 0.0
    request_timeout_s: float = 300.0

    @classmethod
    def load(cls, path: str | Path) -> "Config":
        obj = json.loads(Path(path).read_text())
        kw = {}
        for f in ("endpoint", "model", "allowance", "reserve_frac",
                  "estimate_safety", "max_tokens", "temperature",
                  "request_timeout_s"):
            if f in obj:
                kw[f] = obj[f]
        if "weights" in obj:
            kw["weights"] = Weights.from_json(obj["weights"])
        return cls(**kw)


# --------------------------------------------------------------------------
# Ledger
# --------------------------------------------------------------------------


class Ledger:
    """Append-only JSONL record of every call attempt, one row per prompt-call.

    Written under runs/<run>/calls.jsonl. A row exists for refusals too: the
    interesting failure mode for a budget-bound miner is *what the accountant
    declined to spend*, which is invisible if only successful calls are logged.
    """

    def __init__(self, path: str | Path):
        self.path = Path(path)
        self.path.parent.mkdir(parents=True, exist_ok=True)
        self._fh = None

    def append(self, row: dict[str, Any]) -> None:
        if self._fh is None:
            self._fh = self.path.open("a", encoding="utf-8")
        self._fh.write(json.dumps(row, sort_keys=True) + "\n")
        self._fh.flush()
        os.fsync(self._fh.fileno())

    def close(self) -> None:
        if self._fh is not None:
            self._fh.close()
            self._fh = None

    def rows(self) -> list[dict[str, Any]]:
        if not self.path.exists():
            return []
        out = []
        for line in self.path.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if line:
                out.append(json.loads(line))
        return out


# --------------------------------------------------------------------------
# Errors
# --------------------------------------------------------------------------


class BudgetExhausted(Exception):
    """Raised *before* a call is issued when the allowance cannot cover it.

    Callers are expected to treat this as a clean stop, not a crash: the
    announced rule is that budget exhaustion withholds the response, so the
    strategy must halt and submit what it has.
    """

    def __init__(self, needed: float, remaining: float, *, reason: str = ""):
        self.needed = needed
        self.remaining = remaining
        self.reason = reason
        super().__init__(
            f"budget exhausted: need {needed:.3f} credits, {remaining:.3f} remain"
            + (f" ({reason})" if reason else "")
        )


class GatewayError(Exception):
    """Transport or protocol failure talking to the gateway."""


# --------------------------------------------------------------------------
# Estimation
# --------------------------------------------------------------------------

def estimate_tokens(text: str) -> int:
    """chars/4 token estimate.

    Deliberately crude and deliberately local. The sandbox forbids dynamic
    dependency downloads, so no tokenizer library is available; and the
    eventual gateway's tokenizer is unknown anyway. A biased-high estimate is
    the safe direction: it makes the accountant refuse slightly early rather
    than overrun the allowance. The ledger records estimate vs. actual and
    the drift is reported per run, which is how this gets calibrated once the
    real model is named.
    """
    return max(1, (len(text) + 3) // 4)


def estimate_call_cost(
    cfg: Config,
    messages: list[dict[str, Any]],
    *,
    max_tokens: int | None = None,
) -> tuple[float, dict[str, int]]:
    """Pre-flight credit estimate for one chat call, plus its token breakdown.

    Cache accounting: a call is modelled as *either* a cache hit on the whole
    prefix or a miss, never both. The gateway decides which; we cannot see it
    beforehand. We price the pessimistic (cache-write) branch in the gate and
    let settlement correct downward, because over-reserving is recoverable and
    over-spending is not.
    """
    prompt_chars = sum(len(m.get("content", "") or "") for m in messages)
    prompt_tokens = estimate_tokens(" " * prompt_chars)
    completion_tokens = max_tokens if max_tokens is not None else cfg.max_tokens
    # Pessimistic branch: the whole prompt is a cache write on first contact.
    credits = cfg.weights.cost(
        input_tokens=0,
        cached_tokens=0,
        cache_write_tokens=prompt_tokens,
        output_tokens=completion_tokens,
    ) * cfg.estimate_safety
    return credits, {
        "prompt_tokens_est": prompt_tokens,
        "completion_tokens_est": completion_tokens,
    }


# --------------------------------------------------------------------------
# Gateway
# --------------------------------------------------------------------------


class Gateway:
    """Sequential, budget-accounted OpenAI-compatible chat client.

    One in-flight request at a time. Every call is pre-flighted against the
    remaining allowance; refusal raises BudgetExhausted before any socket is
    opened.
    """

    def __init__(self, cfg: Config, run_dir: str | Path, *, dry_run: bool = False):
        self.cfg = cfg
        self.run_dir = Path(run_dir)
        self.run_dir.mkdir(parents=True, exist_ok=True)
        self.ledger = Ledger(self.run_dir / "calls.jsonl")
        self.spent = 0.0
        self.calls_made = 0
        self.calls_refused = 0
        self.dry_run = dry_run
        self._seq = 0

    # -- accounting --------------------------------------------------------

    @property
    def remaining(self) -> float:
        return self.cfg.allowance - self.spent

    @property
    def spendable(self) -> float:
        """Remaining credit the strategy is allowed to *plan* against.

        The reserve is held back so that a late high-value prompt (or a
        critique pass on a nearing-miss) still has credit available. 5% of a
        128-prompt run is ~6 prompts' worth at the default weights.
        """
        floor = self.cfg.allowance * self.cfg.reserve_frac
        return max(0.0, self.remaining - floor)

    def can_afford(self, credits: float) -> bool:
        return credits <= self.spendable

    # -- the call ----------------------------------------------------------

    def chat(
        self,
        messages: list[dict[str, Any]],
        *,
        max_tokens: int | None = None,
        temperature: float | None = None,
        prompt_id: str | None = None,
        stage: str = "generate",
        extra: dict[str, Any] | None = None,
    ) -> dict[str, Any]:
        """Issue one chat call under the accountant.

        Returns a dict with `content`, `usage` (normalised), `credits`,
        `remaining`, `estimate`, `latency_ms`, `seq`. Raises BudgetExhausted
        without touching the network when the estimate does not fit.
        """
        self._seq += 1
        seq = self._seq
        est_credits, est_tokens = estimate_call_cost(
            self.cfg, messages, max_tokens=max_tokens
        )

        if not self.can_afford(est_credits):
            self.calls_refused += 1
            self.ledger.append({
                "seq": seq, "ts": time.time(), "prompt_id": prompt_id,
                "stage": stage, "status": "refused",
                "estimate_credits": round(est_credits, 6),
                "remaining": round(self.remaining, 6),
                "spendable": round(self.spendable, 6),
                **est_tokens,
            })
            raise BudgetExhausted(est_credits, self.spendable,
                                  reason="pre-flight estimate exceeds spendable")

        body = {
            "model": self.cfg.model,
            "messages": messages,
            "temperature": (self.cfg.temperature if temperature is None
                            else temperature),
            "max_tokens": max_tokens if max_tokens is not None else self.cfg.max_tokens,
            "stream": False,
        }
        started = time.time()

        if self.dry_run:
            return self._dry_run_result(seq, prompt_id, stage, body, est_credits,
                                        est_tokens, started)

        try:
            resp = self._post_json(body)
        except GatewayError as exc:
            self.ledger.append({
                "seq": seq, "ts": started, "prompt_id": prompt_id,
                "stage": stage, "status": "error", "error": str(exc),
                "estimate_credits": round(est_credits, 6),
                "remaining": round(self.remaining, 6),
            })
            raise

        latency_ms = int((time.time() - started) * 1000)
        usage = normalise_usage(resp.get("usage") or {})
        credits = self.cfg.weights.cost(**{k: usage[k] for k in (
            "input_tokens", "cached_tokens",
            "cache_write_tokens", "output_tokens")})

        self.spent += credits
        self.calls_made += 1

        content = extract_content(resp)
        row = {
            "seq": seq, "ts": started, "prompt_id": prompt_id,
            "stage": stage, "status": "ok",
            "latency_ms": latency_ms,
            "credits": round(credits, 6),
            "estimate_credits": round(est_credits, 6),
            "spent_total": round(self.spent, 6),
            "remaining": round(self.remaining, 6),
            "model": self.cfg.model,
            **usage,
            **est_tokens,
            "content_chars": len(content),
        }
        if extra:
            row.update(extra)
        self.ledger.append(row)

        return {
            "content": content,
            "usage": usage,
            "credits": credits,
            "estimate_credits": est_credits,
            "remaining": self.remaining,
            "latency_ms": latency_ms,
            "seq": seq,
        }

    # -- internals ---------------------------------------------------------

    def _post_json(self, body: dict[str, Any]) -> dict[str, Any]:
        data = json.dumps(body).encode("utf-8")
        req = urllib.request.Request(
            self.cfg.endpoint, data=data,
            headers={"Content-Type": "application/json",
                     "Authorization": "Bearer " + os.environ.get("GATEWAY_KEY", "none")},
            method="POST",
        )
        try:
            with urllib.request.urlopen(req, timeout=self.cfg.request_timeout_s) as fh:
                raw = fh.read()
        except urllib.error.HTTPError as exc:
            detail = exc.read()[:512].decode("utf-8", "replace")
            raise GatewayError(f"HTTP {exc.code}: {detail}") from exc
        except (urllib.error.URLError, TimeoutError, OSError) as exc:
            raise GatewayError(f"transport: {exc}") from exc
        try:
            return json.loads(raw)
        except json.JSONDecodeError as exc:
            raise GatewayError(f"non-JSON response: {raw[:256]!r}") from exc

    def _dry_run_result(self, seq, prompt_id, stage, body, est_credits,
                        est_tokens, started) -> dict[str, Any]:
        """Exercise the accountant without spending.

        Used to prove the budget logic (hard stop, reserve, ordering) under
        conditions the GPU queue does not let us reach on demand. Produces a
        synthetic usage block so the ledger and settle path are exercised too;
        every row is tagged so a dry run can never be mistaken for evidence.
        """
        prompt_tokens = est_tokens["prompt_tokens_est"]
        completion = min(est_tokens["completion_tokens_est"], 96)
        usage = {
            "input_tokens": 0, "cached_tokens": 0,
            "cache_write_tokens": prompt_tokens,
            "output_tokens": completion,
        }
        credits = self.cfg.weights.cost(**usage)
        self.spent += credits
        self.calls_made += 1
        self.ledger.append({
            "seq": seq, "ts": started, "prompt_id": prompt_id, "stage": stage,
            "status": "ok", "dry_run": True,
            "credits": round(credits, 6),
            "estimate_credits": round(est_credits, 6),
            "spent_total": round(self.spent, 6),
            "remaining": round(self.remaining, 6),
            "model": self.cfg.model,
            **usage, **est_tokens, "content_chars": 0,
        })
        return {
            "content": "", "usage": usage, "credits": credits,
            "estimate_credits": est_credits, "remaining": self.remaining,
            "latency_ms": 0, "seq": seq, "dry_run": True,
        }


# --------------------------------------------------------------------------
# Response normalisation
# --------------------------------------------------------------------------

def normalise_usage(raw: dict[str, Any]) -> dict[str, int]:
    """Map provider `usage` dialects onto the four announced token classes.

    llama-server / llama.cpp report `prompt_tokens` / `completion_tokens` and,
    on recent builds, `prompt_tokens_details.cached_tokens`. OpenAI-compatible
    gateways add `cache_creation_input_tokens` (Anthropic-shaped) or
    `prompt_cache_miss_tokens` / `prompt_cache_hit_tokens` (DeepSeek-shaped).
    All are folded here so the accountant is provider-agnostic: the four
    columns the announcement names are what this function must always return.
    """
    def g(*keys: str) -> int:
        for k in keys:
            v = raw.get(k)
            if isinstance(v, (int, float)):
                return int(v)
        return 0

    details = raw.get("prompt_tokens_details") or {}
    cached = g("cached_tokens", "prompt_cache_hit_tokens")
    if not cached and isinstance(details, dict):
        v = details.get("cached_tokens", 0)
        cached = int(v) if isinstance(v, (int, float)) else 0

    prompt_total = g("prompt_tokens", "input_tokens")
    cache_write = g("cache_creation_input_tokens", "cache_write_tokens")

    if cached and prompt_total:
        # `prompt_tokens` is the full prefix; the uncached remainder is input.
        input_tokens = max(0, prompt_total - cached)
    elif prompt_total:
        input_tokens = prompt_total
    else:
        input_tokens = 0

    output_tokens = g("completion_tokens", "output_tokens")
    # Reasoning tokens are billed as output. When a gateway itemises them,
    # add them in only if the completion total did not already include them.
    reasoning = 0
    cd = raw.get("completion_tokens_details") or {}
    if isinstance(cd, dict):
        reasoning = int(cd.get("reasoning_tokens", 0) or 0)
    if reasoning and not output_tokens:
        output_tokens = reasoning

    return {
        "input_tokens": input_tokens,
        "cached_tokens": cached,
        "cache_write_tokens": cache_write,
        "output_tokens": output_tokens,
    }


def extract_content(resp: dict[str, Any]) -> str:
    """Pull the assistant text out of an OpenAI-compatible chat response.

    Handles the three shapes seen in the wild: the plain `message.content`
    string, a content-part list, and the reasoning-model convention of
    emitting the answer under `reasoning_content` with an empty `content`.
    """
    choices = resp.get("choices") or []
    if not choices:
        return ""
    msg = choices[0].get("message") or {}
    content = msg.get("content")
    if isinstance(content, list):
        parts = []
        for part in content:
            if isinstance(part, dict) and isinstance(part.get("text"), str):
                parts.append(part["text"])
            elif isinstance(part, str):
                parts.append(part)
        content = "".join(parts)
    if not content:
        content = msg.get("reasoning_content") or choices[0].get("text") or ""
    return content if isinstance(content, str) else ""


# --------------------------------------------------------------------------
# Self-test / CLI
# --------------------------------------------------------------------------

def _selftest() -> int:
    """Exercise the accountant without a model or a network.

    Covers exactly the properties the announcement makes load-bearing:
    hard stop before an unaffordable call, the reserve floor, sequential
    bookkeeping, and the four-class weighting.
    """
    import tempfile
    fails = []

    def check(name, cond):
        if not cond:
            fails.append(name)
        print(f"  {'ok  ' if cond else 'FAIL'} {name}")

    with tempfile.TemporaryDirectory() as td:
        cfg = Config(allowance=100.0, reserve_frac=0.10, estimate_safety=1.0,
                     max_tokens=100)
        gw = Gateway(cfg, td, dry_run=True)
        msgs = [{"role": "user", "content": "x" * 400}]  # 100 prompt tokens

        # 100 prompt tokens as cache-write @1.25 + 100 output @4.0 = 525 credits,
        # against a spendable ceiling of 90 (allowance 100 less 10% reserve).
        # The accountant must refuse this before any socket is opened.
        try:
            gw.chat(msgs, prompt_id="p1")
            check("estimate over spendable is refused", False)
        except BudgetExhausted as exc:
            check("estimate over spendable is refused", exc.needed > exc.remaining)
        check("refusal spends nothing", gw.spent == 0.0)
        check("refusal is counted", gw.calls_refused == 1)
        check("refusal is ledgered",
              gw.ledger.rows() and gw.ledger.rows()[0]["status"] == "refused")
        check("reserve honoured (spendable < allowance)",
              gw.spendable == 90.0)

        # Direct accounting checks
        w = Weights()
        check("weighted cost arithmetic",
              abs(w.cost(input_tokens=100, cached_tokens=0,
                         cache_write_tokens=0, output_tokens=0) - 100.0) < 1e-9)
        check("cached is the cheapest class",
              w.cached < w.input < w.cache_write < w.output)

        # Hard stop: allowance too small for anything
        tiny = Gateway(Config(allowance=0.5, max_tokens=100), td, dry_run=True)
        try:
            tiny.chat(msgs)
            check("hard stop raises before send", False)
        except BudgetExhausted as exc:
            check("hard stop raises before send", exc.needed > exc.remaining)
            check("no call recorded on refusal", tiny.calls_made == 0)

        # Settle path writes a ledger row. Fresh directory: the shared `td` above
        # already holds `gw`'s refused row.
        with tempfile.TemporaryDirectory() as td2:
            big = Gateway(Config(allowance=1e6, max_tokens=100,
                                 estimate_safety=1.0), td2, dry_run=True)
            big.chat(msgs, prompt_id="p2")
            rows = big.ledger.rows()
        check("ledger row written", len(rows) == 1)
        check("ledger seq is sequential", rows[0]["seq"] == 1)
        check("four token classes present", all(
            k in rows[0] for k in ("input_tokens", "cached_tokens",
                                   "cache_write_tokens", "output_tokens")))

    # usage normalisation across dialects
    a = normalise_usage({"prompt_tokens": 100, "completion_tokens": 50})
    check("llama-server usage", a == {"input_tokens": 100, "cached_tokens": 0,
                                      "cache_write_tokens": 0, "output_tokens": 50})
    b = normalise_usage({"prompt_tokens": 100, "completion_tokens": 50,
                         "prompt_tokens_details": {"cached_tokens": 80}})
    check("cached split", b["cached_tokens"] == 80 and b["input_tokens"] == 20)

    print(f"\n{len(fails)} failure(s)" + (": " + ", ".join(fails) if fails else ""))
    return 1 if fails else 0


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[1])
    sub = ap.add_subparsers(dest="cmd", required=True)

    st = sub.add_parser("selftest", help="run the accountant self-test")
    st.add_argument("--json", action="store_true")

    pr = sub.add_parser("probe", help="one live call against the configured endpoint")
    pr.add_argument("--config", required=True)
    pr.add_argument("--run-dir", required=True)
    pr.add_argument("--prompt", default="Reply with the single word: ok")

    args = ap.parse_args(argv)
    if args.cmd == "selftest":
        return _selftest()
    if args.cmd == "probe":
        cfg = Config.load(args.config)
        gw = Gateway(cfg, args.run_dir)
        try:
            r = gw.chat([{"role": "user", "content": args.prompt}],
                        prompt_id="probe", stage="probe")
        except BudgetExhausted as exc:
            print(f"refused: {exc}", file=sys.stderr)
            return 2
        except GatewayError as exc:
            print(f"gateway error: {exc}", file=sys.stderr)
            return 3
        print(json.dumps({k: v for k, v in r.items() if k != "content"}, indent=2))
        print("content:", r["content"][:200])
        return 0
    return 1


if __name__ == "__main__":
    raise SystemExit(main())