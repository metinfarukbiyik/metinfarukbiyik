'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronRight, FolderGit2, House, Mail, Menu, UserRound, Wrench, X } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { isActivePath, navigation, site } from '@/lib/site';

/**
 * Künye: solda ad ve ünvan, sağda menü ve tema düğmesi.
 * Menü masaüstünde açılır bir kutu, telefonda alttan açılan bir sayfa.
 */
const navIcons: Record<string, typeof House> = {
  '/': House,
  '/hakkimda': UserRound,
  '/projeler': FolderGit2,
  '/araclar': Wrench,
  '/iletisim': Mail,
};

export default function Navbar() {
  const pathname = usePathname();
  // Menü açıldığı sayfaya aittir; başka sayfaya geçince kendiliğinden kapanır.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const controls = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpenPath(null);
      trigger.current?.focus();
    };
    const onPointer = (event: PointerEvent) => {
      if (!controls.current?.contains(event.target as Node)) setOpenPath(null);
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open]);

  const close = () => setOpenPath(null);

  return (
    <header className="site-header">
      <Link href="/" className="site-id" aria-label={`${site.name} — ana sayfa`}>
        <span className="site-mark" aria-hidden="true">
          M
        </span>
        <span className="site-id-copy">
          <span className="site-name">{site.name}</span>
          <span className="site-role">{site.jobTitle}</span>
        </span>
      </Link>
      <div className="header-controls" ref={controls}>
        <button
          ref={trigger}
          type="button"
          className="nav-trigger"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpenPath(open ? null : pathname)}
        >
          <span>Menü</span>
          <Menu strokeWidth={1.5} aria-hidden="true" />
        </button>
        <ThemeToggle />
        <div className="nav-overlay" hidden={!open} onClick={close} aria-hidden="true" />
        <div id="site-nav" className="nav-panel" hidden={!open} role="dialog" aria-label="Gezinme">
          <div className="nav-handle" aria-hidden="true" />
          <div className="nav-heading">
            <span>Gezinme</span>
            <button type="button" className="nav-close" aria-label="Menüyü kapat" onClick={close}>
              <X strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Ana menü">
            <ul className="nav-links">
              {navigation.map((item) => {
                const Icon = navIcons[item.href] ?? ChevronRight;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActivePath(pathname, item.href) ? 'page' : undefined}
                      onClick={close}
                    >
                      <span className="icon-tile" aria-hidden="true">
                        <Icon strokeWidth={1.9} />
                      </span>
                      <span className="nav-link-copy">
                        <span className="nav-link-name">{item.name}</span>
                        <span className="nav-link-description">{item.description}</span>
                      </span>
                      <ChevronRight strokeWidth={1.5} aria-hidden="true" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="nav-extra">
            <span>{site.domain}</span>
            <a href={site.cv} download onClick={close}>
              Özgeçmiş (PDF) <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
