import ProjectDetail from '@/components/ProjectDetail';
import { portfolioProjects } from '@/data/projects';
import { pageMetadata } from '@/lib/seo';
import { byk } from '@/data/bykData';

const project = portfolioProjects.find((p) => p.slug === 'byk-seri-baski-pro')!;
export const metadata = pageMetadata(
  'BYK Seri Baskı Pro — Barkod Etiket Programı',
  byk.metaDescription,
  project.href,
  project.keywords,
);


export default function BykPage() {
  return <ProjectDetail project={project} />;
}
