import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Eye, CheckCircle2, FileText, AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'Chính Sách Bảo Mật & Dữ Liệu — Tân Hoàng Nga',
  description: 'Chính sách bảo mật thông tin, cam kết chủ quyền dữ liệu và nguyên tắc AI có trách nhiệm của Công ty TNHH Tân Hoàng Nga.'
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="space-y-4">
          <div className="text-xs font-semibold text-brand-600 uppercase tracking-wider">
            <Link href="/" className="hover:underline">Trang chủ</Link> / Chính sách bảo mật
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-navy-text tracking-tight">
            Chính Sách Bảo Mật Thông Tin & Cam Kết Dữ Liệu
          </h1>
          <p className="text-xs text-slate-500">Cập nhật lần cuối: Ngày 18 tháng 08 năm 2026</p>
        </div>

        <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-900 leading-relaxed space-y-2">
          <div className="font-bold flex items-center gap-2 text-emerald-800">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Cam kết chủ quyền dữ liệu của Công ty TNHH Tân Hoàng Nga</span>
          </div>
          <p>
            Tân Hoàng Nga tôn trọng quyền sở hữu dữ liệu của khách hàng. Chúng tôi cam kết không tự ý thu thập, sử dụng hoặc chuyển giao dữ liệu nghiệp vụ của cơ quan, doanh nghiệp cho bất kỳ bên thứ ba nào khi chưa có sự chấp thuận bằng văn bản.
          </p>
        </div>

        <div className="prose prose-slate max-w-none text-slate-700 space-y-8 text-sm sm:text-base [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-navy-text [&>h2]:mt-8 [&>h2]:mb-3 [&>p]:leading-relaxed [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1.5">
          
          <section>
            <h2>1. Mục đích thu thập thông tin</h2>
            <p>Thông tin thu thập thông qua biểu mẫu liên hệ, đăng ký tư vấn và khảo sát nhu cầu (Họ tên, Đơn vị công tác, Số điện thoại, Email, Nội dung nhu cầu) chỉ được sử dụng cho các mục đích:</p>
            <ul>
              <li>Liên hệ phản hồi, giải đáp thắc mắc và tư vấn giải pháp kỹ thuật.</li>
              <li>Xếp lịch khảo sát thực địa, chuẩn bị đề xuất kỹ thuật và báo giá.</li>
              <li>Gửi tài liệu giới thiệu sản phẩm và thông báo cập nhật tính năng (nếu có sự đồng ý của khách hàng).</li>
            </ul>
          </section>

          <section>
            <h2>2. Nguyên tắc AI Có Trách Nhiệm (Responsible AI)</h2>
            <p>Tân Hoàng Nga tuân thủ nghiêm ngặt 5 nguyên tắc ứng dụng AI trong mọi dự án triển khai:</p>
            <ul>
              <li><strong>Con người giữ quyền quyết định:</strong> Nội dung do AI tạo ra đóng vai trò hỗ trợ tra cứu, gợi ý và tổng hợp thông tin; quyết định hành chính và nghiệp vụ luôn do người có thẩm quyền ban hành.</li>
              <li><strong>Chỉ sử dụng dữ liệu hợp pháp:</strong> Chỉ nạp vào hệ thống các tài liệu, văn bản đã được phép công bố hoặc đã được khách hàng phê duyệt quyền sử dụng.</li>
              <li><strong>Minh bạch nguồn gốc:</strong> Mọi câu trả lời quan trọng đều kèm theo căn cứ điều khoản, trích dẫn văn bản để đối chiếu.</li>
              <li><strong>Phân quyền & Kiểm soát truy cập:</strong> Dữ liệu mật, thông tin cá nhân nhạy cảm tuyệt đối không được đưa vào kho tri thức chung.</li>
              <li><strong>Ghi nhật ký kiểm toán:</strong> Mọi truy vấn và chỉnh sửa dữ liệu hệ thống đều được lưu vết trong Audit Log để phục vụ giám sát.</li>
            </ul>
          </section>

          <section>
            <h2>3. Tùy chọn lưu trữ Cloud và Self-host</h2>
            <p>Đối với các cơ quan nhà nước và doanh nghiệp có yêu cầu an ninh mạng nghiêm ngặt, chúng tôi cung cấp giải pháp triển khai Self-host trên cụm máy chủ nội bộ. Toàn bộ cơ sở dữ liệu và kho tài liệu được đặt hoàn toàn trong hạ tầng do khách hàng kiểm soát.</p>
          </section>

          <section>
            <h2>4. Liên hệ bộ phận bảo mật dữ liệu</h2>
            <p>Mọi thắc mắc hoặc yêu cầu xóa dữ liệu cá nhân đã gửi, Quý khách vui lòng liên hệ:</p>
            <p>
              <strong>CÔNG TY TNHH TÂN HOÀNG NGA</strong><br />
              Địa chỉ: Số 10, ngõ 1194 đường Láng, Phường Láng, TP. Hà Nội<br />
              Điện thoại: 0856 040 205 — Email: contact@tanhoangnga.vn
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
