# HƯỚNG DẪN TRIỂN KHAI TÂN HOÀNG NGA (CI/CD GITHUB ACTIONS + DATABASE THẬT)

Hệ thống vận hành chính thức với **Cơ Sở Dữ Liệu Thực Tế (Persistent Database - Prisma ORM)**:
- **Nhánh `main`**: Mã nguồn sạch của dự án.
- **GitHub Actions (Ubuntu Runner)**: Tự động biên dịch Prisma engine & Next.js Standalone $\rightarrow$ Đóng gói và đẩy sang nhánh **`deploy`**.
- **Máy chủ VPS**: Kéo nhánh **`deploy`** $\rightarrow$ Tự động đồng bộ Database (`tanhoangnga.db`) $\rightarrow$ Khởi chạy PM2 qua `server.js` (Port 3022).

---

## 1. THÔNG TIN DATABASE
- **Vị trí Database trên VPS**: `/www/wwwroot/tanhoangnga.com/data/tanhoangnga.db`
- **File cấu hình môi trường**: `/www/wwwroot/tanhoangnga.com/.env`
- **Tài khoản Super Admin khởi tạo**: `hoang.bt@tanhoangnga.vn` | **Mật khẩu**: `admin@2026`

---

## 2. HƯỚNG DẪN SETUP SẠCH TRÊN VPS (LÀM 1 LẦN DUY NHẤT)

Mở **Terminal aaPanel** trên VPS và chạy:

```bash
# 1. Dọn dẹp tiến trình cũ và dọn chỗ trống
pm2 delete tanhoangnga 2>/dev/null || true
fuser -k 3022/tcp 2>/dev/null || true
cd /www/wwwroot
rm -rf tanhoangnga.com

# 2. Clone nhánh deploy
git clone \
  --branch deploy \
  --single-branch \
  https://github.com/dev-adt/tanhoangnga.git \
  /www/wwwroot/tanhoangnga.com

# 3. Khởi tạo môi trường & Database
cd /www/wwwroot/tanhoangnga.com
cp .env.example .env
mkdir -p data

# 4. Khởi tạo Database và nạp dữ liệu thật ban đầu
npx prisma db push
node prisma/seed.mjs

# 5. Khởi chạy PM2
pm2 start ecosystem.config.cjs
pm2 save

# 6. Kiểm tra kết nối
curl -I http://127.0.0.1:3022/
```

---

## 3. CẬP NHẬT SCRIPT 1 LỆNH CHO CÁC LẦN SAU

Tạo file script `/www/scripts/deploy-tanhoangnga.sh`:
```bash
mkdir -p /www/scripts
cat << 'EOF' > /www/scripts/deploy-tanhoangnga.sh
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

# Đồng bộ Database Schema
echo "==> Đồng bộ Cơ Sở Dữ Liệu..."
if [ ! -f "$APP_DIR/data/tanhoangnga.db" ]; then
  npx prisma db push
  node prisma/seed.mjs
else
  npx prisma db push --skip-generate
fi

echo "==> Khởi động lại PM2..."
pm2 restart ecosystem.config.cjs --update-env
pm2 save

sleep 2
curl --fail --silent --show-error http://127.0.0.1:3022/ >/dev/null

echo "==> Phiên bản triển khai hiện tại:"
git log -1 --oneline
echo "✅ Deploy tanhoangnga.com với Database thật thành công!"
EOF

chmod +x /www/scripts/deploy-tanhoangnga.sh
```

👉 Từ nay, mỗi lần cập nhật bạn chỉ cần chạy:
```bash
/www/scripts/deploy-tanhoangnga.sh
```
