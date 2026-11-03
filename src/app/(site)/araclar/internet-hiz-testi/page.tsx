import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import SpeedTestTool from '@/components/tools/SpeedTestTool';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata(
  'İnternet Hız Testi',
  'İndirme ve yükleme hızını, HTTP gecikmesini ve jitter değerini tarayıcıda ölç. Sonuçlarını görsel olarak indir ve paylaş.',
  '/araclar/internet-hiz-testi',
  ['internet hız testi', 'indirme hızı', 'yükleme hızı', 'ping testi'],
);

export default function SpeedTestPage() {
  return (
    <div className="animate-fade-up">
      <Link href="/araclar" className="tool-back">
        <ArrowLeft size={14} aria-hidden="true" /> Tüm araçlar
      </Link>
      <PageHeader
        eyebrow="Araçlar / İnternet & ağ"
        title="Bağlantın ne kadar hızlı?"
        description="İndirme, yükleme ve gecikme değerlerini ölç. Sonuçlarını takip et, görsel olarak indir ve paylaş."
      />
      <SpeedTestTool />
      <section className="network-info-section network-prose">
        <h2>Hız testi nasıl çalışır?</h2>
        <ul>
          <li>
            Bu sayfa bir web uygulamasıdır. Uygulama veya yazılım yüklemen
            gerekmez.
          </li>
          <li>
            Wi-Fi, 4G veya 5G bağlantını yapılandırma yapmadan test edebilirsin.
            Başlat düğmesini, Enter veya Space tuşunu kullan.
          </li>
          <li>
            Önce her yönde 5 MB aktarılır. İlk aktarım süresine göre o yöndeki
            toplam test boyutu 5–50 MB arasında otomatik belirlenir; düşük hızlı
            ağlarda daha küçük test kullanılır.
          </li>
          <li>
            Tamamlanan son 50 sonuç yalnızca bu tarayıcıya kaydedilir. Geçmişi
            CSV olarak indirebilir veya silebilirsin.
          </li>
          <li>
            Ölçüm tarayıcın ile Cloudflare ağı arasındadır. HTTP gecikmesi, ICMP
            ping ölçümü değildir. Wi-Fi sinyali, VPN, ağ yoğunluğu, arka plan
            indirmeleri ve test sunucusu sonucu etkiler.
          </li>
        </ul>
        <h2>Birim dönüştürme</h2>
        <p>
          1 Mbps = 0,125 MB/s · 8 Mbps = 1 MB/s. Bit ve bayt farklı birimlerdir:
          1 bayt = 8 bit. 10 Gbps = 10.000 Mbps.
        </p>
      </section>
      <section className="network-info-section network-prose">
        <h2>Ağ teknolojileri ve teorik hızlar</h2>
        <p>
          Wi-Fi veya mobil ağ adı tek başına bir hız garantisi vermez. Anten
          sayısı, kanal genişliği, cihaz ve operatörün kullandığı teknolojiye
          göre sınırlar değişir.
        </p>
        <ul>
          <li>
            Wi-Fi 802.11n: örneğin 2×2 / 40 MHz bağlantıda 300 Mbps, 3×3 / 40
            MHz bağlantıda 450 Mbps.
          </li>
          <li>
            Wi-Fi 802.11ac: örneğin 2×2 / 80 MHz bağlantıda yaklaşık 866 Mbps;
            Wave 2 / 160 MHz bağlantıda yaklaşık 1,73 Gbps.
          </li>
          <li>
            3.5G (HSPA), 4G LTE ve 4.5G LTE-A için tek bir sabit üst sınır
            yoktur. Modem kategorisi, frekans birleştirme ve şebeke
            yapılandırması belirleyicidir; 52, 100 veya 800 Mbps bütün ağların
            teorik maksimumu olarak kabul edilemez.
          </li>
          <li>
            5G için ITU IMT-2020 değerlendirme gereksinimindeki tepe değerler
            indirmede 20 Gbps, yüklemede 10 Gbps’dir. Bunlar ideal koşul
            değerleridir; günlük kullanım hızı değildir.
          </li>
        </ul>
        <p className="network-source-links">
          <a
            href="https://www.intel.com/content/www/us/en/support/articles/000005725/wireless/legacy-intel-wireless-products.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Intel Wi-Fi verileri
          </a>
          <a
            href="https://www.itu.int/dms_pub/itu-r/opb/rep/R-REP-M.2410-2017-PDF-E.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            ITU IMT-2020
          </a>
        </p>
      </section>
      <section className="network-info-section network-prose">
        <h2>Video izlemek için ne kadar hız gerekir?</h2>
        <div className="network-recommendations">
          <div>
            <h3>Apple TV</h3>
            <p>
              HD yayın için en az 8 Mbps. İçerik kalitesine ve yayın koşullarına
              göre daha yüksek hız gerekebilir.
            </p>
            <a
              href="https://support.apple.com/en-us/118405"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apple önerileri
            </a>
          </div>
          <div>
            <h3>YouTube</h3>
            <p>
              480p: 1,1 Mbps · 720p: 2,5 Mbps · 1080p: 5 Mbps · 4K: 20 Mbps.
            </p>
            <a
              href="https://support.google.com/youtube/answer/78358?hl=tr"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube önerileri
            </a>
          </div>
          <div>
            <h3>Netflix</h3>
            <p>720p: 3 Mbps · 1080p: 5 Mbps · 4K UHD: 15 Mbps.</p>
            <a
              href="https://help.netflix.com/tr/node/306"
              target="_blank"
              rel="noopener noreferrer"
            >
              Netflix önerileri
            </a>
          </div>
        </div>
        <p>
          Bu değerler tek yayın içindir. Aynı anda kullanılan cihazlar toplam
          bant genişliği ihtiyacını artırır. Bağlantın beklediğinden yavaşsa
          ağdaki diğer aktarımları durdurup yeniden dene; sorun sürerse İnternet
          Servis Sağlayıcına (İSS) başvur.
        </p>
      </section>
      <aside className="network-info-section network-prose">
        <h2>Kullanım bilgileri</h2>
        <p>
          Bu araç ve sonuçları, açık veya zımni herhangi bir garanti olmaksızın
          “olduğu gibi” sağlanır. Ölçüm bir hizmet kalitesi taahhüdü değildir.
          Yerel yasalara ve ağının kullanım kurallarına uymak kullanıcının
          sorumluluğundadır.
        </p>
        <p>
          Aktarım altyapısı:{' '}
          <a
            href="https://github.com/cloudflare/speedtest"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cloudflare hız testi uç noktaları
          </a>
          . Ölçüm trafiği üçüncü taraf altyapısından geçer.
        </p>
      </aside>
    </div>
  );
}
