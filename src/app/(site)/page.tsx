import Image from 'next/image';
import { Download, MapPin } from 'lucide-react';
import myPhoto from '@/assets/images/mefa.png';
import ContactCta from '@/components/ContactCta';
import WebJourney from '@/components/home/WebJourney';
import { ProjectGrid, ProjectRows } from '@/components/projects/ProjectCard';
import ToolCard from '@/components/tools/ToolCard';
import { Badge, ButtonLink, Frame, Kicker, Section, TextLink, Tooltip } from '@/components/ui';
import { certificates } from '@/data/cvData';
import { appProjects, portfolioProjects, webProjects } from '@/data/projects';
import { tools } from '@/data/tools';
import { pageMetadata, seoPages } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = pageMetadata(seoPages.home);

const firstLineYear = 2015;
const stats = [
  { value: String(portfolioProjects.length), label: 'yayında proje' },
  { value: String(tools.length), label: 'ücretsiz araç' },
  { value: `${new Date().getFullYear() - firstLineYear}+`, label: 'yıldır web ile' },
  { value: String(certificates.length), label: 'sertifika' },
];

export default function HomePage() {
  return (
    <div className="container">
      <section className="hero" aria-labelledby="hero-baslik">
        <div className="hero-copy rise">
          <Kicker>merhaba, ben</Kicker>
          <h1 id="hero-baslik" className="title-display">
            Metin Faruk Bıyık<span className="hero-caret" aria-hidden="true" />
          </h1>
          <p className="lead">
            HTML ile başlayan merakımı bugün web, mobil ve masaüstünde günlük işleri
            kolaylaştıran sade ürünlere dönüştürüyorum.
          </p>
          <div className="hero-meta">
            <Badge icon={<MapPin aria-hidden="true" />}>Trabzon, Türkiye</Badge>
            <Badge tone="accent" live>
              Yeni projelere açık
            </Badge>
            <Badge code>web · ios · desktop</Badge>
          </div>
          <div className="hero-actions">
            <ButtonLink href="/projeler" variant="primary" size="lg" trailing="arrow">
              Projeleri incele
            </ButtonLink>
            <ButtonLink href="/hakkimda" size="lg">
              Biraz tanışalım
            </ButtonLink>
            <Tooltip content="PDF · güncel özgeçmiş">
              <ButtonLink
                href={site.cv}
                download
                variant="ghost"
                size="lg"
                icon={<Download aria-hidden="true" />}
              >
                CV
              </ButtonLink>
            </Tooltip>
          </div>
        </div>
        <Frame
          className="hero-card rise rise-2"
          title="biyik.dev/metin"
          meta="200 OK"
          bodyClassName="hero-card-body"
        >
          <div className="hero-photo">
            <Image
              src={myPhoto}
              alt="Metin Faruk Bıyık"
              fill
              priority
              placeholder="blur"
              sizes="(max-width: 860px) 60vw, 300px"
            />
          </div>
          <pre className="hero-code" aria-hidden="true">
            <code>
              <span className="tk-p">&lt;</span>
              <span className="tk-t">person</span>
              {'\n  '}
              <span className="tk-a">name</span>=<span className="tk-s">&quot;Metin Faruk Bıyık&quot;</span>
              {'\n  '}
              <span className="tk-a">city</span>=<span className="tk-s">&quot;Trabzon&quot;</span>
              {'\n  '}
              <span className="tk-a">since</span>=<span className="tk-s">&quot;1999&quot;</span>
              {'\n'}
              <span className="tk-p">/&gt;</span>
            </code>
          </pre>
        </Frame>
      </section>

      <dl className="stats rise rise-3">
        {stats.map((stat) => (
          <div key={stat.label}>
            <dt>{stat.label}</dt>
            <dd className="mono">{stat.value}</dd>
          </div>
        ))}
      </dl>

      <Section
        id="yolculuk"
        kicker="web yolculuğu"
        index="01"
        title="1999’dan bugüne, web ile birlikte büyüdüm."
        description="Tablo düzenli sayfalardan fiber altyapıya, oradan bugünün uygulamalarına: her dönem bir sonraki ürüne malzeme oldu."
      >
        <WebJourney />
      </Section>

      <Section
        id="uygulamalar"
        kicker="uygulamalar"
        index="02"
        title="Fikirden çalışan ürüne."
        description="İhtiyaçtan doğan, gerçek kullanıcıların her gün açtığı masaüstü ve mobil uygulamalar."
        action={
          <TextLink href="/projeler" arrow>
            Tüm projeler
          </TextLink>
        }
      >
        <ProjectGrid projects={appProjects} />
      </Section>

      <Section
        id="web"
        kicker="web & kurumsal"
        index="03"
        title="Kurumlar ve kişiler için web."
        description="Kurumsal tanıtım sitelerinden iş emri takip sistemlerine kadar web projeleri."
        tight
      >
        <ProjectRows projects={webProjects} />
      </Section>

      <Section
        id="araclar"
        kicker="araçlar"
        index="04"
        title="Ücretsiz, kurulumsuz, tarayıcında."
        description="Günlük küçük işler için hazırladığım araçlar. Veriler mümkün olan her yerde cihazında kalır."
        action={
          <TextLink href="/araclar" arrow>
            Tüm araçlar
          </TextLink>
        }
      >
        <div className="tool-grid">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </Section>

      <ContactCta />
    </div>
  );
}
