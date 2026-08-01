export interface FeatureGroup {
  title: string;
  icon: string;
  color: string;
  items: string[];
}

export const geocam = {
  name: 'GeoCam: Audit',
  tagline: 'Profesyonel saha ve denetim kamerası',
  slogan: 'Konumu doğrula, güvenle kaydet.',
  poster: '/images/geocam.png',
  status: 'Yakında App Store’da',
  description:
    'Çektiğiniz fotoğraf ve videoya konum, adres, pusula yönü, tarih-saat ve iş bilgisini damgalar. Sağ alttaki GeoCam filigranı kaydın orijinal bir saha kaydı olduğunu gösterir.',
  privacy: 'Tamamen cihazınızda çalışır.',
  badges: ['iPhone', 'iOS 17+', 'Ücretsiz', 'Çevrimdışı'],
};

export const appInfo: { label: string; value: string }[] = [
  { label: 'Platform', value: 'iPhone · iOS 17 ve üzeri' },
  { label: 'Diller', value: 'Türkçe, English, Español, Deutsch' },
  { label: 'Fiyat', value: 'Ücretsiz' },
];

export const featureGroups: FeatureGroup[] = [
  {
    title: 'Fotoğraf ve video çekimi',
    icon: 'Camera',
    color: 'bg-accent',
    items: [
      'Ön / arka kamera, flaş ve zoom',
      '4:3 ve 9:16 çerçeve oranları',
      'İsterseniz damgasız orijinali de kaydedin',
    ],
  },
  {
    title: 'Konum, adres ve pusula',
    icon: 'MapPin',
    color: 'bg-ios-red',
    items: [
      'Mahalle, ilçe, il ve ülke otomatik eklenir',
      'Enlem, boylam, rakım ve GPS hassasiyeti',
      'Pusula yönü derece ve yön harfiyle gösterilir',
    ],
  },
  {
    title: 'Bilgi katmanı',
    icon: 'Layers',
    color: 'bg-ios-indigo',
    items: [
      '7 farklı katman tasarımı arasından seçin',
      'Katmanı sürükleyin, parmakla boyutlandırın',
      'Ekranda gördüğünüz görüntü kaydedilenle aynıdır',
    ],
  },
  {
    title: 'Kurumsal kullanım',
    icon: 'Building2',
    color: 'bg-ios-teal',
    items: ['Marka adı, logo ve renk ekleyin', 'İş emri, Site ID ve not alanlarını doldurun'],
  },
  {
    title: 'Orijinallik filigranı',
    icon: 'Stamp',
    color: 'bg-ios-orange',
    items: [
      'Damgalı her kaydın sağ altında GeoCam filigranı yer alır',
      'Ücretsiz sürümde kaldırılamaz',
    ],
  },
];

export const privacyPoints: string[] = [
  'Fotoğraf, video ve konum bilgileri yalnızca cihazınızda işlenir',
  'Hesap açmanız gerekmez, hiçbir veri sunucuya gönderilmez',
  'Analitik, reklam ve takip teknolojisi kullanılmaz',
];

export const permissions: { icon: string; label: string; note: string }[] = [
  { icon: 'Camera', label: 'Kamera', note: 'Fotoğraf ve video çekimi için' },
  { icon: 'MapPin', label: 'Konum', note: 'Adres ve koordinat damgası için' },
  { icon: 'Image', label: 'Fotoğraflar', note: 'Kayıtları arşivinize eklemek için' },
  { icon: 'Mic', label: 'Mikrofon', note: 'Video kaydında ses için' },
];
