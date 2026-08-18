import { NextResponse } from 'next/server';
import { repo } from '@/lib/store/repository';

export async function GET() {
  const settings = repo.getSettings();
  const posts = repo.getPosts({ status: 'PUBLISHED' });

  const content = `# CÔNG TY TNHH TÂN HOÀNG NGA — PORTAL KNOWLEDGE BASE
> Nguồn: Cổng thương hiệu số & Hồ sơ năng lực 2026
> Thông điệp cốt lõi: Kết nối công nghệ — Kiến tạo giá trị — Vươn ra thế giới.

## 1. THÔNG TIN DOANH NGHIỆP
- Tên pháp lý: ${settings.legalName}
- Mã số thuế: ${settings.taxId}
- Địa chỉ: ${settings.address}
- Đại diện: ${settings.representative} (${settings.representativeTitle})
- Hotline: ${settings.phone}
- Quan hệ chiến lược: Đối tác phân phối và triển khai các giải pháp AI hợp tác cùng Công ty Cổ phần ADT Quốc tế (Hợp đồng số 203-140826/ADT).

## 2. BỐN CHƯƠNG TRÌNH GIẢI PHÁP TRỌNG ĐIỂM
1. ADT Govina AI (Phường/Xã): Bộ trợ lý tri thức số cho chính quyền cơ sở với kiến trúc 5 lớp tri thức và mô hình 1+4. Triển khai 3–7 ngày với 80% dữ liệu lõi dùng chung.
2. Orion AI Business OS (Doanh nghiệp): Nền tảng quản trị hợp nhất đa mô hình AI (OpenAI, Claude, Gemini, DeepSeek, Local AI), CRM 360°, CMS, E-commerce, Dự án. Hỗ trợ SaaS Cloud và Self-host.
3. DienBien.Today (Địa phương): Cổng thương hiệu số địa phương tích hợp Trợ lý AI du lịch & xúc tiến đầu tư cho tỉnh Điện Biên (https://dienbien.today/).
4. CoffeeVN.Today (Cà phê B2B): Nền tảng Hộ chiếu số (Coffee Passport), hỗ trợ tuân thủ quy định chống phá rừng EUDR và kết nối B2B trực tiếp từ Vùng trồng đến Buyer quốc tế (https://coffeevn.today/).

## 3. MÔ HÌNH TRIỂN KHAI 6 BƯỚC
1. Khám phá (Discovery)
2. Thiết kế (Design)
3. Chuẩn bị (Preparation)
4. Triển khai (Deployment)
5. Tiếp nhận (Adoption & Customer Success)
6. Mở rộng (Scale & Optimize)

## 4. DANH MỤC BÀI VIẾT & TÀI LIỆU CHÍNH THỨC
${posts.map(p => `- ${p.title}: https://tanhoangnga.vn/bai-viet/${p.slug} (${p.categoryName})`).join('\n')}
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400'
    }
  });
}
