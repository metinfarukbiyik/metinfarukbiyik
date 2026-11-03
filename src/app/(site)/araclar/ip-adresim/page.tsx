import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import IpAddressTool from '@/components/tools/IpAddressTool';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata(
  'IP Adresim',
  'Genel IPv4 ve IPv6 adreslerini öğren, kopyala; internet servis sağlayıcını ve yaklaşık ağ konumunu incele.',
  '/araclar/ip-adresim',
  ['IP adresim', 'IPv4', 'IPv6', 'IP sorgulama'],
);

export default function IpAddressPage() {
  return (
    <div className="animate-fade-up">
      <Link href="/araclar" className="tool-back">
        <ArrowLeft size={14} aria-hidden="true" /> Tüm araçlar
      </Link>
      <PageHeader
        eyebrow="Araçlar / İnternet & ağ"
        title="İnternetteki adresin."
        description="Genel IPv4 ve IPv6 adreslerini, servis sağlayıcını ve IP adresine bağlı yaklaşık konum bilgilerini görüntüle."
      />
      <IpAddressTool />
    </div>
  );
}
