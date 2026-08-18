import React from 'react';
import Link from 'next/link';
import { Server, Cpu, Database, ShieldCheck, CheckCircle2, ArrowRight, Layers, Users, Zap, LayoutGrid } from 'lucide-react';
import { FaqAccordion } from '@/components/marketing/FaqAccordion';
import { LeadForm } from '@/components/marketing/LeadForm';
import { getServiceSchema } from '@/lib/seo/schema';

export const metadata = {
  title: 'Orion AI Business OS — Nền Tảng Quản Trị Doanh Nghiệp Multi-Model AI | Tân Hoàng Nga',
  description: 'Hợp nhất CRM, CMS, E-commerce, Dự án và AI Router thông minh trên kiến trúc Core-to-Orbit. Hỗ trợ SaaS Cloud và Self-host.'
};

export default function OrionOsPage() {
  const serviceSchema = getServiceSchema(
    'Orion AI Business OS',
    'Nền tảng quản trị doanh nghiệp hợp nhất tích hợp Multi-Model AI Router và 5 phân hệ vận hành.',
    'https://tanhoangnga.vn/giai-phap/orion-ai-business-os'
  );

  const modules = [
    {
      title: 'CRM 360° & CSKH',
      desc: 'Thu lead từ form đa kênh, hồ sơ khách hàng 360 độ, lịch sử mua hàng, live chat AI và phân công chăm sóc tự động.'
    },
    {
      title: 'E-commerce Đa Kênh',
      desc: 'Quản lý danh mục, giỏ hàng, khuyến mại thông minh, checkout, tích hợp VietQR, VNPay, COD và đồng bộ tồn kho.'
    },
    {
      title: 'CMS Page Builder & SEO',
      desc: 'Trình dựng trang kéo thả, quản lý nội dung đa ngôn ngữ, lập lịch xuất bản, chuẩn SEO/GEO và phân quyền tác giả.'
    },
    {
      title: 'Quản Trị Dự Án',
      desc: 'Theo dõi tiến độ theo Kanban/Gantt, phân bổ ngân sách, nhật ký công việc, phân vai và báo cáo hiệu suất real-time.'
    },
    {
      title: 'Quy Trình Phê Duyệt AI',
      desc: 'Tự động trích xuất, tóm tắt đề xuất công việc, văn bản ký duyệt và chuyển đến cấp quản lý có thẩm quyền.'
    }
  ];

  const differentiators = [
    'Tập trung tất cả nghiệp vụ trên một nền tảng duy nhất, xoá bỏ điểm mù dữ liệu.',
    'Bộ định tuyến AI Router đa mô hình (OpenAI, Claude, Gemini, DeepSeek, Local AI) tối ưu chi phí và tự động fallback.',
    'Phân quyền ma trận 7 vai trò chặt chẽ (Admin, Web Designer, Sales/CSKH, Nội bộ, Kế toán, Đối tác, Khách hàng).',
    'Sẵn sàng triển khai Self-host trên máy chủ riêng của doanh nghiệp (MinIO/S3, PostgreSQL) để làm chủ dữ liệu.',
    'Kiến trúc mô-đun hoá Core-to-Orbit linh hoạt mở rộng theo từng giai đoạn tăng trưởng của doanh nghiệp.'
  ];

  const faqs = [
    {
      question: 'Doanh nghiệp có thể bắt đầu với 1 phân hệ như CRM hay CMS trước không?',
      answer: 'Có. Nhờ kiến trúc Core-to-Orbit, doanh nghiệp có thể kích hoạt từng phân hệ theo nhu cầu trước mắt (ví dụ CRM hoặc CMS) rồi mở rộng dần mà không lo bị phân mảnh dữ liệu.'
    },
    {
      question: 'Orion hỗ trợ phương thức triển khai nào?',
      answer: 'Orion hỗ trợ cả 2 mô hình: SaaS Cloud tiện lợi trên hạ tầng bảo mật cao, và On-Premise / Self-host trên cụm máy chủ nội bộ dành cho các doanh nghiệp có yêu cầu tuân thủ dữ liệu nghiêm ngặt.'
    },
    {
      question: 'Bộ định tuyến AI Router giúp tiết kiệm chi phí như thế nào?',
      answer: 'Hệ thống tự động phân loại tác vụ: các yêu cầu cơ bản được chuyển tới các model AI siêu nhanh chi phí thấp; các yêu cầu phân tích dữ liệu phức tạp mới chuyển sang model suy luận cao cấp, giúp tiết kiệm tới 60% chi phí token so với thông thường.'
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
            <Link href="/" className="hover:underline">Trang chủ</Link> / <Link href="/giai-phap" className="hover:underline">Giải pháp</Link> / Orion AI Business OS
          </div>
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 text-cyan-700 text-xs font-extrabold uppercase tracking-wider">
            <Server className="w-4 h-4" />
            <span>Dành cho Doanh nghiệp & SME</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-navy-text tracking-tight leading-tight">
            Orion AI Business OS — Hợp Nhất Vận Hành & AI Đa Mô Hình
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Chấm dứt việc ghép nối rời rạc 5–10 phần mềm độc lập. Orion mang lại trải nghiệm điều hành doanh nghiệp thống nhất trên kiến trúc Core-to-Orbit với AI Router thông minh và tùy chọn Self-host toàn quyền dữ liệu.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <a
              href="#register"
              className="px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-600 to-brand-600 hover:shadow-glow transition-all"
            >
              Đăng ký Tư vấn & Báo giá Doanh nghiệp
            </a>
            <Link
              href="/bai-viet/orion-ai-business-os-he-dieu-hanh-doanh-nghiep"
              className="px-6 py-3.5 rounded-xl font-bold text-navy-text bg-white border border-slate-200 hover:bg-slate-50 transition-all flex items-center gap-1.5"
            >
              <span>Xem tài liệu kiến trúc</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Core-to-Orbit Concept Box */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-navy-card via-slate-900 to-navy-dark text-white shadow-xl border border-slate-800 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <div className="text-xs font-bold text-cyan-accent uppercase tracking-wider">Kiến trúc đột phá</div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Kiến Trúc Core-to-Orbit</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Lõi trung tâm của Orion chứa Data Layer chuẩn hoá và bộ định tuyến AI Multi-Model Router. Xung quanh là 5 phân hệ vận hành xoay quanh một nguồn dữ liệu duy nhất (Single Source of Truth), giúp doanh nghiệp xóa bỏ hoàn toàn tình trạng đồng bộ dữ liệu thủ công hay ốc đảo thông tin.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3 text-xs">
            <div className="flex items-center gap-3 text-cyan-accent font-bold pb-2 border-b border-slate-700">
              <Zap className="w-4 h-4" />
              <span>Multi-Model AI Router: Tối ưu chi phí & Fallback tự động</span>
            </div>
            <p className="text-slate-300">
              Hỗ trợ tích hợp song song các mô hình hàng đầu: OpenAI GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, DeepSeek V3 và Local LLM (Ollama/vLLM). Tự động chuyển đổi khi nhà cung cấp gặp sự cố kết nối.
            </p>
          </div>
        </div>

        {/* 5 Operational Modules */}
        <div className="space-y-8">
          <div className="max-w-2xl">
            <div className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">Hệ sinh thái phân hệ</div>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-text">5 Phân Hệ Vận Hành Cốt Lõi</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((m, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-cyan-300 hover:shadow-card-hover transition-all">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold mb-4">
                  {i + 1}
                </div>
                <h3 className="text-base font-bold text-navy-text mb-2">{m.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 5 Differentiators */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 space-y-6">
          <h3 className="text-xl font-bold text-navy-text">5 Khác Biệt Cốt Lõi Của Orion</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {differentiators.map((d, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <span>{d}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <FaqAccordion faqs={faqs} title="Câu Hỏi Thường Gặp Về Orion AI Business OS" />

        {/* CTA Lead Form */}
        <div id="register" className="max-w-3xl mx-auto pt-6">
          <LeadForm 
            defaultSolution="orion-ai-business-os"
            title="Đăng Ký Tư Vấn & Demo Orion OS"
            subtitle="Giải pháp quản trị toàn diện cho doanh nghiệp từ 10 đến 500+ nhân sự"
          />
        </div>

      </div>
    </div>
  );
}
