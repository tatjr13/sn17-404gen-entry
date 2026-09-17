#!/usr/bin/env python3
"""Deterministic contract test for the batch API (api_specification.md).

Drives the state machine directly -- no network, no timing races -- and asserts
every row of the spec's status/error tables. Run: python3 test_api_contract.py
"""
import asyncio
import io
import json
import sys
import zipfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import miner_service as ms


async def main() -> int:
    pod = ms.pod

    # 1. warming_up -> 409 with current_status
    pod.status = ms.State.WARMING_UP
    r = await ms.generate({"prompts": [{"stem": "a", "image_url": "u"}], "seed": 1})
    assert r.status_code == 409, r.status_code
    assert b'"current_status":"warming_up"' in r.body, r.body
    print("PASS warming_up -> 409", r.body.decode())

    # 2. ready -> accepted
    pod.status = ms.State.READY
    r = await ms.generate({"prompts": [{"stem": "a", "image_url": "u"},
                                       {"stem": "b", "image_url": "u"}], "seed": 1})
    assert r.status_code == 200 and b'"accepted":2' in r.body, r.body
    print("PASS ready -> accepted 2", r.body.decode())
    await asyncio.sleep(0)
    pod.status = ms.State.GENERATING

    # 3. same stems (reordered) while generating -> idempotent 200
    r = await ms.generate({"prompts": [{"stem": "b", "image_url": "u"},
                                       {"stem": "a", "image_url": "u"}], "seed": 99})
    assert r.status_code == 200 and b'"accepted":2' in r.body, r.body
    print("PASS idempotent retry (reordered) -> 200 accepted 2")

    # 4. different stems while generating -> 409
    r = await ms.generate({"prompts": [{"stem": "z", "image_url": "u"}], "seed": 1})
    assert r.status_code == 409 and b'"current_status":"generating"' in r.body, r.body
    print("PASS different stems while generating -> 409")

    # 5. complete accepts a new batch (the normal subsequent-batch path)
    pod.status = ms.State.COMPLETE
    r = await ms.generate({"prompts": [{"stem": "c", "image_url": "u"}], "seed": 2})
    assert r.status_code == 200, r.status_code
    print("PASS complete -> new batch accepted")

    # 6. /results outside complete -> 409
    pod.status = ms.State.GENERATING
    r = await ms.results()
    assert r.status_code == 409, r.status_code
    print("PASS results while generating -> 409")

    # 7. zip shape: {stem}.js + _failed.json, each stem in exactly one place
    pod.status = ms.State.COMPLETE
    pod.results = {"c": "export default function generate(T){return null}"}
    pod.failed = {"d": "inference timeout"}
    pod.batch_stems = ["c", "d"]
    pod.cached_zip = ms.build_zip()
    z = zipfile.ZipFile(io.BytesIO(pod.cached_zip))
    assert set(z.namelist()) == {"c.js", "_failed.json"}, z.namelist()
    assert set(json.loads(z.read("_failed.json"))) == {"d"}
    print("PASS zip shape", sorted(z.namelist()))

    # 8. all-failed batch is valid: only _failed.json, never an empty zip
    pod.results, pod.failed = {}, {"e": "x"}
    pod.cached_zip = ms.build_zip()
    z = zipfile.ZipFile(io.BytesIO(pod.cached_zip))
    assert z.namelist() == ["_failed.json"], z.namelist()
    print("PASS all-failed batch -> only _failed.json")

    # 9. /health returns 200 in every state
    for st in (ms.State.WARMING_UP, ms.State.READY, ms.State.GENERATING, ms.State.COMPLETE):
        pod.status = st
        r = await ms.health()
        assert r.status_code == 200
    print("PASS /health 200 in all four states")

    # 10. /status never blocks and reports progress only while generating
    pod.status = ms.State.GENERATING
    pod.progress, pod.total = 7, 32
    r = await ms.status(replacements_remaining=3)
    body = json.loads(r.body)
    assert body["status"] == "generating" and body["progress"] == 7 and body["total"] == 32, body
    pod.status = ms.State.READY
    r = await ms.status(replacements_remaining=3)
    body = json.loads(r.body)
    assert body["progress"] is None and body["total"] is None, body
    print("PASS /status progress semantics")

    print("\nALL 10 API CONTRACT ASSERTIONS PASSED")
    return 0


if __name__ == "__main__":
    raise SystemExit(asyncio.run(main()))
