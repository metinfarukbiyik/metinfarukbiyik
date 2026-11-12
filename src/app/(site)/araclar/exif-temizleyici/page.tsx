import ExifCleanerTool from '@/components/tools/ExifCleanerTool';
import ToolPage from '@/components/tools/ToolPage';
import { Section } from '@/components/ui';
import { pageMetadata, seoPages } from '@/lib/seo';

export const metadata = pageMetadata(seoPages.exif);

const faq = [
  {
    question: 'EXIF nedir, fotoğrafımda hangi bilgiler var?',
    answer:
      'EXIF, fotoğraf makinesi ve telefonların her fotoğrafa eklediği meta veridir. Çekim tarihi ve saati, telefonun marka ve modeli, lens ve pozlama ayarları; konum servisleri açıksa çekildiği yerin GPS koordinatları bu bilgilere dahildir.',
  },
  {
    question: 'WhatsApp veya Instagram konum bilgisini siliyor mu?',
    answer:
      'Çoğu sosyal medya uygulaması yüklenen fotoğraflardaki EXIF bilgisini kaldırır; ancak e-posta eki, “dosya olarak” gönderilen fotoğraflar, bulut paylaşım bağlantıları ve web siteleri bilgileri olduğu gibi taşıyabilir. Emin olmak için paylaşmadan önce temizlemek en güvenli yoldur.',
  },
  {
    question: 'Temizlenen fotoğrafın kalitesi düşer mi?',
    answer:
      'Hayır. Araç fotoğrafı yeniden sıkıştırmaz; yalnızca dosyadaki bilgi bölümlerini kaldırır veya yeniden yazar. Görüntü verisi bit bit aynı kalır, dosya boyutu yalnızca silinen bilgiler kadar küçülür.',
  },
  {
    question: 'Fotoğrafım bir sunucuya yükleniyor mu?',
    answer:
      'Hayır. Fotoğraf tarayıcında okunur ve temizlenir; hiçbir sunucuya gönderilmez. “Konumu haritada gör” bağlantısına tıklamadığın sürece koordinatlar da hiçbir yere iletilmez.',
  },
  {
    question: 'Temizledikten sonra fotoğraf neden yan dönmüyor?',
    answer:
      'Telefonlar dikey fotoğrafları çoğu zaman yatay kaydedip “yön” bilgisiyle döndürür. Bu bilgi kişisel değildir ve silinirse fotoğraf yan görünür; bu yüzden araç yön bilgisini her zaman korur.',
  },
  {
    question: 'iPhone HEIC fotoğraflarımı temizleyebilir miyim?',
    answer:
      'Tarayıcılar HEIC dosyalarını açamadığı için bu araç JPEG, PNG ve WebP ile çalışır. iPhone fotoğrafları paylaşırken genellikle JPEG’e dönüştürür; ayrıca Ayarlar → Kamera → Biçimler → “En Uyumlu” seçeneğiyle doğrudan JPEG çekebilirsin.',
  },
];

const guide = (
  <Section id="kullanim" kicker="gizlilik" title="Hangi bilgi neyi ele verir?" tight>
    <div className="prose">
      <ul>
        <li>
          <strong>Konum:</strong> Evde çekilen bir fotoğrafın koordinatları ev adresini birkaç metre hassasiyetle
          gösterebilir. İlan, satış ve sosyal medya paylaşımlarından önce mutlaka silinmeli.
        </li>
        <li>
          <strong>Tarih ve saat:</strong> Ne zaman nerede olduğunu, günlük rutinini veya fotoğrafın gerçek çekim
          zamanını ortaya koyar.
        </li>
        <li>
          <strong>Cihaz ve kişi:</strong> Telefon modeli, seri numarası ve sahip adı farklı fotoğrafların aynı kişiye
          ait olduğunu eşleştirmeye yarayabilir.
        </li>
        <li>
          <strong>Teknik bilgiler:</strong> Pozlama ve ISO gibi değerler kişisel değildir; fotoğrafçılık için saklamak
          isteyebilirsin.
        </li>
      </ul>
    </div>
  </Section>
);

export default function ExifCleanerPage() {
  return (
    <ToolPage
      slug="exif-temizleyici"
      seo={seoPages.exif}
      description="Fotoğrafının konum, tarih ve cihaz bilgilerini gör; istediklerini silip temiz bir kopya indir. Kalite kaybı olmaz, fotoğraf cihazından çıkmaz."
      faq={faq}
      guide={guide}
    >
      <ExifCleanerTool />
    </ToolPage>
  );
}
