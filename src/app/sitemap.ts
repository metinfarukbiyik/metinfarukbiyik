import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { portfolioProjects } from '@/data/projects';
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '/',
    '/hakkimda',
    '/projeler',
    '/iletisim',
    '/araclar',
    '/araclar/vesikalik-fotograf',
    '/araclar/internet-hiz-testi',
    '/araclar/ip-adresim',
    ...portfolioProjects.map((p) => p.href),
  ].map((path) => ({
    url: `${site.url}${path === '/' ? '' : path}`,
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.8,
  }));
}
