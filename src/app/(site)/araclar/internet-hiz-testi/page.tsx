import SpeedTestTool from '@/components/tools/SpeedTestTool';
import ToolPage from '@/components/tools/ToolPage';
import { Section, TextLink } from '@/components/ui';
import { pageMetadata, seoPages } from '@/lib/seo';

export const metadata = pageMetadata(seoPages.speed);

const faq = [
  {
    question: 'İnternet hız testi nasıl yapılır?',
    answer:
      'Başlat düğmesine bas veya Enter / Space tuşunu kullan. Test önce indirme, sonra yükleme hızını ve gecikmeyi ölçer. Daha doğru sonuç için ölçüm sırasında diğer indirmeleri, yayınları ve VPN’i kapat.',
  },
  {
    question: 'Mbps ile MB/s arasındaki fark nedir?',
    answer:
      'Mbps megabit, MB/s megabayt cinsindendir ve 1 bayt 8 bittir. Yani 8 Mbps bağlantı saniyede yaklaşık 1 MB veri indirir; 100 Mbps yaklaşık 12,5 MB/s eder.',
  },
  {
    question: 'Ping (gecikme) ve jitter nedir?',
    answer:
      'Gecikme, bir isteğin sunucuya gidip yanıtın geri gelmesi için geçen süredir; düşük olması oyun ve görüntülü görüşmede daha akıcı bir deneyim sağlar. Jitter ise bu gecikmenin ölçümler arasındaki dalgalanmasıdır. Bu araç ICMP ping değil, HTTP gecikmesi ölçer.',
  },
  {
    question: 'Video izlemek için kaç Mbps internet gerekir?',
    answer:
      'Tek bir yayın için YouTube 1080p’de 5 Mbps, 4K’da 20 Mbps; Netflix 1080p’de 5 Mbps, 4K UHD’de 15 Mbps önerir. Aynı anda birden fazla cihaz kullanılıyorsa bu ihtiyaçlar toplanır.',
  },
  {
    question: 'Sonucum neden paket hızımdan düşük çıkıyor?',
    answer:
      'Wi-Fi sinyali, kablosuz standart, aynı ağdaki diğer cihazlar, VPN, arka plan indirmeleri ve test sunucusuna olan uzaklık sonucu etkiler. En doğru ölçüm için cihazı kabloyla modeme bağlayıp tekrar dene; sorun sürerse servis sağlayıcına başvur.',
  },
];

const guide = (
  <>
    <Section id="nasil-calisir" kicker="yöntem" title="Hız testi nasıl çalışır?" tight>
      <div className="prose">
        <ul>
          <li>Bu sayfa bir web uygulamasıdır; uygulama veya yazılım yüklemen gerekmez.</li>
          <li>Wi-Fi, 4G veya 5G bağlantını yapılandırma yapmadan test edebilirsin.</li>
          <li>
            Önce her yönde 5 MB aktarılır. İlk aktarım süresine göre o yöndeki toplam test boyutu 5–50 MB
            arasında otomatik belirlenir; düşük hızlı ağlarda daha küçük test kullanılır.
          </li>
          <li>
            Tamamlanan son 50 sonuç yalnızca bu tarayıcıya kaydedilir. Geçmişi CSV olarak indirebilir veya
            silebilirsin.
          </li>
          <li>
            Ölçüm tarayıcın ile Cloudflare ağı arasındadır. HTTP gecikmesi, ICMP ping ölçümü değildir. Wi-Fi
            sinyali, VPN, ağ yoğunluğu, arka plan indirmeleri ve test sunucusu sonucu etkiler.
          </li>
        </ul>
        <p>
          <strong>Birim dönüştürme:</strong> 1 Mbps = 0,125 MB/s · 8 Mbps = 1 MB/s · 10 Gbps = 10.000 Mbps.
        </p>
      </div>
    </Section>

    <Section id="teknolojiler" kicker="referans" title="Ağ teknolojileri ve teorik hızlar" tight>
      <div className="prose">
        <p>
          Wi-Fi veya mobil ağ adı tek başına bir hız garantisi vermez. Anten sayısı, kanal genişliği, cihaz ve
          operatörün kullandığı teknolojiye göre sınırlar değişir.
        </p>
        <ul>
          <li>Wi-Fi 802.11n: örneğin 2×2 / 40 MHz bağlantıda 300 Mbps, 3×3 / 40 MHz bağlantıda 450 Mbps.</li>
          <li>
            Wi-Fi 802.11ac: örneğin 2×2 / 80 MHz bağlantıda yaklaşık 866 Mbps; Wave 2 / 160 MHz bağlantıda
            yaklaşık 1,73 Gbps.
          </li>
          <li>
            3.5G (HSPA), 4G LTE ve 4.5G LTE-A için tek bir sabit üst sınır yoktur. Modem kategorisi, frekans
            birleştirme ve şebeke yapılandırması belirleyicidir.
          </li>
          <li>
            5G için ITU IMT-2020 değerlendirme gereksinimindeki tepe değerler indirmede 20 Gbps, yüklemede 10
            Gbps’dir. Bunlar ideal koşul değerleridir; günlük kullanım hızı değildir.
          </li>
        </ul>
        <p className="source-links">
          <TextLink href="https://www.intel.com/content/www/us/en/support/articles/000005725/wireless/legacy-intel-wireless-products.html" quiet>
            Intel Wi-Fi verileri
          </TextLink>
          <TextLink href="https://www.itu.int/dms_pub/itu-r/opb/rep/R-REP-M.2410-2017-PDF-E.pdf" quiet>
            ITU IMT-2020
          </TextLink>
        </p>
      </div>
    </Section>

    <Section id="video" kicker="öneriler" title="Video izlemek için ne kadar hız gerekir?" tight>
      <div className="recommendations">
        {[
          {
            name: 'Apple TV',
            text: 'HD yayın için en az 8 Mbps. İçerik kalitesine göre daha yüksek hız gerekebilir.',
            href: 'https://support.apple.com/en-us/118405',
          },
          {
            name: 'YouTube',
            text: '480p: 1,1 Mbps · 720p: 2,5 Mbps · 1080p: 5 Mbps · 4K: 20 Mbps.',
            href: 'https://support.google.com/youtube/answer/78358?hl=tr',
          },
          {
            name: 'Netflix',
            text: '720p: 3 Mbps · 1080p: 5 Mbps · 4K UHD: 15 Mbps.',
            href: 'https://help.netflix.com/tr/node/306',
          },
        ].map((item) => (
          <div key={item.name} className="card">
            <h3 className="title-4">{item.name}</h3>
            <p className="text-small">{item.text}</p>
            <TextLink href={item.href} quiet className="recommendation-link">
              {item.name} önerileri
            </TextLink>
          </div>
        ))}
      </div>
      <p className="text-small recommendations-note">
        Bu değerler tek yayın içindir. Aynı anda kullanılan cihazlar toplam bant genişliği ihtiyacını artırır.
      </p>
    </Section>

    <Section id="kullanim-bilgileri" kicker="yasal" title="Kullanım bilgileri" tight>
      <div className="prose">
        <p>
          Bu araç ve sonuçları, açık veya zımni herhangi bir garanti olmaksızın “olduğu gibi” sağlanır. Ölçüm
          bir hizmet kalitesi taahhüdü değildir. Yerel yasalara ve ağının kullanım kurallarına uymak
          kullanıcının sorumluluğundadır.
        </p>
        <p>
          Aktarım altyapısı:{' '}
          <a href="https://github.com/cloudflare/speedtest" target="_blank" rel="noopener noreferrer">
            Cloudflare hız testi uç noktaları
          </a>
          . Ölçüm trafiği üçüncü taraf altyapısından geçer.
        </p>
      </div>
    </Section>
  </>
);

export default function SpeedTestPage() {
  return (
    <ToolPage
      slug="internet-hiz-testi"
      seo={seoPages.speed}
      title="İnternet hız testi: bağlantın ne kadar hızlı?"
      description="İndirme, yükleme, gecikme ve jitter değerlerini ölç. Sonuçlarını takip et, görsel olarak indir ve paylaş."
      faq={faq}
      guide={guide}
    >
      <SpeedTestTool />
    </ToolPage>
  );
}
