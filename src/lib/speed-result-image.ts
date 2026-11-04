import type { SpeedResult } from './network-tools';

export type SpeedDisplayUnit = 'Mbps' | 'MB/s';

const format = (value: number) =>
  value.toLocaleString('tr-TR', { maximumFractionDigits: 2 });

export function speedResultFileName(result: SpeedResult) {
  const date = new Date(result.timestamp);
  const two = (value: number) => String(value).padStart(2, '0');
  return `biyik-dev_hiz-testi_${date.getFullYear()}-${two(date.getMonth() + 1)}-${two(date.getDate())}_${two(date.getHours())}-${two(date.getMinutes())}.png`;
}

/** biyik.dev UI palette, mirrored from src/styles/tokens.css. */
const color = {
  paper: '#f6f4ef',
  dots: '#dcd7cb',
  surface: '#fbfaf7',
  white: '#ffffff',
  line: '#e3dfd5',
  ink: '#1e2227',
  muted: '#5f6368',
  subtle: '#6f7277',
  accent: '#33625c',
  accentSoft: '#e2ebe8',
  accentLine: '#c6d8d3',
  dot1: '#e3a598',
  dot2: '#e6cf95',
  dot3: '#a9cdb0',
};

/** Reads the page's next/font family names so the card matches the site; falls back outside the browser. */
function fontFamilies() {
  const fallback = { sans: 'Inter, "Helvetica Neue", Arial, sans-serif', mono: 'ui-monospace, Menlo, Consolas, monospace' };
  if (typeof getComputedStyle !== 'function' || !document.documentElement) return fallback;
  const styles = getComputedStyle(document.documentElement);
  const sans = styles.getPropertyValue('--font-inter').trim();
  const mono = styles.getPropertyValue('--font-jetbrains').trim();
  return {
    sans: sans ? `${sans}, ${fallback.sans}` : fallback.sans,
    mono: mono ? `${mono}, ${fallback.mono}` : fallback.mono,
  };
}

/** Draw a self-contained share card; no network request or private IP is needed. */
export async function createSpeedResultImage(
  result: SpeedResult,
  unit: SpeedDisplayUnit,
): Promise<Blob> {
  const W = 1200;
  const H = 900;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Görsel bu tarayıcıda oluşturulamadı.');

  const fonts = fontFamilies();
  if (typeof document.fonts?.load === 'function') {
    await Promise.all([
      document.fonts.load(`600 40px ${fonts.sans}`),
      document.fonts.load(`500 40px ${fonts.mono}`),
    ]).catch(() => undefined);
  }

  const path = (x: number, y: number, w: number, h: number, r: number) => {
    context.beginPath();
    if (typeof context.roundRect === 'function') {
      context.roundRect(x, y, w, h, r);
    } else {
      context.moveTo(x + r, y);
      context.lineTo(x + w - r, y);
      context.quadraticCurveTo(x + w, y, x + w, y + r);
      context.lineTo(x + w, y + h - r);
      context.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      context.lineTo(x + r, y + h);
      context.quadraticCurveTo(x, y + h, x, y + h - r);
      context.lineTo(x, y + r);
      context.quadraticCurveTo(x, y, x + r, y);
      context.closePath();
    }
  };
  const box = (x: number, y: number, w: number, h: number, r: number, fill: string, stroke?: string) => {
    path(x, y, w, h, r);
    context.fillStyle = fill;
    context.fill();
    if (stroke) {
      context.strokeStyle = stroke;
      context.lineWidth = 2;
      context.stroke();
    }
  };
  const circle = (x: number, y: number, r: number, fill: string) => {
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2);
    context.fillStyle = fill;
    context.fill();
  };
  const line = (x1: number, y1: number, x2: number, y2: number) => {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.strokeStyle = color.line;
    context.lineWidth = 2;
    context.stroke();
  };
  const text = (
    value: string,
    x: number,
    y: number,
    size: number,
    fill: string,
    { weight = 400, mono = false, align = 'left', maxWidth }: {
      weight?: number;
      mono?: boolean;
      align?: CanvasTextAlign;
      maxWidth?: number;
    } = {},
  ) => {
    context.font = `${weight} ${size}px ${mono ? fonts.mono : fonts.sans}`;
    context.fillStyle = fill;
    context.textAlign = align;
    if (maxWidth) context.fillText(value, x, y, maxWidth);
    else context.fillText(value, x, y);
    return typeof context.measureText === 'function'
      ? Math.min(context.measureText(value).width, maxWidth ?? Infinity)
      : value.length * size * 0.6;
  };

  // Paper with the site's dot grid.
  context.fillStyle = color.paper;
  context.fillRect(0, 0, W, H);
  for (let y = 12; y < H; y += 24) for (let x = 12; x < W; x += 24) circle(x, y, 1.3, color.dots);

  // Browser window.
  const win = { x: 56, y: 52, w: W - 112, h: H - 104 };
  box(win.x, win.y, win.w, win.h, 26, color.white, color.line);
  context.save?.();
  path(win.x, win.y, win.w, 68, 26);
  context.clip?.();
  context.fillStyle = color.surface;
  context.fillRect(win.x, win.y, win.w, 68);
  context.restore?.();
  line(win.x, win.y + 68, win.x + win.w, win.y + 68);
  [color.dot1, color.dot2, color.dot3].forEach((fill, i) => circle(win.x + 36 + i * 24, win.y + 34, 7, fill));
  box(W / 2 - 250, win.y + 16, 500, 36, 18, color.paper, color.line);
  text('biyik.dev/araclar/internet-hiz-testi', W / 2, win.y + 40, 17, color.muted, { mono: true, align: 'center' });
  text('200 OK', win.x + win.w - 32, win.y + 40, 16, color.subtle, { mono: true, align: 'right' });

  // Heading.
  const left = win.x + 64;
  const right = win.x + win.w - 64;
  const slashes = text('//', left, 196, 20, color.accentLine, { mono: true });
  text('internet hız testi', left + slashes + 10, 196, 20, color.accent, { mono: true, weight: 500 });
  text('Bağlantı ölçümüm', left, 258, 54, color.ink, { weight: 600 });
  const date = new Date(result.timestamp).toLocaleString('tr-TR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  text(date, left, 300, 19, color.subtle, { mono: true });
  box(right - 128, 214, 128, 40, 9, color.accentSoft, color.accentLine);
  text(unit, right - 64, 241, 19, color.accent, { mono: true, weight: 500, align: 'center' });

  // 2 × 2 metric grid with hairlines, like the site's stats strip.
  const top = 350;
  const rowH = 158;
  const mid = W / 2;
  line(left, top, right, top);
  line(left, top + rowH, right, top + rowH);
  line(left, top + rowH * 2, right, top + rowH * 2);
  line(mid, top, mid, top + rowH * 2);
  const metrics = [
    { arrow: '↓', title: 'İNDİRME', value: format(unit === 'Mbps' ? result.download : result.download / 8), unit, accent: true },
    { arrow: '↑', title: 'YÜKLEME', value: format(unit === 'Mbps' ? result.upload : result.upload / 8), unit },
    { arrow: '↔', title: 'GECİKME · HTTP', value: format(result.latency), unit: 'ms' },
    { arrow: '≈', title: 'JITTER', value: format(result.jitter), unit: 'ms' },
  ];
  metrics.forEach((metric, index) => {
    const x = index % 2 === 0 ? left : mid + 40;
    const y = top + Math.floor(index / 2) * rowH;
    const arrow = text(metric.arrow, x, y + 44, 18, color.accent, { mono: true, weight: 500 });
    text(metric.title, x + arrow + 10, y + 44, 16, color.subtle, { mono: true, weight: 500 });
    const width = text(metric.value, x, y + 124, 64, metric.accent ? color.accent : color.ink, {
      mono: true,
      weight: 500,
      maxWidth: 330,
    });
    text(metric.unit, x + width + 14, y + 124, 22, color.subtle, { mono: true });
  });

  // Signature and status bar.
  const foot = win.y + win.h - 92;
  line(win.x, foot, win.x + win.w, foot);
  box(left, foot + 24, 44, 44, 11, color.ink);
  const b = text('b', left + 10, foot + 53, 20, color.paper, { mono: true, weight: 500 });
  text('/', left + 10 + b, foot + 53, 20, color.dot3, { mono: true, weight: 500 });
  text('biyik.dev', left + 60, foot + 44, 22, color.ink, { weight: 600 });
  text('Ücretsiz internet hız testi', left + 60, foot + 68, 15, color.subtle);
  const status = text(result.server ? `Hazır · Cloudflare ${result.server}` : 'Hazır · Cloudflare ağı üzerinden ölçüldü', right, foot + 51, 16, color.muted, {
    mono: true,
    align: 'right',
  });
  box(right - status - 22, foot + 40, 10, 10, 2, color.accent);

  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (blob) =>
        blob
          ? resolve(blob)
          : reject(new Error('Sonuç görseli oluşturulamadı.')),
      'image/png',
    ),
  );
}
