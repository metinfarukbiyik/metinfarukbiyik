import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import CertificateList from '@/components/CertificateList';
import { certificates } from '@/data/cvData';

export const metadata: Metadata = {
  title: 'Sertifikalar',
  description: "Metin Faruk Bıyık'ın kariyeri boyunca kazandığı sertifikalar ve başarı belgeleri.",
  keywords: ['sertifikalar', 'Turkcell Akademi', 'BTK Akademi', 'LinkedIn Learning'],
  alternates: { canonical: '/sertifikalar' },
};

const CertificatesPage = () => (
  <div className="animate-fade-up">
    <PageHeader
      eyebrow="Eğitimler"
      title="Sertifikalar"
      description={`Kariyerim boyunca tamamladığım ${certificates.length} eğitim ve başarı belgesi.`}
    />
    <CertificateList />
  </div>
);

export default CertificatesPage;
