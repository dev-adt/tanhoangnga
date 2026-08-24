'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Search, Menu, X, ChevronDown, 
  Sparkles, ArrowRight,
  MapPin, Coffee, Server, Cpu
} from 'lucide-react';
import { BrandLogo } from '@/components/common/BrandLogo';

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSolutionsDropdownOpen(false);
  }, [pathname]);

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navItems = [
    { 
      name: 'Giới thiệu', 
      href: '/gioi-thieu',
      children: [
        { name: 'Tổng quan công ty', href: '/gioi-thieu', desc: 'Định vị, lịch sử và pháp lý' },
        { name: 'Tầm nhìn & Sứ mệnh', href: '/gioi-thieu/tam-nhin-su-menh', desc: 'Mục tiêu 2035 & 5 giá trị cốt lõi' },
        { name: 'Năng lực & Lợi thế', href: '/gioi-thieu/nang-luc-loi-the', desc: 'Tư vấn, triển khai và dữ liệu' },
        { name: 'Ban lãnh đạo & Vận hành', href: '/gioi-thieu/ban-lanh-dao', desc: 'Đội ngũ và mô hình điều hành' }
      ]
    },
    { 
      name: 'Giải pháp', 
      href: '/giai-phap',
      isSolutionsDropdown: true
    },
    { name: 'Quy trình 6 bước', href: '/quy-trinh-trien-khai' },
    { name: 'Đối tác & ADT', href: '/doi-tac' },
    { name: 'Bài viết', href: '/bai-viet' },
    { name: 'Liên hệ', href: '/lien-he' }
  ];

  const solutions = [
    {
      title: 'ADT Govina AI',
      desc: 'Bộ trợ lý AI dành cho cấp Phường/Xã',
      href: '/giai-phap/adt-govina-ai',
      badge: 'Chính quyền cơ sở',
      icon: Cpu,
      color: 'from-blue-600 to-cyan-500'
    },
    {
      title: 'Orion AI Business OS',
      desc: 'Hệ điều hành doanh nghiệp đa mô hình AI',
      href: '/giai-phap/orion-ai-business-os',
      badge: 'Doanh nghiệp & SME',
      icon: Server,
      color: 'from-cyan-500 to-blue-700'
    },
    {
      title: 'DienBien.Today',
      desc: 'Cổng thương hiệu số & Trợ lý AI du lịch - đầu tư',
      href: '/giai-phap/dienbien-today',
      badge: 'Thương hiệu địa phương',
      icon: MapPin,
      color: 'from-emerald-500 to-teal-700'
    },
    {
      title: 'CoffeeVN.Today',
      desc: 'Hộ chiếu số & Kết nối B2B Cà phê Việt Nam',
      href: '/giai-phap/coffeevn-today',
      badge: 'Nông nghiệp & Xuất khẩu',
      icon: Coffee,
      color: 'from-amber-500 to-orange-600'
    }
  ];

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-500 focus:text-white focus:rounded-lg focus:shadow-lg">
        Chuyển đến nội dung chính
      </a>

      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'glass-nav shadow-sm py-3' 
          : 'bg-white/80 backdrop-blur-md border-b border-slate-100 py-3.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Logo & Brand Name */}
          <Link 
            href="/" 
            onClick={handleLogoClick}
            className="flex items-center gap-3 group shrink-0"
            title="Tân Hoàng Nga - Về đầu trang"
          >
            <BrandLogo size="md" />
          </Link>

          {/* Desktop Navigation - Strictly 1 Line */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 shrink-0">
            {navItems.map((item) => {
              if (item.isSolutionsDropdown) {
                return (
                  <div 
                    key={item.name} 
                    className="relative"
                    onMouseEnter={() => setSolutionsDropdownOpen(true)}
                    onMouseLeave={() => setSolutionsDropdownOpen(false)}
                  >
                    <Link
                      href="/giai-phap"
                      className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-1 transition-colors whitespace-nowrap ${
                        pathname.startsWith('/giai-phap') 
                          ? 'text-brand-500 bg-brand-50' 
                          : 'text-slate-700 hover:text-brand-500 hover:bg-slate-50'
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 shrink-0 ${solutionsDropdownOpen ? 'rotate-180 text-brand-500' : ''}`} />
                    </Link>

                    {/* Solutions Dropdown Menu */}
                    {solutionsDropdownOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[600px] bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                        {solutions.map((sol) => (
                          <Link
                            key={sol.title}
                            href={sol.href}
                            className="p-3.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all group flex items-start gap-3"
                          >
                            <div className={`p-2.5 rounded-xl bg-gradient-to-br ${sol.color} text-white shadow-sm shrink-0 group-hover:scale-105 transition-transform`}>
                              <sol.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5 mb-1">
                                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                                  {sol.badge}
                                </span>
                              </div>
                              <h4 className="text-sm font-bold text-navy-text group-hover:text-brand-500 transition-colors">
                                {sol.title}
                              </h4>
                              <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">
                                {sol.desc}
                              </p>
                            </div>
                          </Link>
                        ))}
                        <div className="col-span-2 pt-2 border-t border-slate-100 flex items-center justify-between px-2 text-xs">
                          <span className="text-slate-500">Hợp tác chiến lược công nghệ cùng ADT Quốc tế</span>
                          <Link href="/giai-phap" className="text-brand-500 font-semibold hover:underline flex items-center gap-1">
                            Xem tất cả giải pháp <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              if (item.children) {
                return (
                  <div key={item.name} className="relative group">
                    <Link
                      href={item.href}
                      className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-1 transition-colors whitespace-nowrap ${
                        pathname.startsWith(item.href)
                          ? 'text-brand-500 bg-brand-50'
                          : 'text-slate-700 hover:text-brand-500 hover:bg-slate-50'
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform shrink-0" />
                    </Link>
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-slate-100 p-2 hidden group-hover:block animate-in fade-in slide-in-from-top-1 duration-150 z-50">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="p-2.5 rounded-lg hover:bg-slate-50 block transition-colors"
                        >
                          <div className="text-sm font-semibold text-navy-text">{child.name}</div>
                          <div className="text-xs text-slate-500">{child.desc}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${
                    pathname === item.href
                      ? 'text-brand-500 bg-brand-50'
                      : 'text-slate-700 hover:text-brand-500 hover:bg-slate-50'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <Link
              href="/tim-kiem"
              aria-label="Tìm kiếm trên website"
              className="p-2.5 rounded-xl text-slate-600 hover:text-brand-500 hover:bg-slate-100 transition-colors"
            >
              <Search className="w-4 h-4" />
            </Link>

            <Link
              href="/lien-he"
              className="px-4 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-brand-500 to-cyan-accent hover:shadow-glow transition-all transform hover:-translate-y-0.5 flex items-center gap-1.5 whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4" />
              <span>Yêu cầu Tư vấn</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/tim-kiem"
              aria-label="Tìm kiếm"
              className="p-2 text-slate-600 hover:text-brand-500"
            >
              <Search className="w-5 h-5" />
            </Link>
            <button
              type="button"
              aria-label="Mở bảng điều hướng"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200 max-h-[85vh] overflow-y-auto">
            <div className="space-y-1">
              <div className="px-3 py-2 font-bold text-xs uppercase tracking-wider text-slate-400">
                Hệ thống giải pháp
              </div>
              {solutions.map((sol) => (
                <Link
                  key={sol.title}
                  href={sol.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50"
                >
                  <sol.icon className="w-4 h-4 text-brand-500" />
                  <div>
                    <div className="text-sm font-semibold text-slate-800">{sol.title}</div>
                    <div className="text-xs text-slate-500">{sol.desc}</div>
                  </div>
                </Link>
              ))}

              <div className="px-3 py-2 font-bold text-xs uppercase tracking-wider text-slate-400">
                Thông tin & Hợp tác
              </div>
              <Link
                href="/gioi-thieu"
                className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Giới thiệu Tân Hoàng Nga
              </Link>
              <Link
                href="/quy-trinh-trien-khai"
                className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Quy trình triển khai 6 bước
              </Link>
              <Link
                href="/doi-tac"
                className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Đối tác & Hợp tác ADT
              </Link>
              <Link
                href="/bai-viet"
                className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Bài viết & Tin tức
              </Link>
              <Link
                href="/lien-he"
                className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Liên hệ hợp tác
              </Link>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
              <Link
                href="/lien-he"
                className="w-full text-center py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-brand-500 to-cyan-accent"
              >
                Đăng ký Tư vấn / Demo
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
