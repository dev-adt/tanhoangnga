import React from 'react';
import Image from 'next/image';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  lightText?: boolean;
  withTagline?: boolean;
}

export function BrandLogo({ size = 'md', lightText = false, withTagline = false }: BrandLogoProps) {
  const heightClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-11',
    lg: 'h-12 sm:h-14',
    xl: 'h-14 sm:h-16'
  };

  return (
    <div className="flex items-center gap-3 group shrink-0 select-none">
      <div className={`relative ${heightClasses[size]} w-auto flex items-center`}>
        <Image
          src="/logo.png"
          alt="Tân Hoàng Nga Logo"
          width={260}
          height={65}
          className={`${heightClasses[size]} w-auto object-contain transition-transform group-hover:scale-102`}
          priority
        />
      </div>

      {withTagline && (
        <div className="hidden sm:flex flex-col border-l border-slate-300 pl-3 py-0.5">
          <span className={`text-[10px] font-bold uppercase tracking-wider ${lightText ? 'text-cyan-accent' : 'text-slate-500'}`}>
            Cổng Thương Hiệu Số & AI
          </span>
          <span className={`text-[9px] ${lightText ? 'text-slate-300' : 'text-slate-400'} font-medium`}>
            Hồ Sơ Năng Lực 2026
          </span>
        </div>
      )}
    </div>
  );
}
