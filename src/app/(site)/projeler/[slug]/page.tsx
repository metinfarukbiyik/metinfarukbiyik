import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Check, Globe } from 'lucide-react';
import { portfolioProjects } from '@/data/projects';
import { pageMetadata, projectSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import ProjectList from '@/components/ProjectList';
import { site } from '@/lib/site';

const webProjects = portfolioProjects.filter(
  (p) => p.category === 'Web sitesi',
);
export const dynamicParams = false;
export function generateStaticParams() {
  return webProjects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = webProjects.find((p) => p.slug === slug);
  if (!p) notFound();
  return pageMetadata(p.name, p.description, p.href, p.keywords);
}
export default async function WebProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = webProjects.find((p) => p.slug === slug);
  if (!project) notFound();
  return (
    <div className="animate-fade-up">
      <Link href="/projeler" className="back-link">
        <ArrowLeft size={14} /> Tüm projeler
      </Link>
      <header className="product-heading">
        <span className="product-symbol">
          <Globe size={30} strokeWidth={1.4} />
        </span>
        <div>
          <span className="category-badge purple">{project.platform}</span>
          <h1>{project.name}</h1>
          <p>{project.description}</p>
        </div>
      </header>
      <a
        href={project.url}
        className="pill-button primary-button"
        target="_blank"
        rel="noopener noreferrer"
      >
        Siteyi ziyaret et <ArrowUpRight size={15} />
      </a>
      <section className="project-detail-section">
        <h2>Proje hakkında</h2>
        <p>{project.detail}</p>
        <ul className="feature-checks">
          {project.features.map((f) => (
            <li key={f}>
              <Check size={16} />
              {f}
            </li>
          ))}
        </ul>
      </section>
      <dl className="project-facts">
        <div>
          <dt>Geliştirici</dt>
          <dd>Metin Faruk Bıyık</dd>
        </div>
        <div>
          <dt>Platform</dt>
          <dd>{project.platform}</dd>
        </div>
        <div>
          <dt>Adres</dt>
          <dd>
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              {new URL(project.url).hostname} <ArrowUpRight size={12} />
            </a>
          </dd>
        </div>
      </dl>
      <section className="project-detail-section">
        <h2>Diğer projeler</h2>
        <div className="list-panel">
          <ProjectList projects={webProjects.filter((p) => p.slug !== slug)} />
        </div>
      </section>
      <JsonLd data={projectSchema(project)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Ana sayfa',
              item: site.url,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Projeler',
              item: `${site.url}/projeler`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: project.name,
              item: `${site.url}${project.href}`,
            },
          ],
        }}
      />
    </div>
  );
}
