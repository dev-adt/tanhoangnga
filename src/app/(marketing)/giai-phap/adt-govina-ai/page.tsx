import React from 'react';
import Link from 'next/link';
import { Cpu, ShieldCheck, Layers, Award, CheckCircle2, ArrowRight, Clock, FileText, AlertCircle, Sparkles } from 'lucide-react';
import { FaqAccordion } from '@/components/marketing/FaqAccordion';
import { LeadForm } from '@/components/marketing/LeadForm';
import { getServiceSchema } from '@/lib/seo/schema';

export const metadata = {
  title: 'ADT Govina AI — Bộ Trợ Lý AI Dành Cho Phường, Xã | Tân Hoàng Nga',
  description: 'Giải pháp cấu trúc 5 lớp tri thức và mô hình 1+4 giúp cán bộ cơ sở tra cứu nhanh, chuẩn xác quy định pháp luật và nâng cao chất lượng phục vụ nhân dân.'
};

export default function GovinaAiPage() {
  const serviceSchema = getServiceSchema(
    'ADT Govina AI — Bộ Trợ Lý AI Phường Xã',
    'Giải pháp trợ lý tri thức số và tra cứu văn bản hành chính 5 lớp tri thức cho chính quyền cơ sở.',
    'https://tanhoangnga.vn/giai-phap/adt-govina-ai'
  );

  const knowledgeLayers = [
    { num: 'Lớp 1', title: 'Văn bản Trung ương', desc: 'Luật, Nghị quyết Quốc hội, Nghị định Chính phủ, Thông tư bộ ngành.' },
    { num: 'Lớp 2', title: 'Văn bản Tỉnh / Thành phố', desc: 'Quyết định, Chỉ thị, Kế hoạch của UBND & Sở chuyên môn cấp tỉnh.' },
    { num: 'Lớp 3', title: 'Văn bản Phường / Xã', desc: 'Văn bản chỉ đạo điều hành do cấp phường/xã ban hành hoặc được phép áp dụng.' },
    { num: 'Lớp 4', title: 'Quy trình & Biểu mẫu nội bộ', desc: 'Quy chế làm việc, hướng dẫn nghiệp vụ, biểu mẫu hồ sơ theo phân quyền.' },
    { num: 'Lớp 5', title: 'Chỉ mục & Logic xử lý', desc: 'Indexing, cập nhật dữ liệu tự động, liên kết điều khoản và đối chiếu căn cứ.' }
  ];

  const assistantRoles = [
    { title: 'Trợ lý Tổng hợp', desc: 'Dùng chung cho toàn cơ quan: Lịch công tác, phân luồng văn bản, quy chế nội bộ và báo cáo nhanh.' },
    { title: 'Trợ lý HĐND — UBND', desc: 'Tổng hợp ý kiến cử tri, biên bản kỳ họp, theo dõi tiến độ thực hiện nghị quyết và nhiệm vụ giao.' },
    { title: 'Trợ lý Khối Kinh tế', desc: 'Tra cứu thủ tục đăng ký kinh doanh hộ gia đình, thuế, quản lý tài chính - ngân sách và chợ.' },
    { title: 'Trợ lý Văn hóa — Xã hội', desc: 'Chế độ chính sách người có công, bảo trợ xã hội, y tế, giáo dục, hộ tịch và chứng thực.' },
    { title: 'Trợ lý Hạ tầng — Đô thị', desc: 'Quản lý trật tự xây dựng, địa chính, tài nguyên môi trường, cấp phép và quản lý đất đai.' }
  ];

  const faqs = [
    {
      question: 'ADT Govina AI có thay thế cán bộ đưa ra quyết định hành chính không?',
      answer: 'Không. Hệ thống đóng vai trò trợ lý hỗ trợ tra cứu căn cứ, tìm biểu mẫu và gợi ý đối chiếu nhanh. Mọi quyết định hành chính thuộc thẩm quyền và trách nhiệm của cán bộ và cơ quan nhà nước theo quy định pháp luật.'
    },
    {
      question: 'Thời gian triển khai cho một phường/xã mất bao lâu?',
      answer: 'Nhờ 80% kho dữ liệu lõi dùng chung (Luật, Nghị định, Thông tư) đã được chuẩn hóa sẵn, thời gian thu thập 20% dữ liệu đặc thù địa phương, cấu hình và đào tạo cán bộ thông thường diễn ra trong 3 đến 7 ngày làm việc.'
    },
    {
      question: 'Hệ thống có an toàn đối với dữ liệu nội bộ không?',
      answer: 'Hệ thống tuân thủ chặt chẽ nguyên tắc bảo mật và phân quyền truy cập. Các văn bản mật, tài liệu chưa được phép công bố hoặc dữ liệu nhạy cảm không được đưa vào kho tri thức chung.'
    },
    {
      question: 'Các minh chứng thực tế về hiệu quả của Govina AI là gì?',
      answer: 'Theo hồ sơ sản phẩm, case study Phường Ô Chợ Dừa (Hà Nội) áp dụng từ 10/10/2025 đã đạt 94,73 điểm và xếp thứ 1/126 đơn vị trong đánh giá CCHC; giải pháp đạt Giải Nhì cuộc thi Ý tưởng CCHC Hà Nội lần II (2025) và được cấp Giấy chứng nhận Quyền tác giả số 3794/2026/QTG.'
    }
  ];

  return (
    <div className="py-12 lg:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Breadcrumb & Hero */}
        <div className="max-w-4xl space-y-6">
          <div className="text-xs font-semibold text-brand-600 uppercase tracking-wider">
            <Link href="/" className="hover:underline">Trang chủ</Link> / <Link href="/giai-phap" className="hover:underline">Giải pháp</Link> / ADT Govina AI
          </div>
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-extrabold uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            <span>Dành cho Chính quyền cơ sở</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-navy-text tracking-tight leading-tight">
            ADT Govina AI — Bộ Trợ Lý Tri Thức Số Dành Cho Phường, Xã
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Rút ngắn thời gian tra cứu từ hàng giờ xuống vài giây; đối chiếu căn cứ pháp lý chính xác; giảm áp lực công việc cho cán bộ chuyên môn và giúp người dân tiếp cận hướng dẫn thủ tục nhất quán, minh bạch.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <a
              href="#register"
              className="px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-brand-600 to-cyan-500 hover:shadow-glow transition-all"
            >
              Đăng ký Demo & Khảo sát Phường/Xã
            </a>
            <Link
              href="/bai-viet/adt-govina-ai-tro-ly-tri-thuc-so-phuong-xa"
              className="px-6 py-3.5 rounded-xl font-bold text-navy-text bg-white border border-slate-200 hover:bg-slate-50 transition-all flex items-center gap-1.5"
            >
              <span>Đọc bài phân tích chuyên sâu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 5 Knowledge Layers */}
        <div className="space-y-8">
          <div className="max-w-2xl">
            <div className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">Kiến trúc công nghệ</div>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-text">5 Lớp Tri Thức Chuẩn Hóa</h2>
            <p className="text-sm text-slate-600 mt-2">Dữ liệu được tổ chức theo cấp bậc pháp lý nghiêm ngặt, đảm bảo trích dẫn chính xác nguồn gốc văn bản.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {knowledgeLayers.map((layer, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-brand-600 px-2 py-0.5 rounded bg-brand-50 inline-block mb-2">
                    {layer.num}
                  </span>
                  <h3 className="text-sm font-bold text-navy-text mb-1.5">{layer.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{layer.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 1+4 Model Structure */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200 space-y-8">
          <div className="max-w-2xl">
            <div className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">Mô hình vận hành</div>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-text">Cấu Trúc Mô Hình 1 + 4</h2>
            <p className="text-sm text-slate-600 mt-2">1 Trợ lý điều hành tổng hợp kết hợp cùng 4 nhóm trợ lý chuyên môn bám sát cơ cấu tổ chức UBND phường/xã.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assistantRoles.map((role, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold mb-3">
                  {idx === 0 ? '★' : idx}
                </div>
                <h3 className="text-base font-bold text-navy-text mb-1">{role.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{role.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Deployment Model: 80/20 & Timeframe */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase">
              <Clock className="w-3.5 h-3.5" />
              <span>Tiến độ thần tốc</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-text">
              Triển Khai Nhanh Chóng Trong 3–7 Ngày
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Theo quy trình chuẩn, <strong>80% dữ liệu lõi</strong> (Luật, Nghị định, Thông tư của các Bộ ngành) đã được ADT và Tân Hoàng Nga tổ chức sẵn. Địa phương chỉ cần cung cấp <strong>20% dữ liệu đặc thù</strong> (quy chế, văn bản của tỉnh/quận/phường) để tinh chỉnh hệ thống.
            </p>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Nguyên tắc AI có trách nhiệm:</strong> Nội dung AI đóng vai trò tham khảo và đối chiếu căn cứ, không phải quyết định hành chính và không thay thế thẩm quyền của cán bộ.
              </span>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-gradient-to-br from-navy-card to-slate-900 text-white shadow-xl border border-slate-700 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-mint-accent" />
              <span>Minh Chứng & Quyền Tác Giả</span>
            </h3>
            <div className="space-y-4 text-xs text-slate-300">
              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
                <span className="font-bold text-cyan-accent block mb-1">Case study Phường Ô Chợ Dừa (Hà Nội):</span>
                <span>Triển khai từ 10/10/2025, đạt 94,73 điểm và xếp thứ 1/126 trong nhóm đánh giá chỉ số CCHC.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
                <span className="font-bold text-cyan-accent block mb-1">Giải Nhì Cải cách hành chính Hà Nội 2025:</span>
                <span>Bộ đôi Trợ lý AI phường/xã xuất sắc đạt Giải Nhì trong khoảng 1.200 đề tài dự thi toàn thành phố.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
                <span className="font-bold text-mint-accent block mb-1">Bản quyền phần mềm chính thức:</span>
                <span>Giấy chứng nhận đăng ký Quyền tác giả số <strong>3794/2026/QTG</strong> ngày 16/04/2026 thuộc sở hữu của ADT.</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <FaqAccordion faqs={faqs} title="Câu Hỏi Thường Gặp Về ADT Govina AI" />

        {/* CTA Lead Form */}
        <div id="register" className="max-w-3xl mx-auto pt-6">
          <LeadForm 
            defaultSolution="adt-govina-ai"
            title="Đăng Ký Khảo Sát & Demo ADT Govina AI"
            subtitle="Dành cho UBND các Phường, Xã và Cơ quan hành chính cơ sở"
          />
        </div>

      </div>
    </div>
  );
}
