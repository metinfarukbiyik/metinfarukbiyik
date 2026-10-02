'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Link2 } from 'lucide-react';
import { navigation } from '@/lib/site';

const Navbar = () => {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-canvas/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 font-mono text-sm font-medium tracking-tight text-fg">
          <Link2 size={15} className="text-muted" aria-hidden />
          biyik.dev
        </Link>

        <nav aria-label="Sayfalar" className="flex items-center gap-1">
          {navigation.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-2.5 py-1.5 text-sm ${
                  active ? 'bg-surface text-fg shadow-sm ring-1 ring-border' : 'text-muted hover:text-fg'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
