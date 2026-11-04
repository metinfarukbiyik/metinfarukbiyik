import NetworkDiagnosisTool from '@/components/tools/NetworkDiagnosisTool';
import ToolPage from '@/components/tools/ToolPage';
import { pageMetadata, seoPages } from '@/lib/seo';

export const metadata = pageMetadata(seoPages.diagnosis);

const faq = [
  {
    question: 'İnternetim neden paketimden yavaş?',
    answer:
      'En sık neden Wi-Fi’dır: modemden uzaklık, duvarlar, 2.4 GHz bandı ve komşu ağlarla kanal çakışması hızı ciddi düşürür. Kablolu ölçüm de düşükse modem, bina içi kablolama veya hat tarafında bir sorun olabilir. Rehber, sonuçlarına göre hangisinden başlaman gerektiğini gösterir.',
  },
  {
    question: 'Wi-Fi mı yoksa hat mı yavaş, nasıl anlarım?',
    answer:
      'Bilgisayarı Ethernet kablosuyla modeme bağlayıp hız testi yap. Kablolu sonuç paketine yakın, Wi-Fi sonucu düşükse sorun kablosuz ağdadır. İkisi de düşükse sorun hatta veya modemdedir.',
  },
  {
    question: '2.4 GHz ile 5 GHz arasındaki fark nedir?',
    answer:
      '2.4 GHz duvarları daha iyi geçer ama daha yavaştır (pratikte 50–100 Mbps) ve komşu ağlarla daha çok çakışır. 5 GHz aynı odada ve yakın mesafede çok daha hızlıdır. 100 Mbps üzeri paketlerde 5 GHz’e bağlanmak gerekir.',
  },
  {
    question: 'Ping (gecikme) değerim kaç olmalı?',
    answer:
      'Hız testimiz Türkiye’den çoğunlukla Amsterdam veya Frankfurt’taki sunuculara bağlandığı için 50–70 ms normaldir. Oyunda ve görüntülü görüşmede asıl sorun, gecikmenin dalgalanması (jitter) ve biri dosya indirirken ping’in fırlamasıdır.',
  },
  {
    question: 'Sağlayıcıma ne zaman başvurmalıyım?',
    answer:
      'Modemi yeniden başlattıktan sonra, kablolu bağlantıda ve farklı saatlerde yaptığın ölçümler paketinin belirgin biçimde altındaysa veya bağlantı sık kopuyorsa. Ölçüm tarihlerini ve sonuçlarını paylaşmak arıza sürecini hızlandırır.',
  },
  {
    question: 'Girdiğim bilgiler kaydediliyor mu?',
    answer:
      'Hayır. Rehber tamamen tarayıcında çalışır; son hız testi sonucun yalnızca bu tarayıcıdaki geçmişten okunur, hiçbir bilgi sunucuya gönderilmez.',
  },
];

export default function NetworkDiagnosisPage() {
  return (
    <ToolPage
      slug="ag-sorunu-teshis"
      seo={seoPages.diagnosis}
      title="İnternet yavaş mı? Nereden başlayacağını bul."
      description="Hız testi sonucunu, bağlantı türünü ve yaşadığın sorunu seç; Wi-Fi’dan modeme, kablolamadan sağlayıcıya kadar sıralı bir kontrol listesi al."
      faq={faq}
    >
      <NetworkDiagnosisTool />
    </ToolPage>
  );
}
