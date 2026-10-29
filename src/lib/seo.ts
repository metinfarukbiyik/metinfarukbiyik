import type { Metadata } from 'next';
import { site } from './site';
import type { PortfolioProject } from '@/data/projects';

export function pageMetadata(
  title: string,
  description: string,
  path: string,
  keywords: string[],
): Metadata {
  const fullTitle = `${title} | ${site.name}`;
  const image = `${site.url}/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;
  return {
    title: { absolute: fullTitle },
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'tr_TR',
      url: path,
      siteName: site.name,
      title: fullTitle,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

export function projectSchema(project: PortfolioProject) {
  return {
    '@context': 'https://schema.org',
    '@type':
      project.category === 'Uygulama' ? 'SoftwareApplication' : 'CreativeWork',
    name: project.name,
    description: project.detail,
    url: `${site.url}${project.href}`,
    ...(project.image ? { image: `${site.url}${project.image}` } : {}),
    keywords: project.keywords.join(', '),
    inLanguage: 'tr',
    author: { '@type': 'Person', name: site.name, url: site.url },
    ...(project.category === 'Uygulama'
      ? {
          operatingSystem:
            project.slug === 'geocam'
              ? 'iOS'
              : project.slug === 'byk-music'
                ? 'Windows 10, Windows 11, macOS Apple Silicon'
                : 'Windows 10, Windows 11, macOS 12+',
          applicationCategory:
            project.slug === 'byk-music'
              ? 'MultimediaApplication'
              : 'BusinessApplication',
        }
      : { sameAs: project.url }),
  };
}
