import type { ProjectImage } from './projectPresentation';

export const bizimKoyUrl = 'https://oyun.biyik.dev';

export const screenshots: ProjectImage[] = [
  { src: '/images/bizim-koy/shot-1.jpg', alt: 'Bizim Köy kasaba seviyesindeki köyün genel görünümü', caption: 'Köy görünümü' },
  { src: '/images/bizim-koy/shot-2.jpg', alt: 'Köy merkezi yakın planı ve limana yanaşan tüccar gemisinin teklifi', caption: 'Tüccar gemisi' },
  { src: '/images/bizim-koy/shot-3.jpg', alt: 'Köy Meydanı yapı paneli ve belediye gelişimi', caption: 'Yapı geliştirme' },
  { src: '/images/bizim-koy/shot-4.jpg', alt: 'Köy yönetimi menüsü: vergi oranı, mutluluk ve otomatik iş dağıtımı', caption: 'Köy yönetimi' },
  { src: '/images/bizim-koy/shot-5.jpg', alt: 'Köy pazarında odun, taş, yiyecek ve kereste alım satımı', caption: 'Köy pazarı' },
  { src: '/images/bizim-koy/shot-6.jpg', alt: 'Bizim Köy karşılama ekranı ve oyun rehberi', caption: 'Başlangıç rehberi' },
  { src: '/images/bizim-koy/shot-7.jpg', alt: 'Bizim Köy telefon ekranında', caption: 'Mobil görünüm' },
];

export const playSteps: { title: string; description: string }[] = [
  {
    title: 'Köyünü kur',
    description: 'Küçük bir adada 4 köylüyle başlarsın. Ev, depo ve tarla kurup köylülerini doyur ve barındır.',
  },
  {
    title: 'Mesleklere ayır',
    description: 'Oduncu, taşçı, avcı, marangoz ve demirci ata. Kereste ve aletle yapıları bir üst seviyeye geliştir.',
  },
  {
    title: 'Köyü büyüt',
    description: 'Nüfus ve itibar arttıkça yeni yapılar açılır: kahvehane, liman, karakol, villa ve şato.',
  },
  {
    title: 'Birlikte oyna',
    description: 'Klan kur, diğer köylerle ticaret yap, ortak seferlere çık ve arkadaşlarının köylerini ziyaret et.',
  },
];

export const levels = ['Mezra', 'Köy', 'Kasaba', 'Liman Şehri', 'İlçe', 'Şehir'];

export const featureGroups: { title: string; items: string[] }[] = [
  {
    title: 'Köy kurma ve ekonomi',
    items: [
      'Odun, taş, yiyecek, kereste ve alet üretimi',
      'Vergi oranı, mutluluk ve nüfus dengesi',
      'Köy pazarında alım satım, eşya dükkânı',
    ],
  },
  {
    title: 'Deniz ve keşif',
    items: [
      'Liman, balıkçı sandalı ve ticaret gemisi',
      'Limana yanaşan tüccarlarla takas',
      'Orman, maden ve av sahası olan keşif haritaları',
    ],
  },
  {
    title: 'Çok oyunculu',
    items: [
      'Klan kurma, üyelik ve klan sancağı',
      'Kışla, arena ve diğer köylere sefer',
      'Oyuncu pazarı ve köy ziyaretleri',
    ],
  },
];

export const controls: { keys: string; action: string }[] = [
  { keys: 'Sol sürükle · WASD', action: 'Haritayı kaydır' },
  { keys: 'Sağ sürükle', action: 'Kamerayı döndür' },
  { keys: 'Tekerlek', action: 'Yakınlaş / uzaklaş' },
  { keys: '1–9', action: 'Yapı araçları' },
  { keys: 'R', action: 'Yerleştirirken yapıyı döndür' },
  { keys: 'M', action: 'Köy menüsü' },
  { keys: 'P', action: 'Pazar' },
  { keys: 'Boşluk', action: 'Oyunu duraklat' },
  { keys: 'Esc', action: 'İptal' },
];

export const gameInfo: { label: string; value: string }[] = [
  { label: 'Tür', value: 'Köy kurma · strateji' },
  { label: 'Platform', value: 'Tarayıcı · masaüstü ve mobil' },
  { label: 'Grafik', value: '3B (WebGL)' },
  { label: 'Kayıt', value: 'Cihazda veya Google ile bulutta' },
  { label: 'Dil', value: 'Türkçe' },
  { label: 'Fiyat', value: 'Ücretsiz' },
];

export const faqs: { question: string; answer: string }[] = [
  {
    question: 'Oyunu indirmem gerekiyor mu?',
    answer:
      'Hayır. Bizim Köy tarayıcıda çalışır; oyun.biyik.dev adresini açman yeterli. İstersen telefonunda “Ana ekrana ekle” ile uygulama gibi açabilirsin.',
  },
  {
    question: 'Telefonda oynanır mı?',
    answer:
      'Evet. Arayüz dokunmatik ekranlar için uyarlanmıştır; haritayı parmağınla kaydırıp yakınlaştırabilir, yapıları alttaki çubuktan seçebilirsin.',
  },
  {
    question: 'İlerlemem kaybolur mu?',
    answer:
      'Köyün kullandığın cihaza otomatik kaydedilir. Google ile giriş yaparsan kayıt buluta da alınır ve köyün tüm cihazlarında aynı kalır.',
  },
  {
    question: 'Arkadaşlarımla oynayabilir miyim?',
    answer:
      'Evet. Google ile giriş yapan oyuncular klan kurabilir ya da bir klana katılabilir, oyuncu pazarında ticaret yapabilir, diğer köylere sefer düzenleyebilir ve birbirlerinin köylerini ziyaret edebilir.',
  },
];
