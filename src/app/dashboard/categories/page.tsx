import React from 'react';
import { repo } from '@/lib/store/repository';
import { FolderTree, Plus, BookOpen } from 'lucide-react';

export const metadata = {
  title: 'Quản Lý Chuyên Mục — Dashboard Tân Hoàng Nga',
};

export default function DashboardCategoriesPage() {
  const categories = repo.getCategories();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy-text tracking-tight">
            Quản Lý Chuyên Mục Nội Dung
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Phân loại bài viết theo topic cluster phục vụ trải nghiệm người dùng và SEO.
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
                  <FolderTree className="w-5 h-5" />
                </span>
                <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold font-mono">
                  {cat.postCount || 0} bài viết
                </span>
              </div>

              <h3 className="text-base font-bold text-navy-text mb-1">{cat.name}</h3>
              <p className="text-xs font-mono text-brand-600 mb-2">/{cat.slug}</p>
              <p className="text-xs text-slate-600 leading-relaxed">{cat.description}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
