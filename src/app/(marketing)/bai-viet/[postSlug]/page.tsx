import React from 'react';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { repo } from '@/lib/store/repository';
import { formatDateVi, sanitizeHtml } from '@/lib/utils';
import { getArticleSchema, getBreadcrumbSchema, getFaqSchema } from '@/lib/seo/schema';
import { Calendar, Clock, User, Share2, Link as LinkIcon, ArrowLeft, ArrowRight, ShieldCheck, HelpCircle, FileText, CheckCircle2 } from 'lucide-react';
import { FaqAccordion } from '@/components/marketing/FaqAccordion';
import { LeadForm } from '@/components/marketing/LeadForm';

export async function generateMetadata({
  params
}: {
  params: Promise<{ postSlug: string }>;
}) {
  const { postSlug } = await params;
  const post = repo.getPostBySlug(postSlug);
  if (!post) return { title: 'Bài viết không tồn tại' };

  return {
    title: `${post.seoTitle || post.title} | Tân Hoàng Nga`,
    description: post.metaDescription || post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: [{ url: post.coverImage, alt: post.coverAlt || post.title }],
      type: 'article',
      publishedTime: post.publishedAt || post.createdAt,
      modifiedTime: post.updatedAt,
      authors: [post.authorName]
    }
  };
}

export default async function SinglePostPage({
  params
}: {
  params: Promise<{ postSlug: string }>;
}) {
  const { postSlug } = await params;

  // 1. Check for 301 Redirect
  const redirectRecord = repo.getRedirectForSlug(postSlug);
  if (redirectRecord) {
    redirect(`/bai-viet/${redirectRecord.newSlug}`);
  }

  // 2. Fetch Post
  const post = repo.getPostBySlug(postSlug);
  if (!post || post.status !== 'PUBLISHED') {
    notFound();
  }

  // 3. Related Posts
  const relatedPosts = repo.getPosts({
    status: 'PUBLISHED',
    categorySlug: post.categorySlug
  }).filter(p => p.id !== post.id).slice(0, 2);

  // 4. Schemas
  const articleSchema = getArticleSchema(post);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Trang chủ', url: '/' },
    { name: 'Bài viết', url: '/bai-viet' },
    { name: post.categoryName, url: `/bai-viet/chuyen-muc/${post.categorySlug}` },
    { name: post.title, url: `/bai-viet/${post.slug}` }
  ]);

  return (
    <article className="py-12 lg:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs font-semibold text-slate-500 flex flex-wrap items-center gap-1.5">
          <Link href="/" className="hover:text-brand-600">Trang chủ</Link>
          <span>/</span>
          <Link href="/bai-viet" className="hover:text-brand-600">Bài viết</Link>
          <span>/</span>
          <Link href={`/bai-viet/chuyen-muc/${post.categorySlug}`} className="text-brand-600 hover:underline">
            {post.categoryName}
          </Link>
        </nav>

        {/* Post Title & Excerpt */}
        <header className="space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-text tracking-tight leading-[1.2]">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            {post.excerpt}
          </p>

          {/* Author & Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-y border-slate-200 text-xs text-slate-500">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold">
                {post.authorName.charAt(0)}
              </div>
              <div>
                <span className="font-bold text-navy-text block">{post.authorName}</span>
                <span>Ban Biên Tập Tân Hoàng Nga</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                {formatDateVi(post.publishedAt || post.createdAt)}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                {post.readingTimeMinutes || 5} phút đọc
              </span>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        <div className="rounded-3xl overflow-hidden shadow-card border border-slate-200/80 aspect-[16/9] bg-slate-100 relative">
          <img
            src={post.coverImage}
            alt={post.coverAlt || post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Sanitized Body Content */}
        <div 
          className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-6 [&>h2]:text-2xl [&>h2]:font-black [&>h2]:text-navy-text [&>h2]:mt-10 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-navy-text [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-2 [&>p]:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
        />

        {/* Citations & Reference Sources */}
        {post.citations && post.citations.length > 0 && (
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-brand-600" />
              <span>Nguồn Dữ Liệu & Tài Liệu Dẫn Chiếu</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {post.citations.map((cit, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-brand-600 font-bold">•</span>
                  <a href={cit.url} className="hover:text-brand-600 hover:underline">{cit.title}</a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Post Specific FAQ if any */}
        {post.faqData && post.faqData.length > 0 && (
          <FaqAccordion faqs={post.faqData} title="Hỏi Đáp Về Bài Viết Này" />
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Chủ đề:</span>
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/bai-viet/chu-de/${tag}`}
                className="text-xs px-3 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-brand-50 hover:text-brand-600 transition-colors font-medium"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="pt-8 border-t border-slate-200 space-y-6">
            <h3 className="text-xl font-bold text-navy-text">Bài Viết Cùng Chuyên Mục</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/bai-viet/${rel.slug}`}
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-brand-300 hover:shadow-sm transition-all group block"
                >
                  <h4 className="text-sm font-bold text-navy-text group-hover:text-brand-600 line-clamp-2 mb-2">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{rel.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Consultation CTA */}
        <div className="pt-8">
          <LeadForm 
            title="Đăng Ký Tư Vấn Giải Pháp"
            subtitle="Để lại thông tin để trao đổi trực tiếp với chuyên gia Tân Hoàng Nga"
          />
        </div>

      </div>
    </article>
  );
}
