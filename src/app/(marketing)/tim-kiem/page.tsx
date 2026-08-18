import React from 'react';
import Link from 'next/link';
import { repo } from '@/lib/store/repository';
import { Search, ArrowRight, BookOpen, Layers, FileText } from 'lucide-react';

export const metadata = {
  title: 'Tìm Kiếm — Tân Hoàng Nga Portal',
  description: 'Tìm kiếm thông tin giải pháp, bài viết, tài liệu năng lực trên Cổng thông tin Tân Hoàng Nga.'
};

export default async function SearchPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const q = params?.q?.trim() || '';

  const matchedPosts = q ? repo.getPosts({ status: 'PUBLISHED', search: q }) : [];

  const staticSolutions = [
    { title: 'ADT Govina AI', desc: 'Bộ trợ lý AI dành cho cấp Phường/Xã với 5 lớp tri thức', href: '/giai-phap/adt-govina-ai', keywords: 'govina phuong xa tro ly tri thuc hanh chinh' },
    { title: 'Orion AI Business OS', desc: 'Nền tảng quản trị doanh nghiệp tích hợp Multi-Model AI Router', href: '/giai-phap/orion-ai-business-os', keywords: 'orion crm cms multi model ai doanh nghiep' },
    { title: 'DienBien.Today', desc: 'Cổng thương hiệu số và trợ lý AI du lịch, đầu tư Điện Biên', href: '/giai-phap/dienbien-today', keywords: 'dien bien du lich ocop dau tu dia phuong' },
    { title: 'CoffeeVN.Today', desc: 'Hộ chiếu số và kết nối B2B cà phê từ vùng trồng đến buyer', href: '/giai-phap/coffeevn-today', keywords: 'coffee ca phe buyer eudr b2b xuat khau' },
    { title: 'Mô hình triển khai 6 bước', desc: 'Quy trình triển khai chuyển đổi số có trách nhiệm', href: '/quy-trinh-trien-khai', keywords: 'quy trinh 6 buoc trien khai adoption' },
    { title: 'Hợp tác chiến lược ADT', desc: 'Hợp đồng số 203-140826/ADT và mô hình hợp tác', href: '/doi-tac', keywords: 'adt hop tac chien luoc doi tac dai ly' }
  ];

  const matchedSolutions = q 
    ? staticSolutions.filter(s => 
        s.title.toLowerCase().includes(q.toLowerCase()) || 
        s.desc.toLowerCase().includes(q.toLowerCase()) ||
        s.keywords.includes(q.toLowerCase())
      )
    : [];

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-black text-navy-text tracking-tight">
            Tìm Kiếm Trên Toàn Hệ Thống
          </h1>
          <p className="text-sm text-slate-600">
            Tra cứu nhanh các giải pháp, bài viết chuyên sâu và tài liệu hồ sơ năng lực.
          </p>

          <form method="GET" action="/tim-kiem" className="relative max-w-2xl mx-auto mt-6">
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Nhập từ khóa cần tìm (VD: Govina, Orion, Cà phê, Quy trình 6 bước...)"
              className="w-full pl-12 pr-28 py-3.5 rounded-2xl border-2 border-slate-200 bg-white text-sm text-slate-800 focus:border-brand-500 shadow-sm outline-none"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 transition-colors"
            >
              Tìm kiếm
            </button>
          </form>
        </div>

        {q && (
          <div className="space-y-8 pt-4">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Kết quả tìm kiếm cho từ khóa: <span className="text-brand-600 font-extrabold">"{q}"</span>
            </div>

            {/* Matched Solutions */}
            {matchedSolutions.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-navy-text flex items-center gap-2">
                  <Layers className="w-4 h-4 text-brand-600" />
                  <span>Giải Pháp & Chương Trình ({matchedSolutions.length})</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {matchedSolutions.map((sol, i) => (
                    <Link
                      key={i}
                      href={sol.href}
                      className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-brand-300 hover:shadow-sm transition-all block group"
                    >
                      <h4 className="text-sm font-bold text-navy-text group-hover:text-brand-600 transition-colors">{sol.title}</h4>
                      <p className="text-xs text-slate-500 mt-1">{sol.desc}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Matched Articles */}
            {matchedPosts.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-navy-text flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-brand-600" />
                  <span>Bài Viết & Tri Thức ({matchedPosts.length})</span>
                </h3>
                <div className="space-y-3">
                  {matchedPosts.map((p) => (
                    <Link
                      key={p.id}
                      href={`/bai-viet/${p.slug}`}
                      className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-brand-300 hover:shadow-sm transition-all block group"
                    >
                      <div className="text-[11px] text-brand-600 font-semibold mb-1">{p.categoryName}</div>
                      <h4 className="text-sm font-bold text-navy-text group-hover:text-brand-600 transition-colors">{p.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{p.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {matchedSolutions.length === 0 && matchedPosts.length === 0 && (
              <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-6">
                <p className="text-sm text-slate-600">Không tìm thấy nội dung phù hợp với từ khóa "{q}".</p>
                <p className="text-xs text-slate-400 mt-1">Gợi ý: Thử tìm kiếm với từ khóa ngắn gọn hơn như "Govina", "Orion", "Cà phê".</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
