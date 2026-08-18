'use client';

import React, { useState, useEffect } from 'react';
import { User, RoleSlug } from '@/types';
import { formatDateVi } from '@/lib/utils';
import { Users, Plus, Shield, CheckCircle2, AlertTriangle, Edit3, UserCheck, Lock } from 'lucide-react';

export default function DashboardUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roleSlug: 'editor' as RoleSlug,
    roleName: 'Biên tập viên (Editor)',
    status: 'ACTIVE' as any
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        showToast('Đã tạo tài khoản thành công!');
        setIsCreateModalOpen(false);
        setFormData({
          name: '',
          email: '',
          roleSlug: 'editor',
          roleName: 'Biên tập viên (Editor)',
          status: 'ACTIVE'
        });
        fetchUsers();
      } else {
        alert(data.error);
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy-text tracking-tight">
            Quản Lý Thành Viên & Tài Khoản
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Cấp quyền tài khoản, phân vai RBAC và bảo vệ an toàn cho hệ thống.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm thành viên mới</span>
        </button>
      </div>

      {/* Security Rule Box */}
      <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex items-start gap-3 text-xs text-blue-900">
        <Lock className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-bold">Quy tắc bảo mật hệ thống (plan.md §9.3):</strong>
          <span>Hệ thống bảo vệ nghiêm ngặt không cho phép xóa hoặc hạ quyền của Super Admin đang hoạt động duy nhất để tránh bị khóa hệ thống.</span>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Thành viên</th>
                <th className="p-4">Email</th>
                <th className="p-4">Vai trò (Role)</th>
                <th className="p-4">Trạng thái</th>
                <th className="p-4">Ngày tạo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold text-xs">
                        {user.name.charAt(0)}
                      </div>
                      <span className="font-bold text-navy-text text-sm">{user.name}</span>
                    </div>
                  </td>

                  <td className="p-4 text-slate-600 font-mono">
                    {user.email}
                  </td>

                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-lg bg-brand-50 text-brand-700 font-bold text-[11px]">
                      {user.roleName}
                    </span>
                  </td>

                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      user.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' :
                      user.status === 'INVITED' ? 'bg-amber-100 text-amber-700' :
                      'bg-rose-100 text-rose-700'
                    }`}>
                      {user.status}
                    </span>
                  </td>

                  <td className="p-4 text-slate-500">
                    {formatDateVi(user.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create User Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-navy-text">Thêm Thành Viên Mới</h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-xs text-slate-400 hover:text-slate-600">Đóng</button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Họ và tên</label>
                <input
                  type="text"
                  required
                  placeholder="VD: Nguyễn Văn B"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Email công tác</label>
                <input
                  type="email"
                  required
                  placeholder="user@tanhoangnga.vn"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Vai trò (Role)</label>
                <select
                  value={formData.roleSlug}
                  onChange={(e) => {
                    const slug = e.target.value as RoleSlug;
                    const nameMap: Record<string, string> = {
                      admin: 'Quản trị viên (Admin)',
                      editor: 'Biên tập viên (Editor)',
                      content_creator: 'Tác giả (Content Creator)',
                      viewer: 'Người xem (Viewer)'
                    };
                    setFormData({
                      ...formData,
                      roleSlug: slug,
                      roleName: nameMap[slug] || 'Editor'
                    });
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 outline-none"
                >
                  <option value="admin">Quản trị viên (Admin)</option>
                  <option value="editor">Biên tập viên (Editor)</option>
                  <option value="content_creator">Tác giả (Content Creator)</option>
                  <option value="viewer">Người xem (Viewer)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold text-white bg-brand-600 hover:bg-brand-700"
                >
                  Tạo tài khoản
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
