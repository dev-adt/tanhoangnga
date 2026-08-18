# HƯỚNG DẪN TRIỂN KHAI & CẬP NHẬT TÂN HOÀNG NGA LÊN VPS (ZERO-BUILD ON VPS)

Tài liệu này hướng dẫn chi tiết quy trình **Build trực tiếp trên máy của bạn và đẩy bản build lên GitHub**, giúp trên VPS bạn **CHỈ CẦN 2 DÒNG LỆNH** (`git pull` & `pm2 restart`) là cập nhật xong ngay lập tức trong 2 giây, không lo bị tràn RAM hay lỗi build trên VPS!

---

## 1. Ưu Điểm Của Quy Trình Build Sẵn Tại Máy (Local Build -> VPS Pull)
- **Không tốn tài nguyên VPS**: Không lo VPS bị nghẽn CPU hoặc treo tràn RAM khi biên dịch.
- **Không có độ trễ / Downtime**: VPS chỉ nhận các file tĩnh & server đã biên dịch sẵn và nạp lại process trong 1-2 giây.
- **Không lo xung đột môi trường**: Bạn kiểm tra chạy tốt trên máy của mình trước khi đẩy lên.

---

## 2. Các Bước Cài Đặt Môi Trường Trên VPS (Chỉ Cần Làm 1 Lần Đầu Tiên)

### Bước 2.1: Cài đặt Node.js LTS, Nginx & PM2
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git ufw nginx

# Cài đặt Node.js v20.x LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Cài đặt PM2 toàn cục
sudo npm install -g pm2
```

### Bước 2.2: Clone mã nguồn từ GitHub & Cài dependencies
```bash
sudo mkdir -p /var/www/tanhoangnga
sudo chown -R $USER:$USER /var/www/tanhoangnga

git clone https://github.com/dev-adt/tanhoangnga.git /var/www/tanhoangnga
cd /var/www/tanhoangnga

# Cài đặt dependencies (chỉ cần chạy 1 lần)
npm install --omit=dev
```

### Bước 2.3: Khởi chạy PM2
```bash
cd /var/www/tanhoangnga
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### Bước 2.4: Cấu hình Nginx & Cấp SSL Miễn Phí (Certbot)
Tạo file cấu hình Nginx:
```bash
sudo nano /etc/nginx/sites-available/tanhoangnga.vn
```
Dán nội dung cấu hình:
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

    client_max_body_size 25M;
}
```
Kích hoạt và cấp SSL HTTPS:
```bash
sudo ln -s /etc/nginx/sites-available/tanhoangnga.vn /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Cấp chứng chỉ SSL HTTPS tự động
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d tanhoangnga.vn -d www.tanhoangnga.vn
```

---

## 3. QUY TRÌNH CẬP NHẬT CODE SAU NÀY (CỰC KỲ ĐƠN GIẢN)

### 👉 Trên máy tính của bạn (Local):
Mỗi khi chỉnh sửa xong code, bạn chỉ cần chạy lệnh sau trên terminal máy tính:
```bash
# 1 Lệnh tự động build và push toàn bộ lên GitHub:
npm run ship
```
*(Lệnh này sẽ tự động: `next build` -> `git add .` -> `git commit` -> `git push origin main`)*

---

### 👉 Trên VPS:
Mở terminal VPS và chạy đúng **2 lệnh**:
```bash
cd /var/www/tanhoangnga
git pull origin main
pm2 restart tanhoangnga
```

⚡ **Xong!** Website trên VPS đã được cập nhật bản mới nhất ngay lập tức mà không cần build lại trên VPS!

---

## 4. Quản Lý & Kiểm Tra Trạng Thái Vận Hành
- `pm2 status`: Xem trạng thái chạy của ứng dụng.
- `pm2 logs tanhoangnga`: Xem log hệ thống thời gian thực.
- `pm2 restart tanhoangnga`: Khởi động lại ứng dụng khi cần.
- **Trang chủ**: `https://tanhoangnga.vn`
- **Cổng Đăng nhập bí mật**: `https://tanhoangnga.vn/auth/login`
- **Dashboard Quản trị**: `https://tanhoangnga.vn/dashboard`
