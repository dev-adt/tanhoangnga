'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs: FaqItem[];
  title?: string;
  subtitle?: string;
}

export function FaqAccordion({ 
  faqs, 
  title = "Câu Hỏi Thường Gặp (FAQ)", 
  subtitle = "Giải đáp các thắc mắc về triển khai, dữ liệu, bảo mật và chi phí." 
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-xs font-extrabold uppercase tracking-wider mb-2">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Hỏi & Đáp Chuyên Môn</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-navy-text tracking-tight">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {subtitle}
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen 
                  ? 'bg-white border-brand-300 shadow-md ring-1 ring-brand-100' 
                  : 'bg-white/80 border-slate-200 hover:border-slate-300'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-navy-text text-sm sm:text-base focus:outline-none"
              >
                <span>{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-brand-600 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in duration-150">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
