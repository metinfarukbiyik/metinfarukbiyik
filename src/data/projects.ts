export interface PortfolioProject {
  slug: string;
  name: string;
  category: 'Uygulama' | 'Web sitesi';
  platform: string;
  /** Short platform labels rendered as badges. */
  platforms: string[];
  description: string;
  detail: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  icon: 'Music2' | 'Camera' | 'Barcode' | 'Globe' | 'GraduationCap' | 'Building2' | 'Workflow' | 'RadioTower';
  iconImage?: string;
  image?: string;
  url: string;
  href: string;
  features: string[];
  operatingSystem?: string;
  applicationCategory?: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: 'byk-music',
    name: 'BYK Music',
    category: 'Uygulama',
    platform: 'Windows · macOS',
    platforms: ['Windows', 'macOS'],
    description:
      'YouTube bağlantılarını MP3 ve MP4’e dönüştüren masaüstü indirme uygulaması.',
    detail:
      'YouTube video ve oynatma listelerini ses veya video dosyası olarak kaydetmenizi sağlar. Türkçe arayüzünde biçim ve kalite seçebilir, indirmeleri tek pencereden takip edebilirsiniz.',
    seoTitle: 'BYK Music — YouTube MP3 / MP4 İndirme Programı',
    seoDescription:
      'BYK Music ile YouTube video ve oynatma listelerini MP3 veya MP4 olarak indirin. Windows 10/11 ve Apple Silicon macOS için ücretsiz, Türkçe masaüstü uygulaması.',
    keywords: [
      'BYK Music',
      'YouTube MP3 indirici',
      'YouTube MP4 indirici',
      'YouTube MP3 dönüştürücü program',
      'oynatma listesi indirme',
      'Windows müzik indirme programı',
      'macOS YouTube indirici',
      'Türkçe YouTube indirme programı',
    ],
    icon: 'Music2',
    image: '/images/music/banner.png',
    url: 'https://github.com/metinfarukbiyik/byk-music',
    href: '/projeler/byk-music',
    iconImage: '/images/music/icon.png',
    features: [
      'MP3 ve MP4 olarak kaydetme',
      'Oynatma listesinden parça seçme',
      'İndirmeleri tek ekrandan takip etme',
    ],
    operatingSystem: 'Windows 10, Windows 11, macOS Apple Silicon',
    applicationCategory: 'MultimediaApplication',
  },
  {
    slug: 'geocam',
    name: 'GeoCam: Audit',
    category: 'Uygulama',
    platform: 'iPhone · iOS',
    platforms: ['iOS'],
    description:
      'Fotoğraflara GPS, adres ve zaman damgası ekleyen saha ve denetim kamerası.',
    detail:
      'Saha çalışmaları ve profesyonel dokümantasyon için konum doğrulamalı iPhone kamera uygulaması. GPS koordinatları, açık adres, tarih, saat, pusula ve iş bilgilerini fotoğraf üzerinde bir araya getirir.',
    seoTitle: 'GeoCam: Audit — iPhone GPS Kamera, Konum Damgalı Fotoğraf',
    seoDescription:
      'GeoCam: Audit ile iPhone fotoğraflarına GPS koordinatı, adres, tarih, saat ve iş bilgisi ekleyin. Saha ve denetim ekipleri için konum doğrulamalı kamera.',
    keywords: [
      'GeoCam Audit',
      'GPS kamera',
      'GPS kamera uygulaması iPhone',
      'konum damgalı fotoğraf',
      'tarih saat damgalı fotoğraf',
      'saha denetim kamerası',
      'koordinatlı fotoğraf çekme',
      'telekom saha fotoğrafı',
    ],
    icon: 'Camera',
    image: '/images/geocam/icon.png',
    url: 'https://apps.apple.com/tr/app/geocam-audit/id6797103829?l=tr',
    href: '/projeler/geocam',
    iconImage: '/images/geocam/icon.png',
    features: [
      'GPS ve zaman damgası',
      'Fotoğrafa iş bilgisi ve logo ekleme',
      'Fotoğrafları cihazda saklama',
    ],
    operatingSystem: 'iOS 17+',
    applicationCategory: 'PhotographyApplication',
  },
  {
    slug: 'byk-seri-baski-pro',
    name: 'BYK Seri Baskı Pro',
    category: 'Uygulama',
    platform: 'Windows · macOS',
    platforms: ['Windows', 'macOS'],
    description:
      'Excel listelerini toplu barkod ve seri numarası etiketlerine dönüştüren baskı programı.',
    detail:
      'Excel listenizden barkod ve seri numarası etiketleri oluşturmanızı sağlar. Etiketleri önizleyebilir, yerleşimi düzenleyebilir ve uyumlu termal yazıcıyla toplu baskı alabilirsiniz.',
    seoTitle: 'BYK Seri Baskı Pro — Excel’den Toplu Barkod Etiketi',
    seoDescription:
      'Excel listesinden toplu barkod, QR kod ve seri numarası etiketi yazdırın. TSPL uyumlu termal yazıcılar için Windows ve macOS etiket baskı programı.',
    keywords: [
      'BYK Seri Baskı Pro',
      'barkod yazdırma programı',
      'Excel barkod baskı',
      'toplu etiket baskı',
      'seri numarası etiketi',
      'QR kod etiket yazdırma',
      'TSPL etiket yazıcı',
      'termal yazıcı etiket programı',
    ],
    icon: 'Barcode',
    image: '/images/byk/banner.png',
    url: 'https://github.com/metinfarukbiyik/bykseripro',
    href: '/projeler/byk-seri-baski-pro',
    iconImage: '/images/byk/icon.png',
    features: [
      'Excel’den toplu baskı',
      'Baskı öncesi etiket önizleme',
      'Çevrimdışı kullanım',
    ],
    operatingSystem: 'Windows 10, Windows 11, macOS 12+',
    applicationCategory: 'BusinessApplication',
  },
  {
    slug: 'creda-system',
    name: 'Creda System',
    category: 'Web sitesi',
    platform: 'Web uygulaması',
    platforms: ['Web uygulaması'],
    description:
      'Personel, eğitim ve iş emirlerini tek platformda takip etmeyi sağlayan web uygulaması.',
    detail:
      'Personel, eğitim ve iş emirlerinin takibini bir araya getirmek için geliştirdiğim kurumsal sistem. CRM, ERP ve veri yönetimi odağıyla ofis ve saha süreçlerinin aynı platformdan izlenmesini sağlar.',
    seoTitle: 'Creda System — İş Emri, Personel ve Eğitim Takip Sistemi',
    seoDescription:
      'Creda System; personel, eğitim ve iş emirlerini tek platformda takip eden CRM/ERP odaklı kurumsal web uygulaması. Ofis ve saha süreçleri için veri yönetimi.',
    keywords: [
      'Creda System',
      'iş emri takip sistemi',
      'personel takip programı',
      'eğitim takip sistemi',
      'CRM ERP yazılımı',
      'saha ekibi yönetimi',
      'kurumsal veri yönetimi',
    ],
    icon: 'Workflow',
    url: 'https://creda.cnliletisim.com',
    href: '/projeler/creda-system',
    features: [
      'Personel ve eğitim takibi',
      'İş emri yönetimi',
      'CRM, ERP ve veri yönetimi',
    ],
  },
  {
    slug: 'cnl-iletisim',
    name: 'CNL İletişim',
    category: 'Web sitesi',
    platform: 'Kurumsal web sitesi',
    platforms: ['Kurumsal web'],
    description:
      'Baz istasyonu kurulum, montaj ve revizyon hizmetlerini tanıtan telekomünikasyon firması sitesi.',
    detail:
      'Trabzon merkezli telekomünikasyon firması CNL İletişim için tasarlayıp geliştirdiğim kurumsal web sitesi. Turkcell, Türk Telekom ve Vodafone baz istasyonlarına yönelik kurulum, montaj ve revizyon hizmetlerini; saha keşfi, anten kurulumu ve kablo tesisatı gibi çalışma alanlarını anlatır.',
    seoTitle: 'CNL İletişim — Baz İstasyonu Kurulumu Kurumsal Web Sitesi',
    seoDescription:
      'CNL İletişim için geliştirilen kurumsal web sitesi: Trabzon merkezli, Turkcell, Türk Telekom ve Vodafone baz istasyonu kurulum, montaj ve revizyon hizmetleri.',
    keywords: [
      'CNL İletişim',
      'baz istasyonu kurulumu',
      'baz istasyonu montajı',
      'telekomünikasyon firması web sitesi',
      'Trabzon telekomünikasyon',
      'kurumsal web tasarım Trabzon',
      'kurumsal web sitesi örneği',
    ],
    icon: 'RadioTower',
    url: 'https://cnliletisim.com',
    href: '/projeler/cnl-iletisim',
    features: [
      'Baz istasyonu kurulum, montaj ve revizyon',
      'Turkcell, Türk Telekom ve Vodafone odağı',
      'Saha keşfi, anten ve kablo tesisatı',
    ],
  },
  {
    slug: 'bayen',
    name: 'BAYEN',
    category: 'Web sitesi',
    platform: 'Kurumsal web sitesi',
    platforms: ['Kurumsal web'],
    description:
      'Yangın güvenliği ve yapı sistemleri hizmetlerini tanıtan kurumsal web sitesi.',
    detail:
      'Yangın güvenliği ve yapı sistemleri alanındaki kurumsal tanıtım çalışmam. BAYEN’in faaliyet alanını web üzerinde anlatmak için geliştirdiğim kurumsal web sitesi.',
    seoTitle: 'BAYEN — Yangın Güvenliği Kurumsal Web Sitesi',
    seoDescription:
      'BAYEN için geliştirilen kurumsal web sitesi: yangın güvenliği ve yapı sistemleri hizmetlerini anlatan, hızlı ve sade tanıtım çalışması.',
    keywords: [
      'BAYEN',
      'yangın güvenliği web sitesi',
      'yapı sistemleri',
      'kurumsal web tasarım',
      'firma tanıtım sitesi',
      'kurumsal web sitesi örneği',
    ],
    icon: 'Building2',
    url: 'https://bayen.com.tr',
    href: '/projeler/bayen',
    features: [
      'Kurumsal tanıtım',
      'Yangın güvenliği odağı',
      'Yapı sistemleri sunumu',
    ],
  },
  {
    slug: 'elif-ogretmen',
    name: 'Elif Öğretmen',
    category: 'Web sitesi',
    platform: 'Kişisel web sitesi',
    platforms: ['Kişisel web'],
    description:
      'Türkçe öğretmeni profili, eğitim bilgileri ve iletişim kanallarını sunan tanıtım sitesi.',
    detail:
      'Türkçe öğretmeni Elif Öğretmen için geliştirdiğim tanıtım web sitesi. Öğretmen profilini ve Türkçe eğitimi odağını dijital ortamda sunan bir portföy çalışması.',
    seoTitle: 'Elif Öğretmen — Türkçe Öğretmeni Tanıtım Web Sitesi',
    seoDescription:
      'Türkçe öğretmeni Elif Öğretmen için hazırlanan tanıtım web sitesi: öğretmen profili, eğitim odağı ve iletişim kanalları tek sayfada.',
    keywords: [
      'Elif Öğretmen',
      'Türkçe öğretmeni web sitesi',
      'öğretmen tanıtım sitesi',
      'öğretmen portföy sitesi',
      'eğitim web tasarımı',
    ],
    icon: 'GraduationCap',
    url: 'https://elifogretmen.com.tr',
    href: '/projeler/elif-ogretmen',
    features: ['Öğretmen profili', 'Türkçe eğitimi odağı', 'İletişim ve tanıtım'],
  },
  {
    slug: 'biyik-dev',
    name: 'biyik.dev',
    category: 'Web sitesi',
    platform: 'Kişisel web sitesi',
    platforms: ['Kişisel web'],
    description:
      'Uygulamalarımı, web projelerimi, araçlarımı ve mesleki deneyimimi bir araya getiren site.',
    detail:
      'Kendi çalışmalarımı bir araya getirdiğim kişisel site. Kendi tasarım sistemi biyik.dev UI ile hazırlandı; uygulamalarım, web projelerim, ücretsiz araçlar ve özgeçmişim tek adreste.',
    seoTitle: 'biyik.dev — Kişisel Site ve biyik.dev UI Tasarım Sistemi',
    seoDescription:
      'biyik.dev; Metin Faruk Bıyık’ın uygulamalarını, web projelerini, ücretsiz araçlarını ve özgeçmişini kendi tasarım sistemi biyik.dev UI ile sunan kişisel sitesi.',
    keywords: [
      'biyik.dev',
      'biyik.dev UI',
      'Metin Faruk Bıyık',
      'yazılım geliştirici portföyü',
      'kişisel web sitesi',
      'tasarım sistemi',
    ],
    icon: 'Globe',
    url: 'https://biyik.dev',
    href: '/projeler/biyik-dev',
    features: ['Proje portföyü', 'Ücretsiz online araçlar', 'Özgeçmiş ve deneyim'],
  },
];

export const appProjects = portfolioProjects.filter((p) => p.category === 'Uygulama');
export const webProjects = portfolioProjects.filter((p) => p.category === 'Web sitesi');
export const getProject = (slug: string) => portfolioProjects.find((p) => p.slug === slug);
