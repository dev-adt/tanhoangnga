import React from 'react';
import { Search, Compass, Wrench, Rocket, HeartHandshake, TrendingUp, CheckCircle2, FileSpreadsheet } from 'lucide-react';

export function ProcessTimeline() {
  const steps = [
    {
      num: '01',
      title: 'Khám Phá (Discovery)',
      icon: Search,
      badge: 'Khảo sát hiện trạng',
      desc: 'Phỏng vấn người dùng, khảo sát quy trình công việc, cấu trúc dữ liệu, hạ tầng máy chủ và các yêu cầu bảo mật.',
      deliverable: 'Biên bản khảo sát, danh mục use case, chỉ số đường cơ sở.'
    },
    {
      num: '02',
      title: 'Thiết Kế (Design)',
      icon: Compass,
      badge: 'Kiến trúc giải pháp',
      desc: 'Xác lập phạm vi MVP, sơ đồ phân quyền, lựa chọn mô hình triển khai (Cloud / Self-host) và thống nhất KPI.',
      deliverable: 'Đề xuất giải pháp kỹ thuật, kế hoạch và tiêu chí nghiệm thu.'
    },
    {
      num: '03',
      title: 'Chuẩn Bị (Preparation)',
      icon: Wrench,
      badge: 'Tổ chức dữ liệu',
      desc: 'Làm sạch và số hoá dữ liệu đặc thù địa phương, cấu hình hệ thống, thiết lập AI Router và chạy kiểm thử nội bộ.',
      deliverable: 'Môi trường sẵn sàng chạy thử và tài liệu kiểm thử.'
    },
    {
      num: '04',
      title: 'Triển Khai (Deployment)',
      icon: Rocket,
      badge: 'Đào tạo & Nghiệm thu',
      desc: 'Tổ chức đào tạo theo từng nhóm vai trò cán bộ/nhân viên, chạy thử nghiệm pilot diện hẹp và tiến hành nghiệm thu.',
      deliverable: 'Hệ thống vận hành chính thức và biên bản bàn giao.'
    },
    {
      num: '05',
      title: 'Tiếp Nhận (Adoption)',
      icon: HeartHandshake,
      badge: 'Đồng hành tuyến 1',
      desc: 'Cử nhân sự hỗ trợ tuyến đầu, giải đáp vướng mắc phát sinh trong công việc hàng ngày và theo dõi tỷ lệ người dùng hoạt động.',
      deliverable: 'Nhật ký hỗ trợ, báo cáo mức độ tiếp nhận và cải tiến.'
    },
    {
      num: '06',
      title: 'Mở Rộng (Scale & Optimize)',
      icon: TrendingUp,
      badge: 'Đo lường & Nâng cấp',
      desc: 'Đo lường KPI định kỳ, tối ưu chi phí token AI, bổ sung luồng nghiệp vụ mới và nâng cấp kho tri thức chuyên sâu.',
      deliverable: 'Báo cáo giá trị thực tế và lộ trình mở rộng dài hạn.'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white via-slate-50/50 to-white border-y border-slate-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 text-brand-600 text-xs font-extrabold uppercase tracking-wider mb-3">
            <CheckCircle2 className="w-4 h-4" />
            <span>Phương Pháp Luận Triển Khai</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-navy-text tracking-tight">
            Mô Hình Triển Khai 6 Bước Chuẩn Hoá
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Tân Hoàng Nga không dừng lại ở việc bàn giao kỹ thuật, mà đồng hành trực tiếp cùng khách hàng từ khâu khảo sát đến khi toàn bộ đội ngũ sử dụng thành thạo và đo lường được giá trị thực tế.
          </p>
        </div>

        {/* 6 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step, idx) => (
            <div 
              key={step.num}
              className="relative p-6 sm:p-7 rounded-3xl bg-white shadow-card border border-slate-200/80 hover:border-brand-300 hover:shadow-card-hover transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 group-hover:bg-brand-500 group-hover:text-white transition-all flex items-center justify-center shadow-sm">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl sm:text-3xl font-black text-slate-200 group-hover:text-brand-200 transition-colors font-mono">
                    {step.num}
                  </span>
                </div>

                <div className="text-xs font-bold text-brand-600 uppercase tracking-wide mb-1">
                  {step.badge}
                </div>
                <h3 className="text-lg font-bold text-navy-text mb-2 group-hover:text-brand-500 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {step.desc}
                </p>
              </div>

              {/* Deliverable Box */}
              <div className="pt-3 border-t border-slate-100 mt-2 bg-slate-50/80 -mx-3 -mb-3 p-3 rounded-2xl text-[11px] text-slate-600">
                <span className="font-bold text-slate-800 block mb-0.5">Đầu ra nghiệm thu:</span>
                <span>{step.deliverable}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Standard Documentation Checklist Box */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-navy-card to-slate-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-700">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-cyan-accent text-xs font-bold uppercase tracking-wider">
              <FileSpreadsheet className="w-4 h-4" />
              <span>Bộ Hồ Sơ Triển Khai Chuẩn</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Minh bạch mọi biên bản, tiêu chí và cam kết SLA
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Mỗi dự án bao gồm: Phiếu khảo sát hiện trạng, Danh mục dữ liệu & thẩm quyền phê duyệt, Ma trận trách nhiệm (RACI), Tiêu chí nghiệm thu định lượng và Báo cáo đo lường mức độ tiếp nhận.
            </p>
          </div>
          <a
            href="/quy-trinh-trien-khai"
            className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-navy-text bg-white hover:bg-slate-100 shadow-glow shrink-0 transition-all transform hover:scale-105"
          >
            Xem Chi Tiết Quy Trình
          </a>
        </div>

      </div>
    </section>
  );
}
