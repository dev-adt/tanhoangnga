#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/www/wwwroot/tanhoangnga.com"
cd "$APP_DIR"

echo "==> Sao lưu an toàn file .env và database..."
mkdir -p "$APP_DIR/data"
if [ -f "$APP_DIR/.env" ]; then
  cp "$APP_DIR/.env" /root/tanhoangnga.env.backup 2>/dev/null || true
fi
if [ -f "$APP_DIR/data/tanhoangnga.db" ]; then
  cp "$APP_DIR/data/tanhoangnga.db" /root/tanhoangnga.db.backup 2>/dev/null || true
fi

echo "==> Đang kéo bản cập nhật mới nhất từ nhánh deploy..."
git fetch origin deploy
git reset --hard origin/deploy

# Khôi phục .env và Database
if [ -f /root/tanhoangnga.env.backup ]; then
  cp /root/tanhoangnga.env.backup "$APP_DIR/.env"
else
  if [ ! -f "$APP_DIR/.env" ]; then
    cp "$APP_DIR/.env.example" "$APP_DIR/.env"
  fi
fi

if [ -f /root/tanhoangnga.db.backup ]; then
  mkdir -p "$APP_DIR/data"
  cp /root/tanhoangnga.db.backup "$APP_DIR/data/tanhoangnga.db"
fi

# Kiểm tra tính toàn vẹn của gói Standalone
test -f server.js
test -d .next/static

# Đồng bộ Database Schema & Khởi tạo nếu là lần đầu
echo "==> Đồng bộ Cơ Sở Dữ Liệu..."
if [ ! -f "$APP_DIR/data/tanhoangnga.db" ]; then
  echo "==> Tạo database mới và nạp dữ liệu ban đầu..."
  npx prisma db push
  node prisma/seed.mjs
else
  npx prisma db push --skip-generate
fi

echo "==> Khởi động lại ứng dụng với PM2..."
pm2 restart ecosystem.config.cjs --update-env
pm2 save

sleep 2
curl --fail --silent --show-error http://127.0.0.1:3022/ >/dev/null

echo "==> Phiên bản triển khai hiện tại:"
git log -1 --oneline
echo "✅ Deploy tanhoangnga.com với Database thật thành công!"
