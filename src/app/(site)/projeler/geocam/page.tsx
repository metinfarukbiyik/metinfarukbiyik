import { pageMetadata, projectSchema } from '@/lib/seo';
import { portfolioProjects } from '@/data/projects';
import JsonLd from '@/components/JsonLd';
import ProductIntro from '@/components/ProductIntro';
import ProductDownloads from '@/components/ProductDownloads';
import ProjectList from '@/components/ProjectList';
import ScreenshotGallery from '@/components/ScreenshotGallery';
import { getAppStoreStats } from '@/lib/appStore';
import {
  featureGroups,
  geocam,
  useCases,
  privacyPoints,
} from '@/data/geocamData';
import { Check } from 'lucide-react';

const project = portfolioProjects.find((p) => p.slug === 'geocam')!;
export const metadata = pageMetadata(
  'GeoCam: Audit — GPS Kamera',
  'GeoCam: Audit ile iPhone fotoğraflarına GPS, adres, tarih, saat ve iş bilgisi ekleyin. Saha ve denetim ekipleri için konum doğrulamalı kamera.',
  project.href,
  project.keywords,
);

export default async function GeoCamPage() {
  const { rating, ratingCount, version } = await getAppStoreStats();
  const facts = [
    {
      label: 'Puan',
      value: `${rating.toFixed(1).replace('.', ',')} · ${ratingCount} değerlendirme`,
    },
    { label: 'Sürüm', value: version },
    { label: 'Platform', value: 'iPhone · iOS 17+' },
    { label: 'Boyut', value: '2 MB' },
    { label: 'Fiyat', value: 'Ücretsiz' },
    { label: 'Kategori', value: 'İş' },
  ];
  return (
    <div className="animate-fade-up">
      <ProductIntro
        name={geocam.name}
        icon={geocam.icon}
        platform="iPhone · iOS"
        slogan={geocam.slogan}
        description={geocam.description}
      >
        <ProductDownloads
          downloads={[
            {
              label: 'App Store’dan indir',
              url: geocam.storeUrl,
              external: true,
            },
          ]}
          note="iPhone · iOS 17 ve sonrası · Ücretsiz"
        />
      </ProductIntro>
      <ScreenshotGallery />
      {featureGroups.map((group) => (
        <section className="project-detail-section" key={group.title}>
          <h2>{group.title}</h2>
          <ul className="feature-checks">
            {group.items.map((item) => (
              <li key={item}>
                <Check size={16} />
                {item}
              </li>
            ))}
          </ul>
        </section>
      ))}
      <section className="project-detail-section">
        <h2>Üç adımda kullanmaya başla</h2>
        <ol className="usage-steps">
          {[
            {
              title: 'Bilgilerini ayarla',
              text: 'Fotoğrafta yer alacak konum, zaman ve iş bilgilerini seç.',
            },
            {
              title: 'Fotoğrafını çek',
              text: 'GPS konumu ve seçtiğin bilgi katmanı fotoğrafa otomatik eklensin.',
            },
            {
              title: 'Güvenle kaydet',
              text: 'Saha ve denetim fotoğraflarını cihazında sakla.',
            },
          ].map((step, index) => (
            <li key={step.title}>
              <span>0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="project-detail-section">
        <h2>Kullanım alanları</h2>
        <ul className="feature-checks">
          {useCases.map((item) => (
            <li key={item}>
              <Check size={16} />
              {item}
            </li>
          ))}
        </ul>
      </section>
      <section className="project-detail-section">
        <h2>Gizlilik</h2>
        <p>{geocam.privacy}</p>
        <ul className="feature-checks">
          {privacyPoints.map((item) => (
            <li key={item}>
              <Check size={16} />
              {item}
            </li>
          ))}
        </ul>
      </section>
      <dl className="project-facts">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>
      <section className="project-detail-section">
        <h2>Diğer uygulamalar</h2>
        <div className="list-panel">
          <ProjectList
            projects={portfolioProjects.filter(
              (p) => p.category === 'Uygulama' && p.slug !== 'geocam',
            )}
          />
        </div>
      </section>
      <JsonLd data={projectSchema(project)} />
    </div>
  );
}
