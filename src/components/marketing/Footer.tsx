import React from 'react';
import Link from 'next/link';
import { 
  Building2, Phone, Mail, MapPin, ShieldCheck, 
  ExternalLink, ArrowUpRight, Cpu, Server, Coffee, 
  Globe, FileText, CheckCircle2
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-navy-dark text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1 & 2: Company Profile & Legal Statement */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-500 via-cyan-accent to-mint-accent flex items-center justify-center text-white font-black text-xl shadow-glow">
                T
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">CÔNG TY TNHH TÂN HOÀNG NGA</h3>
                <p className="text-xs text-cyan-accent font-medium">Hệ sinh thái Giải pháp AI & Chuyển đổi số</p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              Tân Hoàng Nga là doanh nghiệp kết nối thị trường, tổ chức triển khai và đồng hành vận hành các giải pháp AI — chuyển đổi số; phát triển những nền tảng thương hiệu số kết nối địa phương, doanh nghiệp và thị trường quốc tế.
            </p>

            {/* Legal Information Box */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <Building2 className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <span><strong>Mã số thuế:</strong> 0111452097</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <span><strong>Trụ sở:</strong> Số 10, ngõ 1194 đường Láng, Phường Láng, TP. Hà Nội</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <span><strong>Hotline:</strong> 0856 040 205 (TGĐ Bùi Thái Hoàng)</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-mint-accent shrink-0" />
                <span><strong>Hợp tác chiến lược:</strong> Hợp đồng số 203-140826/ADT với ADT Quốc tế</span>
              </div>
            </div>
          </div>

          {/* Col 3: Four Solutions */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Hệ Sinh Thái Giải Pháp</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/giai-phap/adt-govina-ai" className="hover:text-cyan-accent transition-colors flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-brand-400" />
                  <span>ADT Govina AI (Phường/Xã)</span>
                </Link>
              </li>
              <li>
                <Link href="/giai-phap/orion-ai-business-os" className="hover:text-cyan-accent transition-colors flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-brand-400" />
                  <span>Orion AI Business OS</span>
                </Link>
              </li>
              <li>
                <Link href="/giai-phap/dienbien-today" className="hover:text-cyan-accent transition-colors flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-brand-400" />
                  <span>DienBien.Today</span>
                </Link>
              </li>
              <li>
                <Link href="/giai-phap/coffeevn-today" className="hover:text-cyan-accent transition-colors flex items-center gap-1.5">
                  <Coffee className="w-3.5 h-3.5 text-brand-400" />
                  <span>CoffeeVN.Today (B2B)</span>
                </Link>
              </li>
              <li>
                <Link href="/quy-trinh-trien-khai" className="hover:text-cyan-accent transition-colors flex items-center gap-1.5 text-slate-400 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-mint-accent" />
                  <span>Quy trình triển khai 6 bước</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Corporate Navigation */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Doanh Nghiệp & Hợp Tác</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/gioi-thieu" className="hover:text-cyan-accent transition-colors">
                  Giới thiệu Tân Hoàng Nga
                </Link>
              </li>
              <li>
                <Link href="/gioi-thieu/tam-nhin-su-menh" className="hover:text-cyan-accent transition-colors">
                  Tầm nhìn 2035 & 5 Giá trị cốt lõi
                </Link>
              </li>
              <li>
                <Link href="/gioi-thieu/nang-luc-loi-the" className="hover:text-cyan-accent transition-colors">
                  Năng lực & Lợi thế cạnh tranh
                </Link>
              </li>
              <li>
                <Link href="/gioi-thieu/ban-lanh-dao" className="hover:text-cyan-accent transition-colors">
                  Ban lãnh đạo & Vận hành
                </Link>
              </li>
              <li>
                <Link href="/doi-tac" className="hover:text-cyan-accent transition-colors">
                  Mô hình hợp tác Đối tác & ADT
                </Link>
              </li>
              <li>
                <Link href="/bai-viet" className="hover:text-cyan-accent transition-colors">
                  Thư viện Tri thức & Tin tức
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Security, Legal & Policy */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Pháp Lý & Bảo Mật</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/chinh-sach-bao-mat" className="hover:text-cyan-accent transition-colors flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-mint-accent" />
                  <span>Chính sách Bảo mật & Dữ liệu</span>
                </Link>
              </li>
              <li>
                <Link href="/dieu-khoan-su-dung" className="hover:text-cyan-accent transition-colors flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>Điều khoản Sử dụng</span>
                </Link>
              </li>
            </ul>

            <div className="pt-2">
              <span className="text-xs px-2.5 py-1 rounded-md bg-brand-900/60 text-brand-300 border border-brand-800 font-mono inline-block">
                Hệ sinh thái AI 2026
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Công ty TNHH Tân Hoàng Nga. Đã đăng ký bản quyền. Thông tin được công bố theo tiêu chuẩn hồ sơ năng lực 2026.</p>
          <div className="flex items-center gap-6">
            <Link href="/chinh-sach-bao-mat" className="hover:text-slate-400 transition-colors">Bảo mật</Link>
            <Link href="/dieu-khoan-su-dung" className="hover:text-slate-400 transition-colors">Điều khoản</Link>
            <Link href="/sitemap.xml" className="hover:text-slate-400 transition-colors">Sitemap XML</Link>
            <Link href="/llms.txt" className="hover:text-slate-400 transition-colors">LLMs Discovery</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
