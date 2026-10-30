import { notFound } from 'next/navigation';
import ProjectDetail from '@/components/ProjectDetail';
import { portfolioProjects } from '@/data/projects';
import { pageMetadata } from '@/lib/seo';

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
export default async function WebProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = webProjects.find((item) => item.slug === slug);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
