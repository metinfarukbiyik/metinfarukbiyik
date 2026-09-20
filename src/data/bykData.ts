export interface Download {
  platform: string;
  icon: string;
  fileName: string;
  url: string;
  steps: string[];
  note: string;
}

export interface ExcelColumn {
  column: string;
  meaning: string;
  required?: boolean;
}

export const byk = {
  name: 'BYK Seri Baskı Pro',
  tagline: 'Masaüstü uygulaması',
  slogan: 'Excel listesini oku, etiketi bas.',
  icon: '/images/byk/icon.png',
  guideUrl: 'https://github.com/metinfarukbiyik/bykseripro/blob/main/README_KULLANICI.md',
  badges: ['Windows', 'macOS', 'Ücretsiz', 'İnternetsiz çalışır'],
  description:
    'Excel’deki seri numarası ve barkod listesini okuyup termal etiket yazıcısına basan masaüstü programı. Etiketi basmadan önce ekranda önizler, seçtiğiniz satırları veya tüm listeyi tek seferde çıktıya gönderir. Kurulumdan sonra internet bağlantısı gerekmez.',
};

export const capabilities: string[] = [
  'Excel’den barkod ve seri no listesini alır',
  'Etiketi basmadan önce ekranda önizler',
  'Xprinter veya TSPL uyumlu termal yazıcıya basar',
  'Seçili satırları ya da listenin tamamını basar',
  'Test baskısı ile yazıcıyı hızlıca dener',
];

export const features: { title: string; icon: string; color: string; items: string[] }[] = [
  {
    title: 'Liste ve önizleme',
    icon: 'FileSpreadsheet',
    color: 'bg-rose-50 text-rose-600',
    items: ['Excel dosyasından etiket okuma', 'Canlı etiket önizlemesi', 'Seçilileri bas veya tümünü bas'],
  },
  {
    title: 'Etiket ayarları',
    icon: 'Barcode',
    color: 'bg-amber-50 text-amber-600',
    items: ['Barkod tipi ve etiket boyutu', 'Marka veya firma yazısı (üst ya da alt)', 'Test baskı ile örnek etiket'],
  },
  {
    title: 'Yazıcı ve kayıt',
    icon: 'Printer',
    color: 'bg-emerald-50 text-emerald-600',
    items: ['Sistemdeki yazıcılar arasından seçim', 'Ayarları kaydetme', 'Kurulumdan sonra çevrimdışı çalışma'],
  },
];

export const downloads: Download[] = [
  {
    platform: 'Windows',
    icon: 'Monitor',
    fileName: 'BYKSeriBaskiPro_Kurulum.zip',
    url: 'https://github.com/metinfarukbiyik/bykseripro/releases/latest/download/BYKSeriBaskiPro_Kurulum.zip',
    steps: [
      'Windows bağlantısından zip dosyasını indirin',
      'Zip dosyasını açın',
      'BYKSeriBaskiPro_Kurulum.exe dosyasına çift tıklayın',
      'Kurulum klasörünü seçip “Kurulumu Başlat” deyin',
      'Masaüstü veya Başlat menüsü kısayolundan açın',
    ],
    note: 'Windows “bilinmeyen uygulama” uyarısı verirse: Ek bilgi → Yine de çalıştır.',
  },
  {
    platform: 'macOS',
    icon: 'Laptop',
    fileName: 'BYKSeriBaskiPro_macOS.zip',
    url: 'https://github.com/metinfarukbiyik/bykseripro/releases/latest/download/BYKSeriBaskiPro_macOS.zip',
    steps: [
      'Mac bağlantısından zip dosyasını indirin',
      'Zip dosyasını açın',
      'BYKSeriBaskiPro.app dosyasına çift tıklayın',
      'Dilerseniz KURULUM.command ile Uygulamalar klasörüne kurun',
    ],
    note: 'İlk açılışta engellenirse: uygulamaya sağ tık → Aç → Aç.',
  },
];

export const excelColumns: ExcelColumn[] = [
  { column: 'Barkod', meaning: 'Ana barkod veya seri no', required: true },
  { column: 'A-K Barkod', meaning: 'İkinci barkod' },
  { column: 'ItemNo', meaning: 'Orta metin' },
  { column: 'ParcaAd', meaning: 'Alt metin' },
];

export const usageSteps: string[] = [
  'Programı açın',
  'Excel dosyanızı yükleyin',
  'Yazıcıyı seçin',
  'Önizlemeyi kontrol edin',
  'Baskı alın',
  'İsterseniz ayarları kaydedin',
];

export const printerNotes: string[] = [
  'Önerilen model: Xprinter XP-490B veya TSPL uyumlu termal etiket yazıcısı',
  'Yazıcıyı bilgisayara bağlayıp sistemde göründüğünden emin olun',
  'Mac’te Sistem Ayarları → Yazıcılar ve Tarayıcılar bölümünden ekleyin',
];
