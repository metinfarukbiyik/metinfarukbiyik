import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import HakkimdaAccordions from '@/components/hakkimda/HakkimdaAccordions';
import { Download } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hakkımda',
  description:
    "Metin Faruk Bıyık'ın profili, deneyimleri, eğitimi, sertifikaları ve kullandığı ekipmanlar.",
  keywords: ['Metin Faruk Bıyık', 'hakkımda', 'özgeçmiş', 'CV', 'Trabzon', 'sertifikalar', 'ekipmanlar'],
  alternates: { canonical: '/hakkimda' },
};

const HakkimdaPage = () => (
  <div className="animate-fade-up">
    <PageHeader
      title="Hakkımda"
      description="Profil, deneyim, eğitim, sertifikalar ve çalışma alanı."
      actions={
        <a
          href="/cv/metinfarukbiyik-cv.pdf"
          download
          className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3.5 py-2 text-sm text-fg hover:bg-hover"
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
