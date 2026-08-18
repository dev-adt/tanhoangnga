import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { repo } from '@/lib/store/repository';
import { formatDateVi } from '@/lib/utils';
import { Calendar, Clock, ArrowRight, BookOpen, Tag as TagIcon } from 'lucide-react';

export async function generateMetadata({
  params
}: {
  params: Promise<{ tagSlug: string }>;
}) {
  const { tagSlug } = await params;
  return {
    title: `Chủ đề #${tagSlug} — Bài viết | Tân Hoàng Nga`,
    description: `Tổng hợp các bài viết mang chủ đề #${tagSlug} tại Cổng thông tin Tân Hoàng Nga.`
  };
}

export default async function TagPage({
  params
}: {
  params: Promise<{ tagSlug: string }>;
}) {
  const { tagSlug } = await params;
  const posts = repo.getPosts({
    status: 'PUBLISHED',
    tagSlug: tagSlug
  });

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb & Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-semibold text-brand-600 uppercase tracking-wider mb-2">
            <Link href="/" className="hover:underline">Trang chủ</Link> / <Link href="/bai-viet" className="hover:underline">Bài viết</Link> / Chủ đề
          </div>
          <div className="flex items-center gap-2">
            <TagIcon className="w-6 h-6 text-brand-600" />
            <h1 className="text-3xl sm:text-5xl font-black text-navy-text tracking-tight">
              #{tagSlug}
            </h1>
          </div>
          <p className="text-base sm:text-lg text-slate-600 mt-4">
            Hiển thị các bài viết và tài liệu liên quan đến chủ đề <strong>#{tagSlug}</strong>.
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-navy-text">Không có bài viết nào với chủ đề này</h3>
            <Link
              href="/bai-viet"
              className="inline-block mt-4 px-4 py-2 rounded-xl text-xs font-bold text-brand-600 bg-brand-50 hover:bg-brand-100"
            >
              Xem tất cả bài viết
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-3xl overflow-hidden shadow-card border border-slate-200/80 hover:shadow-card-hover transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={post.coverImage}
                      alt={post.coverAlt || post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-2.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDateVi(post.publishedAt || post.createdAt)}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readingTimeMinutes || 5} phút
                      </span>
                    </div>

                    <h2 className="text-base sm:text-lg font-bold text-navy-text group-hover:text-brand-600 transition-colors line-clamp-2 leading-snug mb-2.5">
                      <Link href={`/bai-viet/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">
                    {post.authorName}
                  </span>
                  <Link
                    href={`/bai-viet/${post.slug}`}
                    className="text-xs font-bold text-brand-600 flex items-center gap-1"
                  >
                    <span>Xem chi tiết</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
