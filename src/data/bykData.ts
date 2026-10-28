export type Platform = 'windows' | 'macos';

export interface Download {
  platform: Platform;
  label: string;
  fileName: string;
  url: string;
  steps: string[];
  note: string;
}

export interface Feature {
  title: string;
  icon: string;
  description: string;
}

export interface LabelSample {
  src: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  caption: string;
}

export const byk = {
  name: 'BYK Seri Baskı Pro',
  developer: 'BIYIK.DEV',
  slogan: 'Excel’deki seri numarası ve barkod listenizi tek tıkla termal etiket yazıcısına basın.',
  metaTitle: 'BYK Seri Baskı Pro — Excel’den Seri Barkod Etiket Baskısı | BIYIK.DEV',
  metaDescription:
    'BYK Seri Baskı Pro: Excel’den toplu barkod ve seri no etiketi basan Windows/macOS uygulaması. TSPL termal yazıcılar, birebir önizleme, otomatik güncelleme.',
  description:
    'Üretim, depo ve satışta yüzlerce seri no ve barkod etiketini tek tek hazırlamak yerine: Excel’i açın, önizlemede kontrol edin, seçili satırları ya da tümünü basın.',
  platformLine: 'Windows 10/11 · macOS 12+ · TSPL yazıcılar',
  offlineNote: 'Kurulumdan sonra internet gerekmez; bağlantı yalnızca güncelleme kontrolü için kullanılır.',
  icon: '/images/byk/icon.png',
  banner: '/images/byk/banner.png',
  brandStyles: '/images/byk/brand-styles.png',
  latestReleaseApi: 'https://api.github.com/repos/metinfarukbiyik/bykseripro/releases/latest',
  email: 'metin@biyik.dev',
  whatsapp: { label: '+90 (540) 461 35 43', url: 'https://wa.me/905404613543' },
};

const releaseBase = 'https://github.com/metinfarukbiyik/bykseripro/releases/latest/download';

export const downloads: Download[] = [
  {
    platform: 'windows',
    label: 'Windows',
    fileName: 'BYKSeriBaskiPro_Kurulum.zip',
    url: `${releaseBase}/BYKSeriBaskiPro_Kurulum.zip`,
    steps: [
      'Zip dosyasını açın',
      'BYKSeriBaskiPro_Kurulum.exe dosyasını çalıştırın',
      'Kurulum klasörünü seçip “Kurulumu Başlat” deyin',
    ],
    note: 'SmartScreen uyarısı çıkarsa: Ek bilgi → Yine de çalıştır.',
  },
  {
    platform: 'macos',
    label: 'macOS',
    fileName: 'BYKSeriBaskiPro_macOS.zip',
    url: `${releaseBase}/BYKSeriBaskiPro_macOS.zip`,
    steps: [
      'Zip dosyasını açın',
      'BYKSeriBaskiPro.app’i Uygulamalar klasörüne taşıyın',
      'İlk açılışta uygulamaya sağ tık → Aç → Aç',
    ],
    note: 'Yazıcıyı Sistem Ayarları → Yazıcılar ve Tarayıcılar bölümünden ekleyin.',
  },
];

export const portableDownload = {
  label: 'Windows taşınabilir sürüm',
  url: `${releaseBase}/BYKSeriBaskiPro_Portable.zip`,
};

export const usageSteps: { title: string; description: string }[] = [
  { title: 'Excel’i açın', description: 'Seri no ve barkod listenizi programa yükleyin; sütunlar otomatik tanınır.' },
  { title: 'Önizleyin', description: 'Etiketi ekranda, yazıcıya gidecek konumuyla birebir kontrol edin.' },
  { title: 'Basın', description: 'Seçili satırları ya da listenin tamamını tek seferde yazıcıya gönderin.' },
];

export const labelSamples: LabelSample[] = [
  {
    src: '/images/byk/label-square.png',
    width: 376,
    height: 376,
    alt: '98×98 mm kare etiket örneği: firma adı, ana barkod, ikinci barkod ile orta ve alt metin',
    title: '98×98 mm',
    caption: 'Ana barkod, 2. barkod, orta ve alt metin bir arada.',
  },
  {
    src: '/images/byk/label-narrow.png',
    width: 576,
    height: 264,
    alt: '100×40 mm dar etiket örneği: iki barkod yan yana, ortada metin, altta siyah bantlı firma adı',
    title: '100×40 mm dar etiket',
    caption: 'Dar etikette 2. barkod yan yana alınır.',
  },
  {
    src: '/images/byk/label-qr.png',
    width: 316,
    height: 316,
    alt: '60×60 mm QR kodlu etiket örneği: ortada QR kod, altında açıklama ve çizgili firma adı',
    title: '60×60 mm QR',
    caption: 'QR kod ve açıklama metni.',
  },
];

export const features: Feature[] = [
  {
    title: 'Excel’den toplu etiket',
    icon: 'FileSpreadsheet',
    description:
      'Ana barkod, 2. barkod, orta ve alt metin. Sütun başlıkları serbest (“A-K Barkod”, “M Barkod”…), otomatik tanınır.',
  },
  {
    title: 'Birebir önizleme',
    icon: 'ScanEye',
    description: 'Ekrandaki görüntü yazıcıya giden konumla aynı; sığmayan öğe kırmızı çerçeveyle uyarılır.',
  },
  {
    title: 'Sürükle-bırak yerleşim',
    icon: 'Move',
    description: 'Öğeleri önizlemede fareyle taşıma, sol/orta/sağ hizalama, mm hassasiyetinde ince ayar, geri alma.',
  },
  {
    title: 'Otomatik sığdırma',
    icon: 'Shrink',
    description:
      'Dar etiketlerde (ör. 100×40 mm) 2. barkodu yan yana alır; “Sorunları otomatik düzelt” tek tıkla sığdırır.',
  },
  {
    title: 'Türkçe ve tam ortalı metin',
    icon: 'AlignCenter',
    description: 'Uzun yazılar satırlara bölünür, her satır ortalanır; ı ş ğ İ doğru basılır.',
  },
  {
    title: 'Tasarımlı markalama',
    icon: 'Stamp',
    description:
      'Firma adı açılıp kapatılabilir; konum, boyut ve 4 stil (düz, çerçeveli, siyah bant, çizgili).',
  },
  {
    title: 'Listeyi elle düzenleme',
    icon: 'ListPlus',
    description: 'Excel’i açmadan seri ekleme, yanlış satırı çıkarma, geri alma.',
  },
  {
    title: 'Seri üretim',
    icon: 'Hash',
    description: 'Önek + sayı + sonek ile Excel’siz seri listesi.',
  },
  {
    title: 'Barkod tipleri',
    icon: 'Barcode',
    description: 'Code 128 · Code 39 · Code 93 · EAN-13 · EAN-8 · QR Kod.',
  },
  {
    title: 'Yazıcı ve DPI denetimi',
    icon: 'Printer',
    description: 'Yazıcının TSPL uyumunu ve DPI’sını (203/300) algılar, uyuşmazlıkta uyarır.',
  },
  {
    title: 'Otomatik güncelleme',
    icon: 'RefreshCw',
    description: 'Yeni sürüm çıkınca program bildirir; tek tıkla güncellenir, ayarlar korunur.',
  },
];

export const excelColumns: { column: string; meaning: string; required?: boolean }[] = [
  { column: '1. sütun', meaning: 'Ana barkod', required: true },
  { column: '2. sütun', meaning: 'İkinci barkod' },
  { column: '3. sütun', meaning: 'Orta metin' },
  { column: '4. sütun', meaning: 'Alt metin' },
];

export const printers = {
  supported: {
    title: 'Çalışır',
    description: 'TSPL/TSPL2 destekleyen termal etiket yazıcıları',
    brands: ['Xprinter', 'TSC', 'Gprinter', 'HPRT', 'iDPRT', 'Rongta', 'Munbyn', 'Zenpert', 'Beeprt', 'Polono'],
  },
  unsupported: {
    title: 'Çalışmaz',
    description: 'TSPL dışındaki komut dilleri ve ofis yazıcıları',
    brands: ['Zebra (ZPL)', 'Godex (EZPL)', 'Brother', 'DYMO', 'Lazer / mürekkep püskürtmeli ofis yazıcıları'],
  },
};

export const faqs: { id: string; question: string; answer: string }[] = [
  {
    id: 'sigmiyor',
    question: 'Dar etikette öğeler sığmıyor',
    answer:
      'Sığmayan öğe önizlemede kırmızı çerçeveyle gösterilir. “Sorunları otomatik düzelt” düğmesi yerleşimi tek tıkla sığdırır; dar etiketlerde (ör. 100×40 mm) 2. barkod yan yana alınır. Gerekirse öğeleri önizlemede sürükleyip mm hassasiyetinde ince ayar yapabilirsiniz.',
  },
  {
    id: 'kayma',
    question: 'Baskı kayıyor ya da yanlış boyutta çıkıyor',
    answer:
      'Çoğunlukla DPI uyuşmazlığından kaynaklanır: program yazıcının DPI’sını (203/300) algılar ve ayarla uyuşmadığında uyarır. Etiketler arasında kayma varsa yazıcının kendi etiket kalibrasyonunu yazıcı kılavuzundaki gibi yeniden yapın.',
  },
  {
    id: 'anlamsiz-karakter',
    question: 'Yazıcı anlamsız karakterler basıyor',
    answer:
      'Yazıcınız TSPL desteklemiyor demektir. Program TSPL komutları gönderir; Zebra (ZPL), Godex (EZPL), Brother, DYMO gibi farklı komut dili kullanan yazıcılar bu komutları metin olarak basar.',
  },
  {
    id: 'yazici-gorunmuyor',
    question: 'Yazıcım listede görünmüyor',
    answer:
      'Program, işletim sistemine kurulu yazıcıları listeler. Yazıcının sürücüsünü kurup bilgisayara bağlayın; Windows’ta Ayarlar → Yazıcılar ve tarayıcılar, macOS’te Sistem Ayarları → Yazıcılar ve Tarayıcılar bölümünde göründüğünden emin olun, ardından programı yeniden açın.',
  },
  {
    id: 'internet',
    question: 'İnternet bağlantısı gerekir mi?',
    answer:
      'Hayır. Kurulumdan sonra program çevrimdışı çalışır; internet yalnızca yeni sürüm kontrolü için kullanılır.',
  },
];
