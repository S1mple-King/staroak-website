#!/usr/bin/env bash
set -euo pipefail
BASE_URL="${1:-http://127.0.0.1:3000}"
paths=("/" "/about" "/ai-engine" "/industries" "/intelligence" "/ecosystem" "/contact" "/privacy" "/disclaimer" "/api/health")
for p in "${paths[@]}"; do
  code=$(curl -L -s -o /dev/null -w "%{http_code}" "$BASE_URL$p")
  if [[ "$code" != "200" ]]; then
    echo "❌ $p returned $code"
    exit 1
  fi
  echo "✅ $p $code"
done
# ai-core must use the V3.4-approved 301 redirect and resolve successfully.
code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/ai-core")
[[ "$code" == "301" ]] || { echo "❌ /ai-core expected 301, received $code"; exit 1; }
final_code=$(curl -L -s -o /dev/null -w "%{http_code}" "$BASE_URL/ai-core")
[[ "$final_code" == "200" ]] || { echo "❌ /ai-core redirect target failed: $final_code"; exit 1; }
echo "✅ /ai-core 301 -> /ai-engine"
