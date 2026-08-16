export interface FeatureGroup {
  title: string;
  icon: string;
  color: string;
  items: string[];
}

export const geocam = {
  name: 'GeoCam: Audit',
  tagline: 'GPS Camera with Timestamp',
  slogan: 'Konumu doğrula, güvenle kaydet.',
  icon: '/images/geocam/icon.png',
  storeUrl: 'https://apps.apple.com/tr/app/geocam-audit/id6797103829?l=tr',
  status: 'App Store’da',
  rating: '4,9',
  ratingCount: 9,
  version: '1.5',
  description:
    'Saha çalışmaları, denetimler ve profesyonel dokümantasyon için konum doğrulamalı kamera. Çektiğiniz her fotoğrafa GPS konumu, açık adres, tarih-saat, pusula yönü, rakım ve GPS hassasiyetini otomatik ekler.',
  privacy: 'Veriler toplanmaz. Uygulama tamamen cihazınızda çalışır.',
  badges: ['iPhone', 'iOS 17+', 'Ücretsiz', '2 MB'],
};

export const screenshots: { src: string; alt: string; caption: string }[] = [
  { src: '/images/geocam/shot-1.jpg', alt: 'GeoCam: Audit açılış ekranı', caption: 'Açılış' },
  { src: '/images/geocam/shot-2.jpg', alt: 'Konum doğrulamalı kamera önizlemesi', caption: 'Konum damgası' },
  { src: '/images/geocam/shot-3.jpg', alt: 'Bilgi katmanı ayarları', caption: 'Bilgi katmanı' },
  { src: '/images/geocam/shot-4.jpg', alt: 'Kurumsal marka ayarları', caption: 'Marka' },
  { src: '/images/geocam/shot-5.jpg', alt: 'Görünüm ve özelleştirme', caption: 'Özelleştirme' },
];

export const appInfo: { label: string; value: string }[] = [
  { label: 'Geliştirici', value: 'Metin Faruk Bıyık' },
  { label: 'Kategori', value: 'İş' },
  { label: 'Sürüm', value: '1.5' },
  { label: 'Boyut', value: '2 MB' },
  { label: 'Uyumluluk', value: 'iPhone · iOS 17+' },
  { label: 'Fiyat', value: 'Ücretsiz' },
];

export const featureGroups: FeatureGroup[] = [
  {
    title: 'Konum doğrulaması',
    icon: 'MapPin',
    color: 'bg-ios-red',
    items: [
      'GPS konumu, açık adres ve koordinatlar',
      'Rakım, pusula yönü ve GPS hassasiyeti',
      'İnternet olmadan çalışır',
    ],
  },
  {
    title: 'Profesyonel bilgi katmanı',
    icon: 'Layers',
    color: 'bg-ios-indigo',
    items: [
      'Tarih, saat ve konum bilgisi fotoğrafa damgalanır',
      'Gösterilecek alanları özelleştirin',
      'Orijinal fotoğrafı ayrı kaydedin',
    ],
  },
  {
    title: 'Saha ve kurumsal kullanım',
    icon: 'Building2',
    color: 'bg-ios-teal',
    items: [
      'İş emri, Site ID ve not alanları',
      'Şirket logosu ve marka ekleme',
      'İnşaat, telekom, enerji ve denetim ekipleri için',
    ],
  },
];

export const useCases: string[] = [
  'İnşaat ve saha denetimi',
  'Telekom ve altyapı',
  'Sigorta ekspertizi',
  'Kalite kontrol',
];

export const privacyPoints: string[] = [
  'Fotoğraf ve konum bilgileri yalnızca cihazınızda işlenir',
  'Hesap açmanız gerekmez, hiçbir veri sunucuya gönderilmez',
  'Analitik, reklam ve takip teknolojisi kullanılmaz',
];

export const releaseNotes = [
  'Varsayılan sadeleştirilmiş tasarım iyileştirildi',
  'Memnuniyet anketi eklendi',
  'Yatayda bozulan filigran düzeltildi',
  'Filigran ile koordinat bilgileri mesafesi düzeltildi',
];
