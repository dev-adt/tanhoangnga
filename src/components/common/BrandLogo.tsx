import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  lightText?: boolean;
}

export function BrandLogo({ size = 'md', showText = true, lightText = false }: BrandLogoProps) {
  const iconSizes = {
    sm: 'w-8 h-8 text-base rounded-lg',
    md: 'w-10 h-10 text-xl rounded-xl',
    lg: 'w-12 h-12 text-2xl rounded-2xl'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg sm:text-xl',
    lg: 'text-xl sm:text-2xl'
  };

  return (
    <div className="flex items-center gap-3 group shrink-0 select-none">
      {/* Dynamic Stylized Brand Icon */}
      <div className={`${iconSizes[size]} bg-gradient-to-tr from-brand-600 via-cyan-accent to-mint-accent flex items-center justify-center shadow-glow text-white font-black transition-transform group-hover:scale-105 shrink-0 relative overflow-hidden`}>
        <span className="relative z-10 font-black tracking-tighter">T</span>
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>

      {showText && (
        <div className="flex flex-col whitespace-nowrap">
          <span className={`font-extrabold ${textSizes[size]} ${lightText ? 'text-white' : 'text-navy-text'} tracking-tight flex items-center gap-1.5 leading-tight`}>
            TÂN HOÀNG NGA
            <span className="inline-block w-2 h-2 rounded-full bg-mint-accent animate-pulse"></span>
          </span>
          <span className={`text-[10px] sm:text-[11px] ${lightText ? 'text-cyan-accent' : 'text-slate-500'} tracking-wider uppercase font-medium mt-0.5 leading-none font-mono`}>
            Cổng Thương Hiệu Số & AI
          </span>
        </div>
      )}
    </div>
  );
}
