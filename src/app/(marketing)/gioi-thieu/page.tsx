import React from 'react';
import Link from 'next/link';
import { Building2, ShieldCheck, Target, Award, ArrowRight, CheckCircle2, FileText, Phone, MapPin, Users } from 'lucide-react';
import { repo } from '@/lib/store/repository';

export const metadata = {
  title: 'Giới thiệu Tân Hoàng Nga — Cổng thông tin & Hồ sơ năng lực',
  description: 'Tìm hiểu câu chuyện phát triển, định vị doanh nghiệp, năng lực cốt lõi và tư cách pháp lý của Công ty TNHH Tân Hoàng Nga.'
};

export default function AboutPage() {
  const settings = repo.getSettings();

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Breadcrumb & Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-semibold text-brand-600 uppercase tracking-wider mb-2">
            <Link href="/" className="hover:underline">Trang chủ</Link> / Giới thiệu doanh nghiệp
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-navy-text tracking-tight leading-tight">
            Cầu Nối Giữa Công Nghệ, Nhu Cầu Vận Hành Và Cơ Hội Thị Trường
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Công ty TNHH Tân Hoàng Nga được thành lập với sứ mệnh đưa công nghệ đến đúng người, đúng quy trình và đúng thời điểm; biến những nền tảng số thành kết quả có thể triển khai, sử dụng và đo lường thực chất.
          </p>
        </div>

        {/* Corporate Legal Card */}
        <div className="p-8 rounded-3xl bg-white shadow-card border border-slate-200/80 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tên pháp lý</span>
            <h4 className="text-sm font-extrabold text-navy-text">{settings.legalName}</h4>
            <p className="text-xs text-slate-500">Thành lập tại TP. Hà Nội</p>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mã số thuế</span>
            <h4 className="text-sm font-extrabold text-navy-text font-mono">{settings.taxId}</h4>
            <p className="text-xs text-emerald-600 font-semibold">Đang hoạt động hợp pháp</p>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Người đại diện</span>
            <h4 className="text-sm font-extrabold text-navy-text">{settings.representative}</h4>
            <p className="text-xs text-slate-500">{settings.representativeTitle}</p>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Đối tác công nghệ</span>
            <h4 className="text-sm font-extrabold text-brand-600">Công ty CP ADT Quốc tế</h4>
            <p className="text-xs text-slate-500">{settings.partnerContractNumber}</p>
          </div>
        </div>

        {/* Story & Positioning */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-xs font-bold uppercase">
              <Building2 className="w-3.5 h-3.5" />
              <span>Câu Chuyện Phát Triển</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-text">
              Lựa Chọn Vai Trò Tích Hợp Và Triển Khai Thực Chất
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Tân Hoàng Nga hình thành trong bối cảnh doanh nghiệp, chính quyền cơ sở và các hệ sinh thái địa phương cùng đứng trước một yêu cầu mới: không chỉ hiện diện trên môi trường số, mà phải biết tổ chức dữ liệu, khai thác AI và kết nối được với khách hàng, người dân hoặc đối tác.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Công ty lựa chọn con đường phát triển dựa trên ba năng lực: <strong>kết nối thị trường</strong>, <strong>triển khai có trách nhiệm</strong> và <strong>đồng hành đến khi khách hàng sử dụng thành thạo giải pháp</strong>.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-6">
            <h3 className="text-xl font-bold text-navy-text">5 Lĩnh Vực Hoạt Động Trọng Tâm</h3>
            <ul className="space-y-3.5 text-sm text-slate-700">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <span>Phân phối, tư vấn và triển khai giải pháp AI — chuyển đổi số.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <span>Tổ chức chuẩn hóa dữ liệu, đào tạo người dùng và hỗ trợ vận hành sau nghiệm thu.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <span>Phát triển nền tảng thương hiệu số cho địa phương và ngành hàng nông sản.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <span>Kết nối doanh nghiệp trong nước với khách hàng, nhà đầu tư và buyer quốc tế.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <span>Truyền thông, xúc tiến thương mại và xây dựng hệ sinh thái đối tác.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Sub Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <Link
            href="/gioi-thieu/tam-nhin-su-menh"
            className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-brand-300 hover:shadow-card-hover transition-all group"
          >
            <Target className="w-8 h-8 text-brand-600 mb-3" />
            <h4 className="text-base font-bold text-navy-text group-hover:text-brand-600 transition-colors mb-1">
              Tầm nhìn & 5 Giá trị cốt lõi
            </h4>
            <p className="text-xs text-slate-500 mb-3">Thực chất • Tin cậy • Đổi mới có trách nhiệm • Hợp tác cùng thành công • Bền vững</p>
            <span className="text-xs font-bold text-brand-600 flex items-center gap-1">
              Xem chi tiết <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          <Link
            href="/gioi-thieu/nang-luc-loi-the"
            className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-brand-300 hover:shadow-card-hover transition-all group"
          >
            <Award className="w-8 h-8 text-cyan-600 mb-3" />
            <h4 className="text-base font-bold text-navy-text group-hover:text-brand-600 transition-colors mb-1">
              Năng lực & Lợi thế cạnh tranh
            </h4>
            <p className="text-xs text-slate-500 mb-3">Tư vấn use case, kiến trúc Multi-Model AI, Cloud & Self-host linh hoạt.</p>
            <span className="text-xs font-bold text-brand-600 flex items-center gap-1">
              Xem chi tiết <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          <Link
            href="/gioi-thieu/ban-lanh-dao"
            className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-brand-300 hover:shadow-card-hover transition-all group"
          >
            <Users className="w-8 h-8 text-emerald-600 mb-3" />
            <h4 className="text-base font-bold text-navy-text group-hover:text-brand-600 transition-colors mb-1">
              Ban lãnh đạo & Vận hành
            </h4>
            <p className="text-xs text-slate-500 mb-3">Mô hình tổ chức tinh gọn lấy dự án và khách hàng làm trung tâm.</p>
            <span className="text-xs font-bold text-brand-600 flex items-center gap-1">
              Xem chi tiết <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>

      </div>
    </div>
  );
}
