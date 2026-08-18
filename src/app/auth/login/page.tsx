'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ShieldCheck, Lock, Mail, Eye, EyeOff, 
  ArrowRight, KeyRound, AlertCircle, ShieldAlert
} from 'lucide-react';
import { useAuth } from '@/lib/auth/authContext';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/dashboard';
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        router.push(redirectUrl);
      } else {
        setError(res.message || 'Email hoặc mật khẩu không chính xác.');
      }
    } catch {
      setError('Đã xảy ra lỗi kết nối xác thực. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
      
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-950 text-brand-400 border border-brand-800/80 text-xs font-semibold mb-3">
          <KeyRound className="w-3.5 h-3.5" />
          <span>Cổng Xác Thực Quản Trị</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Đăng Nhập Hệ Thống
        </h1>
        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
          Khu vực hạn chế dành riêng cho nhân sự và ban điều hành được cấp quyền truy cập.
        </p>
      </div>

      {/* Error Notification */}
      {error && (
        <div className="mb-5 p-3.5 rounded-xl bg-rose-950/80 border border-rose-800/80 text-rose-300 text-xs flex items-start gap-2.5 animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Email / Tên tài khoản
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@tanhoangnga.vn"
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all font-mono"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              Mật khẩu bảo mật
            </label>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all font-mono"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-slate-700 bg-slate-950 text-brand-500 focus:ring-brand-500"
            />
            <span className="text-xs text-slate-400">Duy trì phiên đăng nhập</span>
          </label>
          <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            TLS 1.3
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-brand-600 via-brand-500 to-cyan-500 hover:shadow-glow transition-all transform hover:-translate-y-0.5 active:scale-[0.99] flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-4"
        >
          {loading ? (
            <span className="inline-block animate-pulse">Đang xác thực bảo mật...</span>
          ) : (
            <>
              <span>Đăng Nhập An Toàn</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Compliance & Security Notice */}
      <div className="mt-6 pt-5 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1 text-center">
        <div className="flex items-center justify-center gap-1.5 text-slate-300 font-semibold">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
          <span>Bảo Vệ Đa Tầng & Ghi Vết Kiểm Toán</span>
        </div>
        <p className="text-[10px] text-slate-500 leading-normal">
          Mọi hành vi truy cập trái phép đều được ghi vết IP và chuyển giao an ninh mạng.
        </p>
      </div>

    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden selection:bg-brand-500 selection:text-white">
      
      {/* Mesh Glow Background */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-brand-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] bg-mint-accent/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Header */}
      <header className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-8 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-500 via-cyan-accent to-mint-accent flex items-center justify-center shadow-glow text-white font-black text-xl transition-transform group-hover:scale-105">
            T
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg text-white tracking-tight flex items-center gap-1.5 leading-none">
              TÂN HOÀNG NGA
              <span className="inline-block w-2 h-2 rounded-full bg-mint-accent animate-pulse"></span>
            </span>
            <span className="text-[10px] text-cyan-accent tracking-wider uppercase font-medium mt-1 font-mono">
              Secure Auth Gateway
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-400 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-mint-accent" />
          <span className="hidden sm:inline">Mã hóa đa tầng TLS 1.3 / RBAC</span>
          <span className="sm:hidden">Secure</span>
        </div>
      </header>

      {/* Main Login Form Container - Suspense Wrapped */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-10">
        <Suspense fallback={
          <div className="max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-10 text-center text-slate-400">
            Đang tải cổng xác thực...
          </div>
        }>
          <LoginForm />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-8 py-6 text-center text-xs text-slate-500 border-t border-slate-900">
        © 2026 Công ty TNHH Tân Hoàng Nga. Cổng Thương Hiệu Số & Hệ Thống Quản Trị Doanh Nghiệp.
      </footer>

    </div>
  );
}
