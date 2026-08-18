import React from 'react';
import { repo } from '@/lib/store/repository';
import { Tag as TagIcon, Plus } from 'lucide-react';

export const metadata = {
  title: 'Quản Lý Thẻ (Tags) — Dashboard Tân Hoàng Nga',
};

export default function DashboardTagsPage() {
  const tags = repo.getTags();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-navy-text tracking-tight">
          Quản Lý Thẻ Từ Khóa (Tags)
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Danh mục từ khóa liên kết các bài viết liên quan trong hệ thống.
        </p>
      </div>

      {/* Tags Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {tags.map((tag) => (
          <div key={tag.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TagIcon className="w-4 h-4 text-brand-600" />
              <div>
                <span className="font-bold text-navy-text text-xs block">{tag.name}</span>
                <span className="text-[10px] text-slate-400 font-mono">#{tag.slug}</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold font-mono">
              {tag.postCount || 0}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}
