# HƯỚNG DẪN KẾT NỐI MYSQL AAPANEL CHO TÂN HOÀNG NGA

Hệ thống sử dụng **Cơ Sở Dữ Liệu MySQL 8.0 trực tiếp trên aaPanel** kết hợp **Prisma ORM**.

---

## BƯỚC 1: TẠO DATABASE TRÊN AAPANEL (LÀM TRONG 30 GIÂY)

1. Mở aaPanel $\rightarrow$ Vào mục **Databases** (như trong ảnh bạn đang mở).
2. Nhấn nút xanh **`Add DB`**.
3. Điền các thông tin:
   - **DBName**: `tanhoangnga`
   - **DBType**: `MySQL`
   - **Charset**: `utf8mb4`
   - **Username**: `tanhoangnga`
   - **Password**: *(Đặt mật khẩu hoặc nhấn nút Generate để lấy mật khẩu ngẫu nhiên, ví dụ: `MatKhauCuaBan123`)*
4. Nhấn **Submit**.

---

## BƯỚC 2: KẾT NỐI & KHỞI TẠO DỮ LIỆU TRÊN TERMINAL VPS

Mở **Terminal aaPanel** và chạy lần lượt:

```bash
# 1. Vào thư mục dự án (nếu chưa có thì clone nhánh deploy)
cd /www/wwwroot/tanhoangnga.com 2>/dev/null || (cd /www/wwwroot && rm -rf tanhoangnga.com && git clone --branch deploy --single-branch https://github.com/dev-adt/tanhoangnga.git /www/wwwroot/tanhoangnga.com && cd /www/wwwroot/tanhoangnga.com)

# 2. Cập nhật nhánh deploy mới nhất
git fetch origin deploy
git reset --hard origin/deploy
git clean -fd

# 3. Tạo file .env với thông tin MySQL bạn vừa tạo ở Bước 1
# (Thay 'MatKhauCuaBan123' bằng Mật khẩu thật bạn vừa tạo ở Bước 1)
cat << 'EOF' > .env
DATABASE_URL="mysql://tanhoangnga:MatKhauCuaBan123@127.0.0.1:3306/tanhoangnga"
NODE_ENV="production"
PORT=3022
HOSTNAME="0.0.0.0"
EOF

# 4. Tự động tạo bảng vào MySQL và nạp dữ liệu thật ban đầu
npx prisma@6 db push
node prisma/seed.mjs

# 5. Khởi chạy PM2
pm2 delete tanhoangnga 2>/dev/null || true
pm2 start ecosystem.config.cjs
pm2 save

# 6. Kiểm tra
curl -I http://127.0.0.1:3022/
```

---

## BƯỚC 3: CÀI ĐẶT SCRIPT CẬP NHẬT 1 LỆNH DUY NHẤT

Tạo file `/www/scripts/deploy-tanhoangnga.sh`:
```bash
mkdir -p /www/scripts
cat << 'EOF' > /www/scripts/deploy-tanhoangnga.sh
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
EOF

chmod +x /www/scripts/deploy-tanhoangnga.sh
```

👉 Từ nay về sau, mỗi lần cập nhật bạn chỉ cần gõ đúng 1 dòng lệnh:
```bash
/www/scripts/deploy-tanhoangnga.sh
```
Hệ thống sẽ kéo bản mới nhất, tự động đồng bộ cấu trúc MySQL và nạp lại PM2 mà không bao giờ mất dữ liệu!
