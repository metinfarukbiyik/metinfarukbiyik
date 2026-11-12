import SiteCheckTool from '@/components/tools/SiteCheckTool';
import ToolPage from '@/components/tools/ToolPage';
import { Section } from '@/components/ui';
import { pageMetadata, seoPages } from '@/lib/seo';

export const metadata = pageMetadata(seoPages.siteCheck);

const faq = [
  {
    question: 'SSL sertifikamın bitiş tarihini nasıl öğrenirim?',
    answer:
      'Alan adını yazıp “Kontrol et”e bas. Araç sitenin 443 portuna bağlanır, sunduğu sertifikayı okur; bitiş tarihini, kalan gün sayısını, sertifikayı veren kuruluşu ve hangi alan adlarını kapsadığını gösterir. 14 günden az kaldıysa sarı uyarı verir.',
  },
  {
    question: 'Sertifika geçerli ama tarayıcı yine de uyarı veriyor, neden?',
    answer:
      'En sık nedenler sertifikanın o alan adını kapsamaması (örneğin www’li adres için alınmamış olması), ara sertifikanın sunucuda eksik olması veya süresinin dolmuş olmasıdır. Araç bu durumları ayrı ayrı belirtir.',
  },
  {
    question: 'http’den https’e yönlendirme neden önemli?',
    answer:
      'Ziyaretçi adresi https yazmadan girdiğinde bağlantı şifresiz başlar. Sunucunun bunu kalıcı (301 veya 308) yönlendirmeyle https’e taşıması hem güvenlik hem de Google’ın sayfanın tek bir adresini dizine eklemesi için gereklidir. Zincirdeki gereksiz ara adımlar ise sayfanın açılmasını yavaşlatır.',
  },
  {
    question: 'Hangi DNS kayıtları gösteriliyor?',
    answer:
      'A (IPv4), AAAA (IPv6), CNAME, MX (e-posta sunucusu), NS (ad sunucuları), TXT ve CAA kayıtları ile e-posta güvenliği için SPF ve DMARC kayıtları. Sorgular Cloudflare’ın genel DNS çözümleyicisi (1.1.1.1) üzerinden yapılır.',
  },
  {
    question: 'Güvenlik başlıklarının hepsi zorunlu mu?',
    answer:
      'Hayır, ama her biri belirli bir saldırı türüne karşı ek koruma sağlar. HSTS ve X-Content-Type-Options neredeyse her siteye kolayca eklenebilir; Content-Security-Policy ise sitenin kullandığı kaynaklara göre dikkatle yazılmalıdır.',
  },
  {
    question: 'Sorguladığım alan adları kaydediliyor mu?',
    answer:
      'Hayır. Alan adı yalnızca kontrol için sunucumuza ve Cloudflare DNS’e gönderilir; sonuçlar kaydedilmez. Yerel ağ ve özel IP adresleri güvenlik nedeniyle kontrol edilmez.',
  },
];

const guide = (
  <Section id="kullanim" kicker="ipuçları" title="Sonuçları nasıl okumalı?" tight>
    <div className="prose">
      <ul>
        <li>
          <strong>Yeşil:</strong> Her şey yolunda. Sertifikanın 14 günden fazla süresi var, yönlendirme ve kayıtlar
          beklendiği gibi.
        </li>
        <li>
          <strong>Sarı:</strong> Çalışıyor ama iyileştirilebilir; örneğin sertifika yakında doluyor veya bazı güvenlik
          başlıkları eksik.
        </li>
        <li>
          <strong>Kırmızı:</strong> Ziyaretçileri etkileyen bir sorun var: sertifika geçersiz, sunucu yanıt vermiyor
          veya alan adı IP adresine çözümlenmiyor.
        </li>
        <li>
          <strong>Paylaş:</strong> “Sonuç bağlantısı” düğmesi, kontrolü yeniden çalıştıran bir bağlantı kopyalar;
          sorunu hosting firmana veya ekibine iletmek için kullanabilirsin.
        </li>
      </ul>
    </div>
  </Section>
);

export default function SiteCheckPage() {
  return (
    <ToolPage
      slug="web-sitesi-kontrol"
      seo={seoPages.siteCheck}
      description="Bir alan adının SSL sertifikasını ve bitiş tarihini, DNS kayıtlarını, http → https yönlendirme zincirini ve güvenlik başlıklarını tek seferde kontrol et."
      faq={faq}
      guide={guide}
    >
      <SiteCheckTool />
    </ToolPage>
  );
}
