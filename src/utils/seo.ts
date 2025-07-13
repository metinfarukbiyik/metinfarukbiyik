export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  url: string;
  type?: string;
  image?: string;
  author?: string;
}

const BASE_TITLE = "Metin Faruk Bıyık - Teknisyen";
const BASE_URL = "https://biyik.dev";
const BASE_IMAGE = `${BASE_URL}/micon.png`;

export const seoConfig = {
  home: {
    title: BASE_TITLE,
    description: "Telekomünikasyon sektöründe uzman baz istasyonu teknisyeni, yapay zeka teknolojilerini işine entegre etmeyi seven bir kullanıcı. Modern web geliştirme teknolojilerini de kullanıyor.",
    keywords: "Metin Faruk Bıyık, Metin Bıyık, baz istasyonu teknisyeni, front-end developer, React developer, TypeScript, JavaScript, yapay zeka, AI, web developer, Trabzon, Turkcell, yazılım geliştirici, teknisyen",
    url: BASE_URL,
    type: "website",
    image: BASE_IMAGE,
    author: "Metin Faruk Bıyık"
  },
  equipment: {
    title: `Ekipmanlar | ${BASE_TITLE}`,
    description: "Metin Faruk Bıyık'ın günlük hayatında projelerini geliştirmek ve üretkenliğini artırmak için kullandığı teknoloji ekipmanları. MacBook Air M2, Dell Monitor, iPhone 14 Pro Max, Logitech MX Keys ve daha fazlası.",
    keywords: "Metin Faruk Bıyık ekipmanları, setup, MacBook Air M2, Dell Monitor, iPhone 14 Pro Max, Logitech MX Keys, Logitech MX Master 3S, teknoloji ekipmanları, developer setup, çalışma alanı",
    url: `${BASE_URL}/ekipmanlar`,
    type: "website",
    image: BASE_IMAGE,
    author: "Metin Faruk Bıyık"
  },
  about: {
    title: `Hakkımda | ${BASE_TITLE}`,
    description: "Metin Faruk Bıyık'ın detaylı özgeçmişi, iş deneyimi, eğitim geçmişi, sertifikaları ve yetenekleri. Turkcell, NTM Elektrik deneyimleri ve Atatürk Üniversitesi eğitimi.",
    keywords: "Metin Faruk Bıyık CV, özgeçmiş, hakkımda, deneyim, eğitim, sertifikalar, Turkcell Global Bilgi, NTM Elektrik, ALP Telekomünikasyon, Atatürk Üniversitesi, baz istasyonu, teknisyen, yetenekler",
    url: `${BASE_URL}/hakkimda`,
    type: "profile",
    image: BASE_IMAGE,
    author: "Metin Faruk Bıyık"
  },
  blog: {
    title: `Blog | ${BASE_TITLE}`,
    description: "Metin Faruk Bıyık'ın teknoloji, yapay zeka, web geliştirme ve kişisel deneyimleri hakkında yazdığı blog yazıları. Telekomünikasyon sektöründen içgörüler ve öğrenme süreci.",
    keywords: "Metin Faruk Bıyık blog, teknoloji yazıları, yapay zeka, web geliştirme, telekomünikasyon, kişisel deneyimler, öğrenme süreci, araçlar, teknolojiler, front-end",
    url: `${BASE_URL}/blog`,
    type: "website",
    image: BASE_IMAGE,
    author: "Metin Faruk Bıyık"
  }
};

export function generatePageSEO(page: keyof typeof seoConfig): SEOData {
  console.log('generatePageSEO called with page:', page);
  const result = seoConfig[page];
  console.log('generatePageSEO result:', result);
  return result;
} 