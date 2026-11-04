import IpAddressTool from '@/components/tools/IpAddressTool';
import ToolPage from '@/components/tools/ToolPage';
import { pageMetadata, seoPages } from '@/lib/seo';

export const metadata = pageMetadata(seoPages.ip);

const faq = [
  {
    question: 'IP adresim nedir, nasıl öğrenirim?',
    answer:
      'Bu sayfayı açtığında internette görünen genel IPv4 ve IPv6 adresin otomatik olarak gösterilir. Kopyala düğmesiyle adresi tek tıkla panoya alabilirsin.',
  },
  {
    question: 'IPv4 ile IPv6 arasındaki fark nedir?',
    answer:
      'IPv4 adresleri 32 bitlik, 192.0.2.1 gibi dört sayıdan oluşur ve sayıları sınırlıdır. IPv6 adresleri 128 bitliktir, 2001:db8::1 gibi onaltılık gruplarla yazılır ve çok daha geniş bir adres alanı sunar.',
  },
  {
    question: 'Modemimin IP adresi (192.168.1.1) ile buradaki adres aynı mı?',
    answer:
      'Hayır. 192.168.x.x veya 10.x.x.x gibi adresler yalnızca ev ya da iş yerindeki yerel ağda geçerlidir. Burada gördüğün genel IP ise internet servis sağlayıcının bağlantına atadığı ve dış dünyanın gördüğü adrestir.',
  },
  {
    question: 'IP adresim neden değişiyor?',
    answer:
      'Çoğu ev ve mobil bağlantı dinamik IP kullanır; modem yeniden başladığında veya operatör yeni bir adres atadığında IP değişebilir. Sabit IP genellikle servis sağlayıcıdan ayrıca talep edilir.',
  },
  {
    question: 'IP adresimden ev adresim bulunabilir mi?',
    answer:
      'Hayır. IP veritabanları yalnızca yaklaşık bir konum (genellikle şehir veya bölge) verir; kesin adresini veya GPS konumunu göstermez. VPN ve mobil operatör yönlendirmesi bu konumu da değiştirebilir.',
  },
];

export default function IpAddressPage() {
  return (
    <ToolPage
      slug="ip-adresim"
      seo={seoPages.ip}
      title="IP adresim ne? Hemen öğren."
      description="Genel IPv4 ve IPv6 adresini, internet servis sağlayıcını ve IP adresine bağlı yaklaşık konum bilgisini tek ekranda görüntüle."
      faq={faq}
    >
      <IpAddressTool />
    </ToolPage>
  );
}
