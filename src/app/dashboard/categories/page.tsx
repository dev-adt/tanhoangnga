'use client';

import React, { useState, useEffect } from 'react';
import { 
  FolderTree, 
  Plus, 
  Edit3, 
  Eye, 
  EyeOff, 
  Trash2, 
  AlertTriangle, 
  Check, 
  X, 
  Layers,
  FileText,
  HelpCircle
} from 'lucide-react';
import { Category } from '@/types';
import { useAuth } from '@/lib/auth/authContext';

export default function DashboardCategoriesPage() {
  const { currentUser } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Modal States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);

  // Form State
  const [formData, setFormData] = useState({ name: '', slug: '', description: '' });
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  const isSuperAdmin = currentUser?.roleSlug === 'super_admin';

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/categories?includeHidden=true');
      const json = await res.json();
      if (json.success) {
        setCategories(json.data);
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: 'Không thể tải danh sách chuyên mục.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleNameChange = (name: string) => {
    const slug = name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    setFormData(prev => ({ ...prev, name, slug: editingCategory ? prev.slug : slug }));
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.slug) return;

    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, actorName: currentUser?.name || 'Super Admin' }),
      });
      const json = await res.json();
      if (json.success) {
        showToast(`Đã tạo chuyên mục "${json.data.name}" thành công!`);
        setIsCreateModalOpen(false);
        setFormData({ name: '', slug: '', description: '' });
        fetchCategories();
      } else {
        showToast(json.error || 'Lỗi khi tạo chuyên mục', 'error');
      }
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory || !formData.name || !formData.slug) return;

    try {
      const res = await fetch(`/api/categories/${editingCategory.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, actorName: currentUser?.name || 'Super Admin' }),
      });
      const json = await res.json();
      if (json.success) {
        showToast(`Đã cập nhật chuyên mục "${json.data.name}" thành công!`);
        setEditingCategory(null);
        fetchCategories();
      } else {
        showToast(json.error || 'Lỗi khi cập nhật chuyên mục', 'error');
      }
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleToggleHidden = async (cat: Category) => {
    try {
      const res = await fetch(`/api/categories/${cat.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggle-hidden', actorName: currentUser?.name || 'Super Admin' }),
      });
      const json = await res.json();
      if (json.success) {
        showToast(
          json.data.isHidden 
            ? `Đã ẩn chuyên mục "${cat.name}". Bài viết vẫn lưu trong data nhưng không hiện ra website.`
            : `Đã hiện chuyên mục "${cat.name}" ra website công khai!`
        );
        fetchCategories();
      } else {
        showToast(json.error || 'Lỗi khi thay đổi trạng thái', 'error');
      }
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteSubmit = async () => {
    if (!deletingCategory) return;
    try {
      const res = await fetch(`/api/categories/${deletingCategory.id}?actorName=${encodeURIComponent(currentUser?.name || 'Super Admin')}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (json.success) {
        showToast(json.message);
        setDeletingCategory(null);
        setDeleteConfirmText('');
        fetchCategories();
      } else {
        showToast(json.error || 'Lỗi khi xóa chuyên mục', 'error');
      }
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Toast Feedback */}
      {feedback && (
        <div className={`p-4 rounded-2xl border flex items-center justify-between animate-in fade-in slide-in-from-top-2 ${
          feedback.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'
        }`}>
          <div className="flex items-center gap-2 text-sm font-medium">
            {feedback.type === 'success' ? <Check className="w-5 h-5 text-emerald-600" /> : <AlertTriangle className="w-5 h-5 text-rose-600" />}
            <span>{feedback.message}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-navy-text tracking-tight">
              Quản Lý Chuyên Mục Nội Dung
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-600 text-xs font-bold">
              {categories.length} chuyên mục
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Cấu hình danh mục topic cluster. Super Admin có toàn quyền Thêm, Sửa, Ẩn (giữ bài trong data) và Xóa (kèm xóa toàn bộ bài viết).
          </p>
        </div>

        {isSuperAdmin && (
          <button
            onClick={() => {
              setFormData({ name: '', slug: '', description: '' });
              setIsCreateModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold shadow-md shadow-brand-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm chuyên mục mới</span>
          </button>
        )}
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div 
            key={cat.id} 
            className={`p-6 rounded-3xl bg-white border transition-all shadow-sm flex flex-col justify-between ${
              cat.isHidden 
                ? 'border-amber-200 bg-amber-50/20 opacity-90' 
                : 'border-slate-200 hover:border-brand-200'
            }`}
          >
            <div>
              {/* Card Header & Status Badges */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <span className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold ${
                    cat.isHidden ? 'bg-amber-100 text-amber-700' : 'bg-brand-50 text-brand-600'
                  }`}>
                    <FolderTree className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-navy-text leading-tight">{cat.name}</h3>
                    <p className="text-xs font-mono text-brand-600">/{cat.slug}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 shrink-0">
                  {cat.isHidden ? (
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold inline-flex items-center gap-1">
                      <EyeOff className="w-3 h-3" /> Đang ẩn
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold inline-flex items-center gap-1">
                      <Eye className="w-3 h-3" /> Công khai
                    </span>
                  )}
                  <span className="text-[11px] font-semibold text-slate-500">
                    {cat.postCount || 0} bài viết
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed min-h-[36px] line-clamp-2">
                {cat.description || 'Chưa có mô tả chuyên mục.'}
              </p>
            </div>

            {/* Actions for Super Admin */}
            {isSuperAdmin && (
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => handleToggleHidden(cat)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors inline-flex items-center gap-1.5 cursor-pointer ${
                    cat.isHidden 
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100' 
                      : 'border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100'
                  }`}
                  title={cat.isHidden ? 'Hiện lại ngoài website' : 'Ẩn khỏi trang chủ và danh sách bài viết'}
                >
                  {cat.isHidden ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{cat.isHidden ? 'Hiện công khai' : 'Ẩn chuyên mục'}</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      setEditingCategory(cat);
                      setFormData({ name: cat.name, slug: cat.slug, description: cat.description || '' });
                    }}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-brand-600 hover:bg-slate-100 transition-colors cursor-pointer"
                    title="Chỉnh sửa chuyên mục"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setDeletingCategory(cat);
                      setDeleteConfirmText('');
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Xóa chuyên mục (kèm toàn bộ bài viết)"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CREATE CATEGORY MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full p-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-brand-50 text-brand-600">
                  <Plus className="w-5 h-5" />
                </span>
                <h3 className="text-lg font-bold text-navy-text">Thêm Chuyên Mục Mới</h3>
              </div>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tên chuyên mục *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Chuyển đổi số Doanh nghiệp"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Đường dẫn Slug (URL) *</label>
                <input
                  type="text"
                  required
                  placeholder="chuyen-doi-so-doanh-nghiep"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mô tả ngắn</label>
                <textarea
                  rows={3}
                  placeholder="Mô tả định hướng nội dung và phân loại topic cluster..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold shadow-md shadow-brand-500/20 transition-all cursor-pointer"
                >
                  Tạo chuyên mục
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT CATEGORY MODAL */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full p-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-brand-50 text-brand-600">
                  <Edit3 className="w-5 h-5" />
                </span>
                <h3 className="text-lg font-bold text-navy-text">Chỉnh Sửa Chuyên Mục</h3>
              </div>
              <button onClick={() => setEditingCategory(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tên chuyên mục *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Đường dẫn Slug *</label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mô tả ngắn</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold shadow-md shadow-brand-500/20 transition-all cursor-pointer"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingCategory && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-rose-200 max-w-md w-full p-6 animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-navy-text text-center mb-1">
              Xác Nhận Xóa Chuyên Mục?
            </h3>
            
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 my-4 text-xs text-rose-800 leading-relaxed">
              <p className="font-bold mb-1">⚠️ CẢNH BÁO QUAN TRỌNG TỪ HỆ THỐNG:</p>
              <p>
                Xóa chuyên mục <span className="font-bold underline">{deletingCategory.name}</span> sẽ <strong>XÓA VĨNH VIỄN TOÀN BỘ {deletingCategory.postCount || 0} BÀI VIẾT</strong> thuộc chuyên mục này khỏi cơ sở dữ liệu!
              </p>
              <p className="mt-2 text-slate-600">
                💡 <em>Nếu chỉ muốn tạm ẩn khỏi trang chủ & danh sách public, hãy dùng chức năng <strong>"Ẩn chuyên mục"</strong> thay vì Xóa.</em>
              </p>
            </div>

            <div className="space-y-3 mb-5">
              <label className="block text-xs font-bold text-slate-700">
                Nhập chữ <span className="font-mono text-rose-600 select-all font-black">XOA CHUYEN MUC</span> để xác nhận:
              </label>
              <input
                type="text"
                placeholder="XOA CHUYEN MUC"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-mono text-center focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeletingCategory(null)}
                className="w-full py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                disabled={deleteConfirmText.trim().toUpperCase() !== 'XOA CHUYEN MUC'}
                onClick={handleDeleteSubmit}
                className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold shadow-md shadow-rose-600/20 transition-all cursor-pointer"
              >
                Xác nhận Xóa
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
