import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { isGame, portfolioProjects } from '@/data/projects';
import { tools } from '@/data/tools';
import { encodeBarcode, defaultStyle as barcodeStyle, renderBarcodeSvg } from './barcode';
import { createMatrix, defaultStyle, renderQrSvg } from './qr-code';
import { ogKey } from './seo';
import { site } from './site';
import {
  contactVisual,
  drawBoardVisual,
  drawLessonVisual,
  projectsGridVisual,
  resumeVisual,
  toolsGridVisual,
  webProjectVisual,
} from './og-visuals';

/** Content of one social preview card (1200 × 630). Build-time only: reads files from disk. */
export interface OgCard {
  key: string;
  path: string;
  kicker: string;
  title: string;
  description: string;
  chips: string[];
  visual: OgVisual;
  /** Adres çubuğunda gösterilecek adres (varsayılan: biyik.dev + yol). */
  address?: string;
  /** Sağ alttaki durum etiketi (varsayılan: Hazır). */
  status?: string;
}

/** Right-hand visual: an image (illustration, photo or app icon) or a typographic mark. */
export type OgVisual =
  | { kind: 'illustration' | 'photo' | 'icon'; src: string; caption?: string }
  | { kind: 'mark'; text: string; accent?: string };

const asset = (file: string) => readFileSync(join(process.cwd(), 'src/assets', file));
const png = (file: string) => `data:image/png;base64,${asset(file).toString('base64')}`;
const svg = (markup: string) => `data:image/svg+xml;base64,${Buffer.from(markup).toString('base64')}`;

const ink = '#1e2227';
const accent = '#33625c';
const line = '#d3cec2';
const soft = '#e2ebe8';

/** A real, scannable code pointing at the QR tool itself. */
const qrVisual = () =>
  svg(renderQrSvg(createMatrix(`${site.url}/araclar/qr-kod-olusturucu`, 'M'), { ...defaultStyle, eyeStyle: 'rounded', margin: 2 }));

/** A real EAN-13 with the GS1 Türkiye prefix; digits are left out because Satori cannot draw SVG text. */
const barcodeVisual = () => {
  const code = renderBarcodeSvg(encodeBarcode('ean13', '869123456789'), { ...barcodeStyle, showText: false, height: 70, margin: 0 });
  const width = 236;
  const height = (width * code.height) / code.width;
  const inner = code.svg.replace(/ width="[\d.]+" height="[\d.]+"/, ` x="42" y="${(320 - height) / 2}" width="${width}" height="${height}"`);
  return svg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320"><rect width="320" height="320" rx="28" fill="#fff"/>${inner}</svg>`);
};

const speedVisual = () =>
  svg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320">
  <rect width="320" height="320" rx="28" fill="#fff"/>
  <path d="M60 210 A100 100 0 1 1 260 210" fill="none" stroke="${soft}" stroke-width="22" stroke-linecap="round"/>
  <path d="M60 210 A100 100 0 0 1 228 95" fill="none" stroke="${accent}" stroke-width="22" stroke-linecap="round"/>
  <line x1="160" y1="182" x2="222" y2="118" stroke="${ink}" stroke-width="8" stroke-linecap="round"/>
  <circle cx="160" cy="182" r="14" fill="${ink}"/>
</svg>`);

const passportVisual = () => {
  const cells = Array.from({ length: 8 }, (_, i) => {
    const x = 44 + (i % 4) * 58;
    const y = 86 + Math.floor(i / 4) * 78;
    return `<rect x="${x}" y="${y}" width="50" height="66" rx="3" fill="${soft}" stroke="${line}"/>
      <circle cx="${x + 25}" cy="${y + 26}" r="11" fill="${accent}"/>
      <path d="M${x + 8} ${y + 66} q17 -26 34 0z" fill="${accent}"/>`;
  }).join('');
  return svg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320">
  <rect x="24" y="24" width="272" height="272" rx="10" fill="#fff" stroke="${line}" stroke-width="2"/>
  ${cells}
</svg>`);
};

const ipVisual = () =>
  svg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320">
  <rect width="320" height="320" rx="28" fill="#fff"/>
  <circle cx="160" cy="160" r="86" fill="none" stroke="${accent}" stroke-width="8"/>
  <ellipse cx="160" cy="160" rx="36" ry="86" fill="none" stroke="${accent}" stroke-width="6"/>
  <line x1="74" y1="160" x2="246" y2="160" stroke="${accent}" stroke-width="6"/>
</svg>`);

const siteCheckVisual = () =>
  svg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320">
  <rect width="320" height="320" rx="28" fill="#fff"/>
  <path d="M160 52 L246 86 V158 C246 212 208 250 160 268 C112 250 74 212 74 158 V86 Z" fill="${soft}" stroke="${accent}" stroke-width="10" stroke-linejoin="round"/>
  <path d="M122 160 L150 188 L202 132" fill="none" stroke="${accent}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`);

const exifVisual = () =>
  svg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320">
  <rect width="320" height="320" rx="28" fill="#fff"/>
  <rect x="56" y="76" width="208" height="168" rx="14" fill="${soft}" stroke="${line}" stroke-width="3"/>
  <path d="M56 214 L122 156 L170 198 L204 168 L264 220 V230 A14 14 0 0 1 250 244 H70 A14 14 0 0 1 56 230 Z" fill="${accent}" opacity="0.35"/>
  <path d="M160 92 C138 92 122 108 122 129 C122 156 160 190 160 190 C160 190 198 156 198 129 C198 108 182 92 160 92 Z" fill="${accent}"/>
  <circle cx="160" cy="128" r="13" fill="#fff"/>
  <line x1="92" y1="84" x2="232" y2="236" stroke="${ink}" stroke-width="12" stroke-linecap="round"/>
</svg>`);

/** A flip clock reading 25:00; digits are seven-segment bars because Satori cannot draw SVG text. */
const flipClockVisual = () => {
  //            a  b  c  d  e  f  g
  const segments: Record<string, number[]> = { '0': [1, 1, 1, 1, 1, 1, 0], '2': [1, 1, 0, 1, 1, 0, 1], '5': [1, 0, 1, 1, 0, 1, 1] };
  const digit = (value: string, x: number, y: number) => {
    const [w, h, t] = [42, 84, 10];
    const bars = [
      [x + t, y, w - 2 * t, t],
      [x + w - t, y + t, t, h / 2 - 1.5 * t],
      [x + w - t, y + h / 2 + t / 2, t, h / 2 - 1.5 * t],
      [x + t, y + h - t, w - 2 * t, t],
      [x, y + h / 2 + t / 2, t, h / 2 - 1.5 * t],
      [x, y + t, t, h / 2 - 1.5 * t],
      [x + t, y + h / 2 - t / 2, w - 2 * t, t],
    ];
    return bars
      .filter((_, i) => segments[value][i])
      .map(([bx, by, bw, bh]) => `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="3" fill="#f6f4ef"/>`)
      .join('');
  };
  const card = (value: string, x: number) =>
    // The hinge sits behind the digits, so the middle bars stay readable.
    `<rect x="${x}" y="84" width="124" height="152" rx="12" fill="#272c33"/>
    <rect x="${x}" y="159" width="124" height="2" fill="${ink}"/>
    ${digit(value[0], x + 15, 118)}${digit(value[1], x + 67, 118)}`;
  return svg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320">
  <rect width="320" height="320" rx="28" fill="${ink}"/>
  ${card('25', 28)}${card('00', 168)}
</svg>`);
};


const toolVisuals: Record<string, () => OgVisual> = {
  'qr-kod-olusturucu': () => ({ kind: 'illustration', src: qrVisual(), caption: 'okut → araç açılır' }),
  'barkod-olusturucu': () => ({ kind: 'illustration', src: barcodeVisual(), caption: '869 1234 5678 9 · EAN-13' }),
  'internet-hiz-testi': () => ({ kind: 'illustration', src: speedVisual(), caption: 'indirme · yükleme · ping' }),
  'vesikalik-fotograf': () => ({ kind: 'illustration', src: passportVisual(), caption: 'A4 · 8 adet · PDF' }),
  'exif-temizleyici': () => ({ kind: 'illustration', src: exifVisual(), caption: 'konum · tarih · cihaz' }),
  'web-sitesi-kontrol': () => ({ kind: 'illustration', src: siteCheckVisual(), caption: 'SSL · DNS · 301 → 200' }),
  'flip-saat': () => ({ kind: 'illustration', src: flipClockVisual(), caption: 'pomodoro · kronometre' }),
  'ip-adresim': () => ({ kind: 'illustration', src: ipVisual(), caption: 'IPv4 · IPv6' }),
};

const projectIcons: Record<string, string> = {
  'bizim-koy': 'og/icon-bizim-koy.png',
  'byk-music': 'og/icon-music.png',
  geocam: 'og/icon-geocam.png',
  'byk-seri-baski-pro': 'og/icon-byk.png',
};

const capitalize = (value: string) => value.charAt(0).toLocaleUpperCase('tr') + value.slice(1);

/** Kart açıklaması iki satıra sığsın: ilk cümle. */
const firstSentence = (text: string) => {
  const cut = text.search(/[.;!?](\s|$)/);
  return cut > 0 ? text.slice(0, cut + 1) : text;
};

function projectVisual(project: (typeof portfolioProjects)[number]): OgVisual {
  if (project.slug === 'draw') return { kind: 'illustration', src: drawBoardVisual(), caption: 'draw.biyik.dev' };
  if (projectIcons[project.slug]) return { kind: 'icon', src: png(projectIcons[project.slug]) };
  const host = new URL(project.url).host.replace(/^www\./, '');
  return { kind: 'illustration', src: webProjectVisual(project.icon), caption: host };
}

function buildCards(): OgCard[] {
  const page = (
    path: string,
    kicker: string,
    title: string,
    description: string,
    chips: string[],
    visual: OgVisual,
    extra: Partial<OgCard> = {},
  ): OgCard => ({ key: ogKey(path), path, kicker, title, description, chips, visual, ...extra });

  return [
    page(
      '/',
      'yazılım geliştirici · trabzon',
      site.name,
      'Web, mobil ve masaüstünde günlük işleri kolaylaştıran sade ürünler geliştiriyorum.',
      ['Web', 'iOS', 'Masaüstü'],
      { kind: 'photo', src: png('og/portrait.png') },
    ),
    page(
      '/hakkimda',
      'hakkımda',
      'Özgeçmiş, deneyim ve eğitim',
      'Sahadan ofise, ofisten yazılıma: telekomünikasyon, operasyon ve yazılım deneyimim.',
      ['7 pozisyon', '8 sertifika', 'CV (PDF)'],
      { kind: 'illustration', src: resumeVisual(png('og/portrait.png')), caption: 'özgeçmiş · CV' },
    ),
    page(
      '/projeler',
      'portföy',
      'Masaüstü, mobil ve web projeleri',
      'draw.biyik.dev, BYK Music, GeoCam: Audit, BYK Seri Baskı Pro, Bizim Köy ve kurumsal web siteleri.',
      [`${portfolioProjects.length} proje`, 'Windows · macOS · iOS', 'Web'],
      {
        kind: 'illustration',
        src: projectsGridVisual(['og/icon-music.png', 'og/icon-geocam.png', 'og/icon-byk.png', 'og/icon-bizim-koy.png'].map(png)),
        caption: `${portfolioProjects.length} proje`,
      },
    ),
    page(
      '/iletisim',
      'iletişim',
      'Bir fikrin mi var? Konuşalım.',
      'Web sitesi, kurumsal sistem, mobil veya masaüstü uygulama projen için bana ulaş.',
      ['E-posta', 'WhatsApp', 'LinkedIn'],
      { kind: 'illustration', src: contactVisual(), caption: site.email },
    ),
    page(
      '/araclar',
      'ücretsiz araçlar',
      'İşini kolaylaştıran küçük araçlar',
      'Fotoğraf, QR kod, barkod, hız testi, IP adresi ve site kontrolü. Kurulum ve hesap yok.',
      tools.map((tool) => capitalize(tool.short)).slice(0, 4),
      {
        kind: 'illustration',
        src: toolsGridVisual([qrVisual(), speedVisual(), passportVisual(), exifVisual()]),
        caption: `${tools.length} araç · ücretsiz`,
      },
    ),
    ...tools.map((tool) =>
      page(
        tool.href,
        'ücretsiz araç · kurulum yok',
        capitalize(tool.name),
        tool.description,
        tool.tags,
        toolVisuals[tool.slug](),
      ),
    ),
    ...portfolioProjects.map((project) =>
      page(
        project.href,
        isGame(project)
          ? 'oyun · tarayıcı'
          : project.category === 'Uygulama'
            ? `uygulama · ${project.platforms.slice(0, 2).join(' · ').toLocaleLowerCase('tr')}`
            : 'web projesi',
        project.name,
        firstSentence(project.description),
        [...project.platforms, project.category === 'Uygulama' ? 'Ücretsiz' : 'Yayında'],
        projectVisual(project),
      ),
    ),
    // draw.biyik.dev (alt alan adı): tahta ve dokümantasyon
    page(
      '/draw',
      'ücretsiz · üyelik yok · açık kaynak',
      'El çizimi beyaz tahta',
      'Akış şeması, diyagram ve eskiz çiz; bağlantıyla paylaş. Tarayıcıda çalışır, internetsiz de açılır.',
      ['Ders modu', 'Bağlantıyla paylaş', 'TR · EN'],
      { kind: 'illustration', src: drawBoardVisual(), caption: 'draw.biyik.dev' },
      { address: 'draw.biyik.dev' },
    ),
    page(
      '/draw/docs',
      'dokümantasyon · ekran görüntülü',
      'draw.biyik.dev nasıl kullanılır?',
      'Şekiller, oklar, katmanlar, paylaşma ve öğretmenler için ders modu: 14 adımlık kısa eğitim.',
      ['14 adım', 'Öğretmenler için', 'React paketi'],
      { kind: 'illustration', src: drawLessonVisual(), caption: 'kılavuz çizgili kâğıt' },
      { address: 'draw.biyik.dev/docs' },
    ),
    page(
      '/draw/docs/en',
      'documentation · with screenshots',
      'How to use draw.biyik.dev',
      'Shapes, arrows, layers, sharing and a teaching mode for tablets: a short 14-step tutorial.',
      ['14 steps', 'For teachers', 'React package'],
      { kind: 'illustration', src: drawLessonVisual(), caption: 'handwriting paper' },
      { address: 'draw.biyik.dev/docs/en', status: 'Ready' },
    ),
  ];
}

let cache: OgCard[] | null = null;
export function ogCards() {
  cache ??= buildCards();
  return cache;
}

export const getOgCard = (key: string) => ogCards().find((card) => card.key === key);

export function ogFonts() {
  return [
    { name: 'Inter', data: asset('fonts/Inter-400.ttf'), weight: 400 as const, style: 'normal' as const },
    { name: 'Inter', data: asset('fonts/Inter-600.ttf'), weight: 600 as const, style: 'normal' as const },
    { name: 'Inter', data: asset('fonts/Inter-700.ttf'), weight: 700 as const, style: 'normal' as const },
    { name: 'Mono', data: asset('fonts/JetBrainsMono-500.ttf'), weight: 500 as const, style: 'normal' as const },
  ];
}
