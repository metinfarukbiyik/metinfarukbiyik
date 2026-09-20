import type { MetadataRoute } from 'next';
import { getPosts } from '@/lib/blog';
import { site } from '@/lib/site';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const posts = await getPosts().catch(() => []);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/blog`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${site.url}/projeler`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/geocam`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/byk-seri-baski-pro`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/sertifikalar`, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${site.url}/ekipmanlar`, changeFrequency: 'yearly', priority: 0.6 },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes];
};

export default sitemap;
