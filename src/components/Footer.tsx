import Link from 'next/link';
import { Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { ButtonLink, Tooltip } from '@/components/ui';
import { BrandMark } from '@/components/Navbar';
import { appProjects } from '@/data/projects';
import { tools } from '@/data/tools';
import { navigation, site } from '@/lib/site';

const socials = [
  { label: 'GitHub', href: site.github, icon: Github },
  { label: 'LinkedIn', href: site.linkedin, icon: Linkedin },
  { label: 'Instagram', href: site.instagram, icon: Instagram },
  { label: `E-posta: ${site.email}`, href: `mailto:${site.email}`, icon: Mail },
];

const columns = [
  { title: 'sayfalar', links: navigation.map(({ name, href }) => ({ name, href })) },
  { title: 'uygulamalar', links: appProjects.map(({ name, href }) => ({ name, href })) },
  { title: 'araçlar', links: tools.map(({ name, href }) => ({ name, href })) },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-about">
            <Link href="/" className="brand" aria-label={`${site.brand} ana sayfa`}>
              <BrandMark />
              <span>
                biyik<span className="brand-tld">.dev</span>
              </span>
            </Link>
            <p className="text-small">
              {site.name}. {site.city}’dan web, mobil ve masaüstü için sade, kullanışlı
              yazılımlar geliştiriyorum.
            </p>
            <div className="footer-socials">
              {socials.map(({ label, href, icon: Icon }) => (
                <Tooltip key={href} content={label}>
                  <ButtonLink
                    href={href}
                    variant="ghost"
                    size="sm"
                    iconOnly
                    aria-label={label}
                    trailing={null}
                    external={href.startsWith('http')}
                  >
                    <Icon aria-hidden="true" />
                  </ButtonLink>
                </Tooltip>
              ))}
            </div>
            <p className="status">Yeni projelere açık</p>
          </div>
          {columns.map((column) => (
            <nav className="footer-col" key={column.title} aria-label={column.title}>
              <h2>{`// ${column.title}`}</h2>
              <ul>
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="statusbar">
          <span className="statusbar-ready">Hazır</span>
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span className="statusbar-spacer" />
          <span>
            {site.uiName} v{site.uiVersion}
          </span>
          <span className="statusbar-progress" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
          </span>
          <span>
            {site.city}, TR
          </span>
        </div>
      </div>
    </footer>
  );
}
