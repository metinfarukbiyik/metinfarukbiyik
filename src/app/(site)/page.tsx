import { Fragment } from 'react';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { ProjectLogo } from '@/components/projects/ProjectIcon';
import { experiences } from '@/data/cvData';
import { getProject, portfolioProjects, type PortfolioProject } from '@/data/projects';
import { toolCategories, tools } from '@/data/tools';
import { pageMetadata, seoPages } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = pageMetadata(seoPages.home);

const current = experiences[experiences.length - 1];
const jobs = [...experiences].reverse().slice(0, 4);
const featured = ['bizim-koy', 'byk-music', 'geocam', 'byk-seri-baski-pro']
  .map(getProject)
  .filter((project): project is PortfolioProject => Boolean(project));
const projects = portfolioProjects.filter((project) => project.slug !== 'biyik-dev');
const latestTools = tools.slice(0, 4);
const categoryName = (id: string) => toolCategories.find((category) => category.id === id)?.name ?? id;

type Photo = {
  src: string | StaticImageData;
  alt: string;
  href: string;
  position?: string;
};

/**
 * Galeri: üç sütun, her sütunda iki fotoğraf; dikey/yatay oranlar sırayla değişir.
 * Fotoğraflar public/images/galeri/ altına eklenecek. Boşken galeri gösterilmez.
 */
const gallery: Photo[][] = [];

const socials = [
  { label: 'GitHub', href: site.github },
  { label: 'LinkedIn', href: site.linkedin },
  { label: 'Instagram', href: site.instagram },
];

export default function HomePage() {
  return (
    <div className="home">
      <section id="hakkimda" aria-labelledby="hakkimda-baslik">
        <h2 id="hakkimda-baslik" className="home-heading">
          Hakkımda
        </h2>
        <p className="home-copy">
          {site.city}’da yaşayan bir yazılım geliştiriciyim. Şu anda{' '}
          <Link className="text-link" href="/hakkimda#deneyim">
            {current.company}
          </Link>
          ’de {current.role.toLocaleLowerCase('tr')} olarak çalışıyorum. Geri kalan zamanımda web, mobil ve masaüstü
          için kendi ürünlerimi geliştiriyorum:{' '}
          {featured.map((project, index) => (
            <Fragment key={project.slug}>
              {index > 0 ? (index === featured.length - 1 ? ' ve ' : ', ') : null}
              <Link className="inline-project" href={project.href}>
                <ProjectLogo project={project} />
                {project.name}
              </Link>
            </Fragment>
          ))}
          . Hepsi sahada ve ofiste gördüğüm gerçek ihtiyaçlardan doğdu.
        </p>

        {gallery.length > 0 ? (
          <div className="gallery">
            {gallery.map((column, index) => (
              <div className="gallery-column" key={index}>
                {column.map((photo) => (
                  <Link className="gallery-photo" href={photo.href} key={photo.alt} aria-label={photo.alt}>
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 960px) 33vw, 304px"
                      priority={index === 0}
                      style={photo.position ? { objectPosition: photo.position } : undefined}
                    />
                  </Link>
                ))}
              </div>
            ))}
          </div>
        ) : null}

        <p className="home-copy">
          2015’te HTML ile başlayan merak; baz istasyonlarında, fiber altyapıda ve ekip yönetiminde geçen yıllardan
          sonra bugün ekrandaki ürünlere dönüştü. Ayrıca günlük küçük işler için{' '}
          <Link className="text-link" href="/araclar">
            ücretsiz araçlar
          </Link>{' '}
          hazırlıyorum.
        </p>
      </section>

      <section id="deneyim" aria-labelledby="deneyim-baslik">
        <h2 id="deneyim-baslik" className="home-heading">
          Deneyim
        </h2>
        <div className="job-list">
          {jobs.map((job) => (
            <Link className="job" href="/hakkimda#deneyim" key={`${job.company}-${job.period}`}>
              <div>
                <h3>{job.company}</h3>
                <p>{job.role}</p>
              </div>
              <span>{job.period.replace(' - ', ' — ')}</span>
            </Link>
          ))}
        </div>
        <Link href="/hakkimda#deneyim" className="more-link">
          Tüm deneyim →
        </Link>
      </section>

      <section id="projeler" aria-labelledby="projeler-baslik">
        <h2 id="projeler-baslik" className="home-heading">
          Projeler
        </h2>
        <div className="ref-grid">
          {projects.map((project) => (
            <Link className="ref-card" href={project.href} key={project.slug}>
              <div className="ref-card-head">
                <span className="ref-card-icon" aria-hidden="true">
                  <ProjectLogo project={project} size={23} />
                </span>
                <h3>{project.name}</h3>
                <ArrowRight className="ref-card-arrow" aria-hidden="true" />
              </div>
              <p>{project.description}</p>
              <span className="ref-card-tech">{project.platform}</span>
            </Link>
          ))}
        </div>
        <Link href="/projeler" className="more-link">
          Tüm projeler →
        </Link>
      </section>

      <section id="araclar" aria-labelledby="araclar-baslik">
        <h2 id="araclar-baslik" className="home-heading">
          Araçlar
        </h2>
        <div className="post-list">
          {latestTools.map((tool) => (
            <Link className="post" href={tool.href} key={tool.slug}>
              <h3>{tool.name}</h3>
              <span className="post-meta">
                <span>{tool.tags.join(' · ')}</span>
                <span className="post-category">{categoryName(tool.category)}</span>
              </span>
              <p>{tool.description}</p>
            </Link>
          ))}
        </div>
        <Link href="/araclar" className="more-link">
          Tüm araçlar ({tools.length}) →
        </Link>
      </section>

      <section id="iletisim" aria-labelledby="iletisim-baslik">
        <h2 id="iletisim-baslik" className="home-heading">
          İletişim
        </h2>
        <p className="home-copy">
          Bir fikrin mi var, ya da sadece merhaba mı demek istiyorsun?{' '}
          <a className="text-link" href={`mailto:${site.email}`}>
            Bana e-posta gönder
          </a>
          .
        </p>
        <div className="socials">
          {socials.map((social) => (
            <a href={social.href} key={social.label} target="_blank" rel="noopener noreferrer">
              {social.label}
              <ArrowUpRight aria-hidden="true" />
            </a>
          ))}
          <Link href="/iletisim">
            İletişim sayfası
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
