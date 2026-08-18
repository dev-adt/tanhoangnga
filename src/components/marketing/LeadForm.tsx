'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Send, CheckCircle2, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';

interface LeadFormProps {
  defaultSolution?: string;
  className?: string;
  title?: string;
  subtitle?: string;
}

function UtmCapture({ onUtmCapture }: { onUtmCapture: (utm: { utmSource?: string; utmMedium?: string; utmCampaign?: string }) => void }) {
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams) {
      onUtmCapture({
        utmSource: searchParams.get('utm_source') || 'direct',
        utmMedium: searchParams.get('utm_medium') || '',
        utmCampaign: searchParams.get('utm_campaign') || ''
      });
    }
  }, [searchParams, onUtmCapture]);
  return null;
}

export function LeadForm({ 
  defaultSolution = 'adt-govina-ai',
  className = '',
  title = "Đăng Ký Tư Vấn & Khảo Sát Nhu Cầu",
  subtitle = "Đội ngũ chuyên gia Tân Hoàng Nga sẽ liên hệ phản hồi trong vòng 24 giờ làm việc."
}: LeadFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    email: '',
    phone: '',
    solutionInterest: defaultSolution,
    message: '',
    consent: true,
    company_website_hp: ''
  });

  const [utm, setUtm] = useState<{ utmSource?: string; utmMedium?: string; utmCampaign?: string }>({
    utmSource: 'direct'
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUtmCapture = React.useCallback((captured: { utmSource?: string; utmMedium?: string; utmCampaign?: string }) => {
    setUtm(captured);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot bot check
    if (formData.company_website_hp) {
      setStatus('success');
      return;
    }

    if (!formData.fullName || !formData.organization || !formData.phone) {
      setErrorMessage('Vui lòng điền đầy đủ Họ tên, Đơn vị và Số điện thoại liên hệ.');
      return;
    }

    if (!formData.consent) {
      setErrorMessage('Vui lòng đồng ý với chính sách xử lý dữ liệu và bảo mật.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          organization: formData.organization,
          email: formData.email,
          phone: formData.phone,
          solutionInterest: formData.solutionInterest,
          message: formData.message,
          consent: formData.consent,
          ...utm
        })
      });

      if (!res.ok) throw new Error('Không thể gửi thông tin. Vui lòng thử lại sau.');

      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err?.message || 'Có lỗi xảy ra khi gửi yêu cầu. Vui lòng liên hệ trực tiếp hotline: 0856 040 205.');
    }
  };

  if (status === 'success') {
    return (
      <div className={`p-8 sm:p-10 rounded-3xl bg-white shadow-xl border border-emerald-200 text-center animate-in fade-in zoom-in-95 duration-300 ${className}`}>
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-extrabold text-navy-text">Tiếp Nhận Thành Công!</h3>
        <p className="text-slate-600 mt-2 max-w-md mx-auto text-sm leading-relaxed">
          Cảm ơn Quý khách <strong>{formData.fullName}</strong> ({formData.organization}) đã quan tâm đến giải pháp của Tân Hoàng Nga. Chuyên viên tư vấn sẽ liên hệ theo số điện thoại <strong>{formData.phone}</strong> trong thời gian sớm nhất.
        </p>
        <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Thông tin được bảo mật theo quy định lưu trữ dữ liệu Tân Hoàng Nga</span>
        </div>
        <button
          type="button"
          onClick={() => {
            setStatus('idle');
            setFormData({
              fullName: '',
              organization: '',
              email: '',
              phone: '',
              solutionInterest: defaultSolution,
              message: '',
              consent: true,
              company_website_hp: ''
            });
          }}
          className="mt-6 px-6 py-2.5 rounded-xl text-xs font-bold text-brand-600 bg-brand-50 hover:bg-brand-100 transition-colors"
        >
          Gửi yêu cầu khác
        </button>
      </div>
    );
  }

  return (
    <div className={`p-6 sm:p-10 rounded-3xl bg-white shadow-xl border border-slate-200/80 relative overflow-hidden ${className}`}>
      
      {/* Suspense wrapper for UTM Search Params */}
      <Suspense fallback={null}>
        <UtmCapture onUtmCapture={handleUtmCapture} />
      </Suspense>

      {/* Decorative gradient corner */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-brand-100/40 via-cyan-100/20 to-transparent pointer-events-none rounded-bl-full"></div>

      <div className="mb-6 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Tư vấn & Báo giá</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-navy-text tracking-tight">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {subtitle}
        </p>
      </div>

      {errorMessage && (
        <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
        {/* Anti-spam honeypot */}
        <input
          type="text"
          name="company_website_hp"
          value={formData.company_website_hp}
          onChange={(e) => setFormData({ ...formData, company_website_hp: e.target.value })}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Họ và tên <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="VD: Nguyễn Văn A"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Cơ quan / Doanh nghiệp <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="VD: UBND Phường... / Công ty TNHH..."
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Số điện thoại <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="VD: 0912 345 678"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email công tác
            </label>
            <input
              type="email"
              placeholder="VD: contact@donvi.gov.vn"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Nhóm giải pháp quan tâm <span className="text-rose-500">*</span>
          </label>
          <select
            value={formData.solutionInterest}
            onChange={(e) => setFormData({ ...formData, solutionInterest: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all outline-none"
          >
            <option value="adt-govina-ai">ADT Govina AI — Trợ lý AI Phường/Xã</option>
            <option value="orion-ai-business-os">Orion AI Business OS — Nền tảng Doanh nghiệp</option>
            <option value="dienbien-today">DienBien.Today — Thương hiệu số Địa phương</option>
            <option value="coffeevn-today">CoffeeVN.Today — Dữ liệu & Kết nối B2B Cà phê</option>
            <option value="partnership">Đề xuất Hợp tác Đối tác / Đại lý Phân phối</option>
            <option value="other">Tư vấn Chuyển đổi số & Khác</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Mô tả nhu cầu hoặc bài toán cụ thể
          </label>
          <textarea
            rows={3}
            placeholder="VD: Số lượng cán bộ cần sử dụng, hạ tầng máy chủ mong muốn (Cloud hay Self-host), quy mô vùng trồng..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all outline-none resize-none"
          />
        </div>

        <div className="flex items-start gap-2 pt-1">
          <input
            type="checkbox"
            id="consent"
            checked={formData.consent}
            onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
            className="mt-1 w-4 h-4 text-brand-500 rounded border-slate-300 focus:ring-brand-400"
          />
          <label htmlFor="consent" className="text-xs text-slate-500 leading-snug cursor-pointer">
            Tôi đồng ý để Công ty TNHH Tân Hoàng Nga lưu trữ và xử lý thông tin trên nhằm mục đích liên hệ tư vấn giải pháp.
          </label>
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full py-3.5 rounded-xl font-extrabold text-white text-sm bg-gradient-to-r from-brand-600 via-brand-500 to-cyan-500 hover:shadow-glow transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? (
            <span>Đang gửi thông tin...</span>
          ) : (
            <>
              <span>Gửi Yêu Cầu Tư Vấn & Khảo Sát</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
