// Çizim tahtasının el yazısı fontlarını public/draw-assets altına kopyalar.
// Fontlar CDN yerine kendi alan adımızdan yüklenir (CSP: font-src 'self').
import { cpSync, existsSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'node_modules/@excalidraw/excalidraw/dist/prod/fonts');
const dest = join(root, 'public/draw-assets/fonts');

if (!existsSync(src)) {
  console.error('copy-draw-assets: font klasörü bulunamadı:', src);
  process.exit(1);
}

rmSync(dest, { recursive: true, force: true });
cpSync(src, dest, { recursive: true });
console.log('copy-draw-assets: fontlar kopyalandı →', dest);
