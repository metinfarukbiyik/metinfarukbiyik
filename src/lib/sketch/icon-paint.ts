/**
 * İkon kütüphanesinden eklenen SVG görsellerin yeniden renklendirilmesi.
 *
 * İkonun ilk (orijinal) SVG'si `icon.base` dosyasında saklanır. Renk her değiştiğinde
 * orijinalden tek geçişte yeniden boyanır: ana renk (`primary`) ve simge rengi
 * (`secondary`) aynı anda değiştirilir, böylece art arda boyamalar birbirine karışmaz.
 */
import type { Files, IconPaint, SketchElement } from './types';

const PREFIX = 'data:image/svg+xml;charset=utf-8,';

const norm = (c: string) => c.trim().toLowerCase();

/** Öğenin kullandığı tüm görsel dosyaları (kayıt, pano ve paylaşım için). */
export function fileIdsOf(el: SketchElement): string[] {
  const ids: string[] = [];
  if (el.fileId) ids.push(el.fileId);
  if (el.icon?.base && el.icon.base !== el.fileId) ids.push(el.icon.base);
  return ids;
}

/** Verilen öğelerin dosyalarını sahne dosyalarından seçer. */
export function pickFiles(els: SketchElement[], files: Files): Files {
  const out: Files = {};
  for (const el of els) for (const id of fileIdsOf(el)) if (files[id]) out[id] = files[id];
  return out;
}

function hash(text: string) {
  let h = 5381;
  for (let i = 0; i < text.length; i++) h = ((h << 5) + h + text.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36);
}

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Orijinal SVG'yi yeni renklerle boyar; değişiklik yoksa orijinal adres döner. */
export function paintIcon(baseUrl: string, paint: IconPaint): string {
  if (!baseUrl.startsWith(PREFIX)) return baseUrl;
  const swaps = new Map<string, string>();
  if (paint.primary && paint.color && norm(paint.color) !== norm(paint.primary)) swaps.set(norm(paint.primary), paint.color);
  if (paint.secondary && paint.fg && norm(paint.fg) !== norm(paint.secondary)) swaps.set(norm(paint.secondary), paint.fg);
  if (!swaps.size) return baseUrl;
  const markup = decodeURIComponent(baseUrl.slice(PREFIX.length));
  // Yalnızca öznitelik değeri olarak geçen renkler: "#FFF" ile "#FFFFFF" birbirine karışmaz
  const re = new RegExp(`"(${[...swaps.keys()].map(escapeRe).join('|')})"`, 'gi');
  const painted = markup.replace(re, (_m, c: string) => `"${swaps.get(norm(c))}"`);
  return PREFIX + encodeURIComponent(painted);
}

/** Boyanmış ikonun dosya kimliği: aynı renkler aynı dosyayı paylaşır. */
export const paintedFileId = (paint: IconPaint, url: string) => `${paint.base}-${hash(url)}`;
