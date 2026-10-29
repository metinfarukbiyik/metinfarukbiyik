import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Download,
  Github,
  Mail,
  MapPin,
} from 'lucide-react';
import myPhoto from '@/assets/images/mefa.png';
import { personalInfo } from '@/data/cvData';
import { portfolioProjects } from '@/data/projects';
import ProjectList from '@/components/ProjectList';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata(
  'Yazılım, fikirler ve ürettiklerim',
  'Metin Faruk Bıyık’ın portföyü. BYK Music, GeoCam: Audit, BYK Seri Baskı Pro ve web projeleri; mobil, masaüstü ve web uygulamaları.',
  '/',
  [
    'Metin Faruk Bıyık',
    'yazılım geliştirici',
    'Trabzon',
    'BYK Music',
    'GeoCam Audit',
    'BYK Seri Baskı Pro',
    'web uygulama geliştirme',
  ],
);

export default function HomePage() {
  return (
    <div className="animate-fade-up">
      <section className="profile-hero">
        <div className="profile-picture">
          <Image
            src={myPhoto}
            alt={personalInfo.name}
            fill
            priority
            placeholder="blur"
            sizes="(max-width: 640px) 72px, 120px"
            className="object-contain"
          />
        </div>
        <div className="profile-intro">
          <div className="profile-heading">
            <span className="eyebrow">Fikirden çalışan ürüne</span>
            <h1>
              Merhaba, ben <span>Metin Faruk Bıyık.</span>
            </h1>
          </div>
          <p>
            Günlük hayatı ve iş süreçlerini kolaylaştıran
            <br className="desktop-break" /> web, mobil ve masaüstü uygulamaları
            geliştiriyorum.
          </p>
          <div className="profile-meta">
            <div className="hero-links">
              <span>
                <MapPin size={13} aria-hidden="true" /> Trabzon, Türkiye
              </span>
              <span className="hero-divider" aria-hidden="true" />
              <a
                href="https://github.com/metinfarukbiyik"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={14} aria-hidden="true" /> GitHub{' '}
                <ArrowUpRight size={12} aria-hidden="true" />
              </a>
            </div>
            <span className="work-status">
              <span aria-hidden="true" /> Open to work
            </span>
          </div>
        </div>
      </section>
      <div className="intro-actions">
        <Link href="/hakkimda" className="pill-button">
          Biraz daha tanışalım <ArrowRight size={14} />
        </Link>
        <a href="/cv/metinfarukbiyik-cv.pdf" download className="text-button">
          <Download size={14} /> Özgeçmişimi indir
        </a>
      </div>
      <section className="home-projects">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Portföy</span>
            <h2>Fikirler, uygulamaya dönüştü.</h2>
            <p>İhtiyaçtan doğan, özenle geliştirdiğim projeler.</p>
          </div>
          <Link href="/projeler" className="text-button">
            Tüm projeler <ArrowUpRight size={15} />
          </Link>
        </div>
        <div className="list-panel">
          <div className="panel-label">
            <span className="category-badge green">
              <Code2 size={12} /> Uygulamalar
            </span>
            <span>03 proje</span>
          </div>
          <ProjectList
            projects={portfolioProjects.filter(
              (p) => p.category === 'Uygulama',
            )}
          />
        </div>
        <div className="list-panel">
          <div className="panel-label">
            <span className="category-badge purple">
              Web & kurumsal çözümler
            </span>
            <span>04 proje</span>
          </div>
          <ProjectList
            projects={portfolioProjects.filter(
              (p) => p.category === 'Web sitesi',
            )}
          />
        </div>
      </section>
      <section className="contact-strip">
        <div className="contact-icon">
          <Mail size={21} strokeWidth={1.5} />
        </div>
        <div>
          <h2>Bir fikrin mi var? Konuşalım.</h2>
          <p>Projeler, iş birlikleri veya sadece bir merhaba için.</p>
        </div>
        <Link href="/iletisim" className="pill-button">
          İletişime geç <ArrowUpRight size={14} />
        </Link>
      </section>
    </div>
  );
}
