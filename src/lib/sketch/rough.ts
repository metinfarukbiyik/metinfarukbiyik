/**
 * El çizimi görünümü üreten geometri. Çıktılar SVG yol (path `d`) metinleridir; aynı metin hem
 * tuvalde (Path2D) hem SVG dışa aktarımında kullanılır.
 *
 * Yaklaşım: her doğru, uçları hafifçe kaydırılmış ve ortası hafifçe bükülmüş kübik bir Bézier
 * eğrisi olarak çizilir. "Doğal" ve "serbest" düzeylerde her çizgi iki kez, farklı titreşimle
 * geçilir; kalemle iki kez üzerinden gidilmiş gibi görünür.
 */
import type { Point } from './types';
import type { Rng } from './random';

const n = (v: number) => Math.round(v * 100) / 100;
const jitter = (r: Rng, amount: number) => (r() * 2 - 1) * amount;

export function polylinePath(points: Point[], closed = false): string {
  if (!points.length) return '';
  let d = `M${n(points[0][0])} ${n(points[0][1])}`;
  for (let i = 1; i < points.length; i++) d += `L${n(points[i][0])} ${n(points[i][1])}`;
  return closed ? `${d}Z` : d;
}

/** Tek bir el çizimi doğru parçası. */
export function sketchSegment(a: Point, b: Point, roughness: number, r: Rng): string {
  const [x1, y1] = a;
  const [x2, y2] = b;
  const len = Math.hypot(x2 - x1, y2 - y1);
  if (roughness <= 0 || len < 1) return `M${n(x1)} ${n(y1)}L${n(x2)} ${n(y2)}`;

  const nx = -(y2 - y1) / len;
  const ny = (x2 - x1) / len;
  // Uçlardaki kayma ve ortadaki bükülme uzunlukla büyür ama sınırlıdır
  const endShift = roughness * Math.min(1.5, 0.35 + len / 140);
  const bow = jitter(r, roughness * Math.min(len * 0.012, 3));
  const wobble = roughness * Math.min(1.1, 0.25 + len / 260);

  const sx = x1 + jitter(r, endShift);
  const sy = y1 + jitter(r, endShift);
  const ex = x2 + jitter(r, endShift);
  const ey = y2 + jitter(r, endShift);
  const control = (t: number): Point => [
    x1 + (x2 - x1) * t + nx * bow + jitter(r, wobble),
    y1 + (y2 - y1) * t + ny * bow + jitter(r, wobble),
  ];
  const [c1x, c1y] = control(0.3 + jitter(r, 0.06));
  const [c2x, c2y] = control(0.7 + jitter(r, 0.06));
  return `M${n(sx)} ${n(sy)}C${n(c1x)} ${n(c1y)} ${n(c2x)} ${n(c2y)} ${n(ex)} ${n(ey)}`;
}

export function sketchLine(a: Point, b: Point, roughness: number, r: Rng, double: boolean): string {
  const first = sketchSegment(a, b, roughness, r);
  return double && roughness > 0 ? first + sketchSegment(a, b, roughness * 0.75, r) : first;
}

/** Noktalardan geçen yumuşak eğri (Catmull-Rom → kübik Bézier). */
export function smoothPath(points: Point[], closed: boolean): string {
  const count = points.length;
  if (count < 3) return polylinePath(points, closed);
  const at = (i: number): Point =>
    closed ? points[(i + count) % count] : points[Math.max(0, Math.min(count - 1, i))];
  let d = `M${n(points[0][0])} ${n(points[0][1])}`;
  const last = closed ? count : count - 1;
  for (let i = 0; i < last; i++) {
    const p0 = at(i - 1);
    const p1 = at(i);
    const p2 = at(i + 1);
    const p3 = at(i + 2);
    const c1: Point = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Point = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${n(c1[0])} ${n(c1[1])} ${n(c2[0])} ${n(c2[1])} ${n(p2[0])} ${n(p2[1])}`;
  }
  return closed ? `${d}Z` : d;
}

/** Noktaları titreştirip yumuşak eğriyle birleştirir. */
export function sketchCurve(points: Point[], closed: boolean, roughness: number, r: Rng): string {
  if (roughness <= 0) return smoothPath(points, closed);
  const amount = roughness * 1.1;
  return smoothPath(
    points.map(([x, y]) => [x + jitter(r, amount), y + jitter(r, amount)] as Point),
    closed,
  );
}

/**
 * Elips çevresinde, başlangıcı rastgele ve ucu biraz taşan (kalemin kapanırken üst üste
 * binmesi gibi) noktalar.
 */
export function sketchEllipsePoints(w: number, h: number, roughness: number, r: Rng): Point[] {
  const cx = w / 2;
  const cy = h / 2;
  const rx = w / 2;
  const ry = h / 2;
  const steps = Math.max(12, Math.min(40, Math.round((w + h) / 16)));
  const start = r() * Math.PI * 2;
  const overlap = 0.25 + r() * 0.35;
  const end = start + Math.PI * 2 + overlap;
  const step = (Math.PI * 2) / steps;
  const wobble = roughness * Math.min(0.03, 4 / Math.max(rx, ry, 1));
  const shiftX = jitter(r, roughness * 0.8);
  const shiftY = jitter(r, roughness * 0.8);
  const pts: Point[] = [];
  for (let a = start; a <= end + 1e-6; a += step) {
    const k = 1 + jitter(r, wobble);
    pts.push([cx + shiftX + Math.cos(a) * rx * k, cy + shiftY + Math.sin(a) * ry * k]);
  }
  return pts;
}

export function ellipsePath(w: number, h: number): string {
  const rx = w / 2;
  const ry = h / 2;
  return `M0 ${n(ry)}A${n(rx)} ${n(ry)} 0 1 0 ${n(w)} ${n(ry)}A${n(rx)} ${n(ry)} 0 1 0 0 ${n(ry)}Z`;
}

export function ellipseOutline(w: number, h: number, steps = 48): Point[] {
  const pts: Point[] = [];
  for (let i = 0; i < steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    pts.push([w / 2 + (Math.cos(a) * w) / 2, h / 2 + (Math.sin(a) * h) / 2]);
  }
  return pts;
}

/** Köşeleri yuvarlatılmış çokgenin köşe yarıçapı, kenar uzunluğuna göre sınırlanır. */
function cornerRadius(corners: Point[], radius: number): number {
  let shortest = Infinity;
  for (let i = 0; i < corners.length; i++) {
    const a = corners[i];
    const b = corners[(i + 1) % corners.length];
    shortest = Math.min(shortest, Math.hypot(b[0] - a[0], b[1] - a[1]));
  }
  return Math.min(radius, shortest / 2.5);
}

function cornerPoints(corners: Point[], i: number, rad: number): [Point, Point, Point] {
  const count = corners.length;
  const c = corners[i];
  const prev = corners[(i - 1 + count) % count];
  const next = corners[(i + 1) % count];
  const lin = Math.hypot(c[0] - prev[0], c[1] - prev[1]) || 1;
  const lout = Math.hypot(next[0] - c[0], next[1] - c[1]) || 1;
  const pin: Point = [c[0] - ((c[0] - prev[0]) / lin) * rad, c[1] - ((c[1] - prev[1]) / lin) * rad];
  const pout: Point = [c[0] + ((next[0] - c[0]) / lout) * rad, c[1] + ((next[1] - c[1]) / lout) * rad];
  return [pin, c, pout];
}

/** Yuvarlak köşeli çokgenin kesin (titreşimsiz) yolu. */
export function roundedPolygonPath(corners: Point[], radius: number): string {
  const rad = cornerRadius(corners, radius);
  const parts = corners.map((_, i) => cornerPoints(corners, i, rad));
  const [, , firstOut] = parts[0];
  let d = `M${n(firstOut[0])} ${n(firstOut[1])}`;
  for (let k = 1; k <= parts.length; k++) {
    const [pin, c, pout] = parts[k % parts.length];
    d += `L${n(pin[0])} ${n(pin[1])}Q${n(c[0])} ${n(c[1])} ${n(pout[0])} ${n(pout[1])}`;
  }
  return `${d}Z`;
}

/** Yuvarlak köşeli çokgenin çevresinden örneklenmiş noktalar (dolgu ve isabet testi için). */
export function roundedPolygonOutline(corners: Point[], radius: number, samples = 5): Point[] {
  const rad = cornerRadius(corners, radius);
  const out: Point[] = [];
  corners.forEach((_, i) => {
    const [pin, c, pout] = cornerPoints(corners, i, rad);
    for (let s = 0; s <= samples; s++) {
      const t = s / samples;
      const u = 1 - t;
      out.push([
        u * u * pin[0] + 2 * u * t * c[0] + t * t * pout[0],
        u * u * pin[1] + 2 * u * t * c[1] + t * t * pout[1],
      ]);
    }
  });
  return out;
}

/** Yuvarlak köşeli çokgenin el çizimi kenarları: düz kenarlar doğru, köşeler kısa eğri. */
export function sketchRoundedPolygon(corners: Point[], radius: number, roughness: number, r: Rng): string {
  const rad = cornerRadius(corners, radius);
  const parts = corners.map((_, i) => cornerPoints(corners, i, rad));
  let d = '';
  for (let i = 0; i < parts.length; i++) {
    const [, c, pout] = parts[i];
    const [nextIn] = parts[(i + 1) % parts.length];
    d += sketchSegment(pout, nextIn, roughness, r);
    const [pin] = parts[i];
    const j = roughness * 0.6;
    d += `M${n(pin[0] + jitter(r, j))} ${n(pin[1] + jitter(r, j))}Q${n(c[0] + jitter(r, j))} ${n(
      c[1] + jitter(r, j),
    )} ${n(pout[0] + jitter(r, j))} ${n(pout[1] + jitter(r, j))}`;
  }
  return d;
}

/**
 * Tarama (hachure) dolgusu: çokgeni verilen açıyla döndürüp yatay tarama çizgileriyle keser,
 * kesişim çiftlerini doğru parçası yapar ve geri döndürür.
 */
export function hatchSegments(polygon: Point[], gap: number, angleDeg: number): [Point, Point][] {
  if (polygon.length < 3 || gap <= 0) return [];
  const a = (angleDeg * Math.PI) / 180;
  const cos = Math.cos(a);
  const sin = Math.sin(a);
  // Döndür (−a)
  const pts = polygon.map(([x, y]) => [x * cos + y * sin, -x * sin + y * cos] as Point);
  let minY = Infinity;
  let maxY = -Infinity;
  for (const [, y] of pts) {
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }
  const segments: [Point, Point][] = [];
  const back = ([x, y]: Point): Point => [x * cos - y * sin, x * sin + y * cos];
  for (let y = minY + gap / 2; y < maxY; y += gap) {
    const xs: number[] = [];
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      const q = pts[(i + 1) % pts.length];
      if ((p[1] <= y && q[1] > y) || (q[1] <= y && p[1] > y)) {
        xs.push(p[0] + ((y - p[1]) / (q[1] - p[1])) * (q[0] - p[0]));
      }
    }
    xs.sort((m, k) => m - k);
    for (let i = 0; i + 1 < xs.length; i += 2) {
      if (xs[i + 1] - xs[i] < 1) continue;
      segments.push([back([xs[i], y]), back([xs[i + 1], y])]);
    }
  }
  return segments;
}

/** Serbest çizim izini yumuşatır (ardışık noktaların orta noktalarından geçen eğri). */
export function freehandPath(points: Point[]): string {
  if (!points.length) return '';
  if (points.length < 3) {
    const [a] = points;
    const b = points[points.length - 1];
    // Tek noktalık dokunuş da görünsün diye çok kısa bir çizgi
    return `M${n(a[0])} ${n(a[1])}L${n(b[0] + 0.01)} ${n(b[1] + 0.01)}`;
  }
  let d = `M${n(points[0][0])} ${n(points[0][1])}`;
  for (let i = 1; i < points.length - 1; i++) {
    const [x, y] = points[i];
    const [nx2, ny2] = points[i + 1];
    d += `Q${n(x)} ${n(y)} ${n((x + nx2) / 2)} ${n((y + ny2) / 2)}`;
  }
  const lastPt = points[points.length - 1];
  return `${d}L${n(lastPt[0])} ${n(lastPt[1])}`;
}
