'use client';

import React from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-navy-text">Đã Xảy Ra Lỗi Xử Lý</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Hệ thống đã ghi nhận nhật ký lỗi. Quý khách vui lòng thử tải lại trang hoặc quay về trang chủ.
          </p>
        </div>

        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Thử lại</span>
          </button>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Trang chủ</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
