'use client';

import React, { useState, useEffect } from 'react';
import { Lead, LeadStatus } from '@/types';
import { formatDateVi } from '@/lib/utils';
import { Inbox, Phone, Mail, Building2, Clock, CheckCircle2, MessageSquare, Plus, Search, Filter, ShieldCheck } from 'lucide-react';

export default function DashboardLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [noteInput, setNoteInput] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      if (data.success) {
        setLeads(data.leads);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUpdateStatus = async (leadId: string, newStatus: LeadStatus) => {
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, actorName: 'Bùi Thái Hoàng' })
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Đã chuyển trạng thái sang: ${newStatus}`);
        fetchLeads();
        if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead(data.lead);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddNote = async (leadId: string) => {
    if (!noteInput.trim()) return;
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          status: selectedLead?.status || 'IN_PROGRESS', 
          note: noteInput.trim(),
          actorName: 'Bùi Thái Hoàng'
        })
      });
      const data = await res.json();
      if (data.success) {
        showToast('Đã thêm ghi chú xử lý!');
        setNoteInput('');
        setSelectedLead(data.lead);
        fetchLeads();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredLeads = leads.filter(l => {
    const matchStatus = filterStatus === 'ALL' || l.status === filterStatus;
    const matchSearch = !searchQuery || 
      l.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery);
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
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
          Quản Lý Yêu Cầu Tư Vấn & CRM Lead
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Tiếp nhận và theo dõi luồng xử lý cơ hội từ các cơ quan, doanh nghiệp và đối tác.
        </p>
      </div>

      {/* Status & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-slate-200">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {['ALL', 'NEW', 'IN_PROGRESS', 'QUALIFIED', 'CLOSED'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors shrink-0 ${
                filterStatus === st 
                  ? 'bg-brand-600 text-white shadow-sm' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st === 'ALL' ? 'Tất cả' : st}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <input
            type="text"
            placeholder="Tìm theo tên, đơn vị, SĐT..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-brand-500 outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Leads Table & Detail Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Table (8 cols or 12 if none selected) */}
        <div className={`${selectedLead ? 'lg:col-span-7' : 'lg:col-span-12'} bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Khách hàng / Đơn vị</th>
                  <th className="p-4">Giải pháp quan tâm</th>
                  <th className="p-4">Trạng thái</th>
                  <th className="p-4">Ngày gửi</th>
                  <th className="p-4 text-right">Chi tiết</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map((lead) => (
                  <tr 
                    key={lead.id} 
                    onClick={() => setSelectedLead(lead)}
                    className={`hover:bg-slate-50/80 cursor-pointer transition-colors ${
                      selectedLead?.id === lead.id ? 'bg-brand-50/60' : ''
                    }`}
                  >
                    <td className="p-4">
                      <div className="font-bold text-navy-text text-sm">{lead.fullName}</div>
                      <div className="text-slate-500 text-xs">{lead.organization}</div>
                      <div className="text-[11px] text-brand-600 font-mono mt-0.5">{lead.phone}</div>
                    </td>

                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold text-[11px]">
                        {lead.solutionInterest}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        lead.status === 'NEW' ? 'bg-emerald-100 text-emerald-700' :
                        lead.status === 'IN_PROGRESS' ? 'bg-amber-100 text-amber-700' :
                        lead.status === 'QUALIFIED' ? 'bg-blue-100 text-blue-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {lead.status}
                      </span>
                    </td>

                    <td className="p-4 text-slate-500 text-[11px]">
                      {formatDateVi(lead.createdAt)}
                    </td>

                    <td className="p-4 text-right">
                      <button
                        type="button"
                        className="px-2.5 py-1 rounded-lg text-xs font-bold text-brand-600 bg-brand-50 hover:bg-brand-100"
                      >
                        Xem
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lead Detail Panel (5 cols) */}
        {selectedLead && (
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-navy-text">{selectedLead.fullName}</h3>
                <span className="text-xs text-slate-500">{selectedLead.organization}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                Đóng
              </button>
            </div>

            {/* Contact Details */}
            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-600" />
                <span>Số điện thoại: <strong>{selectedLead.phone}</strong></span>
              </div>
              {selectedLead.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand-600" />
                  <span>Email: <strong>{selectedLead.email}</strong></span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Inbox className="w-4 h-4 text-brand-600" />
                <span>Quan tâm: <strong>{selectedLead.solutionInterest}</strong></span>
              </div>
              {selectedLead.utmSource && (
                <div className="flex items-center gap-2 text-slate-400">
                  <span>Nguồn UTM: <strong>{selectedLead.utmSource} / {selectedLead.utmCampaign || 'organic'}</strong></span>
                </div>
              )}
            </div>

            {/* Lead Message */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs">
              <span className="font-bold text-slate-700 block mb-1">Nội dung yêu cầu / Bài toán:</span>
              <p className="text-slate-600 leading-relaxed">{selectedLead.message || 'Không có mô tả chi tiết.'}</p>
            </div>

            {/* Status Change Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Chuyển trạng thái:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['NEW', 'IN_PROGRESS', 'QUALIFIED', 'CLOSED'] as LeadStatus[]).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => handleUpdateStatus(selectedLead.id, st)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      selectedLead.status === st 
                        ? 'border-brand-500 bg-brand-50 text-brand-600'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes / Activities */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Nhật ký xử lý ({selectedLead.notes?.length || 0})
              </span>
              
              <div className="space-y-2 max-h-36 overflow-y-auto">
                {selectedLead.notes && selectedLead.notes.length > 0 ? (
                  selectedLead.notes.map((note, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-slate-50 text-[11px] text-slate-600 border border-slate-100">
                      {note}
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400">Chưa có ghi chú nào.</p>
                )}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Thêm ghi chú cuộc gọi, kết quả tư vấn..."
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-brand-500"
                />
                <button
                  type="button"
                  onClick={() => handleAddNote(selectedLead.id)}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700"
                >
                  Lưu
                </button>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
