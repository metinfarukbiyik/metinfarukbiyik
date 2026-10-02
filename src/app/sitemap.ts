import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/hakkimda`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${site.url}/projeler`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/geocam`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/1-ayet`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/byk-seri-baski-pro`, changeFrequency: 'monthly', priority: 0.8 },
  ];

  return staticRoutes;
};

export default sitemap;
