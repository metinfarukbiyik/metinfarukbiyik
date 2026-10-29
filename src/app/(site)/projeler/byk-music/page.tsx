import Image from 'next/image';
import { ArrowUpRight, Check } from 'lucide-react';
import ProductIntro from '@/components/ProductIntro';
import ProductDownloads from '@/components/ProductDownloads';
import { portfolioProjects } from '@/data/projects';
import { pageMetadata, projectSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import ProjectList from '@/components/ProjectList';

const project = portfolioProjects.find((p) => p.slug === 'byk-music')!;
export const metadata = pageMetadata(
  'BYK Music — YouTube MP3 / MP4 İndirici',
  'BYK Music ile YouTube video ve oynatma listelerini MP3 veya MP4 olarak indirin. Windows ve Apple Silicon macOS için Türkçe masaüstü uygulaması.',
  project.href,
  project.keywords,
);
const release = `${project.url}/releases/latest/download`;
export default function MusicPage() {
  return (
    <div className="animate-fade-up">
      <ProductIntro
        name={project.name}
        icon={project.iconImage!}
        platform="Windows · macOS"
        slogan="Bağlantıyı ekle. Biçimini seç. İndir."
        description={project.detail}
      >
        <ProductDownloads
          downloads={[
            {
              label: 'Windows için indir',
              url: `${release}/BYKMusic-Windows-Setup.exe`,
            },
            { label: 'macOS için indir', url: `${release}/BYKMusic-macOS.dmg` },
          ]}
          note="Windows 10 / 11 · macOS Apple Silicon (M1 ve sonrası)"
          repository={project.url}
        />
      </ProductIntro>
      <figure className="product-screenshot">
        <Image
          src="/images/music/download.png"
          alt="BYK Music Türkçe arayüzü: MP3 ve MP4 format seçimi, oynatma listesi ve indirme kuyruğu"
          width={2480}
          height={1560}
          priority
          sizes="(max-width: 768px) 90vw, 900px"
        />
        <figcaption>BYK Music — indirme ekranı</figcaption>
      </figure>
      <section className="project-detail-section">
        <h2>Müzik ve video, tek bir pencerede.</h2>
        <ul className="feature-checks">
          {project.features.map((f) => (
            <li key={f}>
              <Check size={16} />
              {f}
            </li>
          ))}
        </ul>
      </section>
      <section className="project-detail-section">
        <h2>Üç adımda kullanmaya başla</h2>
        <ol className="usage-steps">
          {[
            {
              title: 'Bağlantıyı ekle',
              text: 'YouTube video veya oynatma listesi bağlantısını yapıştır.',
            },
            {
              title: 'Seçimini yap',
              text: 'MP3 veya MP4 biçimini, kaliteyi ve kaydedilecek klasörü belirle.',
            },
            {
              title: 'İndirmeyi başlat',
              text: 'İstediğin parçaları seç ve ilerlemeyi uygulamadan takip et.',
            },
          ].map((s, i) => (
            <li key={s.title}>
              <span>0{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="project-detail-section">
        <h2>Kurulum</h2>
        <div className="installation-grid">
          <div>
            <h3>Windows</h3>
            <p>
              Kurulum dosyasını çalıştırıp adımları tamamla. Uygulamayı Başlat
              menüsünden açabilirsin.
            </p>
          </div>
          <div>
            <h3>macOS</h3>
            <p>
              DMG dosyasını aç, BYK Music’i Uygulamalar klasörüne taşı. İlk
              açılışta sağ tık → Aç seçeneğini kullan.
            </p>
          </div>
        </div>
        <a
          href={`${project.url}/releases/latest`}
          className="text-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sürüm notları ve tüm indirmeler <ArrowUpRight size={14} />
        </a>
      </section>
      <section className="project-detail-section">
        <h2>Diğer uygulamalar</h2>
        <div className="list-panel">
          <ProjectList
            projects={portfolioProjects.filter(
              (p) => p.category === 'Uygulama' && p.slug !== 'byk-music',
            )}
          />
        </div>
      </section>
      <JsonLd data={projectSchema(project)} />
    </div>
  );
}
