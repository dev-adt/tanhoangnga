import { MetadataRoute } from 'next';
import { repo } from '@/lib/store/repository';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tanhoangnga.vn';
  const posts = repo.getPosts({ status: 'PUBLISHED' });
  const categories = repo.getCategories();
  const tags = repo.getTags();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/gioi-thieu`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/gioi-thieu/tam-nhin-su-menh`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/gioi-thieu/nang-luc-loi-the`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/gioi-thieu/ban-lanh-dao`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/giai-phap`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/giai-phap/adt-govina-ai`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/giai-phap/orion-ai-business-os`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/giai-phap/dienbien-today`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/giai-phap/coffeevn-today`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/quy-trinh-trien-khai`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/doi-tac`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/bai-viet`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/lien-he`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/chinh-sach-bao-mat`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/dieu-khoan-su-dung`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map(p => ({
    url: `${baseUrl}/bai-viet/${p.slug}`,
    lastModified: new Date(p.updatedAt || p.createdAt),
    changeFrequency: 'weekly',
    priority: p.isPinned ? 0.9 : 0.7
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map(c => ({
    url: `${baseUrl}/bai-viet/chuyen-muc/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6
  }));

  const tagRoutes: MetadataRoute.Sitemap = tags.map(t => ({
    url: `${baseUrl}/bai-viet/chu-de/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.5
  }));

  return [...staticRoutes, ...postRoutes, ...categoryRoutes, ...tagRoutes];
}
