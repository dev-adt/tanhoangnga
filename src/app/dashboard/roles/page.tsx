'use client';

import React, { useState, useEffect } from 'react';
import { Role, Permission } from '@/types';
import { Shield, Save, CheckCircle2, Lock, Check } from 'lucide-react';

export default function DashboardRolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoleId, setSelectedRoleId] = useState<string>('role-admin');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/roles');
      const data = await res.json();
      if (data.success) {
        setRoles(data.roles);
        setPermissions(data.permissions);
        if (!selectedRoleId && data.roles.length > 0) {
          setSelectedRoleId(data.roles[0].id);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const selectedRole = roles.find(r => r.id === selectedRoleId);

  const handleTogglePermission = (permSlug: string) => {
    if (!selectedRole || selectedRole.slug === 'super_admin') return;

    const currentPerms = new Set(selectedRole.permissions);
    if (currentPerms.has(permSlug)) {
      currentPerms.delete(permSlug);
    } else {
      currentPerms.add(permSlug);
    }

    const updatedRoles = roles.map(r => {
      if (r.id === selectedRoleId) {
        return { ...r, permissions: Array.from(currentPerms) };
      }
      return r;
    });

    setRoles(updatedRoles);
  };

  const handleSavePermissions = async () => {
    if (!selectedRole) return;
    setIsSaving(true);
    try {
      const res = await fetch('/api/roles', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roleId: selectedRole.id,
          permissions: selectedRole.permissions
        })
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Đã lưu phân quyền cho vai trò "${selectedRole.name}"!`);
        fetchRoles();
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Group permissions by category
  const groupedPerms = permissions.reduce((acc, p) => {
    acc[p.category] = acc[p.category] || [];
    acc[p.category].push(p);
    return acc;
  }, {} as Record<string, Permission[]>);

  const categoryLabels: Record<string, string> = {
    posts: 'Quản trị bài viết (Posts)',
    media: 'Quản trị Media',
    categories: 'Chuyên mục & Tag',
    users: 'Tài khoản người dùng',
    roles: 'Phân quyền & Vai trò',
    leads: 'Yêu cầu tư vấn (Leads)',
    settings: 'Cấu hình hệ thống',
    audit: 'Nhật ký kiểm toán'
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
      <div>
        <h1 className="text-2xl font-black text-navy-text tracking-tight">
          Ma Trận Phân Quyền Động (RBAC)
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Cấu hình chi tiết quyền hạn cho từng vai trò trong hệ thống theo Section 9 của plan.md.
        </p>
      </div>

      {/* Role Selection Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {roles.map((role) => (
          <button
            key={role.id}
            type="button"
            onClick={() => setSelectedRoleId(role.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 ${
              selectedRoleId === role.id
                ? 'bg-brand-600 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>{role.name}</span>
            {role.isSystem && (
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-black/20 text-white/90 uppercase">
                System
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Selected Role Card */}
      {selectedRole && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-black text-navy-text flex items-center gap-2">
                <span>{selectedRole.name}</span>
                <span className="text-xs text-slate-400 font-mono font-normal">({selectedRole.slug})</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">{selectedRole.description}</p>
            </div>

            {selectedRole.slug !== 'super_admin' ? (
              <button
                type="button"
                onClick={handleSavePermissions}
                disabled={isSaving}
                className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Đang lưu...' : 'Lưu cấu hình quyền'}</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-100">
                <Lock className="w-3.5 h-3.5" />
                <span>Super Admin có toàn bộ quyền hệ thống</span>
              </div>
            )}
          </div>

          {/* Permissions Matrix by Group */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(groupedPerms).map(([category, perms]) => (
              <div key={category} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {categoryLabels[category] || category}
                </h3>

                <div className="space-y-2">
                  {perms.map((p) => {
                    const isChecked = selectedRole.permissions.includes(p.slug) || selectedRole.slug === 'super_admin';
                    const isDisabled = selectedRole.slug === 'super_admin';

                    return (
                      <label
                        key={p.id}
                        className={`flex items-start gap-2.5 p-2 rounded-xl text-xs cursor-pointer transition-colors ${
                          isChecked ? 'bg-white text-navy-text font-semibold shadow-xs' : 'text-slate-500 hover:bg-white/60'
                        } ${isDisabled ? 'cursor-not-allowed opacity-80' : ''}`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          disabled={isDisabled}
                          onChange={() => handleTogglePermission(p.slug)}
                          className="mt-0.5 w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-400"
                        />
                        <div>
                          <div className="leading-tight">{p.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">{p.slug}</div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}
