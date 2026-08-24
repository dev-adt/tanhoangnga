'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, FileText, PlusCircle, FolderTree, Tag, 
  Image, Users, Shield, Inbox, History, Settings, 
  LogOut, ExternalLink, Menu, X, ChevronRight, Sparkles,
  UserCheck, ShieldAlert, KeyRound, ChevronDown, Check, Lock
} from 'lucide-react';
import { useAuth, DEMO_ACCOUNTS } from '@/lib/auth/authContext';
import { RoleSlug } from '@/types';

// Map routes to required permissions
const ROUTE_PERMISSION_MAP: Record<string, string> = {
  '/dashboard/leads': 'leads.read',
  '/dashboard/posts': 'posts.read',
  '/dashboard/posts/new': 'posts.create',
  '/dashboard/categories': 'categories.manage',
  '/dashboard/tags': 'categories.manage',
  '/dashboard/media': 'media.manage.own',
  '/dashboard/users': 'users.manage',
  '/dashboard/roles': 'roles.manage',
  '/dashboard/audit-logs': 'audit.read',
  '/dashboard/settings': 'settings.manage'
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const { 
    currentUser, 
    roleSlug, 
    isAuthenticated, 
    isLoading, 
    logout, 
    switchRole, 
    hasPermission 
  } = useAuth();

  // All possible navigation items with permission requirements
  const allNavGroups = [
    {
      group: 'Tổng quan',
      items: [
        { name: 'Bảng điều khiển', href: '/dashboard', icon: LayoutDashboard, permission: 'dashboard.view' },
        { name: 'Yêu cầu tư vấn (Leads)', href: '/dashboard/leads', icon: Inbox, permission: 'leads.read', badge: 'Mới' }
      ]
    },
    {
      group: 'Quản trị nội dung (CMS)',
      items: [
        { name: 'Danh sách bài viết', href: '/dashboard/posts', icon: FileText, permission: 'posts.read' },
        { name: 'Viết bài mới', href: '/dashboard/posts/new', icon: PlusCircle, permission: 'posts.create' },
        { name: 'Chuyên mục', href: '/dashboard/categories', icon: FolderTree, permission: 'categories.manage' },
        { name: 'Thẻ (Tags)', href: '/dashboard/tags', icon: Tag, permission: 'categories.manage' },
        { name: 'Thư viện Media', href: '/dashboard/media', icon: Image, permission: 'media.manage.own' }
      ]
    },
    {
      group: 'Hệ thống & Phân quyền',
      items: [
        { name: 'Tài khoản thành viên', href: '/dashboard/users', icon: Users, permission: 'users.manage' },
        { name: 'Ma trận Phân quyền (RBAC)', href: '/dashboard/roles', icon: Shield, permission: 'roles.manage' },
        { name: 'Nhật ký kiểm toán (Audit)', href: '/dashboard/audit-logs', icon: History, permission: 'audit.read' },
        { name: 'Cấu hình Website', href: '/dashboard/settings', icon: Settings, permission: 'settings.manage' }
      ]
    }
  ];

  // Filter groups & items based on current role permissions
  const filteredNavGroups = allNavGroups.map(group => ({
    ...group,
    items: group.items.filter(item => hasPermission(item.permission))
  })).filter(group => group.items.length > 0);

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  // Check if current route is allowed
  const requiredPermission = ROUTE_PERMISSION_MAP[pathname];
  const isRouteAllowed = !requiredPermission || hasPermission(requiredPermission);

  // Auto redirect to login if not authenticated
  React.useEffect(() => {
    if (!isLoading && (!isAuthenticated || !currentUser)) {
      router.replace(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isLoading, isAuthenticated, currentUser, pathname, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-semibold">Đang kiểm tra quyền truy cập...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !currentUser) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 text-slate-100">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 mx-auto flex items-center justify-center border border-rose-500/30">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Yêu Cầu Đăng Nhập</h2>
            <p className="text-xs text-slate-400 mt-1">
              Bạn chưa đăng nhập vào hệ thống quản trị. Đang chuyển hướng đến cổng xác thực...
            </p>
          </div>
          <Link
            href={`/auth/login?redirect=${encodeURIComponent(pathname)}`}
            className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-bold block transition-all shadow-glow"
          >
            Đến Cổng Đăng Nhập Ngay
          </Link>
        </div>
      </div>
    );
  }

  const roleColorBadge = 
    roleSlug === 'super_admin' ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' :
    roleSlug === 'editor' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' :
    roleSlug === 'content_creator' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
    'bg-slate-700 text-slate-300 border-slate-600';

  return (
    <div className="min-h-screen bg-slate-100 flex text-slate-800">
      
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-navy-card text-white flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Sidebar Header */}
        <div>
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-500 via-cyan-accent to-mint-accent flex items-center justify-center text-white font-black shadow-glow text-lg">
                T
              </div>
              <div>
                <span className="font-bold text-sm tracking-tight text-white block">TÂN HOÀNG NGA</span>
                <span className="text-[10px] text-cyan-accent font-mono flex items-center gap-1">
                  <span>RBAC Phân Quyền</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-mint-accent animate-pulse"></span>
                </span>
              </div>
            </Link>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Role Indicator Banner */}
          <div className="px-4 pt-3 pb-1">
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-brand-400" />
                <span className="text-[11px] text-slate-300 font-semibold">Góc nhìn vai trò:</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border font-mono ${roleColorBadge}`}>
                {currentUser.roleSlug.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Navigation Links - Dynamically Filtered by RBAC */}
          <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-270px)] scrollbar-thin">
            {filteredNavGroups.map((group, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  {group.group}
                </div>
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isActive 
                          ? 'bg-brand-600 text-white shadow-sm' 
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Footer User Info & Role Switcher */}
        <div className="p-4 border-t border-slate-800 space-y-3 bg-slate-900/90">
          
          {/* User Profile */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                {currentUser.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <span className="font-bold text-white block truncate text-xs">{currentUser.name}</span>
                <span className="text-[10px] text-slate-400 block truncate">{currentUser.roleName}</span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
            <Link
              href="/"
              target="_blank"
              className="text-[11px] text-slate-400 hover:text-cyan-accent flex items-center gap-1.5 transition-colors"
            >
              <span>Xem trang public</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <button
              onClick={handleLogout}
              className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors"
            >
              <LogOut className="w-3 h-3" />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>

      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        
        {/* Dashboard Topbar */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-8 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Link href="/dashboard" className="hover:text-brand-600">Dashboard</Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-800 capitalize">
                {pathname.split('/')[2]?.replace('-', ' ') || 'Tổng quan'}
              </span>
            </div>
          </div>

          {/* Topbar Actions */}
          <div className="flex items-center gap-3">
            
            {/* Active User Badge */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-bold text-slate-800">{currentUser.name}</span>
              <span className="text-slate-400">|</span>
              <span className="text-brand-600 font-semibold">{currentUser.roleName}</span>
            </div>

            {hasPermission('posts.create') && (
              <Link
                href="/dashboard/posts/new"
                className="px-3.5 py-1.5 rounded-xl bg-brand-600 text-white text-xs font-bold hover:bg-brand-700 transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Viết bài mới</span>
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 transition-colors"
              title="Đăng xuất khỏi hệ thống"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Page Content with RBAC Protection */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          {isRouteAllowed ? (
            children
          ) : (
            <div className="max-w-xl mx-auto my-12 bg-white rounded-3xl p-8 border border-slate-200 shadow-card text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 mx-auto flex items-center justify-center border border-amber-500/20">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-navy-text">403 - Giới Hạn Quyền Truy Cập</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Tài khoản của bạn với vai trò <strong>{currentUser.roleName}</strong> không được cấp quyền thực hiện chức năng này.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/dashboard"
                  className="px-5 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs hover:bg-brand-700 transition-all inline-block shadow-sm"
                >
                  Quay lại Bảng điều khiển
                </Link>
              </div>
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
