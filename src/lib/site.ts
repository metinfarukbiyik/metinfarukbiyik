export const site = {
  url: 'https://biyik.dev',
  domain: 'biyik.dev',
  name: 'Metin Faruk Bıyık',
  brand: 'biyik.dev',
  uiName: 'biyik.dev UI',
  uiVersion: '1.0',
  jobTitle: 'Yazılım Geliştirici',
  locale: 'tr_TR',
  city: 'Trabzon',
  country: 'Türkiye',
  titleTemplate: '%s | biyik.dev',
  defaultTitle: 'Metin Faruk Bıyık — Yazılım Geliştirici, Trabzon | biyik.dev',
  description:
    'Metin Faruk Bıyık, Trabzon’da web, mobil ve masaüstü uygulamaları geliştiren yazılım geliştirici. BYK Music, GeoCam: Audit, BYK Seri Baskı Pro, kurumsal web siteleri ve ücretsiz online araçlar.',
  keywords: [
    'Metin Faruk Bıyık',
    'Metin Bıyık',
    'biyik.dev',
    'yazılım geliştirici',
    'Trabzon yazılım geliştirici',
    'Trabzon web tasarım',
    'kurumsal web sitesi',
    'web uygulama geliştirme',
    'masaüstü uygulama geliştirme',
    'iOS uygulama',
  ],
  gaId: 'G-RDVEGG0ZB5',
  email: 'metin@biyik.dev',
  github: 'https://github.com/metinfarukbiyik',
  linkedin: 'https://www.linkedin.com/in/metinbiyik/',
  instagram: 'https://instagram.com/_metinbiyik',
  cv: '/cv/metinfarukbiyik-cv.pdf',
};

export const navigation = [
  { name: 'Ana Sayfa', href: '/' },
  { name: 'Hakkımda', href: '/hakkimda' },
  { name: 'Projeler', href: '/projeler' },
  { name: 'Araçlar', href: '/araclar' },
  { name: 'İletişim', href: '/iletisim' },
];

export function isActivePath(pathname: string, href: string) {
  return href === '/'
    ? pathname === '/'
    : pathname === href || pathname.startsWith(`${href}/`);
}
