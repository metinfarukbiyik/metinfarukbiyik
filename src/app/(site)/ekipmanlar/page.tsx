import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import EquipmentList from '@/components/EquipmentList';

export const metadata: Metadata = {
  title: 'Ekipmanlar',
  description: "Metin Faruk Bıyık'ın kullandığı teknik ekipmanlar, çalışma alanı ve teknolojik araçlar.",
  keywords: ['ekipmanlar', 'çalışma alanı', 'setup', 'MacBook Air M4'],
  alternates: { canonical: '/ekipmanlar' },
};

const EquipmentPage = () => (
  <div className="animate-fade-up">
    <PageHeader
      eyebrow="Çalışma alanı"
      title="Ekipmanlar"
      description="Günlük olarak kullandığım cihazlar ve teknik donanımlar."
    />
    <EquipmentList />
  </div>
);

export default EquipmentPage;
