import PassportPhotoTool from '@/components/tools/PassportPhotoTool';
import ToolPage from '@/components/tools/ToolPage';
import { pageMetadata, seoPages } from '@/lib/seo';

export const metadata = pageMetadata(seoPages.passport, 'ücretsiz araç');

const faq = [
  {
    question: 'Vesikalık fotoğraf ölçüsü kaç cm olmalı?',
    answer:
      'Kullanım yerine göre değişir. Türkiye’de pasaport ve kimlik kartı için biyometrik fotoğraf 50 × 60 mm’dir; Schengen vizesi gibi başvurularda 35 × 45 mm sık istenir; klasik vesikalık için 45 × 60 mm yaygındır. Başvuracağın kurumun güncel kuralını mutlaka kontrol et.',
  },
  {
    question: 'Fotoğrafım bir sunucuya yükleniyor mu?',
    answer:
      'Hayır. Kırpma, yerleştirme ve dosya oluşturma tamamen tarayıcında, kendi cihazında yapılır. Fotoğrafın internete gönderilmez ve kaydedilmez.',
  },
  {
    question: 'Vesikalığı evde doğru ölçüde nasıl yazdırırım?',
    answer:
      'İndirdiğin dosyayı yazdırırken kağıt boyutunu şablonla aynı (A4 veya A5) seç, ölçeği %100 / Gerçek boyut yap ve “Sayfaya sığdır” seçeneğini kapat. Yazıcı ayarlarında fotoğraf kağıdı türünü seçmek baskı kalitesini artırır.',
  },
  {
    question: 'Tek sayfaya kaç vesikalık sığar, hangi formatlarda indirebilirim?',
    answer:
      'Şablona 1, 2, 4 veya 8 adet vesikalık yerleştirebilirsin. Sonucu A4 ya da A5 sayfa düzeninde PDF, PNG veya JPEG olarak indirebilirsin.',
  },
  {
    question: 'Araç arka planı değiştiriyor veya biyometrik uygunluğu kontrol ediyor mu?',
    answer:
      'Hayır. Araç fotoğrafı seçtiğin ölçüye kırpar ve baskı şablonuna yerleştirir. Arka plan, ışık ve yüz konumu gibi biyometrik kurallara uygun bir fotoğrafla başlamalısın.',
  },
];

export default function PassportPhotoPage() {
  return (
    <ToolPage
      slug="vesikalik-fotograf"
      seo={seoPages.passport}
      title="Vesikalık fotoğraf oluştur, baskıya hazır indir."
      description="Fotoğrafını yükle, ölçüyü seç, kadrajı ayarla. 1–8 adetlik A4 veya A5 vesikalık şablonunu PDF, PNG ya da JPEG olarak ücretsiz indir."
      faq={faq}
    >
      <PassportPhotoTool />
    </ToolPage>
  );
}
