import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';

export default function ProductIntro({
  name,
  icon,
  platform,
  slogan,
  description,
  children,
}: {
  name: string;
  icon: string;
  platform: string;
  slogan: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <>
      <Link href="/projeler" className="back-link">
        <ArrowLeft size={14} /> Tüm projeler
      </Link>
      <header className="product-heading">
        <span className="product-symbol product-app-icon">
          <Image
            src={icon}
            alt={`${name} uygulama ikonu`}
            width={76}
            height={76}
            priority
          />
        </span>
        <div>
          <span className="category-badge green">{platform}</span>
          <h1>{name}</h1>
          <p>{slogan}</p>
        </div>
      </header>
      <p className="product-description">{description}</p>
      {children}
    </>
  );
}
