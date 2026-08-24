# HƯỚNG DẪN TRIỂN KHAI WEBSITE TÂN HOÀNG NGA LÊN VPS (DOMAIN: TANHOANGNGA.COM)

Tài liệu này hướng dẫn từng bước chi tiết từ A - Z để đưa website và cổng quản trị **Công ty TNHH Tân Hoàng Nga** lên máy chủ Linux VPS và chạy chính thức trên tên miền **tanhoangnga.com**.

---

## 1. GIẢI ĐÁP QUAN TRỌNG VỀ DATABASE VÀ FILE `.ENV`

### 🔹 Có cần tạo Database (MySQL / PostgreSQL) không?
- **KHÔNG CẦN!** Hệ thống đã được tích hợp sẵn kiến trúc **Data Repository & Seed Store** (chứa toàn bộ hồ sơ năng lực 2026, 4 giải pháp AI lõi, bài viết mẫu chuẩn SEO, ma trận phân quyền RBAC và hệ thống tiếp nhận Lead CRM). Hệ thống tự khởi tạo và vận hành mượt mà ngay khi chạy, không lo nghẽn hay lỗi kết nối DB.

### 🔹 Có cần tạo file `.env` không?
- **KHÔNG BẮT BUỘC** (Hệ thống đã có sẵn fallback cấu hình mặc định).
- Tuy nhiên, để tối ưu nhận diện tên miền chính thức, bạn có thể tạo 1 file `.env.production` trên VPS với nội dung:
  ```env
  PORT=3000
  NODE_ENV=production
  NEXT_PUBLIC_SITE_URL=https://tanhoangnga.com
  ```

---

## 2. CÁC BƯỚC CÀI ĐẶT LÊN VPS (CHỈ LÀM 1 LẦN DUY NHẤT)

### Bước 1: Đăng nhập vào VPS qua SSH
Mở terminal trên máy tính của bạn và kết nối tới VPS:
```bash
ssh root@<IP_CỦA_VPS>
```

### Bước 2: Cài đặt Node.js 20 LTS, Nginx và PM2
Chạy lần lượt các lệnh sau trên VPS:
```bash
# Cập nhật gói hệ thống
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git ufw nginx

# Cài đặt Node.js v20.x LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Cài đặt PM2 (quản lý tiến trình nền)
sudo npm install -g pm2
```

---

### Bước 3: Tải mã nguồn từ GitHub về VPS
```bash
# Tạo thư mục chứa web
sudo mkdir -p /var/www/tanhoangnga
sudo chown -R $USER:$USER /var/www/tanhoangnga

# Kéo mã nguồn từ GitHub
git clone https://github.com/dev-adt/tanhoangnga.git /var/www/tanhoangnga
cd /var/www/tanhoangnga

# Cài đặt thư viện & Build dự án
npm install
npm run build
```

---

### Bước 4: Khởi chạy website bằng PM2
```bash
cd /var/www/tanhoangnga
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```
*(Nếu terminal xuất hiện 1 dòng lệnh `sudo env PATH=...`, hãy copy dòng đó và dán chạy để PM2 tự khởi động cùng VPS).*

---

### Bước 5: Cấu hình Nginx cho tên miền `tanhoangnga.com`
Tạo file cấu hình web:
```bash
sudo nano /etc/nginx/sites-available/tanhoangnga.com
```

Dán toàn bộ nội dung sau vào:
```nginx
server {
    listen 80;
    server_name tanhoangnga.com www.tanhoangnga.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Cho phép upload ảnh lên đến 25MB
    client_max_body_size 25M;
}
```

Nhấn `Ctrl + O` rồi `Enter` để lưu, `Ctrl + X` để thoát.

Kích hoạt cấu hình:
```bash
sudo ln -s /etc/nginx/sites-available/tanhoangnga.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

### Bước 6: Cài đặt chứng chỉ bảo mật SSL (HTTPS) miễn phí
Đảm bảo bạn đã trỏ bản ghi DNS của tên miền `tanhoangnga.com` và `www.tanhoangnga.com` (bản ghi A) về IP của VPS, sau đó chạy:
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d tanhoangnga.com -d www.tanhoangnga.com
```
*(Làm theo hướng dẫn trên màn hình: nhập email và chọn tự động Redirect HTTP sang HTTPS).*

---

## 3. QUY TRÌNH CẬP NHẬT MÃ NGUỒN SAU NÀY (KHI CÓ THAY ĐỔI)

Mỗi khi bạn sửa code trên máy tính và muốn cập nhật lên VPS:

1. **Trên máy tính của bạn**:
   ```bash
   git add .
   git commit -m "update: noi dung moi"
   git push origin main
   ```

2. **Trên VPS**:
   ```bash
   cd /var/www/tanhoangnga
   git pull origin main
   npm run build
   pm2 restart tanhoangnga
   ```

---

## 4. THÔNG TIN TRUY CẬP HỆ THỐNG
- **Trang chủ chính thức**: `https://tanhoangnga.com`
- **Cổng Đăng Nhập bí mật**: `https://tanhoangnga.com/auth/login` (hoặc `/login`)
- **Dashboard Quản trị CMS & RBAC**: `https://tanhoangnga.com/dashboard`
- **Tài khoản Super Admin**: `hoang.bt@tanhoangnga.vn` | **Mật khẩu**: `admin@2026`
