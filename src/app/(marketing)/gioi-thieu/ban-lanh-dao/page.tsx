import React from 'react';
import Link from 'next/link';
import { Users, ShieldCheck, Briefcase, CalendarCheck, Clock, CheckCircle2, UserCheck } from 'lucide-react';
import { repo } from '@/lib/store/repository';

export const metadata = {
  title: 'Ban Lãnh Đạo & Tổ Chức Vận Hành — Tân Hoàng Nga',
  description: 'Thông tin Ban lãnh đạo, Tổng Giám đốc Bùi Thái Hoàng và mô hình cơ cấu tổ chức vận hành tinh gọn của Công ty TNHH Tân Hoàng Nga.'
};

export default function LeadershipPage() {
  const settings = repo.getSettings();

  const operatingGroups = [
    {
      group: 'Ban Điều Hành',
      role: 'Định hướng chiến lược, quản trị tài chính, quan hệ đối tác chiến lược, kiểm soát rủi ro và phê duyệt các quyết định quan trọng.'
    },
    {
      group: 'Phát Triển Thị Trường',
      role: 'Khai thác cơ hội, xây dựng proposal, phát triển mạng lưới phân phối, tổ chức demo và quan hệ khách hàng.'
    },
    {
      group: 'Tư Vấn & Triển Khai',
      role: 'Khảo sát nghiệp vụ, chuẩn bị & làm sạch dữ liệu, cấu hình hệ thống, đào tạo người dùng và thực hiện nghiệm thu.'
    },
    {
      group: 'Customer Success',
      role: 'Hỗ trợ kỹ thuật tuyến 1, theo dõi tỷ lệ tiếp nhận (adoption), đảm bảo cam kết SLA và ghi nhận đề xuất cải tiến.'
    },
    {
      group: 'Nội Dung & Truyền Thông',
      role: 'Vận hành Content Factory, xây dựng bài viết SEO/GEO, hồ sơ đa ngôn ngữ và các chiến dịch thương hiệu số.'
    },
    {
      group: 'Đối Tác Chuyên Môn',
      role: 'Mạng lưới chuyên gia cố vấn về pháp lý, dữ liệu, tiêu chuẩn ngành, dịch thuật quốc tế và công nghệ hạ tầng.'
    }
  ];

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Breadcrumb & Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-semibold text-brand-600 uppercase tracking-wider mb-2">
            <Link href="/" className="hover:underline">Trang chủ</Link> / <Link href="/gioi-thieu" className="hover:underline">Giới thiệu</Link> / Ban lãnh đạo & Vận hành
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-navy-text tracking-tight leading-tight">
            Ban Lãnh Đạo & Tổ Chức Vận Hành
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Mô hình tổ chức tinh gọn, lấy dự án và khách hàng làm trung tâm, kết hợp đội ngũ nội bộ với mạng lưới chuyên gia và đối tác theo từng lĩnh vực.
          </p>
        </div>

        {/* General Director Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white shadow-card border border-slate-200/80 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-brand-600 to-cyan-accent text-white flex items-center justify-center text-3xl font-black shadow-glow mb-4">
              TH
            </div>
            <h3 className="text-xl font-black text-navy-text">{settings.representative}</h3>
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider mt-0.5">{settings.representativeTitle}</span>
            <span className="text-xs text-slate-500 mt-1">Người đại diện theo pháp luật</span>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h4 className="text-lg font-bold text-navy-text">Định Hướng Chiến Lược & Phát Triển Thị Trường</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Ông Bùi Thái Hoàng là người đại diện và Tổng Giám đốc Công ty TNHH Tân Hoàng Nga, chịu trách nhiệm trực tiếp về định hướng chiến lược tổng thể, quan hệ đối tác công nghệ và phát triển hệ sinh thái giải pháp AI — chuyển đổi số.
            </p>
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 text-xs text-slate-700 space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-brand-700">
                <ShieldCheck className="w-4 h-4" />
                <span>Trực tiếp điều hành quan hệ hợp tác chiến lược cùng ADT Quốc tế</span>
              </div>
              <p className="text-slate-600">Hotline liên hệ trực tiếp: <strong>{settings.phone}</strong></p>
            </div>
          </div>
        </div>

        {/* Operational Groups Matrix */}
        <div className="space-y-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-xs font-bold uppercase mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Cơ cấu chức năng</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-text">Cơ Cấu Vận Hành Tinh Gọn</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {operatingGroups.map((g, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-navy-text mb-2 flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-brand-600" />
                    <span>{g.group}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{g.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Operating Cadence */}
        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
          <h3 className="text-lg font-bold text-navy-text flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-brand-600" />
            <span>Nhịp Điều Hành Chuẩn Mực</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-white border border-slate-200">
              <span className="font-bold text-brand-600 block mb-1">Hằng tuần</span>
              <p className="text-slate-600">Rà soát tiến độ dự án, cơ hội thị trường và các điểm nghẽn kỹ thuật.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-slate-200">
              <span className="font-bold text-brand-600 block mb-1">Hằng tháng</span>
              <p className="text-slate-600">Đánh giá sản phẩm, chất lượng dữ liệu và báo cáo mức độ tiếp nhận (adoption).</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-slate-200">
              <span className="font-bold text-brand-600 block mb-1">Hằng quý</span>
              <p className="text-slate-600">Rà soát tài chính, rủi ro, chính sách đại lý và hiệu quả quan hệ đối tác.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-slate-200">
              <span className="font-bold text-brand-600 block mb-1">Hằng năm</span>
              <p className="text-slate-600">Tổng kết chiến lược, phê duyệt chỉ tiêu KPI và phân bổ ngân sách nghiên cứu phát triển.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
