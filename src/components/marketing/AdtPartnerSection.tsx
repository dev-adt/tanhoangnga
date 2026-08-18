import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Cpu, ArrowRight, CheckCircle2, Award, FileText } from 'lucide-react';

export function AdtPartnerSection() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-brand-100/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Partnership Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 text-brand-600 text-xs font-extrabold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-4 h-4 text-brand-600" />
            <span>Quan Hệ Đối Tác Chiến Lược</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-navy-text tracking-tight">
            Hợp Tác Chiến Lược Cùng ADT Quốc Tế
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Hợp tác theo <strong>Hợp đồng số 203-140826/ADT</strong> tạo nền tảng kết hợp vững chắc giữa năng lực nghiên cứu phát triển công nghệ lõi của ADT với năng lực phát triển thị trường và tổ chức triển khai của Tân Hoàng Nga.
          </p>
        </div>

        {/* Division of Roles Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* ADT Role */}
          <div className="p-7 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 relative">
            <div className="w-12 h-12 rounded-2xl bg-brand-500 text-white flex items-center justify-center shadow-glow mb-4">
              <Cpu className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">Chủ thể công nghệ</div>
            <h3 className="text-xl font-black text-navy-text mb-3">Công ty CP ADT Quốc tế</h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
              Chịu trách nhiệm nghiên cứu phát triển nền tảng, kiến trúc kỹ thuật, lộ trình công nghệ, xử lý lỗi lõi (L2/L3) và cập nhật phiên bản.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                <span>Kiến trúc Multi-Model AI Router & Data Layer</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                <span>Giấy chứng nhận Quyền tác giả phần mềm số 3794/2026/QTG</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                <span>Bảo trì hệ thống lõi và nâng cấp thuật toán định kỳ</span>
              </li>
            </ul>
          </div>

          {/* Tân Hoàng Nga Role */}
          <div className="p-7 sm:p-8 rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-navy-dark text-white relative shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-white text-brand-600 flex items-center justify-center shadow-lg mb-4 font-black text-xl">
              T
            </div>
            <div className="text-xs font-bold text-cyan-accent uppercase tracking-wider mb-1">Đầu mối thị trường & Triển khai</div>
            <h3 className="text-xl font-black text-white mb-3">Công ty TNHH Tân Hoàng Nga</h3>
            <p className="text-xs sm:text-sm text-blue-100 mb-5 leading-relaxed">
              Khảo sát nhu cầu thực tế, tổ chức chuẩn hóa dữ liệu bản địa, đào tạo người dùng, hỗ trợ tuyến 1 và đồng hành đến khi khách hàng ứng dụng thành thạo.
            </p>
            <ul className="space-y-2.5 text-xs text-blue-50">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-mint-accent shrink-0 mt-0.5" />
                <span>Tư vấn giải pháp và khảo sát use case chuyên sâu</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-mint-accent shrink-0 mt-0.5" />
                <span>Bản địa hóa dữ liệu 20% đặc thù từng địa phương / doanh nghiệp</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-mint-accent shrink-0 mt-0.5" />
                <span>Customer Success & hỗ trợ vận hành thường nhật</span>
              </li>
            </ul>
          </div>

          {/* Customer / Stakeholder Role */}
          <div className="p-7 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 relative">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-sm mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">Chủ quyền dữ liệu</div>
            <h3 className="text-xl font-black text-navy-text mb-3">Cơ quan & Khách hàng</h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
              Giữ toàn quyền sở hữu, phê duyệt và kiểm soát đối với dữ liệu, văn bản và quy trình nghiệp vụ nội bộ của đơn vị mình.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Toàn quyền kiểm soát và phê duyệt dữ liệu đầu vào</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Quyết định hành chính và nghiệp vụ thuộc về cán bộ/quản lý</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Tùy chọn linh hoạt lưu trữ Cloud hoặc Máy chủ riêng (Self-host)</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Synergy CTA Bar */}
        <div className="mt-10 p-6 rounded-2xl bg-blue-50 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-3 text-slate-700">
            <FileText className="w-5 h-5 text-brand-600 shrink-0" />
            <span>
              Mọi công bố, số liệu dẫn chiếu và phạm vi hợp tác được thực hiện minh bạch, tôn trọng đúng cam kết Hợp đồng số 203-140826/ADT.
            </span>
          </div>
          <Link
            href="/doi-tac"
            className="font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 shrink-0"
          >
            Tìm hiểu chính sách đối tác <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
