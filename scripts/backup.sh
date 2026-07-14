#!/usr/bin/env bash
set -euo pipefail
STAMP=$(date +%Y%m%d_%H%M%S)
mkdir -p backups/$STAMP
cp -f .env.production backups/$STAMP/.env.production.redacted || true
tar --exclude=node_modules --exclude=.next --exclude=backups -czf backups/$STAMP/staroak-web-source-$STAMP.tar.gz .
echo "Backup created under backups/$STAMP"
