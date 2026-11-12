import Image from 'next/image';
import Link from 'next/link';
import DynamicIsland from '@/components/DynamicIsland';
import { site } from '@/lib/site';
import portre from '@/assets/images/galeri/portre.jpg';

/**
 * Üst çubuk: solda künye (portre, ad, ünvan), sağda Dinamik Ada ve tema
 * düğmesi. Sayfa kaydırılırken üstte yapışık kalır; içerik altından solar.
 */
export default function Navbar() {
  return (
    <header className="site-header">
      <Link href="/" className="site-id" aria-label={`${site.name} — ana sayfa`}>
        <span className="site-avatar" aria-hidden="true">
          <Image src={portre} alt="" fill sizes="40px" priority />
        </span>
        <span className="site-id-copy">
          <span className="site-name">{site.name}</span>
          <span className="site-role">{site.roles.join(' · ')}</span>
        </span>
      </Link>
      <DynamicIsland />
    </header>
  );
}
