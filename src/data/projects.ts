import { projects } from './cvData';

export interface PortfolioProject {
  slug: string;
  name: string;
  category: 'Uygulama' | 'Web sitesi';
  platform: string;
  description: string;
  detail: string;
  keywords: string[];
  icon: string;
  iconImage?: string;
  image?: string;
  url: string;
  href: string;
  features: string[];
}

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: 'byk-music',
    name: 'BYK Music',
    category: 'Uygulama',
    platform: 'Windows · macOS',
    description:
      'YouTube bağlantılarını MP3 ve MP4’e dönüştüren masaüstü indirme uygulaması.',
    detail:
      'YouTube video ve oynatma listelerini ses veya video dosyası olarak kaydetmenizi sağlar. Türkçe arayüzünde biçim ve kalite seçebilir, indirmeleri tek pencereden takip edebilirsiniz.',
    keywords: [
      'BYK Music',
      'YouTube MP3 indirici',
      'YouTube MP4 indirici',
      'oynatma listesi indirme',
      'Windows müzik indirme programı',
      'macOS video indirici',
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
  },
  {
    slug: 'geocam',
    name: 'GeoCam: Audit',
    category: 'Uygulama',
    platform: 'iPhone · iOS',
    description:
      'Fotoğraflara GPS, adres ve zaman damgası ekleyen saha ve denetim kamerası.',
    detail:
      'Saha çalışmaları ve profesyonel dokümantasyon için konum doğrulamalı iPhone kamera uygulaması. GPS koordinatları, açık adres, tarih, saat, pusula ve iş bilgilerini fotoğraf üzerinde bir araya getirir.',
    keywords: [
      'GeoCam Audit',
      'GPS kamera',
      'konum damgalı fotoğraf',
      'saha denetim kamerası',
      'iPhone tarih saat kamera',
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
  },
  {
    slug: 'byk-seri-baski-pro',
    name: 'BYK Seri Baskı Pro',
    category: 'Uygulama',
    platform: 'Windows · macOS',
    description:
      'Excel listelerini toplu barkod ve seri numarası etiketlerine dönüştüren baskı programı.',
    detail:
      'Excel listenizden barkod ve seri numarası etiketleri oluşturmanızı sağlar. Etiketleri önizleyebilir, yerleşimi düzenleyebilir ve uyumlu termal yazıcıyla toplu baskı alabilirsiniz.',
    keywords: [
      'BYK Seri Baskı Pro',
      'barkod yazdırma programı',
      'Excel barkod baskı',
      'seri numarası etiketi',
      'TSPL etiket yazıcı',
      'toplu etiket baskı',
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
  },
  ...projects.map((project, index): PortfolioProject => {
    const slugs = ['biyik-dev', 'elif-ogretmen', 'bayen', 'creda-system'];
    const keywords = [
      [
        'Metin Faruk Bıyık',
        'biyik.dev',
        'yazılım geliştirici portföyü',
        'kişisel web sitesi',
        'Trabzon yazılım geliştirici',
      ],
      [
        'Elif Öğretmen',
        'Türkçe öğretmeni web sitesi',
        'öğretmen tanıtım sitesi',
        'eğitim web tasarımı',
      ],
      [
        'BAYEN',
        'yangın güvenliği web sitesi',
        'yapı sistemleri',
        'kurumsal web tasarım',
      ],
      [
        'Creda System',
        'iş emri takip sistemi',
        'personel yönetimi',
        'CRM ERP',
        'eğitim takibi',
        'kurumsal veri yönetimi',
      ],
    ];
    const details = [
      'Kendi çalışmalarımı bir araya getirdiğim kişisel portföy. Mobil ve masaüstü uygulamalarımı, web projelerimi, mesleki deneyimimi ve özgeçmişimi tek bir adresten inceleyebilirsiniz.',
      'Türkçe öğretmeni Elif Öğretmen için geliştirdiğim tanıtım web sitesi. Öğretmen profilini ve Türkçe eğitimi odağını dijital ortamda sunan bir portföy çalışması.',
      'Yangın güvenliği ve yapı sistemleri alanındaki kurumsal tanıtım çalışmam. BAYEN’in faaliyet alanını web üzerinde anlatmak için geliştirdiğim kurumsal web sitesi.',
      'Personel, eğitim ve iş emirlerinin takibini bir araya getirmek için geliştirdiğim kurumsal sistem. CRM, ERP ve veri yönetimi odağıyla ofis ve saha süreçlerinin aynı platformdan izlenmesini sağlar.',
    ];
    const features = [
      ['Proje portföyü', 'Özgeçmiş ve deneyim', 'Uygulama tanıtım sayfaları'],
      ['Öğretmen profili', 'Türkçe eğitimi odağı', 'İletişim ve tanıtım'],
      ['Kurumsal tanıtım', 'Yangın güvenliği odağı', 'Yapı sistemleri sunumu'],
      [
        'Personel ve eğitim takibi',
        'İş emri yönetimi',
        'CRM, ERP ve veri yönetimi',
      ],
    ];
    return {
      slug: slugs[index],
      name: ['biyik.dev', 'Elif Öğretmen', 'BAYEN', 'Creda System'][index],
      category: 'Web sitesi',
      platform: index === 3 ? 'Web uygulaması' : 'Web sitesi',
      description: [
        'Uygulamalarımı, web projelerimi ve mesleki deneyimimi bir araya getiren portföy sitesi.',
        'Türkçe öğretmeni profili, eğitim bilgileri ve iletişim kanallarını sunan tanıtım sitesi.',
        'Yangın güvenliği ve yapı sistemleri hizmetlerini tanıtan kurumsal web sitesi.',
        'Personel, eğitim ve iş emirlerini tek platformda takip etmeyi sağlayan web uygulaması.',
      ][index],
      detail: details[index],
      keywords: keywords[index],
      icon: project.icon,
      url: project.url,
      href: `/projeler/${slugs[index]}`,
      features: features[index],
    };
  }),
];
