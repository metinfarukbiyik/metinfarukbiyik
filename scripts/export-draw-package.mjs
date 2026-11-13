// Çizim motorunu ve arayüzünü açık kaynak paket deposuna (biyik-draw) aktarır.
// Site kaynağı tek doğruluk kaynağıdır; paket deposu buradan beslenir.
//
//   node scripts/export-draw-package.mjs ../biyik-draw
//
// Kopyalananlar: src/lib/sketch → src/sketch, src/lib/sketch-react → src/sketch-react,
// public/draw-docs → docs/images
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const target = resolve(process.argv[2] ?? join(root, '..', 'biyik-draw'));
if (!existsSync(join(target, 'package.json'))) {
  console.error(`export-draw-package: ${target} bir paket deposu değil (package.json yok)`);
  process.exit(1);
}

const pairs = [
  ['src/lib/sketch', 'src/sketch'],
  ['src/lib/sketch-react', 'src/sketch-react'],
];
for (const [from, to] of pairs) {
  rmSync(join(target, to), { recursive: true, force: true });
  cpSync(join(root, from), join(target, to), { recursive: true });
}

const images = join(target, 'docs/images');
rmSync(images, { recursive: true, force: true });
mkdirSync(images, { recursive: true });
for (const file of readdirSync(join(root, 'public/draw-docs'))) {
  cpSync(join(root, 'public/draw-docs', file), join(images, file));
}
console.log('export-draw-package: aktarıldı →', target);
