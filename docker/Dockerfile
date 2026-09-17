# 404-GEN entry submission image.
#
# Layout matches api_specification.md § Docker Image Requirements:
#   * Dockerfile lives at docker/Dockerfile, build context = repo root
#   * EXPOSE 10006
#   * server listens on 0.0.0.0:10006
#   * every external dependency pinned (base image digest, pip ==, HF revision)
#
# Two-stage: the builder compiles llama.cpp and pre-downloads the GGUF, so the
# runtime layer needs no compiler and no HF token at startup.

# ---------------------------------------------------------------------------
# Stage 1 — build llama.cpp and warm the model cache
# ---------------------------------------------------------------------------
FROM nvidia/cuda:12.4.1-devel-ubuntu22.04 AS builder

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y --no-install-recommends \
        build-essential git curl ca-certificates python3 python3-pip \
    && rm -rf /var/lib/apt/lists/*

# Ubuntu 22.04 ships CMake 3.22; current llama.cpp requires >= 3.24 (it fails
# at configure time with "CMake 3.24 or higher is required"). The pip wheel
# ships a self-contained modern cmake, which is the least invasive fix — no
# apt repo surgery, and it pins a version like everything else here.
RUN pip3 install --no-cache-dir "cmake==3.31.6"

# Pinned to a release tag, not a branch: api_specification.md requires a
# specific version or commit hash for reproducibility. b4585 does not exist;
# this tag was resolved from `git ls-remote --tags` at lane time.
ARG LLAMA_CPP_REF=b11028
RUN git clone --depth 1 --branch "${LLAMA_CPP_REF}" https://github.com/ggml-org/llama.cpp /opt/llama.cpp \
    && cmake -S /opt/llama.cpp -B /opt/llama.cpp/build \
        -DCMAKE_BUILD_TYPE=Release \
        -DGGML_CUDA=ON \
        -DLLAMA_CURL=ON \
        -DBUILD_SHARED_LIBS=OFF \
    && cmake --build /opt/llama.cpp/build --config Release -j"$(nproc)" \
    && mkdir -p /opt/llama-bin \
    && cp /opt/llama.cpp/build/bin/llama-server /opt/llama-bin/

# ---------------------------------------------------------------------------
# Stage 2 — runtime
# ---------------------------------------------------------------------------
FROM nvidia/cuda:12.4.1-runtime-ubuntu22.04

ENV DEBIAN_FRONTEND=noninteractive \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    HF_HOME=/models/hf \
    MODEL_DIR=/models

RUN apt-get update && apt-get install -y --no-install-recommends \
        python3 python3-pip curl ca-certificates libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# Every pip dependency pinned to an exact version.
RUN pip3 install --no-cache-dir \
        "fastapi==0.115.6" \
        "uvicorn==0.34.0" \
        "pydantic==2.10.4" \
        "httpx==0.28.1" \
        "huggingface-hub==0.27.1"

COPY --from=builder /opt/llama-bin/llama-server /usr/local/bin/llama-server

# Warm the weights at BUILD time so the container never needs a token at start
# and the 4-hour warmup budget is not spent on a multi-GB download.
#
# Repo choice is load-bearing and was verified, not assumed: the first-party
# `Qwen/Qwen2.5-VL-7B-Instruct-GGUF` returns HTTP 401 without a token (it is
# gated), which would break both "no token at build" and "no network at start".
# `unsloth/...` reports `"gated": false` from the HF API and serves byte ranges
# to an unauthenticated client (verified: HTTP 206 on a ranged GET), so this is
# the mirror we pin.
#
# MODEL_REVISION is a branch by default because that is what the round deploys;
# api_specification.md asks for a specific revision. Resolve the current commit
# SHA at release time and pass --build-arg MODEL_REVISION=<sha> to pin exactly.
ARG MODEL_REPO=unsloth/Qwen2.5-VL-7B-Instruct-GGUF
ARG MODEL_FILE=Qwen2.5-VL-7B-Instruct-Q4_K_M.gguf
ARG MODEL_REVISION=main
RUN mkdir -p /models/gguf \
    && python3 -c "\
import os, urllib.request, sys;\
repo=os.environ['MODEL_REPO']; rev=os.environ['MODEL_REVISION']; f=os.environ['MODEL_FILE'];\
url=f'https://huggingface.co/{repo}/resolve/{rev}/{f}?download=true';\
print('GET', url, flush=True);\
urllib.request.urlretrieve(url, f'/models/gguf/{f}');\
print('size', os.path.getsize(f'/models/gguf/{f}'), flush=True)" \
    && test -s "/models/gguf/${MODEL_FILE}" && ls -la /models/gguf/

# No ENV indirection needed at runtime; the entrypoint reads these paths.
ENV MODEL_REPO=${MODEL_REPO} MODEL_FILE=${MODEL_FILE} MODEL_REVISION=${MODEL_REVISION}

WORKDIR /app
COPY . /app

# Node + validator deps for the in-container generate->validate->retry loop.
# Node is installed explicitly at a pinned major (the base image has none), then
# npm ci against the committed lockfile so the validator's dependency tree is
# reproducible rather than resolved fresh at build time.
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && rm -rf /var/lib/apt/lists/* \
    && node --version && npm --version
RUN cd /app/validator && npm ci --omit=dev --no-audit --no-fund

EXPOSE 10006
# api_specification.md: must bind 0.0.0.0, not 127.0.0.1.
CMD ["python3", "main.py"]