import Link from 'next/link';
import { site } from '@/lib/site';

/**
 * Künye: ad ve ünvan. Gezinme ve tema düğmesi Dinamik Ada'dadır
 * (src/components/DynamicIsland.tsx).
 */
export default function Navbar() {
  return (
    <header className="site-header">
      <Link href="/" className="site-id" aria-label={`${site.name} — ana sayfa`}>
        <span className="site-id-copy">
          <span className="site-name">{site.name}</span>
          <span className="site-role">{site.roles.join(' · ')}</span>
        </span>
      </Link>
    </header>
  );
}
