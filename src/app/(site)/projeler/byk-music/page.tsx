import ProjectDetail from '@/components/ProjectDetail';
import { portfolioProjects } from '@/data/projects';
import { pageMetadata } from '@/lib/seo';

const project = portfolioProjects.find((p) => p.slug === 'byk-music')!;
export const metadata = pageMetadata(
  'BYK Music — YouTube MP3 / MP4 İndirici',
  'BYK Music ile YouTube video ve oynatma listelerini MP3 veya MP4 olarak indirin. Windows ve Apple Silicon macOS için Türkçe masaüstü uygulaması.',
  project.href,
  project.keywords,
);


export default function MusicPage() {
  return <ProjectDetail project={project} />;
}
