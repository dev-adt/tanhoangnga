'use client';

import React from 'react';
import Link from 'next/link';
import { repo } from '@/lib/store/repository';
import { formatDateVi } from '@/lib/utils';
import { useAuth } from '@/lib/auth/authContext';
import { 
  FileText, Inbox, Users, Shield, Pin, Eye, 
  ArrowRight, PlusCircle, CheckCircle2, Clock, AlertCircle, History, Sparkles, Image, BookOpen
} from 'lucide-react';

export default function DashboardOverviewPage() {
  const { currentUser, roleSlug, hasPermission } = useAuth();

  const posts = repo.getPosts();
  const publishedPosts = posts.filter(p => p.status === 'PUBLISHED');
  const pinnedPosts = repo.getHomepageFeaturedPosts().filter(p => p.isPinned);
  const leads = repo.getLeads();
  const newLeads = leads.filter(l => l.status === 'NEW');
  const auditLogs = repo.getAuditLogs(6);
  const mediaList = repo.getMedia();

  // Filter posts for content creator (their own posts)
  const myPosts = posts.filter(p => p.authorName.includes(currentUser?.name || '') || p.authorId === currentUser?.id);
  const myDrafts = myPosts.filter(p => p.status === 'DRAFT' || p.status === 'IN_REVIEW');

  // Role-customized statistics
  const getStats = () => {
    if (roleSlug === 'content_creator') {
      return [
        { title: 'Bài viết của tôi', value: myPosts.length, sub: `${myDrafts.length} bản nháp đang soạn`, icon: FileText, color: 'text-emerald-600 bg-emerald-50' },
        { title: 'Bài đã xuất bản', value: myPosts.filter(p => p.status === 'PUBLISHED').length, sub: 'Hiển thị trên website', icon: CheckCircle2, color: 'text-brand-600 bg-brand-50' },
        { title: 'Media cá nhân', value: mediaList.length, sub: 'Hình ảnh trong bài viết', icon: Image, color: 'text-cyan-600 bg-cyan-50' },
        { title: 'Quy chuẩn SEO', value: '100%', sub: 'Tối ưu từ khóa & Schema', icon: Sparkles, color: 'text-amber-600 bg-amber-50' }
      ];
    }

    if (roleSlug === 'editor') {
      return [
        { title: 'Bài viết xuất bản', value: `${publishedPosts.length}/${posts.length}`, sub: 'Quản lý toàn site', icon: FileText, color: 'text-brand-600 bg-brand-50' },
        { title: 'Bài ghim Trang chủ', value: `${pinnedPosts.length}/3`, sub: 'Vị trí trang chủ', icon: Pin, color: 'text-amber-600 bg-amber-50' },
        { title: 'Chuyên mục & Tag', value: `${repo.getCategories().length} CM`, sub: 'Phân loại nội dung', icon: BookOpen, color: 'text-cyan-600 bg-cyan-50' },
        { title: 'Yêu cầu tư vấn', value: leads.length, sub: `${newLeads.length} lead mới`, icon: Inbox, color: 'text-emerald-600 bg-emerald-50' }
      ];
    }

    if (roleSlug === 'viewer') {
      return [
        { title: 'Bài viết xuất bản', value: publishedPosts.length, sub: 'Chế độ chỉ đọc', icon: FileText, color: 'text-brand-600 bg-brand-50' },
        { title: 'Bài ghim Trang chủ', value: `${pinnedPosts.length}/3`, sub: '3 bài nổi bật', icon: Pin, color: 'text-amber-600 bg-amber-50' },
        { title: 'Chuyên mục', value: repo.getCategories().length, sub: 'Danh mục hoạt động', icon: BookOpen, color: 'text-cyan-600 bg-cyan-50' },
        { title: 'Quyền hạn tài khoản', value: 'Viewer', sub: 'Chỉ xem báo cáo', icon: Eye, color: 'text-slate-600 bg-slate-100' }
      ];
    }

    // Super Admin & Admin
    return [
      { title: 'Bài viết xuất bản', value: `${publishedPosts.length}/${posts.length}`, sub: '100% chuẩn SEO & Schema', icon: FileText, color: 'text-brand-600 bg-brand-50' },
      { title: 'Bài ghim Trang chủ', value: `${pinnedPosts.length}/3`, sub: 'Tối đa 3 bài nổi bật', icon: Pin, color: 'text-amber-600 bg-amber-50' },
      { title: 'Yêu cầu tư vấn (Lead)', value: leads.length, sub: `${newLeads.length} lead mới chưa xử lý`, icon: Inbox, color: 'text-emerald-600 bg-emerald-50' },
      { title: 'Sự kiện kiểm toán', value: auditLogs.length, sub: 'Ghi nhật ký thời gian thực', icon: History, color: 'text-indigo-600 bg-indigo-50' }
    ];
  };

  const stats = getStats();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Welcome Banner Tailored to Role */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-navy-card via-slate-900 to-brand-900 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/30 text-cyan-accent text-xs font-bold font-mono">
            <span>{currentUser?.roleName?.toUpperCase() || 'QUẢN TRỊ VIÊN'}</span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            {roleSlug === 'content_creator' && 'Không Gian Sáng Tạo Nội Dung'}
            {roleSlug === 'editor' && 'Trung Tâm Biên Tập & Duyệt Xuất Bản'}
            {roleSlug === 'viewer' && 'Bảng Điều Khiển Khảo Sát & Đọc Báo Cáo'}
            {(!roleSlug || roleSlug === 'super_admin' || roleSlug === 'admin') && 'Trung Tâm Điều Hành Cổng Thương Hiệu Số'}
          </h1>
          
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            {roleSlug === 'content_creator' && 'Soạn thảo bài viết, quản lý bản nháp cá nhân và tối ưu hóa từ khóa SEO trước khi gửi biên tập viên duyệt.'}
            {roleSlug === 'editor' && 'Kiểm duyệt bài viết, phân bổ bài ghim trang chủ, chuẩn hóa chuyên mục và tiếp nhận dữ liệu tương tác.'}
            {roleSlug === 'viewer' && 'Theo dõi các chỉ số phát triển nội dung, danh mục bài viết và hồ sơ năng lực theo chế độ bảo mật chỉ xem.'}
            {(!roleSlug || roleSlug === 'super_admin' || roleSlug === 'admin') && 'Quản trị toàn diện nội dung bài viết, ghim trang chủ, tiếp nhận yêu cầu tư vấn, phân quyền RBAC và theo dõi nhật ký kiểm toán.'}
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 shrink-0">
          {hasPermission('posts.create') && (
            <Link
              href="/dashboard/posts/new"
              className="px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold transition-all shadow-glow flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Viết bài mới</span>
            </Link>
          )}

          {hasPermission('leads.read') && (
            <Link
              href="/dashboard/leads"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20"
            >
              Xử lý Leads ({newLeads.length})
            </Link>
          )}
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((st, i) => (
          <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                {st.title}
              </span>
              <div className="text-2xl font-black text-navy-text mb-1 font-mono">
                {st.value}
              </div>
              <span className="text-[11px] text-slate-500 font-medium">
                {st.sub}
              </span>
            </div>
            <div className={`p-3 rounded-xl ${st.color}`}>
              <st.icon className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid: Conditional per role */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Leads (if permitted) OR Posts list */}
        <div className="lg:col-span-7 space-y-4">
          {hasPermission('leads.read') ? (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-navy-text flex items-center gap-2">
                  <Inbox className="w-4 h-4 text-emerald-600" />
                  <span>Yêu Cầu Tư Vấn Mới Nhận</span>
                </h2>
                <Link href="/dashboard/leads" className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1">
                  <span>Xem tất cả</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
                {leads.slice(0, 4).map((lead) => (
                  <div key={lead.id} className="p-4 hover:bg-slate-50 transition-colors flex items-start justify-between gap-4 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-navy-text text-sm">{lead.fullName}</span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-600 font-medium">{lead.organization}</span>
                      </div>
                      <p className="text-slate-500 line-clamp-1">{lead.message}</p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                        <span>SĐT: <strong className="text-slate-700">{lead.phone}</strong></span>
                        <span>•</span>
                        <span>Quan tâm: <strong className="text-brand-600">{lead.solutionInterest}</strong></span>
                      </div>
                    </div>

                    <div className="text-right shrink-0 space-y-2">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        lead.status === 'NEW' ? 'bg-emerald-100 text-emerald-700' :
                        lead.status === 'IN_PROGRESS' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {lead.status}
                      </span>
                      <div className="text-[10px] text-slate-400">
                        {formatDateVi(lead.createdAt)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* For Content Creator or roles without leads permission */}
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-navy-text flex items-center gap-2">
                  <FileText className="w-4 h-4 text-brand-600" />
                  <span>Bài Viết Gần Đây Của Bạn</span>
                </h2>
                <Link href="/dashboard/posts" className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1">
                  <span>Tất cả bài viết</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
                {posts.slice(0, 4).map((post) => (
                  <div key={post.id} className="p-4 hover:bg-slate-50 transition-colors flex items-start justify-between gap-4 text-xs">
                    <div className="space-y-1">
                      <h4 className="font-bold text-navy-text text-sm">{post.title}</h4>
                      <p className="text-slate-500 line-clamp-1">{post.excerpt}</p>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
                        <span>Chuyên mục: <strong>{post.categoryName}</strong></span>
                        <span>•</span>
                        <span>{formatDateVi(post.createdAt)}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0 space-y-2">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        post.status === 'PUBLISHED' ? 'bg-emerald-100 text-emerald-700' :
                        post.status === 'DRAFT' ? 'bg-slate-100 text-slate-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {post.status}
                      </span>
                      {hasPermission('posts.create') && (
                        <div>
                          <Link href={`/dashboard/posts/${post.id}/edit`} className="text-[11px] text-brand-600 hover:underline font-bold">
                            Chỉnh sửa
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Right Column: Pinned Posts & Audit or Tips */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Pinned Posts Card */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-navy-text flex items-center gap-2">
                <Pin className="w-4 h-4 text-amber-600 rotate-45" />
                <span>3 Bài Viết Ghim Trang Chủ</span>
              </h2>
              {hasPermission('posts.pin') && (
                <Link href="/dashboard/posts" className="text-xs font-bold text-brand-600 hover:underline">
                  Quản lý ghim
                </Link>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-3 space-y-2 shadow-sm">
              {pinnedPosts.map((post, idx) => (
                <div key={post.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3 text-xs">
                  <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs font-mono shrink-0">
                    #{post.pinOrder || idx + 1}
                  </span>
                  <div className="overflow-hidden flex-1">
                    <h4 className="font-bold text-navy-text truncate">{post.title}</h4>
                    <span className="text-[10px] text-slate-500">{post.categoryName}</span>
                  </div>
                  {hasPermission('posts.create') && (
                    <Link
                      href={`/dashboard/posts/${post.id}/edit`}
                      className="text-[11px] text-brand-600 hover:underline font-semibold shrink-0"
                    >
                      Sửa
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Audit Trail (if permitted) OR Author Guide */}
          {hasPermission('audit.read') ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-navy-text flex items-center gap-2">
                  <History className="w-4 h-4 text-indigo-600" />
                  <span>Nhật Ký Thao Tác Gần Đây</span>
                </h2>
                <Link href="/dashboard/audit-logs" className="text-xs font-bold text-brand-600 hover:underline">
                  Xem toàn bộ
                </Link>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 text-xs shadow-sm">
                {auditLogs.slice(0, 3).map((log) => (
                  <div key={log.id} className="pb-2.5 border-b border-slate-100 last:border-0 last:pb-0 space-y-0.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-navy-text">{log.actorName}</span>
                      <span className="text-slate-400">{formatDateVi(log.createdAt)}</span>
                    </div>
                    <p className="text-slate-600 text-[11px]">{log.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-brand-900 to-navy-dark rounded-2xl p-5 text-white space-y-3 shadow-md">
              <div className="flex items-center gap-2 text-cyan-accent font-bold text-xs">
                <Sparkles className="w-4 h-4" />
                <span>Tiêu Chuẩn Soạn Thảo 2026</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Mọi bài viết khi xuất bản cần tuân thủ cấu trúc tối thiểu 600 từ, có tóm tắt định vị năng lực, hình ảnh tỉ lệ 16:9 sắc nét và ít nhất 2 câu hỏi FAQ.
              </p>
              {hasPermission('posts.create') && (
                <Link
                  href="/dashboard/posts/new"
                  className="inline-flex items-center gap-1 text-xs font-bold text-white bg-brand-600 hover:bg-brand-500 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <span>Mở trình soạn thảo</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
