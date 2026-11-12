import BarcodeTool from '@/components/tools/BarcodeTool';
import ToolPage from '@/components/tools/ToolPage';
import { Section } from '@/components/ui';
import { pageMetadata, seoPages } from '@/lib/seo';

export const metadata = pageMetadata(seoPages.barcode);

const faq = [
  {
    question: 'Ürünüm için hangi barkod türünü seçmeliyim?',
    answer:
      'Markette veya mağazada satılacak ürünler için EAN-13 kullanılır; çok küçük ambalajlarda EAN-8 tercih edilir. Koli ve dış ambalajda ITF-14, depo, kargo ve stok etiketlerinde harf de içerebilen Code 128 yaygındır. Demirbaş ve envanter etiketlerinde Code 39 da sık görülür.',
  },
  {
    question: 'Kendi barkod numaramı uydurabilir miyim?',
    answer:
      'İç kullanım (stok, demirbaş, depo) için istediğin numarayı kullanabilirsin. Ancak ürünün marketlerde veya pazar yerlerinde satılacaksa EAN-13 numarasının GS1’den alınması gerekir. Türkiye’de bu numaralar TOBB bünyesindeki GS1 Türkiye tarafından verilir ve 868 veya 869 ön ekiyle başlar.',
  },
  {
    question: 'Kontrol hanesi nedir, nasıl hesaplanır?',
    answer:
      'EAN, UPC ve ITF-14 barkodlarının son hanesi, diğer hanelerden hesaplanan bir kontrol hanesidir ve okuma hatalarını yakalar. Haneler sağdan başlayarak sırayla 3 ve 1 ile çarpılıp toplanır; toplamı 10’un katına tamamlayan sayı kontrol hanesidir. Bu araç kontrol hanesini otomatik ekler, tam numara girersen de doğruluğunu denetler.',
  },
  {
    question: 'Barkoda Türkçe karakter yazabilir miyim?',
    answer:
      'Hayır. Code 128 yalnızca standart ASCII karakterleri (İngilizce harfler, rakamlar ve işaretler), Code 39 ise büyük harf, rakam ve birkaç işareti destekler. Ç, Ş, Ğ, Ü, Ö ve İ yerine C, S, G, U, O ve I kullanmalısın; EAN ve UPC yalnızca rakam içerir.',
  },
  {
    question: 'Barkodu hangi boyutta basmalıyım?',
    answer:
      'EAN-13 için standart boyut yaklaşık 37 × 26 mm’dir ve %80–200 arasında küçültülüp büyütülebilir. Genel kural olarak çubukları çok kısaltma, iki yanda boş alan (sessiz bölge) bırak ve koyu çubukları açık zemine bas. Etiket yazıcısında SVG kullanmak çubukların keskin kalmasını sağlar.',
  },
  {
    question: 'Girdiğim numaralar kaydediliyor mu?',
    answer:
      'Hayır. Barkod tamamen tarayıcında, kendi cihazında üretilir. Girdiğin numara veya metin hiçbir sunucuya gönderilmez, kaydedilmez.',
  },
];

const guide = (
  <Section id="kullanim" kicker="ipuçları" title="Sorunsuz okunan bir barkod için" tight>
    <div className="prose">
      <ul>
        <li>
          <strong>Renk:</strong> Koyu çubuk, açık zemin kullan. Lazer okuyucular kırmızı ışıkla çalıştığı için kırmızı
          tonlu çubukları göremez; araç bu durumda uyarır.
        </li>
        <li>
          <strong>Sessiz bölge:</strong> Barkodun iki yanında en az 10 modül boşluk bırak; etiket kenarına veya başka
          bir yazıya yapıştırma.
        </li>
        <li>
          <strong>Baskı:</strong> Termal etiket yazıcılarında SVG ya da yazıcı çözünürlüğüne uygun PNG kullan; görseli
          sonradan esnetmek çubuk genişliklerini bozar.
        </li>
        <li>
          <strong>Test et:</strong> Çok sayıda basmadan önce bir örneği telefonunun kamerası veya kullanacağın el
          okuyucusuyla okut.
        </li>
      </ul>
    </div>
  </Section>
);

export default function BarcodePage() {
  return (
    <ToolPage
      slug="barkod-olusturucu"
      seo={seoPages.barcode}
      description="Ürün, stok veya koli için barkod oluştur. Kontrol hanesi otomatik hesaplanır; rengi, yüksekliği ve kenar boşluğunu ayarla, PNG ya da SVG olarak ücretsiz indir."
      faq={faq}
      guide={guide}
    >
      <BarcodeTool />
    </ToolPage>
  );
}
