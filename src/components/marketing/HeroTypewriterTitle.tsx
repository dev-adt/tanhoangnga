'use client';

import React, { useState, useEffect } from 'react';

interface HeroTypewriterTitleProps {
  line1?: string;
  gradientText?: string;
  suffixText?: string;
}

export function HeroTypewriterTitle({
  line1 = 'Kết Nối Công Nghệ',
  gradientText = 'Kiến Tạo Giá Trị',
  suffixText = ' — Vươn Ra Thế Giới'
}: HeroTypewriterTitleProps) {
  const [displayedLine1, setDisplayedLine1] = useState('');
  const [displayedGradient, setDisplayedGradient] = useState('');
  const [displayedSuffix, setDisplayedSuffix] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let currentStep = 0; // 0: line1, 1: gradient, 2: suffix, 3: done
    let charIndex = 0;
    let timer: NodeJS.Timeout;

    setDisplayedLine1('');
    setDisplayedGradient('');
    setDisplayedSuffix('');
    setIsTypingComplete(false);

    const typeNextChar = () => {
      if (currentStep === 0) {
        if (charIndex < line1.length) {
          setDisplayedLine1(line1.slice(0, charIndex + 1));
          charIndex++;
          timer = setTimeout(typeNextChar, 40);
        } else {
          currentStep = 1;
          charIndex = 0;
          timer = setTimeout(typeNextChar, 90);
        }
      } else if (currentStep === 1) {
        if (charIndex < gradientText.length) {
          setDisplayedGradient(gradientText.slice(0, charIndex + 1));
          charIndex++;
          timer = setTimeout(typeNextChar, 40);
        } else {
          currentStep = 2;
          charIndex = 0;
          timer = setTimeout(typeNextChar, 70);
        }
      } else if (currentStep === 2) {
        if (charIndex < suffixText.length) {
          setDisplayedSuffix(suffixText.slice(0, charIndex + 1));
          charIndex++;
          timer = setTimeout(typeNextChar, 40);
        } else {
          currentStep = 3;
          setIsTypingComplete(true);
        }
      }
    };

    timer = setTimeout(typeNextChar, 150);

    return () => clearTimeout(timer);
  }, [line1, gradientText, suffixText]);

  return (
    <h1 
      className="text-2xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-6xl font-black text-navy-text tracking-tight leading-[1.2] max-w-5xl mx-auto select-none"
      title={`${line1} ${gradientText}${suffixText}`}
    >
      {/* Line 1: Strictly 1 Line */}
      <span className="block min-h-[1.25em] whitespace-nowrap overflow-visible">
        {displayedLine1 || (
          <span className="invisible select-none">{line1}</span>
        )}
      </span>

      {/* Line 2: Strictly 1 Line */}
      <span className="block mt-1 sm:mt-2 min-h-[1.25em] whitespace-nowrap overflow-visible">
        <span className="text-gradient-brand">
          {displayedGradient}
        </span>
        <span>
          {displayedSuffix}
        </span>
        {!isTypingComplete && (
          <span className="inline-block w-1 sm:w-1.5 h-5 sm:h-8 lg:h-11 bg-brand-500 ml-1.5 translate-y-1 sm:translate-y-1.5 animate-pulse rounded-full" />
        )}
      </span>
    </h1>
  );
}
