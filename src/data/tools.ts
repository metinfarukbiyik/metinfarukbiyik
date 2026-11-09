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
  icon: 'ScanFace' | 'Gauge' | 'Globe2' | 'QrCode' | 'Barcode' | 'ShieldCheck' | 'ImageOff' | 'Stethoscope';
  tags: string[];
  /** Feature list used by the WebApplication schema and the tool card. */
  features: string[];
}

export const toolCategories: ToolCategory[] = [
  {
    id: 'fotograf-baski',
    name: 'Fotoğraf & baskı',
    description: 'Fotoğraflarını düzenle, baskıya hazırla ve paylaşmadan önce gizli bilgilerini temizle.',
  },
  {
    id: 'kod-paylasim',
    name: 'Kod & paylaşım',
    description: 'Bağlantıları, Wi-Fi ağlarını ve ürün numaralarını taranabilir kodlara dönüştür.',
  },
  {
    id: 'internet-ag',
    name: 'İnternet & ağ',
    description: 'Bağlantını ölç, ağ bilgilerini öğren ve web sitelerini kontrol et.',
  },
];

export const tools: ToolItem[] = [
  {
    slug: 'vesikalik-fotograf',
    name: 'Vesikalık fotoğraf oluştur',
    short: 'Vesikalık',
    description:
      'Kadrajını ayarla; 1, 2, 4 veya 8 adet vesikalığı A4 veya 10 × 15 cm şablonunda PDF, PNG veya JPEG olarak indir.',
    href: '/araclar/vesikalik-fotograf',
    category: 'fotograf-baski',
    icon: 'ScanFace',
    tags: ['Cihazında işlenir', 'PDF · PNG · JPEG'],
    features: [
      'Vesikalık ve pasaport / kimlik (biyometrik) seçimi',
      '3,5 × 4,5, 4 × 6, 4,5 × 6 ve 5 × 6 cm ölçüler',
      'A4 ve 10 × 15 cm baskı şablonu',
      'PDF, PNG ve JPEG çıktı',
      'Fotoğraf sunucuya yüklenmez',
    ],
  },
  {
    slug: 'exif-temizleyici',
    name: 'Fotoğraf EXIF temizleyici',
    short: 'EXIF temizleyici',
    description:
      'Fotoğrafındaki konum, tarih ve cihaz bilgilerini gör; seçtiklerini kalite kaybı olmadan sil.',
    href: '/araclar/exif-temizleyici',
    category: 'fotograf-baski',
    icon: 'ImageOff',
    tags: ['Konum · tarih · cihaz', 'Kalite kaybı yok'],
    features: [
      'GPS konumu, çekim tarihi ve cihaz bilgisini gösterme',
      'Konum, tarih, cihaz ve teknik bilgileri ayrı ayrı silme',
      'XMP, IPTC, yorum ve gömülü önizlemeyi temizleme',
      'JPEG, PNG ve WebP; yeniden sıkıştırma yok',
      'Fotoğraf sunucuya yüklenmez',
    ],
  },
  {
    slug: 'qr-kod-olusturucu',
    name: 'QR kod oluşturucu',
    short: 'QR kod',
    description:
      'Bağlantı, Wi-Fi, metin, e-posta veya telefon için QR kod üret; renk, biçim, logo ve alt yazıyla özelleştir.',
    href: '/araclar/qr-kod-olusturucu',
    category: 'kod-paylasim',
    icon: 'QrCode',
    tags: ['Wi-Fi QR', 'Logo · SVG · PNG'],
    features: [
      'URL, Wi-Fi, metin, e-posta ve telefon QR kodu',
      'Okutunca otomatik bağlanan Wi-Fi QR kodu',
      'Renk, modül ve köşe biçimi, logo ve alt yazı',
      'PNG (2048 px’e kadar) ve SVG çıktı',
      'Veriler sunucuya gönderilmez',
    ],
  },
  {
    slug: 'barkod-olusturucu',
    name: 'Barkod oluşturucu',
    short: 'Barkod',
    description:
      'EAN-13, Code 128, Code 39, UPC ve ITF-14 barkodu üret; kontrol hanesi otomatik eklenir, PNG veya SVG indir.',
    href: '/araclar/barkod-olusturucu',
    category: 'kod-paylasim',
    icon: 'Barcode',
    tags: ['EAN-13 · Code 128', 'SVG · PNG'],
    features: [
      'EAN-13, EAN-8, UPC-A, ITF-14, Code 128 ve Code 39',
      'Kontrol hanesi hesaplama ve doğrulama',
      'Renk, yükseklik ve kenar boşluğu ayarı',
      'Keskin PNG ve vektör SVG çıktı',
      'Veriler sunucuya gönderilmez',
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
    slug: 'ag-sorunu-teshis',
    name: 'Ağ sorunu teşhis rehberi',
    short: 'Ağ teşhisi',
    description:
      'Hız testi sonucuna ve bağlantı türüne göre nereden başlayacağını gör, adım adım ilerle.',
    href: '/araclar/ag-sorunu-teshis',
    category: 'internet-ag',
    icon: 'Stethoscope',
    tags: ['Hız testiyle bağlantılı', 'Adım adım'],
    features: [
      'Son hız testi sonucunu otomatik kullanma',
      'Fiber, VDSL ve mobil bağlantıya özel öneriler',
      'Wi-Fi ve kablolu ölçüm karşılaştırması',
      'Belirtilere göre sıralı kontrol listesi',
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
  {
    slug: 'web-sitesi-kontrol',
    name: 'Web sitesi kontrolü',
    short: 'Site kontrolü',
    description:
      'Alan adının SSL sertifikasını, DNS kayıtlarını, yönlendirmelerini ve güvenlik başlıklarını kontrol et.',
    href: '/araclar/web-sitesi-kontrol',
    category: 'internet-ag',
    icon: 'ShieldCheck',
    tags: ['SSL · DNS', 'Yönlendirme zinciri'],
    features: [
      'SSL sertifikası, bitiş tarihi ve zincir kontrolü',
      'A, AAAA, CNAME, MX, NS, TXT ve CAA kayıtları',
      'http → https ve www yönlendirme zinciri',
      'HSTS, CSP ve diğer güvenlik başlıkları',
      'SPF ve DMARC e-posta kayıtları',
    ],
  },
];

export const getTool = (slug: string) => tools.find((tool) => tool.slug === slug)!;
