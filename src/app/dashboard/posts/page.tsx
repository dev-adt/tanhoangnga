'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Post, Category } from '@/types';
import { formatDateVi } from '@/lib/utils';
import { 
  FileText, PlusCircle, Search, Pin, Edit3, Trash2, 
  Eye, CheckCircle2, AlertCircle, Sparkles, Filter 
} from 'lucide-react';

export default function DashboardPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [pinModalPost, setPinModalPost] = useState<Post | null>(null);
  const [selectedPinOrder, setSelectedPinOrder] = useState<1 | 2 | 3>(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      if (data.success) {
        setPosts(data.posts);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleTogglePin = async (post: Post) => {
    if (post.status !== 'PUBLISHED') {
      alert('Chỉ bài viết ở trạng thái ĐÃ XUẤT BẢN (PUBLISHED) mới được ghim lên Trang chủ.');
      return;
    }

    if (post.isPinned) {
      // Unpin
      try {
        const res = await fetch(`/api/posts/${post.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isPinned: false, pinOrder: null })
        });
        if (res.ok) {
          showToast(`Đã bỏ ghim bài viết "${post.title}"`);
          fetchPosts();
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      // Open modal to select pin position (1, 2, or 3)
      setPinModalPost(post);
      setSelectedPinOrder(1);
    }
  };

  const handleConfirmPin = async () => {
    if (!pinModalPost) return;
    try {
      const res = await fetch(`/api/posts/${pinModalPost.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPinned: true, pinOrder: selectedPinOrder })
      });
      if (res.ok) {
        showToast(`Đã ghim bài viết vào vị trí #${selectedPinOrder}`);
        setPinModalPost(null);
        fetchPosts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePost = async (id: string, title: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa bài viết "${title}"?`)) return;
    try {
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast(`Đã xóa bài viết "${title}"`);
        fetchPosts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredPosts = posts.filter(p => {
    const matchStatus = filterStatus === 'ALL' || p.status === filterStatus;
    const matchSearch = !searchQuery || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  const pinnedCount = posts.filter(p => p.isPinned && p.status === 'PUBLISHED').length;

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
            Quản Lý Bài Viết & Tri Thức
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Xuất bản nội dung, quản lý SEO/GEO và ghim tối đa 3 bài viết nổi bật lên trang chủ.
          </p>
        </div>

        <Link
          href="/dashboard/posts/new"
          className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Tạo bài viết mới</span>
        </Link>
      </div>

      {/* Pinning Rule Notification Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Pin className="w-4 h-4 rotate-45" />
          </div>
          <div>
            <span className="font-bold text-navy-text">Trạng thái ghim Trang chủ: </span>
            <span className="font-mono font-bold text-brand-600">{pinnedCount}/3 bài đã ghim</span>
            <p className="text-[11px] text-slate-500">Trang chủ tự động lấy bài theo thứ tự ghim 1, 2, 3 và tự bù bằng bài mới nhất nếu chưa đủ 3 bài.</p>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-slate-200">
        
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {['ALL', 'PUBLISHED', 'DRAFT', 'IN_REVIEW', 'ARCHIVED'].map((st) => (
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

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <input
            type="text"
            placeholder="Tìm theo tiêu đề..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-brand-500 outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Bài viết</th>
                <th className="p-4">Chuyên mục</th>
                <th className="p-4">Trạng thái</th>
                <th className="p-4 text-center">Ghim trang chủ</th>
                <th className="p-4">Ngày cập nhật</th>
                <th className="p-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50/80 transition-colors">
                  
                  {/* Title & Excerpt */}
                  <td className="p-4 max-w-sm">
                    <div className="font-bold text-navy-text text-sm line-clamp-1">
                      {post.title}
                    </div>
                    <div className="text-slate-400 text-[11px] font-mono mt-0.5">
                      /{post.slug}
                    </div>
                  </td>

                  {/* Category */}
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium text-[11px]">
                      {post.categoryName}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      post.status === 'PUBLISHED' ? 'bg-emerald-100 text-emerald-700' :
                      post.status === 'DRAFT' ? 'bg-slate-100 text-slate-600' :
                      post.status === 'IN_REVIEW' ? 'bg-amber-100 text-amber-700' :
                      'bg-rose-100 text-rose-700'
                    }`}>
                      {post.status}
                    </span>
                  </td>

                  {/* Pin Status & Action */}
                  <td className="p-4 text-center">
                    {post.isPinned ? (
                      <button
                        type="button"
                        onClick={() => handleTogglePin(post)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500 text-white text-[11px] font-bold shadow-sm hover:bg-amber-600 transition-colors"
                        title="Bấm để bỏ ghim"
                      >
                        <Pin className="w-3 h-3 rotate-45" />
                        <span>Vị trí #{post.pinOrder || 1}</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleTogglePin(post)}
                        disabled={post.status !== 'PUBLISHED'}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-colors ${
                          post.status === 'PUBLISHED'
                            ? 'border-slate-200 text-slate-600 hover:border-amber-400 hover:text-amber-600'
                            : 'border-slate-100 text-slate-300 cursor-not-allowed'
                        }`}
                        title={post.status === 'PUBLISHED' ? 'Ghim lên Trang chủ' : 'Chỉ ghim được bài đã xuất bản'}
                      >
                        <Pin className="w-3 h-3" />
                        <span>Ghim</span>
                      </button>
                    )}
                  </td>

                  {/* Date */}
                  <td className="p-4 text-slate-500 text-[11px]">
                    {formatDateVi(post.updatedAt || post.createdAt)}
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/bai-viet/${post.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-slate-100"
                        title="Xem bài viết"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/dashboard/posts/${post.id}/edit`}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-slate-100"
                        title="Chỉnh sửa"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDeletePost(post.id, post.title)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                        title="Xóa bài viết"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pin Ordering Modal */}
      {pinModalPost && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Pin className="w-5 h-5 rotate-45" />
              </div>
              <div>
                <h3 className="text-base font-bold text-navy-text">Ghim Bài Viết Lên Trang Chủ</h3>
                <span className="text-xs text-slate-500">Tối đa 3 bài ghim active</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <span className="font-bold text-navy-text block mb-1">Bài viết được chọn:</span>
              <p className="text-slate-600 line-clamp-2">{pinModalPost.title}</p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Chọn vị trí ưu tiên hiển thị (1 - 3):
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setSelectedPinOrder(num as 1 | 2 | 3)}
                    className={`py-3 rounded-xl font-bold text-sm border-2 transition-all ${
                      selectedPinOrder === num
                        ? 'border-brand-500 bg-brand-50 text-brand-600 shadow-sm'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    Vị trí #{num}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                * Nếu vị trí đã có bài viết khác đang ghim, hệ thống sẽ thay thế và cập nhật tự động.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setPinModalPost(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleConfirmPin}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-sm"
              >
                Xác nhận ghim
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
