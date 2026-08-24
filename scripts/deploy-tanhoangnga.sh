#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/www/wwwroot/tanhoangnga.com"
cd "$APP_DIR"

echo "==> Đang kéo bản cập nhật mới nhất từ nhánh deploy..."
git fetch origin deploy
git reset --hard origin/deploy
git clean -fd

# Kiểm tra các thành phần cốt lõi của gói standalone
test -f server.js
test -d .next/static

echo "==> Khởi động lại PM2..."
pm2 restart ecosystem.config.cjs --update-env
pm2 save

sleep 2
curl --fail --silent --show-error http://127.0.0.1:3022/ >/dev/null

echo "==> Phiên bản triển khai hiện tại:"
git log -1 --oneline
echo "✅ Deploy tanhoangnga.com thành công!"
