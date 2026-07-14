#!/usr/bin/env bash
set -euo pipefail
npm ci
npm run typecheck
npm run build
echo "✅ Build check passed."
