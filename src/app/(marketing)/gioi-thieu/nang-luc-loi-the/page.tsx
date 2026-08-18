import React from 'react';
import Link from 'next/link';
import { Award, Compass, RefreshCw, BarChart3, CheckCircle2, ShieldCheck, Server, Layers, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Năng lực & Lợi thế Cạnh tranh — Tân Hoàng Nga',
  description: 'Năng lực tư vấn giải pháp, quản trị thay đổi, tổ chức dữ liệu và các lợi thế cạnh tranh của Công ty TNHH Tân Hoàng Nga.'
};

export default function CapabilitiesPage() {
  const capabilities = [
    {
      title: '1. Năng lực Tư vấn & Thiết kế Giải pháp',
      icon: Compass,
      desc: 'Mỗi dự án khởi đầu bằng khảo sát người dùng, quy trình, dữ liệu, hạ tầng và bảo mật. Kết quả khảo sát được chuyển thành bản đồ vấn đề, danh mục use case, thứ tự ưu tiên, phạm vi MVP và chỉ số thành công rõ ràng.'
    },
    {
      title: '2. Năng lực Triển khai & Quản trị Thay đổi',
      icon: RefreshCw,
      desc: 'Phối hợp chuẩn bị dữ liệu, cấu hình hệ thống, đào tạo theo vai trò và hỗ trợ tuyến đầu. Sau bàn giao, nhóm triển khai tiếp tục theo dõi câu hỏi, lỗi phát sinh, tỷ lệ người dùng hoạt động để hỗ trợ cải tiến.'
    },
    {
      title: '3. Năng lực Phát triển Thị trường & Nội dung',
      icon: BarChart3,
      desc: 'Tân Hoàng Nga kết hợp proposal, demo, hội thảo và câu chuyện ứng dụng thực tế. Với DienBien.Today và CoffeeVN.Today, nội dung trở thành tài sản dữ liệu phục vụ tìm kiếm, AI discovery và kết nối đối tác.'
    }
  ];

  const advantages = [
    'Một hệ sinh thái bổ trợ phục vụ đồng thời khu vực công, doanh nghiệp và ngành hàng.',
    'Năng lực Multi-Model AI Router và mô hình triển khai linh hoạt từ Cloud đến Self-host trên máy chủ riêng.',
    'Kết hợp đồng bộ giữa công nghệ với chuẩn hóa dữ liệu, truyền thông số và customer success.',
    'Có đối tác công nghệ chiến lược ADT Quốc tế và phân vai triển khai minh bạch.',
    'Tuyệt đối chú trọng chủ quyền dữ liệu khách hàng, kiểm chứng nguồn và nguyên tắc AI có trách nhiệm.'
  ];

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Breadcrumb & Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-semibold text-brand-600 uppercase tracking-wider mb-2">
            <Link href="/" className="hover:underline">Trang chủ</Link> / <Link href="/gioi-thieu" className="hover:underline">Giới thiệu</Link> / Năng lực & Lợi thế
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-navy-text tracking-tight leading-tight">
            Năng Lực & Lợi Thế Cạnh Tranh
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Lợi thế của Tân Hoàng Nga không nằm ở một công cụ đơn lẻ, mà ở khả năng ghép nối công nghệ, dữ liệu, con người và thị trường thành một hành trình triển khai thống nhất.
          </p>
        </div>

        {/* 3 Core Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {capabilities.map((cap, i) => (
            <div key={i} className="p-8 rounded-3xl bg-white shadow-card border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-6">
                  <cap.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-navy-text mb-3">{cap.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{cap.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 5 Competitive Advantages Box */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-navy-card to-slate-900 text-white shadow-xl border border-slate-800">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-cyan-accent text-xs font-bold uppercase mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Giá trị khác biệt</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">5 Lợi Thế Cạnh Tranh Nổi Bật</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {advantages.map((adv, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-mint-accent shrink-0 mt-0.5" />
                <span className="leading-relaxed">{adv}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
