import React from 'react';
import Link from 'next/link';
import { Search, Compass, Wrench, Rocket, HeartHandshake, TrendingUp, CheckCircle2, FileSpreadsheet, ShieldCheck, ArrowRight } from 'lucide-react';
import { LeadForm } from '@/components/marketing/LeadForm';

export const metadata = {
  title: 'Mô Hình Triển Khai 6 Bước Chuẩn Hóa — Tân Hoàng Nga',
  description: 'Khám phá quy trình 6 bước triển khai chuyển đổi số và bộ hồ sơ chuẩn hóa giúp khách hàng nhìn thấy giá trị sớm và tiếp nhận thành công.'
};

export default function ProcessPage() {
  const steps = [
    {
      num: '01',
      title: 'Khám Phá (Discovery)',
      icon: Search,
      badge: 'Khảo sát hiện trạng',
      desc: 'Phỏng vấn người dùng, khảo sát quy trình nghiệp vụ hiện tại, kiểm tra chất lượng dữ liệu, hạ tầng máy chủ và các rủi ro tuân thủ bảo mật.',
      deliverable: 'Biên bản khảo sát, danh mục use case ưu tiên và chỉ số đường cơ sở.'
    },
    {
      num: '02',
      title: 'Thiết Kế (Design)',
      icon: Compass,
      badge: 'Kiến trúc giải pháp',
      desc: 'Xác lập phạm vi phiên bản đầu (MVP), sơ đồ phân quyền người dùng, lựa chọn phương án lưu trữ (Cloud hay Self-host) và thiết lập chỉ số KPI nghiệm thu.',
      deliverable: 'Đề xuất giải pháp kỹ thuật, kế hoạch triển khai và tiêu chí nghiệm thu.'
    },
    {
      num: '03',
      title: 'Chuẩn Bị (Preparation)',
      icon: Wrench,
      badge: 'Tổ chức dữ liệu',
      desc: 'Làm sạch và số hóa dữ liệu đặc thù 20% của đơn vị, cấu hình phân hệ phần mềm, thiết lập AI Router và tiến hành kiểm thử nội bộ.',
      deliverable: 'Môi trường sẵn sàng chạy thử và tài liệu kiểm thử.'
    },
    {
      num: '04',
      title: 'Triển Khai (Deployment)',
      icon: Rocket,
      badge: 'Đào tạo & Nghiệm thu',
      desc: 'Tổ chức các buổi đào tạo thực hành theo từng nhóm vai trò cán bộ/nhân viên, chạy pilot diện hẹp và tiến hành nghiệm thu kỹ thuật.',
      deliverable: 'Hệ thống vận hành chính thức và biên bản bàn giao hoàn tất.'
    },
    {
      num: '05',
      title: 'Tiếp Nhận (Adoption)',
      icon: HeartHandshake,
      badge: 'Đồng hành tuyến 1',
      desc: 'Cử nhân sự hỗ trợ tuyến đầu giải đáp câu hỏi hàng ngày, xử lý các vướng mắc phát sinh và theo dõi tỷ lệ người dùng hoạt động thường xuyên.',
      deliverable: 'Nhật ký hỗ trợ, báo cáo mức độ tiếp nhận và đề xuất cải tiến.'
    },
    {
      num: '06',
      title: 'Mở Rộng (Scale & Optimize)',
      icon: TrendingUp,
      badge: 'Đo lường & Nâng cấp',
      desc: 'Đo lường KPI định kỳ trước–sau triển khai, tối ưu chi phí token AI, bổ sung thêm kho tri thức và use case mới theo nhu cầu mở rộng.',
      deliverable: 'Báo cáo giá trị thực tế tạo ra và lộ trình nâng cấp dài hạn.'
    }
  ];

  const standardDocs = [
    'Phiếu khảo sát hiện trạng nghiệp vụ và danh sách các bên liên quan.',
    'Danh mục dữ liệu, nguồn trích xuất, quyền sử dụng và người phê duyệt có thẩm quyền.',
    'Phạm vi công việc (SOW), lịch trình chi tiết và ma trận phân định trách nhiệm (RACI).',
    'Kế hoạch kiểm thử, bộ tiêu chí nghiệm thu định lượng và cam kết mức độ dịch vụ (SLA).',
    'Tài liệu đào tạo theo vai trò, hướng dẫn sử dụng và kênh hỗ trợ kỹ thuật trực tiếp.',
    'Báo cáo định kỳ về mức độ sử dụng, các vấn đề phát sinh và giá trị tạo ra thực tế.'
  ];

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-semibold text-brand-600 uppercase tracking-wider mb-2">
            <Link href="/" className="hover:underline">Trang chủ</Link> / Quy trình triển khai
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-navy-text tracking-tight leading-tight">
            Mô Hình Triển Khai 6 Bước & Bộ Hồ Sơ Chuẩn
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Quy trình triển khai thống nhất giúp mọi dự án có đầu vào rõ ràng, trách nhiệm minh bạch, tiến độ kiểm soát chặt chẽ và kết quả có thể nghiệm thu đo lường được.
          </p>
        </div>

        {/* 6 Steps Detailed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step) => (
            <div 
              key={step.num}
              className="p-7 rounded-3xl bg-white shadow-card border border-slate-200/80 hover:border-brand-300 hover:shadow-card-hover transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-black text-slate-200 font-mono">
                    {step.num}
                  </span>
                </div>

                <div className="text-xs font-bold text-brand-600 uppercase tracking-wide mb-1">
                  {step.badge}
                </div>
                <h3 className="text-lg font-bold text-navy-text mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {step.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 bg-slate-50/80 -mx-3 -mb-3 p-3 rounded-2xl text-[11px] text-slate-600">
                <span className="font-bold text-slate-800 block mb-0.5">Đầu ra nghiệm thu:</span>
                <span>{step.deliverable}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Standard Documentation Checklist */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-cyan-accent text-xs font-bold uppercase mb-2">
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Tiêu chuẩn quản trị</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Bộ Hồ Sơ Triển Khai Chuẩn</h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">Mọi dự án đều được quản lý với bộ tài liệu chuẩn hóa 6 hạng mục.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {standardDocs.map((doc, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700 flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-mint-accent shrink-0 mt-0.5" />
                <span>{doc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Lead Form */}
        <div className="max-w-3xl mx-auto pt-6">
          <LeadForm 
            title="Đăng Ký Tư Vấn Quy Trình Triển Khai"
            subtitle="Đội ngũ kỹ thuật Tân Hoàng Nga sẽ cùng Quý đơn vị khảo sát use case cụ thể"
          />
        </div>

      </div>
    </div>
  );
}
