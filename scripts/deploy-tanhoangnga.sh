#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/www/wwwroot/tanhoangnga.com"
cd "$APP_DIR"

echo "==> Sao lưu an toàn file .env..."
if [ -f "$APP_DIR/.env" ]; then
  cp "$APP_DIR/.env" /root/tanhoangnga.env.backup 2>/dev/null || true
fi

echo "==> Đang kéo bản cập nhật mới nhất từ nhánh deploy..."
git fetch origin deploy
git reset --hard origin/deploy
git clean -fd

# Khôi phục .env
if [ -f /root/tanhoangnga.env.backup ]; then
  cp /root/tanhoangnga.env.backup "$APP_DIR/.env"
else
  if [ ! -f "$APP_DIR/.env" ]; then
    cp "$APP_DIR/.env.example" "$APP_DIR/.env"
  fi
fi

# Kiểm tra các thành phần cốt lõi của gói Standalone
test -f server.js
test -d .next/static

# Đồng bộ Database Schema vào MySQL trên aaPanel
echo "==> Đồng bộ Cơ Sở Dữ Liệu MySQL..."
npx prisma db push --skip-generate

echo "==> Khởi động lại ứng dụng với PM2..."
pm2 restart ecosystem.config.cjs --update-env
pm2 save

sleep 2
curl --fail --silent --show-error http://127.0.0.1:3022/ >/dev/null

echo "==> Phiên bản triển khai hiện tại:"
git log -1 --oneline
echo "✅ Deploy tanhoangnga.com với MySQL thành công!"
