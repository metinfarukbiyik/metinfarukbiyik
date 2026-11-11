import Link from 'next/link';
import BackToTop from '@/components/BackToTop';
import ThemeToggle from '@/components/ThemeToggle';
import { site } from '@/lib/site';
import pkg from '../../package.json';

/** Derleme anında donan tarih — "bu sayfa ne zaman üretildi". */
const BUILD_DATE = new Date().toISOString().slice(0, 10);
const NEXT_VERSION = (pkg.dependencies as Record<string, string>).next?.replace(/^[\^~]/, '');

/**
 * İki satırlık altbilgi: üstte kimlik ve araçlar, altta telif ve teknik künye.
 * Künyedeki değerler gerçek: sürüm package.json'dan, tarih derlemeden gelir.
 */
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-id">
          <Link href="/" className="footer-domain">
            {site.domain}
          </Link>
          <span className="footer-tagline">{site.tagline}</span>
        </div>
        <div className="footer-actions">
          <ThemeToggle />
          <BackToTop />
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span className="footer-meta">
          <a href={site.github} target="_blank" rel="noopener noreferrer">
            github
          </a>
          <span className="footer-sep" aria-hidden="true">
            ·
          </span>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
            linkedin
          </a>
          <span className="footer-sep" aria-hidden="true">
            ·
          </span>
          <a href={site.cv} download>
            cv
          </a>
          {NEXT_VERSION ? (
            <>
              <span className="footer-sep" aria-hidden="true">
                ·
              </span>
              <span>next {NEXT_VERSION}</span>
            </>
          ) : null}
          <span className="footer-sep" aria-hidden="true">
            ·
          </span>
          <span className="tabular">build {BUILD_DATE}</span>
        </span>
      </div>
    </footer>
  );
}
