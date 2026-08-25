import React from 'react';
import Link from 'next/link';
import { repo } from '@/lib/store/repository';
import { formatDateVi } from '@/lib/utils';
import { 
  Calendar, Clock, Pin, ArrowRight, BookOpen, Search, 
  ChevronLeft, ChevronRight 
} from 'lucide-react';

export const metadata = {
  title: 'Thư Viện Tri Thức & Bài Viết Chuyên Sâu — Tân Hoàng Nga',
  description: 'Tổng hợp các bài viết phân tích, cẩm nang ứng dụng AI cho chính quyền cơ sở, quản trị doanh nghiệp và dữ liệu nông nghiệp xuất khẩu.'
};

const POSTS_PER_PAGE = 6;

export default async function BlogListingPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string; category?: string; page?: string }>;
}) {
  const params = await searchParams;
  const q = params?.q || '';
  const categorySlug = params?.category || '';
  const currentPage = Math.max(1, parseInt(params?.page || '1', 10) || 1);

  const allPosts = repo.getPosts({
    status: 'PUBLISHED',
    categorySlug: categorySlug || undefined,
    search: q || undefined
  });

  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE) || 1;
  const validPage = Math.min(currentPage, totalPages);

  const paginatedPosts = allPosts.slice(
    (validPage - 1) * POSTS_PER_PAGE,
    validPage * POSTS_PER_PAGE
  );

  const categories = repo.getCategories();

  const buildUrl = (targetPage: number) => {
    const searchParamsObj = new URLSearchParams();
    if (q) searchParamsObj.set('q', q);
    if (categorySlug) searchParamsObj.set('category', categorySlug);
    if (targetPage > 1) searchParamsObj.set('page', targetPage.toString());
    const queryStr = searchParamsObj.toString();
    return queryStr ? `/bai-viet?${queryStr}` : '/bai-viet';
  };

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-semibold text-brand-600 uppercase tracking-wider mb-2">
            <Link href="/" className="hover:underline">Trang chủ</Link> / Bài viết & Tri thức
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-navy-text tracking-tight leading-tight">
            Thư Viện Tri Thức & Chuyển Động Số
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Các bài viết, báo cáo nghiên cứu và tài liệu phân tích thực tế về triển khai AI, chuyển đổi số và kết nối thương mại của Tân Hoàng Nga.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-white shadow-sm border border-slate-200">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <Link
              href="/bai-viet"
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-colors ${
                !categorySlug
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Tất cả ({repo.getPosts({ status: 'PUBLISHED' }).length})
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/bai-viet/chuyen-muc/${cat.slug}`}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-colors ${
                  categorySlug === cat.slug
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.name} ({cat.postCount || 0})
              </Link>
            ))}
          </div>

          {/* Search Form */}
          <form method="GET" action="/bai-viet" className="relative min-w-[240px]">
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Tìm kiếm bài viết..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-brand-500 outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </form>

        </div>

        {/* Posts Grid */}
        {paginatedPosts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-navy-text">Không tìm thấy bài viết phù hợp</h3>
            <p className="text-xs text-slate-500 mt-1">Vui lòng thử tìm kiếm với từ khóa khác hoặc chọn chuyên mục khác.</p>
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
                  className="bg-white rounded-3xl overflow-hidden shadow-card border border-slate-200/80 hover:shadow-card-hover hover:border-brand-200 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <img
                        src={post.coverImage}
                        alt={post.coverAlt || post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {post.isPinned && (
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-brand-600 text-white text-[11px] font-bold flex items-center gap-1 shadow-md">
                          <Pin className="w-3 h-3 rotate-45" />
                          <span>Nổi bật #{post.pinOrder || 1}</span>
                        </div>
                      )}
                      <Link
                        href={`/bai-viet/chuyen-muc/${post.categorySlug}`}
                        className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-white/95 text-navy-text text-xs font-semibold shadow-sm hover:bg-white"
                      >
                        {post.categoryName}
                      </Link>
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
                          {post.readingTimeMinutes || 5} phút đọc
                        </span>
                      </div>

                      <h2 className="text-base sm:text-lg font-bold text-navy-text group-hover:text-brand-600 transition-colors line-clamp-2 leading-snug mb-2.5">
                        <Link href={`/bai-viet/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h2>

                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {post.tags.slice(0, 3).map((t) => (
                            <Link
                              key={t}
                              href={`/bai-viet/chu-de/${t}`}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 hover:bg-brand-50 hover:text-brand-600 transition-colors"
                            >
                              #{t}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500">
                      {post.authorName}
                    </span>
                    <Link
                      href={`/bai-viet/${post.slug}`}
                      className="text-xs font-bold text-brand-600 group-hover:translate-x-1 transition-transform flex items-center gap-1"
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
