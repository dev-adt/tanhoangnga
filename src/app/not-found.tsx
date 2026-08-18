import React from 'react';
import Link from 'next/link';
import { Compass, ArrowLeft, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto shadow-glow">
          <Compass className="w-10 h-10 animate-spin-slow" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-navy-text">404</h1>
          <h2 className="text-xl font-bold text-navy-text">Không Tìm Thấy Trang</h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Địa chỉ bạn truy cập có thể đã đổi tên hoặc không còn tồn tại trên Cổng thông tin Tân Hoàng Nga.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Về Trang Chủ</span>
          </Link>
          <Link
            href="/tim-kiem"
            className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Tìm Kiếm Nội Dung</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
