import QrCodeTool from '@/components/tools/QrCodeTool';
import ToolPage from '@/components/tools/ToolPage';
import { Section } from '@/components/ui';
import { pageMetadata, seoPages } from '@/lib/seo';

export const metadata = pageMetadata(seoPages.qr);

const faq = [
  {
    question: 'Wi-Fi QR kodu nasıl çalışır?',
    answer:
      'Ağ adı (SSID), güvenlik türü ve şifre standart WIFI: biçiminde koda yazılır. iPhone ve Android telefonlarda kamera uygulamasıyla okutulduğunda “Ağa katıl” bildirimi çıkar; şifre yazmadan bağlanılır.',
  },
  {
    question: 'Oluşturduğum QR kodun süresi doluyor mu?',
    answer:
      'Hayır. Bu araç statik QR kod üretir: içerik doğrudan kodun içine yazılır, arada bir yönlendirme servisi yoktur. Kod, içindeki bağlantı veya ağ bilgisi değişmediği sürece çalışmaya devam eder.',
  },
  {
    question: 'Wi-Fi şifrem bir sunucuya gönderiliyor mu?',
    answer:
      'Hayır. QR kod tamamen tarayıcında, kendi cihazında üretilir. Girdiğin şifre, bağlantı ve logo hiçbir sunucuya gönderilmez veya kaydedilmez.',
  },
  {
    question: 'QR koda logo eklersem okunur mu?',
    answer:
      'Evet, QR kodların hata düzeltme özelliği sayesinde kodun bir kısmı kapansa da okunabilir. Logo eklediğinde araç hata düzeltmeyi otomatik olarak en yüksek seviye (H) yapar. Logoyu %30’un altında tutmak ve test etmek önerilir.',
  },
  {
    question: 'Baskı için PNG mi SVG mi indirmeliyim?',
    answer:
      'Afiş, tabela, menü ve matbaa işleri için SVG idealdir; vektör olduğu için kalite kaybı olmadan büyütülebilir. Web, sosyal medya ve sunumlar için 1024 px PNG, ev yazıcısıyla büyük baskı için 2048 px PNG yeterlidir.',
  },
  {
    question: 'QR kodu baskıda hangi boyutta kullanmalıyım?',
    answer:
      'Genel bir kural olarak kod, okutulacağı mesafenin yaklaşık onda biri genişliğinde olmalıdır; yakından okutulacak kartvizit ve masa kartlarında en az 2 × 2 cm önerilir. Kodun etrafında boşluk bırakmak ve koyu kodu açık zemine basmak okunabilirliği artırır.',
  },
];

const guide = (
  <Section id="kullanim" kicker="ipuçları" title="İyi bir QR kod için" tight>
    <div className="prose">
      <ul>
        <li>
          <strong>Kontrast:</strong> Koyu kodu açık zemine yerleştir. Açık renkli kod koyu zeminde bazı tarayıcılarla
          okunmayabilir; araç bu durumda uyarır.
        </li>
        <li>
          <strong>Kenar boşluğu:</strong> Kodun çevresinde en az 4 modül boşluk bırakmak standart önerisidir; baskıda
          kesim payını da hesaba kat.
        </li>
        <li>
          <strong>Wi-Fi:</strong> Ağ adı ve şifre büyük/küçük harfe duyarlıdır. Misafir ağı için ayrı bir ağ adı
          kullanmak ana ağını korur.
        </li>
        <li>
          <strong>Test et:</strong> Bastırmadan önce kodu farklı telefonlarla okut; özellikle logo ve özel renkler
          kullandıysan.
        </li>
      </ul>
    </div>
  </Section>
);

export default function QrCodePage() {
  return (
    <ToolPage
      slug="qr-kod-olusturucu"
      seo={seoPages.qr}
      title="QR kod oluşturucu: bağlantı, Wi-Fi ve daha fazlası."
      description="Bağlantını QR koda çevir veya okutunca otomatik bağlanan bir Wi-Fi QR kodu oluştur. Renk, biçim, logo ve alt yazıyla özelleştir; PNG ya da SVG olarak ücretsiz indir."
      faq={faq}
      guide={guide}
    >
      <QrCodeTool />
    </ToolPage>
  );
}
