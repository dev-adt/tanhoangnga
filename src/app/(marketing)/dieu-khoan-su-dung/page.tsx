import React from 'react';
import Link from 'next/link';
import { FileText, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Điều Khoản Sử Dụng — Tân Hoàng Nga',
  description: 'Điều khoản sử dụng website, quyền sở hữu trí tuệ và tuyên bố miễn trừ trách nhiệm của Công ty TNHH Tân Hoàng Nga.'
};

export default function TermsOfUsePage() {
  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="space-y-4">
          <div className="text-xs font-semibold text-brand-600 uppercase tracking-wider">
            <Link href="/" className="hover:underline">Trang chủ</Link> / Điều khoản sử dụng
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-navy-text tracking-tight">
            Điều Khoản Sử Dụng & Tuyên Bố Pháp Lý
          </h1>
          <p className="text-xs text-slate-500">Cập nhật lần cuối: Ngày 18 tháng 08 năm 2026</p>
        </div>

        <div className="prose prose-slate max-w-none text-slate-700 space-y-8 text-sm sm:text-base [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-navy-text [&>h2]:mt-8 [&>h2]:mb-3 [&>p]:leading-relaxed [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1.5">
          
          <section>
            <h2>1. Chấp thuận điều khoản</h2>
            <p>Bằng việc truy cập và sử dụng website của Công ty TNHH Tân Hoàng Nga, Quý khách đồng ý tuân thủ các điều khoản và điều kiện được nêu tại đây.</p>
          </section>

          <section>
            <h2>2. Quyền sở hữu trí tuệ</h2>
            <p>Toàn bộ nội dung, hình ảnh, văn bản, giao diện, cấu trúc thông tin trên website thuộc quyền sở hữu của Công ty TNHH Tân Hoàng Nga hoặc các đối tác công nghệ có thỏa thuận (như Công ty Cổ phần ADT Quốc tế theo Hợp đồng số 203-140826/ADT).</p>
            <p>Mọi hành vi sao chép, phân phối hoặc khai thác thương mại mà không có sự đồng ý bằng văn bản của Tân Hoàng Nga đều là vi phạm pháp luật sở hữu trí tuệ.</p>
          </section>

          <section>
            <h2>3. Tuyên bố giới hạn & Miễn trừ trách nhiệm</h2>
            <p>Tài liệu và thông tin trên website phục vụ mục đích giới thiệu năng lực doanh nghiệp và định hướng hợp tác. Các mô tả tính năng, lộ trình và chỉ tiêu định lượng có thể được điều chỉnh theo hợp đồng kinh tế và khảo sát thực địa cụ thể.</p>
            <p>Nội dung liên quan pháp luật, quy trình thủ tục hành chính, quy hoạch hoặc tiêu chuẩn xuất khẩu trên website không thay thế cho các văn bản chính thức của cơ quan nhà nước có thẩm quyền.</p>
          </section>

          <section>
            <h2>4. Điều chỉnh điều khoản</h2>
            <p>Tân Hoàng Nga có quyền cập nhật, thay đổi nội dung điều khoản sử dụng bất kỳ lúc nào để phù hợp với quy định pháp luật hiện hành và hoạt động kinh doanh.</p>
          </section>

        </div>

      </div>
    </div>
  );
}
