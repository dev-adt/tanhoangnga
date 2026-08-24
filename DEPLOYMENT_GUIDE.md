# HƯỚNG DẪN TRIỂN KHAI TÂN HOÀNG NGA (CI/CD GITHUB ACTIONS + STANDALONE DEPLOY)

Hệ thống triển khai tự động theo chuẩn công nghiệp:
- **Nhánh `main`**: Chứa mã nguồn sạch của dự án.
- **GitHub Actions (Ubuntu Runner)**: Tự động cài dependencies, build `output: 'standalone'` và đẩy toàn bộ gói chạy hoàn chỉnh sang nhánh **`deploy`**.
- **Máy chủ VPS**: Chỉ cần kéo nhánh **`deploy`** và khởi động bằng PM2 qua `server.js` (không cần cài devDependencies, không cần build trên VPS, không xung đột môi trường Windows/Linux).

---

## 1. CẤU HÌNH GITHUB ACTIONS & NEXT.JS STANDALONE
- **Next.js Config (`next.config.ts`)**: Đã bật `output: 'standalone'`.
- **PM2 Runner (`ecosystem.config.cjs`)**: Đã cấu hình chạy `server.js` tại thư mục `/www/wwwroot/tanhoangnga.com` với Port `3022`.
- **Workflow (`.github/workflows/deploy.yml`)**: Tự động kích hoạt mỗi khi push lên `main` để xuất gói `release/` sang nhánh `deploy`.

---

## 2. HƯỚNG DẪN SETUP SẠCH LẦN ĐẦU TRÊN VPS

### Bước 2.1: Đăng nhập SSH vào VPS và chuẩn bị thư mục
```bash
# 1. Dừng ứng dụng cũ nếu đang chạy
pm2 stop tanhoangnga 2>/dev/null || true

# 2. Sao lưu file .env (nếu có)
cp /www/wwwroot/tanhoangnga.com/.env /root/tanhoangnga.env.backup 2>/dev/null || true

# 3. Đổi tên thư mục cũ để backup
cd /www/wwwroot
mv tanhoangnga.com "tanhoangnga.com.backup-$(date +%Y%m%d%H%M%S)" 2>/dev/null || true
```

### Bước 2.2: Clone nhánh `deploy` (chứa toàn bộ gói Standalone đã build sẵn)
```bash
git clone \
  --branch deploy \
  --single-branch \
  https://github.com/dev-adt/tanhoangnga.git \
  /www/wwwroot/tanhoangnga.com
```

### Bước 2.3: Khôi phục `.env` (nếu cần) & Khởi động PM2
```bash
# Khôi phục file env nếu có
cp /root/tanhoangnga.env.backup /www/wwwroot/tanhoangnga.com/.env 2>/dev/null || true

# Khởi chạy PM2 với ecosystem.config.cjs
cd /www/wwwroot/tanhoangnga.com
pm2 delete tanhoangnga 2>/dev/null || true
pm2 start ecosystem.config.cjs
pm2 save
```

### Bước 2.4: Kiểm tra trạng thái vận hành
```bash
pm2 describe tanhoangnga
curl -sSI http://127.0.0.1:3022/ | head -n 20
curl -sSI https://tanhoangnga.com/ | head -n 20
```

---

## 3. CÀI ĐẶT SCRIPT CẬP NHẬT 1 LỆNH DUY NHẤT CHO CÁC LẦN SAU

Tạo file script trên VPS tại `/www/scripts/deploy-tanhoangnga.sh`:
```bash
mkdir -p /www/scripts
nano /www/scripts/deploy-tanhoangnga.sh
```

Dán nội dung script sau vào:
```bash
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
```

Cấp quyền thực thi:
```bash
chmod +x /www/scripts/deploy-tanhoangnga.sh
```

👉 **Mỗi lần sau khi bạn push code mới lên GitHub và GitHub Actions build xong, bạn chỉ cần gõ đúng 1 dòng lệnh trên VPS**:
```bash
/www/scripts/deploy-tanhoangnga.sh
```

---

## 4. BẢO MẬT & QUẢN TRỊ
- **Trang chủ**: `https://tanhoangnga.com`
- **Cổng Đăng Nhập bí mật**: `https://tanhoangnga.com/auth/login`
- **Dashboard Quản trị**: `https://tanhoangnga.com/dashboard`
- **Tài khoản Super Admin**: `hoang.bt@tanhoangnga.vn` | **Mật khẩu**: `admin@2026`
