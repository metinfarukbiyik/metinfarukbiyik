import { Fragment } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Github,
  Instagram,
  Linkedin,
  MessageCircle,
} from 'lucide-react';
import { ProjectLogo } from '@/components/projects/ProjectIcon';
import { toolIcons } from '@/components/tools/ToolCard';
import HomeGallery, { type GalleryPhoto } from '@/components/HomeGallery';
import { experiences } from '@/data/cvData';
import { getProject, portfolioProjects, type PortfolioProject } from '@/data/projects';
import { toolCategories, tools } from '@/data/tools';
import { pageMetadata, seoPages } from '@/lib/seo';
import { site } from '@/lib/site';
import bust from '@/assets/images/galeri/bust.jpg';
import cadir from '@/assets/images/galeri/cadir.jpg';
import cay from '@/assets/images/galeri/cay.jpg';
import cizim from '@/assets/images/galeri/cizim.jpg';
import ekipman from '@/assets/images/galeri/ekipman.jpg';
import kamp from '@/assets/images/galeri/kamp.jpg';
import portre from '@/assets/images/galeri/portre.jpg';

export const metadata = pageMetadata(seoPages.home);

const jobs = [...experiences].reverse();

const featured = ['bizim-koy', 'byk-music', 'geocam', 'byk-seri-baski-pro']
  .map(getProject)
  .filter((project): project is PortfolioProject => Boolean(project));
const projects = portfolioProjects.filter((project) => project.slug !== 'biyik-dev');
const latestTools = tools.slice(0, 4);
const categoryName = (id: string) => toolCategories.find((category) => category.id === id)?.name ?? id;

/**
 * Galeri (sungur.dev düzeni): dört eşit sütun; yatay ve dikey çerçeveler
 * sütundan sütuna yer değiştirir, son sütunda tek, boydan bir fotoğraf durur.
 */
const gallery: GalleryPhoto[][] = [
  [
    { src: portre, alt: 'Sakin bir öğleden sonra', shape: 'wide', focus: 'center 35%' },
    { src: bust, alt: 'Mermerden bir ben', shape: 'portrait' },
  ],
  [
    { src: cadir, alt: 'Çam ormanında kamp', shape: 'portrait' },
    { src: kamp, alt: 'Karda, ateş başında', shape: 'wide' },
  ],
  [
    { src: cay, alt: 'Karşıda dağlar, elimde çay', shape: 'wide', focus: 'center 15%' },
    { src: ekipman, alt: 'Yanımdan ayırmadıklarım', shape: 'portrait' },
  ],
  [{ src: cizim, alt: 'Ormanda, köpeğimle', shape: 'tall' }],
];

const socials = [
  { label: 'GitHub', href: site.github, icon: Github },
  { label: 'LinkedIn', href: site.linkedin, icon: Linkedin },
  { label: 'Instagram', href: site.instagram, icon: Instagram },
];

/** Bölüm başlığı: sungur.dev gibi sade, gri, ikonsuz. */
function HomeHeading({ id, children }: { id: string; children: string }) {
  return (
    <h2 id={id} className="home-heading">
      {children}
    </h2>
  );
}

export default function HomePage() {
  return (
    <div className="home">
      <section id="hakkimda" aria-labelledby="hakkimda-baslik">
        <HomeHeading id="hakkimda-baslik">
          Hakkımda
        </HomeHeading>
        <p className="home-copy">
          {site.city}’da yaşayan; telekomünikasyon saha operasyonları, iş emri planlama, envanter yönetimi ve müşteri
          ilişkileri alanlarında deneyimli, çözüm odaklı bir profesyonelim. Saha ve ofis ekipleri arasındaki iş akışını
          koordine ediyor, süreçleri belgeleyip raporluyor, kalite ve stok takibini yürütüyorum. Yazılım birikimimi de
          bu işin içine katıyorum; web, mobil ve masaüstü için geliştirdiğim{' '}
          {featured.map((project, index) => (
            <Fragment key={project.slug}>
              {index > 0 ? (index === featured.length - 1 ? ' ve ' : ', ') : null}
              <Link className="inline-project" href={project.href}>
                <ProjectLogo project={project} />
                {project.name}
              </Link>
            </Fragment>
          ))}
          {' '}doğrudan sahada ve ofiste karşılaştığım gerçek ihtiyaçlardan doğdu.
        </p>

        <HomeGallery columns={gallery} />

        <p className="home-copy">
          2015’te HTML ile başlayan merak; baz istasyonlarında, fiber altyapıda ve ekip koçluğunda geçen yıllarla
          birleşti. Bugün web programcılığı altyapımı operasyonel verimliliğe dönüştürüyor, işi kolaylaştıran araçlar
          üretiyorum. Günlük küçük işler için hazırladığım{' '}
          <Link className="text-link" href="/araclar">
            ücretsiz araçlar
          </Link>{' '}
          da herkesin kullanımına açık.
        </p>
      </section>

      <section id="deneyim" aria-labelledby="deneyim-baslik">
        <HomeHeading id="deneyim-baslik">
          Deneyim
        </HomeHeading>
        <div className="job-list">
          {jobs.map((job) => {
            const current = job.period.includes('Devam');
            return (
              <Link
                className={current ? 'job job-current' : 'job'}
                href="/hakkimda#deneyim"
                key={`${job.company}-${job.period}`}
              >
                <div>
                  <h3>
                    {job.company}
                    {current && <span className="job-now">şu an</span>}
                  </h3>
                  <p>{job.role}</p>
                </div>
                <span>{job.period.replace(' - ', ' — ')}</span>
              </Link>
            );
          })}
        </div>
        <Link href="/hakkimda#deneyim" className="more-link">
          Tüm deneyim →
        </Link>
      </section>

      <section id="projeler" aria-labelledby="projeler-baslik">
        <HomeHeading id="projeler-baslik">
          Projeler
        </HomeHeading>
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
        <HomeHeading id="araclar-baslik">
          Araçlar
        </HomeHeading>
        <div className="tool-list">
          {latestTools.map((tool) => {
            const Icon = toolIcons[tool.icon];
            return (
              <Link className="tool-row" href={tool.href} key={tool.slug}>
                <span className="icon-tile icon-tile-lg" aria-hidden="true">
                  <Icon strokeWidth={1.75} />
                </span>
                <span className="tool-row-copy">
                  <span className="tool-row-head">
                    <h3>{tool.name}</h3>
                    <span className="post-category">{categoryName(tool.category)}</span>
                  </span>
                  <p>{tool.description}</p>
                </span>
                <ArrowRight className="tool-row-arrow" aria-hidden="true" />
              </Link>
            );
          })}
        </div>
        <Link href="/araclar" className="more-link">
          Tüm araçlar ({tools.length}) →
        </Link>
      </section>

      <section id="iletisim" aria-labelledby="iletisim-baslik">
        <HomeHeading id="iletisim-baslik">
          İletişim
        </HomeHeading>
        <p className="home-copy">
          Bir fikrin mi var, ya da sadece merhaba mı demek istiyorsun?{' '}
          <a className="text-link" href={`mailto:${site.email}`}>
            Bana e-posta gönder
          </a>
          .
        </p>
        <div className="socials">
          {socials.map((social) => (
            <a className="social" href={social.href} key={social.label} target="_blank" rel="noopener noreferrer">
              <social.icon className="social-icon" strokeWidth={1.75} aria-hidden="true" />
              {social.label}
              <ArrowUpRight className="social-arrow" aria-hidden="true" />
            </a>
          ))}
          <Link className="social" href="/iletisim">
            <MessageCircle className="social-icon" strokeWidth={1.75} aria-hidden="true" />
            İletişim sayfası
            <ArrowRight className="social-arrow" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
