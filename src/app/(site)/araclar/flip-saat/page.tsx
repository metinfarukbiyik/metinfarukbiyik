import FlipClockTool from '@/components/tools/FlipClockTool';
import ToolPage from '@/components/tools/ToolPage';
import { Section } from '@/components/ui';
import { pageMetadata, seoPages } from '@/lib/seo';

export const metadata = pageMetadata(seoPages.flipClock);

const faq = [
  {
    question: 'Pomodoro tekniği nedir, nasıl uygulanır?',
    answer:
      'Pomodoro, çalışmayı kısa odak seanslarına ve molalara bölen bir zaman yönetimi tekniğidir. Klasik düzende 25 dakika kesintisiz çalışılır, 5 dakika mola verilir; dört seanstan sonra 15 dakikalık uzun bir mola gelir. Bu araçta Pomodoro sekmesini açıp Başlat’a basman yeterli: seanslar ve molalar sırayla kendiliğinden başlar.',
  },
  {
    question: '25 dakika bana kısa geliyor, süreyi değiştirebilir miyim?',
    answer:
      'Evet. Pomodoro sekmesinde üç hazır düzen var: 25 / 5, 45 / 10 ve 60 / 15 dakika. Uzun soru çözümü, deneme ya da okuma gibi derin odak isteyen işlerde 45 veya 60 dakikalık seanslar daha rahat olabilir. Seçimin bu cihazda hatırlanır.',
  },
  {
    question: 'Tam ekrandayken ekranım kapanır mı?',
    answer:
      'Tam ekran modunda araç, tarayıcıdan ekranı açık tutmasını ister; bu sayede saat masanda kilit ekranı gibi açık kalır. Tarayıcın bu özelliği desteklemiyorsa ya da cihaz düşük güç modundaysa ekran yine de kararabilir; bu durumda cihazının otomatik kilit süresini uzatabilirsin.',
  },
  {
    question: 'Başka sekmeye geçersem ya da telefonu kilitlersem süre şaşar mı?',
    answer:
      'Hayır. Kronometre ve pomodoro, geçen süreyi sayarak değil başlangıç saatine bakarak hesaplar; sekme arka planda kalsa da geri döndüğünde süre doğrudur. Ancak sayfa arka plandayken veya telefon kilitliyken tarayıcılar sesi çalmayabilir; bitiş uyarısını kaçırmamak için sayfayı açık tut.',
  },
  {
    question: 'iPhone’da tam ekran çalışıyor mu?',
    answer:
      'iPhone’da Safari gerçek tam ekran moduna izin vermediği için saat sayfanın tamamını kaplayacak şekilde büyütülür. Adres çubuğu olmadan kullanmak istersen sayfayı Paylaş menüsünden “Ana Ekrana Ekle” ile ekleyip oradan açabilirsin. iPad, Android ve bilgisayarlarda gerçek tam ekran kullanılır.',
  },
  {
    question: 'Verilerim kaydediliyor mu, hesap açmam gerekiyor mu?',
    answer:
      'Hesap gerekmez. Araç tamamen tarayıcında çalışır; yalnızca süre düzeni, ses ve saniye tercihin bu cihazda saklanır. Hiçbir bilgi sunucuya gönderilmez.',
  },
];

const guide = (
  <Section id="kullanim" kicker="ipuçları" title="Verimli bir çalışma seansı için" tight>
    <div className="prose">
      <ul>
        <li>
          <strong>Tek iş seç:</strong> Seansı başlatmadan önce o 25 dakikada neyi bitireceğine karar ver; “2. ünite
          soruları” gibi küçük ve net bir hedef yeterli.
        </li>
        <li>
          <strong>Telefonu saate çevir:</strong> Aracı telefonunda tam ekran açıp masana koy. Ekran saat olarak
          kullanılırken bildirimlere bakmak zorlaşır.
        </li>
        <li>
          <strong>Molada ekrandan uzaklaş:</strong> Kısa molalarda ayağa kalk, su iç, uzağa bak. Sosyal medya molası
          beş dakikada bitmez.
        </li>
        <li>
          <strong>Denemelerde kronometre:</strong> Deneme çözerken Kronometre sekmesinde her ders veya soru grubu için
          Tur’a bas; hangi bölüme ne kadar süre harcadığını sonunda görürsün.
        </li>
      </ul>
    </div>
  </Section>
);

export default function FlipClockPage() {
  return (
    <ToolPage
      slug="flip-saat"
      seo={seoPages.flipClock}
      description="Ders çalışırken masanda duracak sade bir flip saat. Pomodoro sayacı ve kronometreyle süreni takip et; tam ekran moduyla telefonunu ya da ikinci ekranını kilit ekranı saatine çevir."
      faq={faq}
      guide={guide}
    >
      <FlipClockTool />
    </ToolPage>
  );
}
