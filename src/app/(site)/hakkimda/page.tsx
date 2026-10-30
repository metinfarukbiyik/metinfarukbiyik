import { pageMetadata } from '@/lib/seo';
import PageHeader from '@/components/ui/PageHeader';
import HakkimdaAccordions from '@/components/hakkimda/HakkimdaAccordions';
import { Download } from 'lucide-react';

export const metadata = pageMetadata(
  'Hakkımda — Deneyim ve özgeçmiş',
  'Metin Faruk Bıyık’ın yazılım, telekomünikasyon ve operasyon deneyimi. Eğitim, sertifikalar, projeler ve iletişim bilgileri.',
  '/hakkimda',
  [
    'Metin Faruk Bıyık',
    'özgeçmiş',
    'yazılım geliştirici',
    'telekomünikasyon',
    'Trabzon',
  ],
);

const HakkimdaPage = () => (
  <div className="animate-fade-up">
    <PageHeader
      eyebrow="Tanışalım / Hakkımda"
      title="İşin arkasındaki kişi."
      description="Profil, deneyim, eğitim, sertifikalar ve çalışma alanı."
      actions={
        <a
          href="/cv/metinfarukbiyik-cv.pdf"
          download
          className="pill-button primary-button"
        >
          <Download size={15} />
          Özgeçmişi indir
        </a>
      }
    />
    <HakkimdaAccordions />
  </div>
);

export default HakkimdaPage;
