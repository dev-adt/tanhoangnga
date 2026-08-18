import type { Metadata } from 'next';
import './globals.css';
import { repo } from '@/lib/store/repository';
import { getOrganizationSchema, getWebsiteSchema } from '@/lib/seo/schema';
import { AppProviders } from '@/components/providers/AppProviders';

export async function generateMetadata(): Promise<Metadata> {
  const settings = repo.getSettings();
  return {
    metadataBase: new URL('https://tanhoangnga.vn'),
    title: {
      default: settings.defaultSeoTitle,
      template: `%s | ${settings.companyName}`
    },
    description: settings.defaultMetaDescription,
    keywords: [
      'Tân Hoàng Nga', 'Công ty TNHH Tân Hoàng Nga', 'ADT Govina AI', 
      'Orion AI Business OS', 'DienBien Today', 'CoffeeVN Today', 
      'Chuyển đổi số', 'Trợ lý AI Phường Xã', 'Multi Model AI'
    ],
    authors: [{ name: 'Công ty TNHH Tân Hoàng Nga' }],
    creator: 'Tân Hoàng Nga',
    publisher: 'Công ty TNHH Tân Hoàng Nga',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'vi_VN',
      url: 'https://tanhoangnga.vn',
      title: settings.defaultSeoTitle,
      description: settings.defaultMetaDescription,
      siteName: settings.companyName,
      images: [
        {
          url: settings.ogImage,
          width: 1200,
          height: 630,
          alt: 'Cổng thông tin & Hệ sinh thái giải pháp Tân Hoàng Nga'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: settings.defaultSeoTitle,
      description: settings.defaultMetaDescription,
      images: [settings.ogImage]
    }
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = repo.getSettings();
  const orgSchema = getOrganizationSchema(settings);
  const webSchema = getWebsiteSchema();

  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSchema) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col selection:bg-brand-500 selection:text-white">
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
