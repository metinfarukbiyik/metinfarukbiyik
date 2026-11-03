import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import PassportPhotoTool from '@/components/tools/PassportPhotoTool';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata(
  'Vesikalık Fotoğraf Oluştur',
  'Fotoğrafını 3,5 × 4,5, 4 × 6, 4,5 × 6 veya 5 × 6 cm ölçülerinde düzenle. 1, 2, 4 ve 8 adet vesikalık içeren A4 veya A5 baskı şablonunu PDF, PNG veya JPEG olarak indir.',
  '/araclar/vesikalik-fotograf',
  [
    'vesikalık fotoğraf oluştur',
    'vesikalık şablonu',
    'vesikalık PDF',
    'fotoğraf baskı',
  ],
);

export default function PassportPhotoPage() {
  return (
    <div className="animate-fade-up">
      <Link href="/araclar" className="tool-back">
        <ArrowLeft size={14} aria-hidden="true" /> Tüm araçlar
      </Link>
      <PageHeader
        eyebrow="Araçlar / Fotoğraf & baskı"
        title="Vesikalığın, baskıya hazır."
        description="Fotoğrafını yükle, kadrajını ayarla ve istediğin adette vesikalık şablonunu indir."
      />
      <PassportPhotoTool />
    </div>
  );
}
