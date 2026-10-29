'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Command } from 'lucide-react';
import { navigation } from '@/lib/site';

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="biyik.dev ana sayfa">
          <span className="brand-icon">
            <Command size={19} />
          </span>
          biyik<span className="brand-domain">.dev</span>
        </Link>
        <nav aria-label="Ana menü">
          {navigation.map((item) => {
            const active =
              item.href === '/'
                ? pathname === '/'
                : item.href === '/projeler'
                  ? pathname === '/projeler' ||
                    pathname.startsWith('/projeler/')
                  : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
              >
                {item.name}
                {item.href === '/iletisim' && (
                  <ArrowUpRight size={14} aria-hidden="true" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
