import React from 'react';
import Link from 'next/link';
import { Building2, Phone, Mail, MapPin, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import { LeadForm } from '@/components/marketing/LeadForm';
import { repo } from '@/lib/store/repository';

export const metadata = {
  title: 'Liên Hệ & Đăng Ký Tư Vấn — Tân Hoàng Nga',
  description: 'Thông tin liên hệ chính thức, địa chỉ văn phòng, hotline tư vấn giải pháp AI và form tiếp nhận yêu cầu Công ty TNHH Tân Hoàng Nga.'
};

export default function ContactPage() {
  const settings = repo.getSettings();

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-semibold text-brand-600 uppercase tracking-wider mb-2">
            <Link href="/" className="hover:underline">Trang chủ</Link> / Liên hệ & Tư vấn
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-navy-text tracking-tight leading-tight">
            Kết Nối & Hợp Tác Cùng Tân Hoàng Nga
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Chúng tôi luôn sẵn sàng lắng nghe bài toán thực tế của Quý cơ quan, doanh nghiệp và đối tác để cùng thiết kế giải pháp chuyển đổi số tối ưu nhất.
          </p>
        </div>

        {/* Contact Info & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Info Panel (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-8 rounded-3xl bg-white shadow-card border border-slate-200/80 space-y-6">
              <h3 className="text-xl font-bold text-navy-text">Thông Tin Pháp Lý & Trụ Sở</h3>
              
              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-navy-text block">{settings.legalName}</span>
                    <span className="text-xs text-slate-500">Mã số thuế: {settings.taxId}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-navy-text block">Địa chỉ trụ sở:</span>
                    <span className="text-slate-600">{settings.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-navy-text block">Hotline tư vấn trực tiếp:</span>
                    <span className="text-slate-600 font-bold text-brand-600">{settings.phone} ({settings.representative})</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-navy-text block">Email liên hệ:</span>
                    <span className="text-slate-600">{settings.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-navy-text block">Thời gian làm việc:</span>
                    <span className="text-slate-600">Thứ 2 – Thứ 6: 08:00 – 17:30</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                <p className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Đối tác phân phối & triển khai của ADT Quốc tế</span>
                </p>
              </div>
            </div>

          </div>

          {/* Right Lead Form (7 cols) */}
          <div className="lg:col-span-7">
            <LeadForm />
          </div>

        </div>

      </div>
    </div>
  );
}
