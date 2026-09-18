# sn17-404gen-entry — 404-GEN (Subnet 17) miner submission

An **image-to-procedural-Three.js** pipeline for the 404-GEN competition, packaged as
the batch-API verification service the subnet's orchestrator deploys.

Each round publishes prompt images. This repo turns each prompt image into a conforming
Three.js module (`export default function generate(THREE)`), validates it against the
subnet's own conformance rules, and serves the batch of modules back to the orchestrator
over HTTP.

## What is here

| Path | Purpose |
|---|---|
| `docker/Dockerfile` | The image the orchestrator builds (`docker build -f docker/Dockerfile .`) |
| `main.py` | Container entrypoint -> `miner_service.py` |
| `miner_service.py` | The four-endpoint batch API (`/health`, `/status`, `/generate`, `/results`) |
| `harness/gateway.py`, `harness/strategy.py` | The generation strategy: prompt -> local llama-server -> validator -> retry |
| `validator/`, `tools/validate.js` | The subnet's conformance validator, vendored verbatim |
| `hardware.json` | Declares the verification GPU configuration |
| `test_api_contract.py` | Deterministic assertions over the batch API contract |

## The batch API

Implements `miner-reference/api_specification.md` exactly:

- **`GET /health`** — liveness; 200 as soon as the HTTP server accepts connections.
- **`GET /status`** — `warming_up` → `ready` → `generating` ⇄ `complete`, plus `replace`.
  Reports `progress`/`total` only while generating. Never blocks on generation work
  (generation runs in a background asyncio task).
- **`POST /generate`** — accepts a batch, returns `{accepted: N}` immediately and
  generates asynchronously. **Idempotent** on the stem set: re-sending the same stems
  while generating/complete returns the same `accepted` count without restarting.
  A *different* stem set while generating returns `409` with `current_status`.
- **`GET /results`** — a chunked `application/zip` (`{stem}.js` per success, plus
  `_failed.json` when any prompt failed), byte-identical across retries, no
  `Content-Length`. Partial batches are the expected case.

Server binds `0.0.0.0:10006` (the spec forbids `127.0.0.1`). `python3 test_api_contract.py`
asserts all ten contract behaviours and needs no GPU.

## How generation works

```
prompt image URL
   -> (downloaded by the orchestrator's pod; we receive the URL in the batch)
   -> strategy.py builds a chat request describing the object to reconstruct
   -> local llama-server (OpenAI-compatible /v1/chat/completions)
   -> extract the module
   -> tools/validate.js  (the subnet's own static + execution checks)
   -> on failure: feed the validator's {stage, rule, detail} back and retry
   -> conforming module, or a _failed.json entry
```

The strategy is unchanged from the phase-2 harness that was benchmarked against a
stand-in model; this repo only adds the serving layer around it. **No number in this
repo is a claim about the real model** — see `RUNBOOK.md` for the dry-run receipts.

## Hardware

`hardware.json` declares `["4xH200"]`, the default verification pod (4× H200 SXM,
141 GB HBM3e each). We declare only the default rather than both listed configurations
because the 4×H200 pod gives the largest per-GPU VRAM headroom, so a single
`--n-gpu-layers 999` offload with `--parallel` streams needs no per-configuration
branching; declaring both would oblige the image to also fit, and be validated on,
the smaller 96 GB `4xRTX6000Pro` cards.

To target the Blackwell configuration instead, change that one line to
`["4xRTX6000Pro"]` — no code changes are required, since the GPU layer split is read
from the environment.

## Reproducibility

Per `api_specification.md` § Docker Image Requirements, every external dependency is
pinned: the base image by tag (`nvidia/cuda:12.4.1-*`), llama.cpp by release tag
(`LLAMA_CPP_REF`), every pip package by exact version, and the model by `MODEL_REVISION`.
The GGUF is pulled from a **public, ungated** HF repo at image build time, so the build
needs no HF token and the container needs no network at startup.

## Building and running

```bash
docker build -f docker/Dockerfile -t sn17-404gen-entry .
docker run --gpus all -p 10006:10006 sn17-404gen-entry
curl -s localhost:10006/status | jq
```

### `--gpus all` is required, and this is verified rather than assumed

`llama-server` is built `-DGGML_CUDA=ON`, so it links `libcudart.so.12` and
`libcublas.so.12` from the CUDA runtime and `libcuda.so.1` from the host driver.
Started **without** `--gpus all` it dies in the dynamic linker:

```
llama-server: error while loading shared libraries: libcuda.so.1: cannot open
shared object file: No such file or directory
```

and the pod correctly stays in `warming_up` rather than reporting a false `ready`.
Started **with** `--gpus all` it loads the baked-in GGUF and reaches `ready` in
~19 s on a single 32 GB card (measured on the built image, 2026-09-18T00:04Z).
The orchestrator's verification pod supplies the GPUs; the observe-the-failure
case above is what a misconfigured pod looks like, and it is deliberately loud.

A missing **model file** is a different failure and is treated differently:
it raises `MissingModelError` and asks for a replacement pod, because a broken
image must not be reported as `ready` (see `miner_service.py`).

## License

Code in this repository is released under the MIT License. The pinned
Three.js bundle (`three@0.183.2`) is MIT; llama.cpp is MIT; the GGUF weights carry
their upstream model card's license, which is commercial-use compatible.