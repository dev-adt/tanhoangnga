import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/types';
import { Pin, ArrowRight, Clock, Calendar, Sparkles, BookOpen } from 'lucide-react';
import { formatDateVi } from '@/lib/utils';

interface PinnedArticlesSectionProps {
  posts: Post[];
}

export function PinnedArticlesSection({ posts }: PinnedArticlesSectionProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="py-20 bg-slate-50/50 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-xs font-extrabold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tri Thức & Chuyển Động</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-navy-text tracking-tight">
              Bài Viết & Tài Liệu Nổi Bật
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Phân tích chuyên sâu về ứng dụng AI chính quyền cơ sở, quản trị doanh nghiệp và dữ liệu nông nghiệp.
            </p>
          </div>

          <Link
            href="/bai-viet"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700 hover:underline"
          >
            <span>Xem tất cả bài viết</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post, idx) => (
            <article 
              key={post.id}
              className="bg-white rounded-3xl overflow-hidden shadow-card border border-slate-200/80 hover:shadow-card-hover hover:border-brand-200 transition-all duration-300 flex flex-col group"
            >
              {/* Image & Pin Badge */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={post.coverImage}
                  alt={post.coverAlt || post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Pin Badge or Order */}
                {post.isPinned && (
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-brand-600 text-white text-[11px] font-bold flex items-center gap-1 shadow-md backdrop-blur-sm">
                    <Pin className="w-3 h-3 rotate-45" />
                    <span>Nổi bật #{post.pinOrder || idx + 1}</span>
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-white/95 text-navy-text text-xs font-semibold shadow-sm backdrop-blur-md">
                  {post.categoryName}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-2.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDateVi(post.publishedAt || post.createdAt)}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readingTimeMinutes || 5} phút đọc
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-navy-text group-hover:text-brand-600 transition-colors line-clamp-2 leading-snug mb-2.5">
                    <Link href={`/bai-viet/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">
                    Bởi {post.authorName}
                  </span>
                  <Link
                    href={`/bai-viet/${post.slug}`}
                    className="text-xs font-bold text-brand-600 group-hover:translate-x-1 transition-transform flex items-center gap-1"
                  >
                    <span>Đọc tiếp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
