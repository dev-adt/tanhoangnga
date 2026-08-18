import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, ArrowRight, ShieldCheck, Cpu, Server, 
  MapPin, Coffee, CheckCircle2, TrendingUp, Users, 
  Layers, Lock, FileCheck, Award
} from 'lucide-react';
import { HeroOrbit } from '@/components/marketing/HeroOrbit';
import { HeroTypewriterTitle } from '@/components/marketing/HeroTypewriterTitle';
import { ProcessTimeline } from '@/components/marketing/ProcessTimeline';
import { AdtPartnerSection } from '@/components/marketing/AdtPartnerSection';
import { PinnedArticlesSection } from '@/components/marketing/PinnedArticlesSection';
import { LeadForm } from '@/components/marketing/LeadForm';
import { repo } from '@/lib/store/repository';

export default function HomePage() {
  const featuredPosts = repo.getHomepageFeaturedPosts();

  const trustBadges = [
    { title: 'AI Thực Tế & Trách Nhiệm', desc: 'Bắt đầu từ bài toán, đo bằng mức độ sử dụng', icon: Cpu },
    { title: 'Chủ Quyền Dữ Liệu', desc: 'Khách hàng toàn quyền sở hữu và bảo mật dữ liệu', icon: Lock },
    { title: 'Đồng Hành Đến Adoption', desc: 'Đào tạo và hỗ trợ tuyến đầu sau bàn giao', icon: Users },
    { title: 'Hợp Tác Chiến Lược ADT', desc: 'Hợp đồng số 203-140826/ADT minh bạch phân vai', icon: ShieldCheck }
  ];

  const solutions = [
    {
      id: 'govina',
      title: 'ADT Govina AI',
      subtitle: 'Bộ Trợ lý AI dành cho Phường / Xã',
      target: 'Chính quyền cơ sở & Cán bộ chuyên môn',
      badge: '5 Lớp Tri Thức • Mô Hình 1+4',
      desc: 'Công cụ hỗ trợ tra cứu, tổng hợp và hướng dẫn thủ tục dựa trên kho tri thức chuẩn hóa; giảm thời gian tìm kiếm văn bản và nâng cao độ chính xác trong phục vụ người dân.',
      highlights: [
        'Kho tri thức 5 lớp từ Trung ương đến văn bản đặc thù địa phương',
        'Cấu trúc 1 Trợ lý chung + 4 Trợ lý chuyên môn theo phòng ban',
        '80% dữ liệu lõi dùng chung, chỉ cần 3-7 ngày triển khai',
        'Minh chứng: Phường Ô Chợ Dừa xếp 1/126 CCHC Hà Nội; QTG số 3794/2026/QTG'
      ],
      href: '/giai-phap/adt-govina-ai',
      icon: Cpu,
      gradient: 'from-blue-600 to-cyan-500',
      btnText: 'Khám phá Govina AI'
    },
    {
      id: 'orion',
      title: 'Orion AI Business OS',
      subtitle: 'Hệ điều hành Doanh nghiệp Đa mô hình AI',
      target: 'Doanh nghiệp & Tổ chức tăng trưởng',
      badge: 'Core-to-Orbit • Multi-Model AI Router',
      desc: 'Hợp nhất toàn bộ CRM 360°, CMS đa kênh, E-commerce, Quản trị dự án và AI Agent trên một nền tảng vận hành tập trung; chấm dứt phân mảnh phần mềm.',
      highlights: [
        'AI Router thông minh tối ưu chi phí token và tự động fallback',
        '5 phân hệ nghiệp vụ dùng chung một nguồn dữ liệu duy nhất',
        'Hỗ trợ linh hoạt cả SaaS Cloud lẫn Self-host trên máy chủ riêng',
        'Phân quyền ma trận 7 vai trò, bảo mật tuyệt đối'
      ],
      href: '/giai-phap/orion-ai-business-os',
      icon: Server,
      gradient: 'from-cyan-600 to-blue-800',
      btnText: 'Khám phá Orion OS'
    },
    {
      id: 'dienbien',
      title: 'DienBien.Today',
      subtitle: 'Cổng Thương Hiệu Số & Trợ Lý AI Địa Phương',
      target: 'Tỉnh Điện Biên, Du khách & Nhà đầu tư',
      badge: 'Trợ lý AI • OCOP • Xúc tiến đầu tư',
      desc: 'Nền tảng thương hiệu số địa phương tích hợp AI, kết nối di sản lịch sử, du lịch bản địa, đặc sản OCOP và các dự án kêu gọi đầu tư của Điện Biên ra thế giới.',
      highlights: [
        'Trợ lý AI tự động lên lịch trình du lịch cá nhân hóa',
        'Cổng dữ liệu mở và bản đồ số danh mục dự án đầu tư',
        'Gian hàng số giới thiệu sản phẩm nông sản và OCOP vùng cao',
        'Kiến trúc mở, hỗ trợ giao tiếp và chuyển ngữ đa ngôn ngữ'
      ],
      href: '/giai-phap/dienbien-today',
      icon: MapPin,
      gradient: 'from-emerald-600 to-teal-800',
      btnText: 'Khám phá DienBien.Today'
    },
    {
      id: 'coffeevn',
      title: 'CoffeeVN.Today',
      subtitle: 'Dữ liệu & Kết nối B2B Cà Phê Việt Nam',
      target: 'Vùng trồng, HTX, Nhà xuất khẩu & Buyer Quốc tế',
      badge: 'From Farm to Buyer • Chuẩn EUDR',
      desc: 'Hạ tầng dữ liệu số và cổng xúc tiến thương mại quốc tế, biến hiện diện số của vùng trồng cà phê thành hành trình B2B chuẩn mực từ RFQ đến mẫu thử và giao thương.',
      highlights: [
        'Hộ chiếu số (Coffee Passport) minh bạch cupping và lô hàng',
        'Dữ liệu tọa độ GIS vùng trồng hỗ trợ tuân thủ quy định EUDR',
        'Buyer Portal chuyên nghiệp: Tìm kiếm, RFQ và kết nối B2B',
        'Hệ thống niềm tin 3 tầng dữ liệu có kiểm chứng nguồn'
      ],
      href: '/giai-phap/coffeevn-today',
      icon: Coffee,
      gradient: 'from-amber-600 to-orange-700',
      btnText: 'Khám phá CoffeeVN.Today'
    }
  ];

  return (
    <div className="space-y-0">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-mesh-radial">
        
        {/* Glow Orbs */}
        <div className="hero-glow-orb top-10 left-1/4 w-96 h-96 bg-blue-400/20"></div>
        <div className="hero-glow-orb top-40 right-1/4 w-80 h-80 bg-cyan-400/20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Top Positioning Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 shadow-sm border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-500 animate-pulse"></span>
              <span>Cổng Thương Hiệu Số & Hồ Sơ Năng Lực 2026</span>
              <span className="text-slate-300">|</span>
              <span className="text-brand-600 font-extrabold">Tân Hoàng Nga</span>
            </div>

            {/* Main Statement with Typewriter Animation */}
            <HeroTypewriterTitle />

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Tân Hoàng Nga là cầu nối giữa công nghệ, nhu cầu vận hành và cơ hội thị trường; tổ chức triển khai có trách nhiệm các giải pháp AI, chuyển đổi số và thương hiệu số cho chính quyền cơ sở, doanh nghiệp và ngành hàng Việt Nam.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#ecosystem"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-extrabold text-white text-sm sm:text-base bg-gradient-to-r from-brand-600 via-brand-500 to-cyan-accent hover:shadow-glow transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <span>Khám Phá Hệ Sinh Thái</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                href="/lien-he"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-extrabold text-navy-text text-sm sm:text-base bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-brand-500" />
                <span>Đăng Ký Tư Vấn / Demo</span>
              </Link>
            </div>

          </div>

          {/* Interactive Ecosystem Orbit Graphic */}
          <div id="ecosystem" className="pt-14">
            <HeroOrbit />
          </div>

        </div>
      </section>

      {/* 2. TRUST / POSITIONING STRIP */}
      <section className="bg-navy-dark text-white py-10 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustBadges.map((badge, idx) => (
              <div key={idx} className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="p-2.5 rounded-xl bg-brand-500/20 text-cyan-accent shrink-0">
                  <badge.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-0.5">{badge.title}</h4>
                  <p className="text-xs text-slate-400 leading-snug">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FOUR KEY PROGRAMS (CHƯƠNG TRÌNH TRỌNG ĐIỂM) */}
      <section className="py-24 bg-surface-light relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 text-brand-600 text-xs font-extrabold uppercase tracking-wider mb-3">
              <Layers className="w-4 h-4" />
              <span>Hệ Thống Sản Phẩm Cốt Lõi</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-navy-text tracking-tight">
              Bốn Chương Trình Trọng Điểm 2026
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              Mỗi chương trình giải quyết một bài toán đặc thù nhưng cùng chung triết lý: Dữ liệu có cấu trúc, AI có kiểm soát và kết quả có thể đo lường.
            </p>
          </div>

          {/* Solution Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((sol) => (
              <div
                key={sol.id}
                className="bg-white rounded-3xl p-8 shadow-card border border-slate-200/80 hover:border-brand-300 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  
                  {/* Card Top */}
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${sol.gradient} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                      <sol.icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-bold border border-slate-200">
                      {sol.target}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">
                    {sol.badge}
                  </div>
                  <h3 className="text-2xl font-black text-navy-text mb-1 group-hover:text-brand-600 transition-colors">
                    {sol.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 mb-4">
                    {sol.subtitle}
                  </p>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {sol.desc}
                  </p>

                  {/* Highlights List */}
                  <div className="space-y-2.5 mb-6 pt-4 border-t border-slate-100">
                    {sol.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-snug">{h}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Card CTA Button */}
                <Link
                  href={sol.href}
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-center text-brand-600 bg-brand-50 hover:bg-brand-500 hover:text-white transition-all flex items-center justify-center gap-2 group-hover:shadow-sm"
                >
                  <span>{sol.btnText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. WHY TÂN HOÀNG NGA & COMPETITIVE ADVANTAGES */}
      <section className="py-20 bg-white border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 text-brand-600 text-xs font-extrabold uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Năng Lực Cốt Lõi</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-navy-text tracking-tight leading-tight">
                Vì Sao Chọn Hợp Tác Cùng Tân Hoàng Nga?
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Lợi thế của Tân Hoàng Nga không nằm ở một công cụ phần mềm đơn lẻ, mà ở khả năng ghép nối công nghệ, dữ liệu, con người và thị trường thành một hành trình triển khai thống nhất.
              </p>

              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-500 text-white flex items-center justify-center shrink-0 font-bold">1</div>
                  <div>
                    <h4 className="text-sm font-bold text-navy-text mb-0.5">Tư vấn bắt đầu từ bài toán thực tế</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">Khảo sát người dùng, quy trình và dữ liệu để xác lập MVP rõ ràng; hạn chế đầu tư dàn trải và giúp khách hàng thấy giá trị sớm.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center shrink-0 font-bold">2</div>
                  <div>
                    <h4 className="text-sm font-bold text-navy-text mb-0.5">Triển khai có trách nhiệm & Phân vai rõ</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">Chuẩn hóa dữ liệu, đào tạo theo vai trò, hỗ trợ tuyến 1 và theo dõi tỷ lệ người dùng hoạt động sau nghiệm thu kỹ thuật.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 font-bold">3</div>
                  <div>
                    <h4 className="text-sm font-bold text-navy-text mb-0.5">Hệ sinh thái bổ trợ & Đối tác công nghệ vững</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">Kết hợp năng lực R&D công nghệ lõi của ADT với năng lực bản địa hóa dữ liệu và phát triển thị trường của Tân Hoàng Nga.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/gioi-thieu/nang-luc-loi-the"
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-700 hover:underline"
                >
                  <span>Xem chi tiết hồ sơ năng lực</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Quick Metrics / Proof Box */}
            <div className="bg-gradient-to-br from-navy-card via-slate-900 to-navy-dark rounded-3xl p-8 sm:p-10 text-white shadow-2xl border border-slate-700 relative overflow-hidden">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                  <div>
                    <div className="text-3xl sm:text-4xl font-black text-cyan-accent font-mono">3–7 Ngày</div>
                    <div className="text-xs text-slate-400 mt-1">Thời gian triển khai Govina tiêu chuẩn khi dữ liệu sẵn sàng</div>
                  </div>
                  <Cpu className="w-10 h-10 text-brand-400 opacity-80" />
                </div>

                <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                  <div>
                    <div className="text-3xl sm:text-4xl font-black text-mint-accent font-mono">80% / 20%</div>
                    <div className="text-xs text-slate-400 mt-1">80% kho tri thức dùng chung kế thừa + 20% dữ liệu đặc thù</div>
                  </div>
                  <Layers className="w-10 h-10 text-mint-accent opacity-80" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">100%</div>
                    <div className="text-xs text-slate-400 mt-1">Chủ quyền & kiểm soát dữ liệu thuộc về khách hàng</div>
                  </div>
                  <ShieldCheck className="w-10 h-10 text-amber-400 opacity-80" />
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. 6-STEP IMPLEMENTATION WORKFLOW */}
      <ProcessTimeline />

      {/* 6. STRATEGIC PARTNERSHIP WITH ADT */}
      <AdtPartnerSection />

      {/* 7. PINNED FEATURED ARTICLES */}
      <PinnedArticlesSection posts={featuredPosts} />

      {/* 8. CONSULTATION & LEAD CAPTURE FORM */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <LeadForm />
        </div>
      </section>

    </div>
  );
}
