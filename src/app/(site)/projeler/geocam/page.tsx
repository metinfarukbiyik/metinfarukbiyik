import ProjectDetail from '@/components/ProjectDetail';
import { portfolioProjects } from '@/data/projects';
import { pageMetadata } from '@/lib/seo';

const project = portfolioProjects.find((p) => p.slug === 'geocam')!;
export const metadata = pageMetadata(
  'GeoCam: Audit — GPS Kamera',
  'GeoCam: Audit ile iPhone fotoğraflarına GPS, adres, tarih, saat ve iş bilgisi ekleyin. Saha ve denetim ekipleri için konum doğrulamalı kamera.',
  project.href,
  project.keywords,
);


export default function GeoCamPage() {
  return <ProjectDetail project={project} />;
}
