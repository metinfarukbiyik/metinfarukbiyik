export interface ToolCategory {
  id: string;
  name: string;
  description: string;
}

export interface ToolItem {
  slug: string;
  name: string;
  short: string;
  description: string;
  href: string;
  category: ToolCategory['id'];
  icon: 'ScanFace' | 'Gauge' | 'Globe2';
  tags: string[];
  /** Feature list used by the WebApplication schema and the tool card. */
  features: string[];
}

export const toolCategories: ToolCategory[] = [
  {
    id: 'fotograf-baski',
    name: 'Fotoğraf & baskı',
    description: 'Fotoğraflarını düzenle, baskıya hazır dosyalar oluştur.',
  },
  {
    id: 'internet-ag',
    name: 'İnternet & ağ',
    description: 'Bağlantını ölç ve ağ bilgilerini öğren.',
  },
];

export const tools: ToolItem[] = [
  {
    slug: 'vesikalik-fotograf',
    name: 'Vesikalık fotoğraf oluştur',
    short: 'Vesikalık',
    description:
      'Kadrajını ayarla; 1, 2, 4 veya 8 adet vesikalığı A4/A5 şablonunda PDF, PNG veya JPEG olarak indir.',
    href: '/araclar/vesikalik-fotograf',
    category: 'fotograf-baski',
    icon: 'ScanFace',
    tags: ['Cihazında işlenir', 'PDF · PNG · JPEG'],
    features: [
      '3,5 × 4,5, 4 × 6, 4,5 × 6 ve 5 × 6 cm ölçüler',
      'A4 ve A5 baskı şablonu',
      'PDF, PNG ve JPEG çıktı',
      'Fotoğraf sunucuya yüklenmez',
    ],
  },
  {
    slug: 'internet-hiz-testi',
    name: 'İnternet hız testi',
    short: 'Hız testi',
    description:
      'İndirme, yükleme, gecikme ve jitter değerlerini ölç; sonuçlarını karşılaştır ve görsel olarak paylaş.',
    href: '/araclar/internet-hiz-testi',
    category: 'internet-ag',
    icon: 'Gauge',
    tags: ['Adaptif test', 'Yerel geçmiş'],
    features: [
      'İndirme ve yükleme hızı ölçümü',
      'HTTP gecikmesi ve jitter',
      'Sonuç görseli ve CSV geçmişi',
      'Kurulum gerektirmez',
    ],
  },
  {
    slug: 'ip-adresim',
    name: 'IP adresim',
    short: 'IP adresi',
    description:
      'Genel IPv4 ve IPv6 adresini tek tıkla kopyala; servis sağlayıcını ve yaklaşık ağ konumunu gör.',
    href: '/araclar/ip-adresim',
    category: 'internet-ag',
    icon: 'Globe2',
    tags: ['IPv4 & IPv6', 'Tek tıkla kopyala'],
    features: [
      'IPv4 ve IPv6 adresi',
      'İnternet servis sağlayıcı (ASN)',
      'IP’ye bağlı yaklaşık konum',
      'Tek tıkla kopyalama',
    ],
  },
];

export const getTool = (slug: string) => tools.find((tool) => tool.slug === slug)!;
