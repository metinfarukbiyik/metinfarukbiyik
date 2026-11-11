import { Fragment } from 'react';
import Link from 'next/link';
import {
  Antenna,
  ArrowRight,
  Building2,
  Cable,
  ClipboardList,
  CodeXml,
  Headset,
  RadioTower,
  ArrowUpRight,
  Briefcase,
  FolderGit2,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  UserRound,
  Wrench,
  type LucideIcon,
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
import cay from '@/assets/images/galeri/cay.jpg';
import cizim from '@/assets/images/galeri/cizim.jpg';
import ekipman from '@/assets/images/galeri/ekipman.jpg';
import kamp from '@/assets/images/galeri/kamp.jpg';
import portre from '@/assets/images/galeri/portre.jpg';

export const metadata = pageMetadata(seoPages.home);

const current = experiences[experiences.length - 1];
const jobs = [...experiences].reverse();

/** Her deneyim için işin kendisini anlatan ikon; bilinmeyen şirketlerde çanta. */
const jobIcons: Record<string, LucideIcon> = {
  'CNL İletişim': Building2,
  'Turkcell Superonline': Cable,
  'AK İletişim': RadioTower,
  'Turkcell Global Bilgi': Headset,
  'NTM Elektrik & Elektronik A.Ş.': ClipboardList,
  'ALP Telekomünikasyon': Antenna,
  'Sosyal Güvenlik Kurumu': CodeXml,
};
const featured = ['bizim-koy', 'byk-music', 'geocam', 'byk-seri-baski-pro']
  .map(getProject)
  .filter((project): project is PortfolioProject => Boolean(project));
const projects = portfolioProjects.filter((project) => project.slug !== 'biyik-dev');
const latestTools = tools.slice(0, 4);
const categoryName = (id: string) => toolCategories.find((category) => category.id === id)?.name ?? id;

/**
 * Galeri: iki sıra, hiçbir fotoğraf kırpılmaz. Sıralar, oranlarının toplamı
 * birbirine yakın olacak şekilde seçildi; böylece iki sıra da neredeyse aynı
 * yükseklikte durur.
 */
const gallery: GalleryPhoto[][] = [
  [
    { src: cizim, alt: 'Ormanda, köpeğimle' },
    { src: portre, alt: 'Sakin bir öğleden sonra' },
    { src: bust, alt: 'Mermerden bir ben' },
  ],
  [
    { src: cay, alt: 'Karşıda dağlar, elimde çay' },
    { src: kamp, alt: 'Karda, ateş başında' },
    { src: ekipman, alt: 'Yanımdan ayırmadıklarım' },
  ],
];

const socials = [
  { label: 'GitHub', href: site.github, icon: Github },
  { label: 'LinkedIn', href: site.linkedin, icon: Linkedin },
  { label: 'Instagram', href: site.instagram, icon: Instagram },
];

/** Bölüm başlığı: ikon kutusu ve başlık. */
function HomeHeading({
  id,
  icon: Icon,
  children,
}: {
  id: string;
  icon: LucideIcon;
  children: string;
}) {
  return (
    <h2 id={id} className="home-heading">
      <span className="icon-tile" aria-hidden="true">
        <Icon strokeWidth={1.9} />
      </span>
      {children}
    </h2>
  );
}

export default function HomePage() {
  return (
    <div className="home">
      <section id="hakkimda" aria-labelledby="hakkimda-baslik">
        <HomeHeading id="hakkimda-baslik" icon={UserRound}>
          Hakkımda
        </HomeHeading>
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

        <HomeGallery rows={gallery} />

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
        <HomeHeading id="deneyim-baslik" icon={Briefcase}>
          Deneyim
        </HomeHeading>
        <div className="job-list">
          {jobs.map((job, index) => {
            const Icon = jobIcons[job.company] ?? Briefcase;
            return (
              <Link
                className={index === 0 ? 'job job-current' : 'job'}
                href="/hakkimda#deneyim"
                key={`${job.company}-${job.period}`}
              >
                <span
                  className={index === 0 ? 'icon-tile icon-tile-lg icon-tile-solid' : 'icon-tile icon-tile-lg'}
                  aria-hidden="true"
                >
                  <Icon strokeWidth={1.75} />
                </span>
                <div>
                  <h3>{job.company}</h3>
                  <p>{job.role}</p>
                  <span className="job-period">{job.period.replace(' - ', ' — ')}</span>
                </div>
              </Link>
            );
          })}
        </div>
        <Link href="/hakkimda#deneyim" className="more-link">
          Tüm deneyim →
        </Link>
      </section>

      <section id="projeler" aria-labelledby="projeler-baslik">
        <HomeHeading id="projeler-baslik" icon={FolderGit2}>
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
        <HomeHeading id="araclar-baslik" icon={Wrench}>
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
        <HomeHeading id="iletisim-baslik" icon={Mail}>
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
