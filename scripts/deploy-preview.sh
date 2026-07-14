#!/usr/bin/env bash
set -euo pipefail
if [[ ! -f .env.production ]]; then
  cp .env.example .env.production
  echo "Created .env.production from .env.example. Please review before production release."
fi
docker compose -f docker-compose.preview.yml up -d --build
bash scripts/smoke-test.sh http://127.0.0.1:3000
