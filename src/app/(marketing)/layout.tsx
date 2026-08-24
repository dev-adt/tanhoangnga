import React from 'react';
import { Header } from '@/components/marketing/Header';
import { Footer } from '@/components/marketing/Footer';
import { ScrollToTop } from '@/components/marketing/ScrollToTop';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main id="main-content" className="flex-1 pt-16 sm:pt-20">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
