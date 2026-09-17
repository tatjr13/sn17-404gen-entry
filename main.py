#!/usr/bin/env python3
"""Container entrypoint: the batch API service (api_specification.md)."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from miner_service import main

if __name__ == "__main__":
    main()
