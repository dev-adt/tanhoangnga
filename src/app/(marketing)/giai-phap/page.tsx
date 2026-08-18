import React from 'react';
import Link from 'next/link';
import { Cpu, Server, MapPin, Coffee, ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Layers } from 'lucide-react';

export const metadata = {
  title: 'Hệ Sinh Thái Giải Pháp AI & Chuyển Đổi Số — Tân Hoàng Nga',
  description: 'Khám phá 4 giải pháp trọng điểm: ADT Govina AI cho phường/xã, Orion AI Business OS cho doanh nghiệp, DienBien.Today cho địa phương và CoffeeVN.Today cho ngành cà phê.'
};

export default function SolutionsOverviewPage() {
  const solutions = [
    {
      id: 'adt-govina-ai',
      title: 'ADT Govina AI',
      subtitle: 'Bộ Trợ lý AI dành cho Phường/Xã',
      target: 'Chính quyền cơ sở & Cán bộ chuyên môn',
      badge: '5 Lớp Tri Thức • Mô Hình 1+4',
      icon: Cpu,
      color: 'from-blue-600 to-cyan-500',
      desc: 'Công cụ hỗ trợ tra cứu, tổng hợp và hướng dẫn thủ tục dựa trên kho tri thức chuẩn hóa 5 lớp; giảm thời gian tìm kiếm văn bản và nâng cao độ chính xác trong phục vụ người dân.',
      highlights: [
        'Kho tri thức 5 lớp chuẩn hóa từ Trung ương đến văn bản địa phương',
        'Cấu trúc 1 Trợ lý chung + 4 Trợ lý chuyên môn theo phòng ban',
        'Thời gian triển khai 3–7 ngày khi dữ liệu sẵn sàng',
        'Case study Phường Ô Chợ Dừa xếp 1/126 CCHC Hà Nội; QTG 3794/2026/QTG'
      ],
      href: '/giai-phap/adt-govina-ai'
    },
    {
      id: 'orion-ai-business-os',
      title: 'Orion AI Business OS',
      subtitle: 'Hệ điều hành Doanh nghiệp Đa mô hình AI',
      target: 'Doanh nghiệp & SME Tăng trưởng',
      badge: 'Core-to-Orbit • Multi-Model AI Router',
      icon: Server,
      color: 'from-cyan-600 to-blue-800',
      desc: 'Hợp nhất toàn bộ CRM 360°, CMS đa kênh, E-commerce, Quản trị dự án và AI Agent trên một nền tảng vận hành tập trung; chấm dứt phân mảnh phần mềm.',
      highlights: [
        'AI Router thông minh tối ưu chi phí token và tự động fallback',
        '5 phân hệ nghiệp vụ dùng chung một nguồn dữ liệu duy nhất',
        'Hỗ trợ linh hoạt cả SaaS Cloud lẫn Self-host trên máy chủ riêng',
        'Phân quyền ma trận 7 vai trò, bảo mật tuyệt đối'
      ],
      href: '/giai-phap/orion-ai-business-os'
    },
    {
      id: 'dienbien-today',
      title: 'DienBien.Today',
      subtitle: 'Cổng Thương Hiệu Số & Trợ Lý AI Địa Phương',
      target: 'Địa phương, Doanh nghiệp, Du khách & Nhà đầu tư',
      badge: 'Trợ lý AI • OCOP • Xúc tiến đầu tư',
      icon: MapPin,
      color: 'from-emerald-600 to-teal-800',
      desc: 'Nền tảng thương hiệu số địa phương tích hợp AI, kết nối di sản lịch sử, du lịch bản địa, đặc sản OCOP và các dự án kêu gọi đầu tư của Điện Biên ra thế giới.',
      highlights: [
        'Trợ lý AI tự động lên lịch trình du lịch cá nhân hóa',
        'Cổng dữ liệu mở và bản đồ số danh mục dự án đầu tư',
        'Gian hàng số giới thiệu sản phẩm nông sản và OCOP vùng cao',
        'Kiến trúc mở, hỗ trợ giao tiếp và chuyển ngữ đa ngôn ngữ'
      ],
      href: '/giai-phap/dienbien-today'
    },
    {
      id: 'coffeevn-today',
      title: 'CoffeeVN.Today',
      subtitle: 'Dữ liệu & Kết nối B2B Cà Phê Việt Nam',
      target: 'Vùng trồng, HTX, Supplier & Buyer Quốc tế',
      badge: 'From Farm to Buyer • Chuẩn EUDR',
      icon: Coffee,
      color: 'from-amber-600 to-orange-700',
      desc: 'Hạ tầng dữ liệu số và cổng xúc tiến thương mại quốc tế, biến hiện diện số của vùng trồng cà phê thành hành trình B2B chuẩn mực từ RFQ đến mẫu thử và giao thương.',
      highlights: [
        'Hộ chiếu số (Coffee Passport) minh bạch cupping và lô hàng',
        'Dữ liệu tọa độ GIS vùng trồng hỗ trợ tuân thủ quy định EUDR',
        'Buyer Portal chuyên nghiệp: Tìm kiếm, RFQ và kết nối B2B',
        'Hệ thống niềm tin 3 tầng dữ liệu có kiểm chứng nguồn'
      ],
      href: '/giai-phap/coffeevn-today'
    }
  ];

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-50 text-brand-600 text-xs font-extrabold uppercase tracking-wider mb-3">
            <Layers className="w-4 h-4" />
            <span>Hệ Sinh Thái Giải Pháp 2026</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-navy-text tracking-tight">
            Giải Pháp AI & Chuyển Đổi Số Toàn Diện
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Bốn chương trình được thiết kế cho từng nhóm nhu cầu khác nhau nhưng cùng dùng chung một logic: Dữ liệu có cấu trúc, AI có kiểm soát, trải nghiệm đa kênh và đo lường được kết quả.
          </p>
        </div>

        {/* 4 Solutions Detailed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutions.map((sol) => (
            <div
              key={sol.id}
              className="bg-white rounded-3xl p-8 shadow-card border border-slate-200/80 hover:shadow-card-hover hover:border-brand-300 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${sol.color} text-white flex items-center justify-center shadow-md`}>
                    <sol.icon className="w-7 h-7" />
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-bold border border-slate-200">
                    {sol.target}
                  </span>
                </div>

                <div className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">
                  {sol.badge}
                </div>
                <h2 className="text-2xl font-black text-navy-text mb-1 group-hover:text-brand-600 transition-colors">
                  {sol.title}
                </h2>
                <p className="text-xs font-semibold text-slate-500 mb-4">{sol.subtitle}</p>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">{sol.desc}</p>

                <div className="space-y-2 pt-4 border-t border-slate-100 mb-6">
                  {sol.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={sol.href}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-center text-brand-600 bg-brand-50 hover:bg-brand-600 hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <span>Xem chi tiết giải pháp</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* Architecture Synergy Box */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-cyan-accent">Mối Liên Kết Hệ Sinh Thái</div>
            <h3 className="text-xl sm:text-2xl font-black text-white">Tính Bổ Trợ Giữa 4 Chương Trình</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Govina tạo năng lực tri thức cho chính quyền cơ sở; Orion tạo năng lực vận hành cho doanh nghiệp; DienBien.Today tổ chức thương hiệu địa phương; CoffeeVN.Today kết nối ngành hàng toàn cầu.
            </p>
          </div>
          <Link
            href="/lien-he"
            className="px-6 py-3 rounded-xl font-bold text-sm text-navy-text bg-white hover:bg-slate-100 shrink-0 shadow-glow"
          >
            Đăng Ký Khảo Sát
          </Link>
        </div>

      </div>
    </div>
  );
}
