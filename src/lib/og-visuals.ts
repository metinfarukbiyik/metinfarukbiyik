/**
 * Paylaşım kartlarının (OG) sağ taraftaki görselleri: 320 × 320 SVG'ler.
 * Yalnızca derleme anında çalışır. Draw görselleri tahtanın kendi el çizimi motoruyla çizilir.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { DEFAULT_STYLE } from './sketch/editor';
import { generateOps } from './sketch/shapes';
import { pressureOutline, sketchEllipsePoints, smoothPath } from './sketch/rough';
import { createRng } from './sketch/random';
import type { Point, SketchElement } from './sketch/types';

const ink = '#1e2227';
const accent = '#33625c';
const line = '#d3cec2';
const soft = '#e2ebe8';

export const svgData = (markup: string) => `data:image/svg+xml;base64,${Buffer.from(markup).toString('base64')}`;

const frame = (inner: string, bg = '#fff') =>
  `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 320 320"><rect width="320" height="320" rx="28" fill="${bg}"/>${inner}</svg>`;

/* ───────────── El çizimi (draw motoru) ───────────── */

let seq = 0;
function element(type: SketchElement['type'], x: number, y: number, w: number, h: number, extra: Partial<SketchElement> = {}): SketchElement {
  seq += 1;
  return {
    ...DEFAULT_STYLE,
    textAlign: 'center',
    id: `og-${seq}`,
    type,
    x,
    y,
    width: w,
    height: h,
    angle: 0,
    seed: 1000 + seq * 7919,
    version: 1,
    strokeColor: ink,
    strokeWidth: 2.4,
    ...extra,
  };
}

function arrow(x1: number, y1: number, x2: number, y2: number, extra: Partial<SketchElement> = {}): SketchElement {
  const x = Math.min(x1, x2);
  const y = Math.min(y1, y2);
  return element('arrow', x, y, Math.abs(x2 - x1), Math.abs(y2 - y1), {
    points: [
      [x1 - x, y1 - y],
      [x2 - x, y2 - y],
    ],
    endArrowhead: 'arrow',
    startArrowhead: 'none',
    ...extra,
  });
}

/** Öğeyi, motorun ürettiği çizim komutlarıyla SVG'ye çevirir. */
function sketchSvg(el: SketchElement): string {
  const parts = generateOps(el).map((op) => {
    const base = `d="${op.d}" stroke-linecap="round" stroke-linejoin="round"`;
    switch (op.mode) {
      case 'fill':
        return `<path ${base} fill="${el.backgroundColor}" stroke="none"/>`;
      case 'hatch':
        return `<path ${base} fill="none" stroke="${el.backgroundColor}" stroke-width="${Math.max(1, el.strokeWidth * 0.6)}"/>`;
      case 'head':
        return `<path ${base} fill="${el.strokeColor}" stroke="${el.strokeColor}" stroke-width="${el.strokeWidth}"/>`;
      case 'freeFill':
        return `<path d="${op.d}" fill="${el.strokeColor}"/>`;
      default:
        return `<path ${base} fill="none" stroke="${el.strokeColor}" stroke-width="${el.strokeWidth}"/>`;
    }
  });
  return `<g transform="translate(${el.x} ${el.y})" opacity="${el.opacity / 100}">${parts.join('')}</g>`;
}

/** draw.biyik.dev: el çizimi akış şeması (dikdörtgen → eşkenar dörtgen → elips) ve kalem izi. */
export function drawBoardVisual() {
  const els = [
    element('rectangle', 26, 54, 104, 62, { backgroundColor: '#bfdbfe', fillStyle: 'hachure' }),
    element('diamond', 182, 30, 112, 110, { backgroundColor: '#fde68a', fillStyle: 'hachure' }),
    element('ellipse', 176, 206, 122, 72, { backgroundColor: '#bbf7d0', fillStyle: 'solid' }),
    arrow(134, 85, 178, 85),
    arrow(238, 144, 238, 202),
    arrow(172, 240, 84, 124),
  ];
  // Kalemle (basınçlı) atılmış bir imza: sol alt köşe
  const pts: Point[] = [];
  const pressures: number[] = [];
  for (let i = 0; i <= 60; i++) {
    const t = i / 60;
    pts.push([30 + t * 110, 250 + Math.sin(t * Math.PI * 3) * 12 - Math.cos(t * Math.PI * 9) * 5]);
    pressures.push(0.25 + 0.75 * Math.sin(t * Math.PI));
  }
  const pen = `<path d="${pressureOutline(pts, pressures, 5.5)}" fill="#dc2626"/>`;
  return svgData(frame(els.map(sketchSvg).join('') + pen));
}

/** Dokümantasyon / öğretmen: kılavuz çizgili kâğıt, fosforlu kalem, kalem yazısı, kırmızı halka, lazer. */
export function drawLessonVisual() {
  const guide: string[] = [];
  const s = 15;
  for (let y0 = 40; y0 < 300; y0 += s * 3 + 26) {
    guide.push(`<rect x="0" y="${y0 + s}" width="320" height="${s}" fill="rgba(59,130,246,0.07)"/>`);
    [0, 1, 2, 3].forEach((k) =>
      guide.push(
        `<line x1="0" y1="${y0 + k * s}" x2="320" y2="${y0 + k * s}" stroke="${k === 1 || k === 2 ? 'rgba(59,130,246,0.45)' : 'rgba(59,130,246,0.25)'}" stroke-width="${k === 1 || k === 2 ? 1.6 : 1.1}"/>`,
      ),
    );
  }
  guide.push(`<line x1="34" y1="0" x2="34" y2="320" stroke="rgba(239,68,68,0.45)" stroke-width="1.8"/>`);

  // El yazısı gibi döngülü kalem izi (basınçlı)
  const cursive = (x0: number, y: number, len: number, seed: number) => {
    const r = createRng(seed);
    const pts: Point[] = [];
    const pr: number[] = [];
    for (let i = 0; i <= 90; i++) {
      const t = i / 90;
      const a = t * Math.PI * 2 * (len / 26);
      pts.push([x0 + t * len + Math.cos(a) * 5, y - Math.abs(Math.sin(a)) * 13 + (r() - 0.5) * 1.2]);
      pr.push(0.35 + 0.6 * Math.abs(Math.cos(a / 2)));
    }
    return `<path d="${pressureOutline(pts, pr, 4.2)}" fill="${ink}"/>`;
  };
  // Fosforlu kalem: ikinci satır vurgusu
  const highlight = `<path d="M50 145 L196 145" stroke="#facc15" stroke-width="22" stroke-linecap="round" opacity="0.55"/>`;
  // Kırmızı halka (motorun elips titreşimiyle)
  const ring = `<path d="${smoothPath(
    sketchEllipsePoints(112, 44, 1, createRng(42)).map(([x, y]) => [x + 176, y + 47] as Point),
    false,
  )}" fill="none" stroke="#dc2626" stroke-width="3.2" stroke-linecap="round"/>`;
  // Lazer işaretçi izi: sönen kırmızı
  const laser: string[] = [];
  let prev: Point = [60, 262];
  for (let i = 1; i <= 24; i++) {
    const p: Point = [60 + i * 9, 262 - Math.sin(i / 3.6) * 22];
    const life = i / 24;
    laser.push(
      `<line x1="${prev[0]}" y1="${prev[1]}" x2="${p[0]}" y2="${p[1]}" stroke="rgba(239,68,68,${0.15 + life * 0.85})" stroke-width="${2 + life * 4}" stroke-linecap="round"/>`,
    );
    prev = p;
  }
  laser.push(`<circle cx="${prev[0]}" cy="${prev[1]}" r="7" fill="rgba(239,68,68,0.35)"/><circle cx="${prev[0]}" cy="${prev[1]}" r="3.5" fill="#fff"/>`);

  return svgData(
    frame(
      guide.join('') + highlight + cursive(50, 70, 120, 3) + cursive(186, 70, 96, 5) + cursive(50, 151, 140, 7) + ring + laser.join(''),
    ),
  );
}

/* ───────────── Biyik.dev sayfaları ───────────── */

/**
 * lucide ikonunu SVG işaretlemesine çevirir: ikonun çizim verisi (__iconNode) paketteki
 * dosyasından okunur. `name` lucide bileşen adı (ör. RadioTower).
 */
function iconMarkup(name: string, size: number, color: string, x: number, y: number) {
  const file = name.replace(/([a-z])([A-Z0-9])/g, '$1-$2').toLowerCase();
  const source = readFileSync(join(process.cwd(), 'node_modules/lucide-react/dist/esm/icons', `${file}.js`), 'utf8');
  const literal = source.slice(source.indexOf('const __iconNode = ') + 19, source.indexOf(';\nconst '));
  // Paketin kendi verisi (derleme anında, güvenilir kaynak)
  const nodes = new Function(`return ${literal}`)() as [string, Record<string, string>][];
  const children = nodes
    .map(([tag, attrs]) => {
      const a = Object.entries(attrs)
        .filter(([k]) => k !== 'key')
        .map(([k, v]) => `${k}="${v}"`)
        .join(' ');
      return `<${tag} ${a}/>`;
    })
    .join('');
  return `<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${children}</svg>`;
}

/** Web projesi: tarayıcı penceresi içinde projenin ikonu (`icon`: lucide adı). */
export function webProjectVisual(icon: string) {
  return svgData(
    frame(`
  <rect x="22" y="52" width="276" height="216" rx="18" fill="#fff" stroke="${line}" stroke-width="3"/>
  <path d="M22 70 a18 18 0 0 1 18 -18 h240 a18 18 0 0 1 18 18 v20 h-276 z" fill="#f6f4ef"/>
  <line x1="22" y1="90" x2="298" y2="90" stroke="${line}" stroke-width="3"/>
  <circle cx="44" cy="71" r="5.5" fill="#e3a598"/><circle cx="62" cy="71" r="5.5" fill="#e6cf95"/><circle cx="80" cy="71" r="5.5" fill="#a9cdb0"/>
  <rect x="104" y="62" width="168" height="18" rx="9" fill="#fff" stroke="${line}" stroke-width="2"/>
  <circle cx="160" cy="178" r="62" fill="${soft}"/>
  ${iconMarkup(icon, 72, accent, 124, 142)}
  <rect x="48" y="244" width="84" height="8" rx="4" fill="${soft}"/>
  <rect x="190" y="244" width="82" height="8" rx="4" fill="${soft}"/>`),
  );
}

/** Projeler: uygulama ikonlarından 2 × 2 ızgara. `icons` PNG data URI'leri. */
export function projectsGridVisual(icons: string[]) {
  const cells = icons.slice(0, 4).map((src, i) => {
    const x = 34 + (i % 2) * 136;
    const y = 34 + Math.floor(i / 2) * 136;
    // Uygulama ikonu gibi yuvarlak köşeler
    return `<clipPath id="c${i}"><rect x="${x}" y="${y}" width="116" height="116" rx="26"/></clipPath><image x="${x}" y="${y}" width="116" height="116" href="${src}" xlink:href="${src}" preserveAspectRatio="xMidYMid slice" clip-path="url(#c${i})"/>`;
  });
  return svgData(frame(`<defs></defs>${cells.join('')}`, '#f6f4ef'));
}

/** Araçlar: dört aracın küçük görselleri. `tiles` SVG data URI'leri. */
export function toolsGridVisual(tiles: string[]) {
  const cells = tiles.slice(0, 4).map((src, i) => {
    const x = 22 + (i % 2) * 144;
    const y = 22 + Math.floor(i / 2) * 144;
    return `<rect x="${x - 2}" y="${y - 2}" width="136" height="136" rx="22" fill="#fff" stroke="${line}" stroke-width="2"/><image x="${x}" y="${y}" width="132" height="132" href="${src}" xlink:href="${src}"/>`;
  });
  return svgData(frame(cells.join(''), '#f6f4ef'));
}

/** Hakkımda: portreli bir özgeçmiş kâğıdı. `portrait` PNG data URI. */
export function resumeVisual(portrait: string) {
  const rows = [148, 172, 196].map((y, i) => `<rect x="62" y="${y}" width="${[196, 168, 182][i]}" height="10" rx="5" fill="#ebe7de"/>`).join('');
  const timeline = [228, 252, 276]
    .map(
      (y, i) =>
        `<circle cx="70" cy="${y}" r="6" fill="${i === 0 ? accent : '#fff'}" stroke="${accent}" stroke-width="3"/><rect x="88" y="${y - 5}" width="${[150, 120, 136][i]}" height="10" rx="5" fill="${i === 0 ? soft : '#ebe7de'}"/>`,
    )
    .join('');
  return svgData(
    frame(`
  <rect x="40" y="22" width="240" height="282" rx="16" fill="#fff" stroke="${line}" stroke-width="3"/>
  <defs><clipPath id="p"><circle cx="102" cy="82" r="38"/></clipPath></defs>
  <circle cx="102" cy="82" r="41" fill="${soft}"/>
  <image x="64" y="44" width="76" height="76" href="${portrait}" xlink:href="${portrait}" clip-path="url(#p)" preserveAspectRatio="xMidYMid slice"/>
  <rect x="156" y="60" width="96" height="14" rx="7" fill="${ink}"/>
  <rect x="156" y="84" width="72" height="10" rx="5" fill="${accent}" opacity="0.7"/>
  <line x1="62" y1="132" x2="258" y2="132" stroke="${line}" stroke-width="2"/>
  ${rows}
  <line x1="70" y1="228" x2="70" y2="276" stroke="${accent}" stroke-width="2" opacity="0.4"/>
  ${timeline}`, '#f6f4ef'),
  );
}

/** İletişim: zarf ve mesaj balonu. */
export function contactVisual() {
  return svgData(
    frame(`
  <rect x="34" y="104" width="196" height="138" rx="16" fill="#fff" stroke="${accent}" stroke-width="7"/>
  <path d="M42 116 L132 184 L222 116" fill="none" stroke="${accent}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M176 52 h102 a18 18 0 0 1 18 18 v54 a18 18 0 0 1 -18 18 h-58 l-28 24 v-24 h-16 a18 18 0 0 1 -18 -18 v-54 a18 18 0 0 1 18 -18 z" fill="${ink}"/>
  <circle cx="200" cy="97" r="7" fill="#a9cdb0"/><circle cx="227" cy="97" r="7" fill="#a9cdb0"/><circle cx="254" cy="97" r="7" fill="#a9cdb0"/>
  <path d="M60 268 h120" stroke="${soft}" stroke-width="10" stroke-linecap="round"/>`),
  );
}
