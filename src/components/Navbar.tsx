'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowUpRight, LockKeyhole, Menu, X } from 'lucide-react';
import { ButtonLink, Button } from '@/components/ui';
import { isActivePath, navigation, site } from '@/lib/site';

export function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      b<span>/</span>
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // The menu belongs to the path it was opened on, so navigating closes it.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpenPath(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const links = navigation.filter((item) => item.href !== '/iletisim');
  const path = decodeURIComponent(pathname === '/' ? '/' : pathname);

  return (
    <header className="header" data-scrolled={scrolled} data-open={open}>
      <div className="container header-row">
        <Link href="/" className="brand" aria-label={`${site.brand} ana sayfa`}>
          <BrandMark />
          <span>
            biyik<span className="brand-tld">.dev</span>
          </span>
        </Link>
        <div className="addressbar" aria-hidden="true">
          <LockKeyhole />
          <span className="addressbar-host">{site.domain}</span>
          <span className="addressbar-path">{path === '/' ? '' : path}</span>
          <span className="addressbar-caret" />
        </div>
        <nav className="nav" aria-label="Ana menü">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link"
              aria-current={isActivePath(pathname, item.href) ? 'page' : undefined}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <ButtonLink
          href="/iletisim"
          variant="primary"
          size="sm"
          className="header-cta"
          trailing={<ArrowUpRight className="btn-arrow btn-arrow-up" aria-hidden="true" />}
          aria-current={isActivePath(pathname, '/iletisim') ? 'page' : undefined}
        >
          İletişim
        </ButtonLink>
        <Button
          variant="ghost"
          iconOnly
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
          onClick={() => setOpenPath(open ? null : pathname)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </Button>
      </div>
      <nav id="mobile-nav" className="mobile-nav" aria-label="Mobil menü" hidden={!open}>
        <ul>
          {navigation.map((item, index) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActivePath(pathname, item.href) ? 'page' : undefined}
              >
                {item.name}
                <span>0{index + 1}</span>
              </Link>
            </li>
          ))}
        </ul>
        <ButtonLink href={site.cv} download variant="secondary" block>
          Özgeçmişi indir (PDF)
        </ButtonLink>
      </nav>
    </header>
  );
}
