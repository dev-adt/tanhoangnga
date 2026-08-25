import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { repo } from '@/lib/store/repository';
import { formatDateVi } from '@/lib/utils';
import { 
  Calendar, Clock, Pin, ArrowRight, BookOpen, 
  ChevronLeft, ChevronRight 
} from 'lucide-react';

export async function generateMetadata({
  params
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;
  const categories = repo.getCategories();
  const category = categories.find(c => c.slug === categorySlug);
  if (!category) return { title: 'Chuyên mục bài viết' };

  return {
    title: `${category.name} — Bài viết & Tài liệu | Tân Hoàng Nga`,
    description: category.description
  };
}

const POSTS_PER_PAGE = 6;

export default async function CategoryPage({
  params,
  searchParams
}: {
  params: Promise<{ categorySlug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { categorySlug } = await params;
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || '1', 10) || 1);

  const categories = repo.getCategories();
  const category = categories.find(c => c.slug === categorySlug);

  if (!category) {
    notFound();
  }

  const allPosts = repo.getPosts({
    status: 'PUBLISHED',
    categorySlug: category.slug
  });

  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE) || 1;
  const validPage = Math.min(currentPage, totalPages);

  const paginatedPosts = allPosts.slice(
    (validPage - 1) * POSTS_PER_PAGE,
    validPage * POSTS_PER_PAGE
  );

  const buildUrl = (targetPage: number) => {
    return targetPage > 1 
      ? `/bai-viet/chuyen-muc/${category.slug}?page=${targetPage}`
      : `/bai-viet/chuyen-muc/${category.slug}`;
  };

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb & Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-semibold text-brand-600 uppercase tracking-wider mb-2">
            <Link href="/" className="hover:underline">Trang chủ</Link> / <Link href="/bai-viet" className="hover:underline">Bài viết</Link> / Chuyên mục
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-navy-text tracking-tight leading-tight">
            {category.name}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            {category.description}
          </p>
        </div>

        {/* Posts Grid */}
        {paginatedPosts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-navy-text">Chưa có bài viết trong chuyên mục này</h3>
            <p className="text-xs text-slate-500 mt-1">Nội dung đang được ban biên tập hoàn thiện và chuẩn bị xuất bản.</p>
            <Link
              href="/bai-viet"
              className="inline-block mt-4 px-4 py-2 rounded-xl text-xs font-bold text-brand-600 bg-brand-50 hover:bg-brand-100"
            >
              Xem tất cả bài viết
            </Link>
          </div>
        ) : (
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedPosts.map((post) => (
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-6">
                <Link
                  href={buildUrl(Math.max(1, validPage - 1))}
                  className={`p-2.5 rounded-xl border border-slate-200 text-slate-600 transition-colors flex items-center gap-1 text-xs font-bold ${
                    validPage === 1 ? 'pointer-events-none opacity-40 bg-slate-50' : 'hover:bg-brand-50 hover:text-brand-600 hover:border-brand-200 bg-white'
                  }`}
                  aria-disabled={validPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Trang trước</span>
                </Link>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <Link
                      key={pageNum}
                      href={buildUrl(pageNum)}
                      className={`w-9 h-9 rounded-xl text-xs font-bold flex items-center justify-center transition-all ${
                        pageNum === validPage
                          ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {pageNum}
                    </Link>
                  ))}
                </div>

                <Link
                  href={buildUrl(Math.min(totalPages, validPage + 1))}
                  className={`p-2.5 rounded-xl border border-slate-200 text-slate-600 transition-colors flex items-center gap-1 text-xs font-bold ${
                    validPage === totalPages ? 'pointer-events-none opacity-40 bg-slate-50' : 'hover:bg-brand-50 hover:text-brand-600 hover:border-brand-200 bg-white'
                  }`}
                  aria-disabled={validPage === totalPages}
                >
                  <span className="hidden sm:inline">Trang sau</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
