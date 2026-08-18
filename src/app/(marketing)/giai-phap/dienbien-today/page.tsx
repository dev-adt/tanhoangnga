import React from 'react';
import Link from 'next/link';
import { MapPin, Globe, Sparkles, Compass, CheckCircle2, ArrowRight, ExternalLink, Building, Landmark, Mountain } from 'lucide-react';
import { FaqAccordion } from '@/components/marketing/FaqAccordion';
import { LeadForm } from '@/components/marketing/LeadForm';
import { getServiceSchema } from '@/lib/seo/schema';

export const metadata = {
  title: 'DienBien.Today — Cổng Thương Hiệu Số & Trợ Lý AI Địa Phương | Tân Hoàng Nga',
  description: 'Nền tảng thương hiệu số địa phương tích hợp AI, kết nối di sản lịch sử, du lịch Điện Biên, đặc sản OCOP và xúc tiến đầu tư ra thế giới.'
};

export default function DienBienTodayPage() {
  const serviceSchema = getServiceSchema(
    'DienBien.Today — Nền Tảng Thương Hiệu Số Địa Phương',
    'Cổng thương hiệu số địa phương tích hợp Trợ lý AI du lịch, bản đồ OCOP và danh mục xúc tiến đầu tư tỉnh Điện Biên.',
    'https://tanhoangnga.vn/giai-phap/dienbien-today'
  );

  const components = [
    {
      title: 'Cổng Thông Tin & Dữ Liệu Mở',
      icon: Landmark,
      desc: 'Tập hợp dữ liệu số hóa chính thống về lịch sử, văn hóa 19 dân tộc anh em và các điểm truy cập phục vụ chuyển đổi số địa phương.'
    },
    {
      title: 'Hệ Sinh Thái Doanh Nghiệp & OCOP',
      icon: Building,
      desc: 'Hồ sơ số hóa cho doanh nghiệp địa phương, gian hàng quảng bá đặc sản Tây Bắc, gạo Điện Biên, chè Shan tuyết, cà phê Mường Ảng.'
    },
    {
      title: 'Du Lịch, Lễ Hội & Bản Sắc',
      icon: Mountain,
      desc: 'Cẩm nang điểm đến di tích Điện Biên Phủ, du lịch sinh thái cộng đồng, lễ hội hoa Ban và lịch trình tour cá nhân hóa.'
    },
    {
      title: 'Xúc Tiến Đầu Tư & Dự Án',
      icon: Compass,
      desc: 'Bản đồ cơ hội đầu tư, danh mục dự án trọng điểm, chính sách ưu đãi của tỉnh và công cụ kết nối đối tác trực tuyến.'
    },
    {
      title: 'Cộng Đồng Điện Biên Toàn Cầu',
      icon: Globe,
      desc: 'Mạng lưới kết nối chuyên gia, nghệ nhân, doanh nhân kiều bào và người con Điện Biên xa quê cùng đóng góp xây dựng quê hương.'
    }
  ];

  const faqs = [
    {
      question: 'Trợ lý AI DienBien.Today hỗ trợ du khách như thế nào?',
      answer: 'Trợ lý AI có thể tự động lập lịch trình tour 2 ngày 1 đêm hoặc 3 ngày 2 đêm theo sở thích (lịch sử, khám phá, ẩm thực), ngân sách và số lượng người, đồng thời gợi ý cơ sở lưu trú, phương tiện di chuyển và nhà hàng uy tín.'
    },
    {
      question: 'Doanh nghiệp và HTX tại Điện Biên có thể đưa sản phẩm OCOP lên nền tảng không?',
      answer: 'Có. DienBien.Today cung cấp gian hàng số miễn phí/ưu đãi cho các doanh nghiệp, HTX địa phương để số hóa hồ sơ sản phẩm, giấy chứng nhận OCOP và kết nối với người tiêu dùng trên toàn quốc.'
    },
    {
      question: 'Nền tảng có hỗ trợ khách quốc tế không?',
      answer: 'Có. DienBien.Today được thiết kế kiến trúc mở, hỗ trợ giao diện và trợ lý AI đa ngôn ngữ (Tiếng Anh, Tiếng Pháp, Tiếng Trung) nhằm phục vụ du khách và nhà đầu tư quốc tế qua cửa khẩu Tây Trang.'
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
            <Link href="/" className="hover:underline">Trang chủ</Link> / <Link href="/giai-phap" className="hover:underline">Giải pháp</Link> / DienBien.Today
          </div>
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-extrabold uppercase tracking-wider">
            <MapPin className="w-4 h-4" />
            <span>Thương Hiệu Số Địa Phương</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-navy-text tracking-tight leading-tight">
            DienBien.Today — Kết Nối Điện Biên Với Việt Nam Và Thế Giới
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Nền tảng thương hiệu số địa phương tích hợp Trợ lý AI, kết nối di sản lịch sử hào hùng, du lịch bản địa, đặc sản OCOP và các cơ hội xúc tiến đầu tư trên một địa chỉ số duy nhất: <strong>dienbien.today</strong>.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 items-center">
            <a
              href="https://dienbien.today/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:shadow-glow transition-all flex items-center gap-2"
            >
              <span>Truy cập DienBien.Today</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="#register"
              className="px-6 py-3.5 rounded-xl font-bold text-navy-text bg-white border border-slate-200 hover:bg-slate-50 transition-all"
            >
              Đăng ký Hợp tác Địa phương
            </a>
          </div>
        </div>

        {/* 5 Structural Components */}
        <div className="space-y-8">
          <div className="max-w-2xl">
            <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">Cấu phần hệ sinh thái</div>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-text">Một Nền Tảng — Nhiều Giá Trị</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {components.map((comp, i) => (
              <div key={i} className="p-7 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-emerald-300 hover:shadow-card-hover transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                    <comp.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-navy-text mb-2">{comp.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{comp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Travel & Investment Showcase */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 to-navy-dark text-white border border-slate-800 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-mint-accent text-xs font-bold uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Trái tim hệ sinh thái</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Trợ Lý AI Điện Biên 24/7</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Trợ lý AI được huấn luyện trên nguồn dữ liệu mở đã được xác minh của địa phương. Không chỉ giải đáp các câu hỏi thường gặp, AI còn đồng hành thiết kế lịch trình cá nhân hóa, giới thiệu câu chuyện di tích lịch sử và hỗ trợ nhà đầu tư tiếp cận hồ sơ dự án nhanh chóng.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3 text-xs">
            <div className="text-cyan-accent font-bold pb-2 border-b border-slate-700 flex items-center justify-between">
              <span>Ví dụ câu lệnh tương tác thực tế</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300">Live AI</span>
            </div>
            <p className="text-slate-300 italic">
              "Lên cho tôi lịch trình 2 ngày 1 đêm thăm di tích Điện Biên Phủ và trải nghiệm bản du lịch cộng đồng Mường Phăng cho gia đình 4 người với ngân sách vừa phải."
            </p>
            <p className="text-slate-400 text-[11px]">
              → AI tự động trích xuất thông tin, tính toán thời gian di chuyển, đề xuất cung đường tối ưu và cung cấp số điện thoại cơ sở lưu trú đạt chuẩn.
            </p>
          </div>
        </div>

        {/* FAQs */}
        <FaqAccordion faqs={faqs} title="Câu Hỏi Thường Gặp Về DienBien.Today" />

        {/* CTA Lead Form */}
        <div id="register" className="max-w-3xl mx-auto pt-6">
          <LeadForm 
            defaultSolution="dienbien-today"
            title="Đăng Ký Tham Gia Hệ Sinh Thái DienBien.Today"
            subtitle="Dành cho các cơ quan quản lý, doanh nghiệp du lịch, HTX OCOP và nhà đầu tư"
          />
        </div>

      </div>
    </div>
  );
}
