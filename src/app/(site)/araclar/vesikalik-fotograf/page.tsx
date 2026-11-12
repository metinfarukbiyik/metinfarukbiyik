import PassportPhotoTool from '@/components/tools/PassportPhotoTool';
import ToolPage from '@/components/tools/ToolPage';
import { pageMetadata, seoPages } from '@/lib/seo';

export const metadata = pageMetadata(seoPages.passport);

const faq = [
  {
    question: 'Vesikalık fotoğraf ölçüsü kaç cm olmalı?',
    answer:
      'Kullanım yerine göre değişir. Türkiye’de pasaport ve kimlik kartı için biyometrik fotoğraf 50 × 60 mm’dir; Schengen vizesi gibi başvurularda 35 × 45 mm sık istenir; klasik vesikalık için 45 × 60 mm yaygındır. Başvuracağın kurumun güncel kuralını mutlaka kontrol et.',
  },
  {
    question: 'Pasaport ve kimlik kartı için biyometrik fotoğraf nasıl olmalı?',
    answer:
      'NVİ’ye göre biyometrik fotoğraf 50 × 60 mm, beyaz ve desensiz fonda, gölgesiz ve son 6 ay içinde çekilmiş olmalı; 35 × 45 mm’ye kesilmemeli. Yüz ortalanmış ve saçla birlikte tamamen görünmeli, gözler açık olmalı, doğrudan kameraya bakılmalı; güneş gözlüğü, şapka veya başlık olmamalı. Araçta “Pasaport / Kimlik” türünü seçtiğinde ölçü 50 × 60 mm’ye sabitlenir ve tüm kurallar NVİ kaynağıyla birlikte gösterilir.',
  },
  {
    question: 'Fotoğrafım bir sunucuya yükleniyor mu?',
    answer:
      'Hayır. Kırpma, yerleştirme ve dosya oluşturma tamamen tarayıcında, kendi cihazında yapılır. Fotoğrafın internete gönderilmez ve kaydedilmez.',
  },
  {
    question: 'Vesikalığı evde doğru ölçüde nasıl yazdırırım?',
    answer:
      'İndirdiğin dosyayı yazdırırken kağıt boyutunu şablonla aynı (A4 veya 10 × 15 cm) seç, ölçeği %100 / Gerçek boyut yap ve “Sayfaya sığdır” seçeneğini kapat. Yazıcı ayarlarında fotoğraf kağıdı türünü seçmek baskı kalitesini artırır.',
  },
  {
    question:
      'Tek sayfaya kaç vesikalık sığar, hangi formatlarda indirebilirim?',
    answer:
      'Şablona 1, 2, 4, 6 veya 8 adet vesikalık yerleştirebilirsin. Sonucu A4 ya da 10 × 15 cm fotoğraf kağıdı düzeninde PDF, PNG veya JPEG olarak indirebilirsin.',
  },
  {
    question:
      'Araç arka planı değiştiriyor veya biyometrik uygunluğu kontrol ediyor mu?',
    answer:
      'Arka planı değiştirmez. Biyometrik modda fonun beyaz görünüp görünmediğini kabaca kontrol eder ve yüzü ortalaman için bir kılavuz gösterir; ancak bu kontroller resmi uygunluğu garanti etmez. Işık, gölge ve yüz konumu gibi kurallara uygun bir fotoğrafla başlamalısın.',
  },
];

export default function PassportPhotoPage() {
  return (
    <ToolPage
      slug="vesikalik-fotograf"
      seo={seoPages.passport}
      description="Vesikalık veya pasaport / kimlik için 50 × 60 mm biyometrik fotoğrafı seç, kadrajı ayarla. 1–8 adetlik A4 veya 10 × 15 cm şablonu PDF, PNG ya da JPEG olarak ücretsiz indir."
      faq={faq}
    >
      <PassportPhotoTool />
    </ToolPage>
  );
}
