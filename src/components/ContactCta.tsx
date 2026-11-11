import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { site } from '@/lib/site';

/** Closing contact block shared by the about and project pages. */
export default function ContactCta({
  title = 'Bir fikrin mi var? Birlikte hayata geçirelim.',
  description = 'Web sitesi, kurumsal sistem, mobil ya da masaüstü uygulama — ihtiyacını dinleyip en sade çözümü birlikte planlayalım.',
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="section" aria-labelledby="cta-baslik">
      <h2 id="cta-baslik" className="home-heading">
        İletişim
      </h2>
      <p className="home-copy">
        {title} {description}{' '}
        <a className="text-link" href={`mailto:${site.email}`}>
          Bana e-posta gönder
        </a>
        .
      </p>
      <div className="socials">
        <Link href="/iletisim">
          İletişim sayfası
          <ArrowRight aria-hidden="true" />
        </Link>
        <a href={site.github} target="_blank" rel="noopener noreferrer">
          GitHub
          <ArrowUpRight aria-hidden="true" />
        </a>
        <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
          <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
