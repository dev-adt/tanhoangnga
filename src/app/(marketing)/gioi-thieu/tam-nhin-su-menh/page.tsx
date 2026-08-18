import React from 'react';
import Link from 'next/link';
import { Target, Compass, Heart, ShieldCheck, RefreshCw, Handshake, Sprout, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Tầm nhìn, Sứ mệnh & 5 Giá trị Cốt lõi — Tân Hoàng Nga',
  description: 'Tầm nhìn 2035, sứ mệnh phục vụ và 5 giá trị cốt lõi: Thực chất, Tin cậy, Đổi mới có trách nhiệm, Hợp tác cùng thành công và Bền vững.'
};

export default function VisionMissionPage() {
  const values = [
    {
      name: 'Thực chất',
      icon: Target,
      color: 'text-blue-600 bg-blue-50',
      action: 'Bắt đầu từ bài toán thực tế, thiết kế tiêu chí nghiệm thu rõ ràng và đo lường mức độ sử dụng thường xuyên.'
    },
    {
      name: 'Tin cậy',
      icon: ShieldCheck,
      color: 'text-cyan-600 bg-cyan-50',
      action: 'Công bố đúng phạm vi, nguồn dữ liệu, giới hạn kỹ thuật và trách nhiệm pháp lý của từng bên.'
    },
    {
      name: 'Đổi mới có trách nhiệm',
      icon: RefreshCw,
      color: 'text-amber-600 bg-amber-50',
      action: 'AI đóng vai trò hỗ trợ con người; quyết định quan trọng luôn do người có thẩm quyền phê duyệt.'
    },
    {
      name: 'Hợp tác cùng thành công',
      icon: Handshake,
      color: 'text-indigo-600 bg-indigo-50',
      action: 'Phân vai minh bạch, chia sẻ quyền lợi, chi phí và trách nhiệm rõ ràng trong mọi thỏa thuận.'
    },
    {
      name: 'Bền vững',
      icon: Sprout,
      color: 'text-emerald-600 bg-emerald-50',
      action: 'Ưu tiên xây dựng năng lực vận hành lâu dài cho khách hàng thay vì các hiệu ứng trình diễn ngắn hạn.'
    }
  ];

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Breadcrumb & Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-semibold text-brand-600 uppercase tracking-wider mb-2">
            <Link href="/" className="hover:underline">Trang chủ</Link> / <Link href="/gioi-thieu" className="hover:underline">Giới thiệu</Link> / Tầm nhìn & Sứ mệnh
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-navy-text tracking-tight leading-tight">
            Tầm Nhìn 2035 & 5 Giá Trị Cốt Lõi
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Bản sắc chiến lược của Tân Hoàng Nga đặt trọng tâm vào giá trị thực, sự minh bạch và khả năng phát triển lâu dài của hệ sinh thái đối tác.
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Vision */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-brand-600 to-navy-dark text-white shadow-xl relative overflow-hidden">
            <div className="w-14 h-14 rounded-2xl bg-white/10 text-cyan-accent flex items-center justify-center mb-6">
              <Compass className="w-7 h-7" />
            </div>
            <div className="text-xs font-bold text-cyan-accent uppercase tracking-wider mb-2">Mục tiêu dài hạn</div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">Tầm Nhìn Đến Năm 2035</h2>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              Trở thành doanh nghiệp tích hợp và triển khai giải pháp AI — chuyển đổi số đáng tin cậy hàng đầu tại Việt Nam; có năng lực nổi bật trong chính quyền cơ sở, quản trị doanh nghiệp, thương hiệu số địa phương và kết nối thương mại quốc tế cho các ngành hàng chủ lực.
            </p>
          </div>

          {/* Mission */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white shadow-card border border-slate-200/80 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-6">
                <Target className="w-7 h-7" />
              </div>
              <div className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-2">Trọng trách phụng sự</div>
              <h2 className="text-2xl sm:text-3xl font-black text-navy-text mb-4">Sứ Mệnh</h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Đưa công nghệ đến đúng người, đúng quy trình và đúng thời điểm; giúp tổ chức khai thác tri thức tốt hơn, doanh nghiệp vận hành hiệu quả hơn, địa phương được nhận diện rõ hơn và sản phẩm Việt Nam tiếp cận thị trường rộng hơn.
              </p>
            </div>
          </div>

        </div>

        {/* 5 Core Values */}
        <div>
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-xs font-bold uppercase mb-2">
              <Heart className="w-3.5 h-3.5" />
              <span>Kim chỉ nam hành động</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-text">5 Giá Trị Cốt Lõi Của Tân Hoàng Nga</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div key={i} className="p-7 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-card-hover transition-all">
                <div className={`w-12 h-12 rounded-2xl ${v.color} flex items-center justify-center mb-4`}>
                  <v.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-navy-text mb-2">{v.name}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{v.action}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
