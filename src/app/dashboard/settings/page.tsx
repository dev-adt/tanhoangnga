'use client';

import React, { useState, useEffect } from 'react';
import { SiteSettings } from '@/types';
import { Settings, Save, CheckCircle2, Building2, Phone, Mail, Globe, ShieldCheck } from 'lucide-react';

export default function DashboardSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data.success) {
        setSettings(data.settings);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setIsSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      const data = await res.json();
      if (data.success) {
        showToast('Đã lưu cấu hình website thành công!');
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (!settings) return null;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-mint-accent" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-navy-text tracking-tight">
          Cấu Hình Website & Thông Tin Pháp Lý
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Quản trị thông tin doanh nghiệp, SEO mặc định, hotline và quan hệ đối tác theo plan.md.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Legal & Corporate Info */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-sm font-bold text-navy-text border-b border-slate-100 pb-3">
            <Building2 className="w-4 h-4 text-brand-600" />
            <span>Thông Tin Pháp Lý Doanh Nghiệp</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Tên pháp lý</label>
              <input
                type="text"
                value={settings.legalName}
                onChange={(e) => setSettings({ ...settings, legalName: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-navy-text outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Mã số thuế</label>
              <input
                type="text"
                value={settings.taxId}
                onChange={(e) => setSettings({ ...settings, taxId: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-bold text-navy-text outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Người đại diện / Tổng Giám đốc</label>
              <input
                type="text"
                value={settings.representative}
                onChange={(e) => setSettings({ ...settings, representative: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-navy-text outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Hotline tư vấn</label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-navy-text outline-none focus:border-brand-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 uppercase mb-1">Địa chỉ trụ sở</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-navy-text outline-none focus:border-brand-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 uppercase mb-1">Hợp đồng đối tác công nghệ ADT</label>
              <input
                type="text"
                value={settings.partnerContractNumber}
                onChange={(e) => setSettings({ ...settings, partnerContractNumber: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-navy-text outline-none focus:border-brand-500"
              />
            </div>
          </div>
        </div>

        {/* Global SEO Defaults */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-sm font-bold text-navy-text border-b border-slate-100 pb-3">
            <Globe className="w-4 h-4 text-brand-600" />
            <span>Cấu Hình SEO & Metadata Mặc Định</span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Default SEO Title</label>
              <input
                type="text"
                value={settings.defaultSeoTitle}
                onChange={(e) => setSettings({ ...settings, defaultSeoTitle: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-navy-text outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Default Meta Description</label>
              <textarea
                rows={3}
                value={settings.defaultMetaDescription}
                onChange={(e) => setSettings({ ...settings, defaultMetaDescription: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-navy-text outline-none focus:border-brand-500 resize-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Default Open Graph Image URL</label>
              <input
                type="text"
                value={settings.ogImage}
                onChange={(e) => setSettings({ ...settings, ogImage: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-mono text-slate-700 outline-none focus:border-brand-500"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Đang lưu cấu hình...' : 'Lưu toàn bộ cấu hình'}</span>
          </button>
        </div>

      </form>

    </div>
  );
}
