import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Handshake, Users, Award, CheckCircle2, ArrowRight, FileText, Cpu, Building2, Globe } from 'lucide-react';
import { AdtPartnerSection } from '@/components/marketing/AdtPartnerSection';
import { LeadForm } from '@/components/marketing/LeadForm';

export const metadata = {
  title: 'Đối Tác Chiến Lược & Mô Hình Hợp Tác — Tân Hoàng Nga',
  description: 'Hợp tác chiến lược cùng ADT Quốc tế theo Hợp đồng số 203-140826/ADT và 6 mô hình hợp tác mở dành cho các đối tác địa bàn, ngành hàng và công nghệ.'
};

export default function PartnersPage() {
  const models = [
    {
      num: '1',
      title: 'Phân Phối & Phát Triển Thị Trường',
      desc: 'Trở thành đại lý, đối tác phát triển thị trường các dòng sản phẩm AIGov và AI OS theo phạm vi địa bàn hoặc ngành được phê duyệt.'
    },
    {
      num: '2',
      title: 'Đồng Triển Khai Thực Địa',
      desc: 'Phối hợp khảo sát hiện trạng, đào tạo người dùng và hỗ trợ tuyến đầu cho các dự án tại địa phương hoặc lĩnh vực chuyên sâu.'
    },
    {
      num: '3',
      title: 'Cung Cấp Dữ Liệu & Xác Thực',
      desc: 'Đơn vị kiểm định, phòng thí nghiệm (Lab test), chuyên gia dịch thuật và tổ chức cung cấp dữ liệu số hóa chuyên ngành.'
    },
    {
      num: '4',
      title: 'Tổ Chức Hội Thảo & Xúc Tiến',
      desc: 'Hiệp hội doanh nghiệp, đơn vị xúc tiến đầu tư, trung tâm CNTT phối hợp tổ chức các buổi demo, đào tạo và diễn đàn chuyển đổi số.'
    },
    {
      num: '5',
      title: 'Kết Nối Vùng Trồng & Buyer',
      desc: 'Đối tác matchmaking B2B, HTX nông nghiệp, mạng lưới thu mua và thương vụ hỗ trợ kết nối nhà xuất khẩu với người mua quốc tế.'
    },
    {
      num: '6',
      title: 'Tích Hợp Công Nghệ & Hạ Tầng',
      desc: 'Nhà cung cấp hạ tầng máy chủ, dịch vụ viễn thông, bảo mật, MinIO/S3, cổng thanh toán số tích hợp trực tiếp vào hệ sinh thái.'
    }
  ];

  const standards = [
    'Tuân thủ tuyệt đối quy tắc bảo mật thông tin và quyền riêng tư dữ liệu của khách hàng.',
    'Truyền thông trung thực, không hứa hẹn vượt quá năng lực thực tế của phần mềm.',
    'Không thu thập dữ liệu vượt quá mục đích sử dụng đã được khách hàng phê duyệt.',
    'Không sử dụng nhãn xác thực khi chưa có đầy đủ chứng từ hoặc kiểm định bên thứ ba.',
    'Cam kết tiếp nhận, xử lý khiếu nại của khách hàng với thời hạn phản hồi rõ ràng.'
  ];

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-semibold text-brand-600 uppercase tracking-wider mb-2">
            <Link href="/" className="hover:underline">Trang chủ</Link> / Đối tác & Hợp tác
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-navy-text tracking-tight leading-tight">
            Mạng Lưới Đối Tác & Mô Hình Hợp Tác Cùng Thành Công
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Tân Hoàng Nga xây dựng hệ sinh thái mở, minh bạch về quyền lợi và trách nhiệm, hướng tới giá trị vận hành thực chất và lâu dài cho khách hàng.
          </p>
        </div>

        {/* Strategic ADT Section Embed */}
        <AdtPartnerSection />

        {/* 6 Collaboration Models */}
        <div className="space-y-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-xs font-bold uppercase mb-2">
              <Handshake className="w-3.5 h-3.5" />
              <span>Cơ hội hợp tác</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-text">6 Hình Thức Hợp Tác Dành Cho Đối Tác</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {models.map((m) => (
              <div key={m.num} className="p-7 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-brand-300 hover:shadow-card-hover transition-all flex flex-col justify-between">
                <div>
                  <span className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 font-bold flex items-center justify-center text-sm mb-4">
                    {m.num}
                  </span>
                  <h3 className="text-base font-bold text-navy-text mb-2">{m.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Commercial Principles & Standards */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-4">
            <div className="text-xs font-bold text-brand-600 uppercase tracking-wider">Nguyên tắc thương mại</div>
            <h3 className="text-xl sm:text-2xl font-black text-navy-text">Minh Bạch & Tôn Trọng Sở Hữu</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Mọi mô hình chia sẻ doanh thu, hoa hồng giới thiệu (referral), đại lý hoặc đồng đầu tư đều được văn bản hóa cụ thể. Hợp đồng xác định rõ nguồn lead, quyền chăm sóc khách hàng, quyền thương hiệu, trách nhiệm dữ liệu và cơ chế giải quyết khi có tranh chấp.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Chuẩn tham gia hệ sinh thái</span>
            {standards.map((std, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{std}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Partner Form */}
        <div className="max-w-3xl mx-auto pt-6">
          <LeadForm 
            defaultSolution="partnership"
            title="Đăng Ký Đề Xuất Hợp Tác Đối Tác"
            subtitle="Dành cho các doanh nghiệp CNTT, đơn vị xúc tiến, chuyên gia và đại lý phân phối"
          />
        </div>

      </div>
    </div>
  );
}
