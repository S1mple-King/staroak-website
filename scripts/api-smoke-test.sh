#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-http://127.0.0.1:3000}"

for type in ecosystem contact intelligence; do
  response=$(curl -sS -X POST "$BASE_URL/api/leads" \
    -H "Content-Type: application/json" \
    --data "{\"type\":\"$type\",\"name\":\"本地测试\",\"company\":\"StarOak QA\",\"email\":\"qa@example.com\",\"topic\":\"一般咨询\",\"message\":\"本地预览模式 API smoke test\",\"consent\":true}")

  node -e '
    const payload = JSON.parse(process.argv[1]);
    if (!payload.ok || payload.mode !== "preview_without_backend") process.exit(1);
  ' "$response"
  echo "✅ /api/leads $type preview submission"
done

status=$(curl -sS -o /dev/null -w "%{http_code}" -X POST "$BASE_URL/api/leads" \
  -H "Content-Type: application/json" \
  --data '{"type":"ecosystem","consent":false}')
[[ "$status" == "400" ]] || { echo "❌ invalid lead expected 400, received $status"; exit 1; }
echo "✅ /api/leads invalid payload 400"

apex_response=$(curl -sS -X POST "$BASE_URL/api/leads" \
  -H "Content-Type: application/json" \
  --data '{"type":"ecosystem","name":"本地测试","company":"StarOak QA","email":"qa@example.com","topic":"APEX AI量化交易系统能力合作","message":"本地合规分流 smoke test","consent":true}')

node -e '
  const payload = JSON.parse(process.argv[1]);
  if (!payload.ok || !String(payload.owner).includes("合规")) process.exit(1);
' "$apex_response"
echo "✅ /api/leads APEX compliance routing"
