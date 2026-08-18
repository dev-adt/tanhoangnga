import React from 'react';
import { repo } from '@/lib/store/repository';
import { formatDateVi } from '@/lib/utils';
import { History, Shield, Clock, Terminal } from 'lucide-react';

export const metadata = {
  title: 'Nhật Ký Kiểm Toán (Audit Logs) — Dashboard Tân Hoàng Nga',
};

export default function DashboardAuditLogsPage() {
  const logs = repo.getAuditLogs(50);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-navy-text tracking-tight">
          Nhật Ký Hoạt Động & Kiểm Toán Hệ Thống (Audit Logs)
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Ghi nhận toàn bộ thao tác đăng nhập, chỉnh sửa nội dung, ghim bài, đổi phân quyền và cấu hình website.
        </p>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Thời gian</th>
                <th className="p-4">Người thực hiện (Actor)</th>
                <th className="p-4">Hành động</th>
                <th className="p-4">Đối tượng (Entity)</th>
                <th className="p-4">Chi tiết tóm tắt</th>
                <th className="p-4">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                  
                  <td className="p-4 text-slate-500 whitespace-nowrap">
                    {new Date(log.createdAt).toLocaleString('vi-VN')}
                  </td>

                  <td className="p-4 font-sans font-bold text-navy-text">
                    {log.actorName}
                  </td>

                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-brand-50 text-brand-700 font-bold">
                      {log.action}
                    </span>
                  </td>

                  <td className="p-4 text-slate-600 font-bold">
                    {log.entity}
                  </td>

                  <td className="p-4 font-sans text-slate-700 max-w-md">
                    {log.summary}
                  </td>

                  <td className="p-4 text-slate-400">
                    {log.ipAddress}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
