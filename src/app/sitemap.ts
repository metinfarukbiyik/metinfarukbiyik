import type { MetadataRoute } from 'next';
import { portfolioProjects } from '@/data/projects';
import { tools } from '@/data/tools';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = 'monthly',
  ) => ({ url: `${site.url}${path === '/' ? '' : path}`, lastModified, changeFrequency, priority });

  return [
    entry('/', 1, 'weekly'),
    entry('/projeler', 0.9, 'weekly'),
    entry('/araclar', 0.9),
    ...tools.map((tool) => entry(tool.href, 0.9)),
    ...portfolioProjects.map((project) =>
      entry(project.href, project.category === 'Uygulama' ? 0.8 : 0.6),
    ),
    entry('/hakkimda', 0.7),
    entry('/iletisim', 0.6, 'yearly'),
  ];
}
