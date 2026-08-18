'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Cpu, Server, MapPin, Coffee, ArrowRight, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

export function HeroOrbit() {
  const [activeNode, setActiveNode] = useState<number | null>(null);

  const nodes = [
    {
      id: 0,
      title: 'ADT Govina AI',
      subtitle: 'Bộ Trợ lý AI Phường/Xã',
      target: 'Chính quyền cơ sở',
      icon: Cpu,
      color: 'from-blue-600 to-cyan-500',
      accentColor: '#0B5CFF',
      borderColor: 'border-blue-300',
      badge: '5 lớp tri thức • Mô hình 1+4',
      position: 'top-0 left-1/2 -translate-x-1/2 -translate-y-4 sm:-translate-y-8',
      href: '/giai-phap/adt-govina-ai',
      desc: 'Kho tri thức số chuẩn hóa giúp cán bộ tra cứu nhanh, chính xác quy định pháp luật và nâng cao chất lượng phục vụ nhân dân.'
    },
    {
      id: 1,
      title: 'Orion AI Business OS',
      subtitle: 'Hệ điều hành Doanh nghiệp',
      target: 'Doanh nghiệp & SME',
      icon: Server,
      color: 'from-cyan-500 to-blue-700',
      accentColor: '#13B8E6',
      borderColor: 'border-cyan-300',
      badge: 'Multi-Model AI • Cloud & Self-host',
      position: 'top-1/2 right-0 translate-x-2 sm:translate-x-8 -translate-y-1/2',
      href: '/giai-phap/orion-ai-business-os',
      desc: 'Hợp nhất AI đa mô hình, CRM 360°, CMS, E-commerce và Quản trị dự án trên một nền tảng vận hành duy nhất.'
    },
    {
      id: 2,
      title: 'CoffeeVN.Today',
      subtitle: 'Từ Vùng Trồng đến Buyer Quốc Tế',
      target: 'Vùng trồng & Xuất khẩu',
      icon: Coffee,
      color: 'from-amber-500 to-orange-600',
      accentColor: '#FFC857',
      borderColor: 'border-amber-300',
      badge: 'Hộ chiếu số • Chuẩn EUDR • B2B RFQ',
      position: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-4 sm:translate-y-8',
      href: '/giai-phap/coffeevn-today',
      desc: 'Nền tảng dữ liệu số, hồ sơ vùng trồng và kết nối thương mại B2B minh bạch cho chuỗi cung ứng cà phê Việt Nam.'
    },
    {
      id: 3,
      title: 'DienBien.Today',
      subtitle: 'Cổng Thương Hiệu Số Địa Phương',
      target: 'Địa phương & Du lịch - Đầu tư',
      icon: MapPin,
      color: 'from-emerald-500 to-teal-700',
      accentColor: '#28D7A1',
      borderColor: 'border-emerald-300',
      badge: 'Trợ lý AI • OCOP • Xúc tiến đầu tư',
      position: 'top-1/2 left-0 -translate-x-2 sm:-translate-x-8 -translate-y-1/2',
      href: '/giai-phap/dienbien-today',
      desc: 'Cánh cửa số kết nối văn hóa, thiên nhiên hùng vĩ, đặc sản bản địa và cơ hội đầu tư của Điện Biên với thế giới.'
    }
  ];

  return (
    <div className="relative w-full max-w-4xl mx-auto py-12 px-4 select-none">
      
      {/* Background Decorative Rings */}
      <div className="relative aspect-square max-w-[540px] sm:max-w-[620px] mx-auto flex items-center justify-center">
        
        {/* Outer Orbit Ring */}
        <div className="absolute inset-0 rounded-full border border-dashed border-slate-300 animate-spin-slow pointer-events-none opacity-60"></div>
        
        {/* Inner Orbit Glow Ring */}
        <div className="absolute inset-12 sm:inset-16 rounded-full border border-blue-200/80 bg-blue-50/20 backdrop-blur-[2px] pointer-events-none"></div>

        {/* Center Node: Tân Hoàng Nga Hub */}
        <div className="relative z-20 w-44 sm:w-56 p-5 sm:p-6 rounded-3xl bg-white/95 shadow-2xl border-2 border-brand-500/30 text-center backdrop-blur-md transform transition-all duration-300 hover:scale-105 hover:border-brand-500 hover:shadow-glow">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-brand-600 via-cyan-accent to-mint-accent flex items-center justify-center text-white font-black text-2xl shadow-glow mb-2.5">
            T
          </div>
          <div className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-0.5">Trung Tâm Điều Phối</div>
          <h3 className="text-base sm:text-lg font-black text-navy-text leading-tight">TÂN HOÀNG NGA</h3>
          <p className="text-[11px] text-slate-500 mt-1 leading-snug">
            Khảo sát • Chuẩn bị dữ liệu • Phân phối & Triển khai • Đồng hành vận hành
          </p>
          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-center gap-1 text-[10px] text-emerald-600 font-semibold">
            <ShieldCheck className="w-3 h-3" />
            <span>Hợp tác chiến lược ADT</span>
          </div>
        </div>

        {/* 4 Orbital Nodes */}
        {nodes.map((node) => {
          const isActive = activeNode === node.id;
          return (
            <div
              key={node.id}
              className={`absolute ${node.position} z-30 transition-all duration-300`}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
            >
              <Link
                href={node.href}
                className={`block w-44 sm:w-52 p-3 sm:p-4 rounded-2xl bg-white shadow-xl border-2 ${node.borderColor} transition-all duration-300 group hover:-translate-y-1 hover:shadow-card-hover ${
                  isActive ? 'scale-105 shadow-glow ring-2 ring-brand-400' : ''
                }`}
              >
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className={`p-2 rounded-xl bg-gradient-to-br ${node.color} text-white shadow-sm shrink-0 group-hover:scale-110 transition-transform`}>
                    <node.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block truncate">
                      {node.target}
                    </span>
                    <h4 className="text-xs sm:text-sm font-extrabold text-navy-text group-hover:text-brand-500 transition-colors truncate">
                      {node.title}
                    </h4>
                  </div>
                </div>

                <div className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed mb-2">
                  {node.desc}
                </div>

                <div className="flex items-center justify-between pt-1.5 border-t border-slate-100 text-[10px] font-semibold text-brand-600">
                  <span className="truncate pr-1">{node.badge.split('•')[0]}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform shrink-0" />
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Orbit Footer Note */}
      <div className="mt-8 text-center">
        <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-xl mx-auto">
          Tân Hoàng Nga đóng vai trò cầu nối tích hợp, chuẩn hoá dữ liệu và triển khai thực địa, kết hợp cùng nền tảng công nghệ lõi từ đối tác chiến lược ADT Quốc tế.
        </p>
      </div>
    </div>
  );
}
