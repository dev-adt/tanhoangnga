# HƯỚNG DẪN TRIỂN KHAI HỆ THỐNG TÂN HOÀNG NGA LÊN VPS (PRODUCTION)

Tài liệu này hướng dẫn chi tiết quy trình triển khai website và cổng quản trị **Công ty TNHH Tân Hoàng Nga** lên máy chủ ảo (Linux VPS / Ubuntu 22.04 LTS hoặc 24.04 LTS).

---

## 1. Yêu Cầu Cấu Hình Máy Chủ (VPS)
- **Hệ điều hành**: Ubuntu 20.04 / 22.04 / 24.04 LTS (hoặc Debian 11/12).
- **Phần cứng khuyến nghị**:
  - CPU: 2 Cores trở lên.
  - RAM: 2GB - 4GB RAM.
  - Ổ cứng: 20GB SSD / NVMe.
- **Phần mềm lõi**:
  - Node.js: `v20.x` hoặc `v22.x` (LTS).
  - Nginx (Web Server & Reverse Proxy).
  - PM2 (Process Manager cho Node.js).
  - Certbot (Cấp chứng chỉ SSL HTTPS miễn phí).

---

## 2. Các Bước Cài Đặt Môi Trường Trên VPS (Chạy Lần Đầu)

### Bước 2.1: Cập nhật hệ thống
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git ufw nginx
```

### Bước 2.2: Cài đặt Node.js LTS (v20.x)
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v # Kiểm tra phiên bản (v20.x.x)
npm -v  # Kiểm tra npm
```

### Bước 2.3: Cài đặt PM2 toàn cục
```bash
sudo npm install -g pm2
```

---

## 3. Tải Mã Nguồn & Build Dự Án

### Bước 3.1: Clone repository từ GitHub
```bash
# Tạo thư mục chứa dự án
sudo mkdir -p /var/www/tanhoangnga
sudo chown -R $USER:$USER /var/www/tanhoangnga

# Clone mã nguồn
git clone https://github.com/dev-adt/tanhoangnga.git /var/www/tanhoangnga
cd /var/www/tanhoangnga
```

### Bước 3.2: Cài đặt thư viện & Build mã nguồn
```bash
# Cài đặt toàn bộ dependencies
npm install

# Build dự án sang chế độ Production
npm run build
```

---

## 4. Quản Lý Vận Hành Bằng PM2

### Bước 4.1: Khởi chạy ứng dụng
```bash
pm2 start ecosystem.config.js
# Hoặc chạy lệnh trực tiếp:
# pm2 start npm --name "tanhoangnga" -- start -- -p 3000
```

### Bước 4.2: Thiết lập tự khởi động khi VPS khởi động lại
```bash
pm2 save
pm2 startup
# Sao chép và chạy lệnh được sinh ra trên terminal (nếu có yêu cầu)
```

### Các lệnh quản lý PM2 thường dùng:
```bash
pm2 status          # Xem trạng thái ứng dụng
pm2 logs tanhoangnga # Xem log thời gian thực
pm2 restart tanhoangnga # Khởi động lại ứng dụng
```

---

## 5. Cấu Hình Nginx Reverse Proxy & SSL

### Bước 5.1: Tạo file cấu hình Nginx cho tên miền
```bash
sudo nano /etc/nginx/sites-available/tanhoangnga.vn
```

Dán nội dung sau vào file (thay `tanhoangnga.vn` bằng tên miền thật của bạn):
```nginx
server {
    listen 80;
    server_name tanhoangnga.vn www.tanhoangnga.vn;

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

    # Giới hạn dung lượng tải file (cho phép upload ảnh lên đến 20MB)
    client_max_body_size 20M;
}
```

### Bước 5.2: Kích hoạt cấu hình & Khởi động lại Nginx
```bash
sudo ln -s /etc/nginx/sites-available/tanhoangnga.vn /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Bước 5.3: Cấp chứng chỉ bảo mật SSL (HTTPS) miễn phí
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d tanhoangnga.vn -d www.tanhoangnga.vn
```
*(Chọn cấu hình tự động chuyển hướng HTTP sang HTTPS 301).*

---

## 6. Kịch Bản Cập Nhật Nhanh (Update / Deployment Script)

Khi có bản cập nhật mới từ GitHub, bạn chỉ cần chạy các lệnh sau trên VPS:

```bash
cd /var/www/tanhoangnga
git pull origin main
npm install
npm run build
pm2 restart tanhoangnga
```

---

## 7. Thông Tin Truy Cập & Quản Trị
- **Trang chủ Website**: `https://tanhoangnga.vn`
- **Cổng Đăng nhập bí mật**: `https://tanhoangnga.vn/auth/login` (hoặc `/login`)
- **Dashboard Quản trị**: `https://tanhoangnga.vn/dashboard`
