// draw.biyik.dev dokümantasyonu için ekran görüntüleri üretir (TR ve EN).
// Kullanım: önce `npm run build && npx next start -p 3123`, sonra
//   PUPPETEER_CORE=/yol/puppeteer-core node scripts/draw-docs-screenshots.mjs
// Çıktı: public/draw-docs/{tr,en}-*.webp
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const puppeteer = require(process.env.PUPPETEER_CORE || 'puppeteer-core');
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public/draw-docs');
const URL = process.env.DRAW_URL || 'http://localhost:3123/draw';
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
mkdirSync(outDir, { recursive: true });

const LABELS = {
  tr: { start: 'Başla', ready: 'Hazır mı?', done: 'Bitti', fix: 'Düzelt', note: 'Fikirler buraya ✍️', yes: 'evet', no: 'hayır' },
  en: { start: 'Start', ready: 'Ready?', done: 'Done', fix: 'Fix it', note: 'Ideas go here ✍️', yes: 'yes', no: 'no' },
};

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function shoot(browser, lang) {
  const L = LABELS[lang];
  const p = await browser.newPage();
  await p.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1.5 });
  await p.evaluateOnNewDocument((l) => {
    localStorage.setItem('draw-lang', l);
    localStorage.setItem('theme', 'light');
  }, lang);
  await p.goto(URL, { waitUntil: 'networkidle0' });
  await wait(1200);
  const snap = (name) => p.screenshot({ path: join(outDir, `${lang}-${name}.webp`), type: 'webp', quality: 82 });
  const key = async (k) => {
    await p.keyboard.press(k);
    await wait(60);
  };
  const drag = async (x1, y1, x2, y2, { steps = 14, release = true } = {}) => {
    await p.mouse.move(x1, y1);
    await p.mouse.down();
    await p.mouse.move(x2, y2, { steps });
    if (release) await p.mouse.up();
    await wait(140);
  };
  const label = async (x, y, text) => {
    await p.mouse.click(x, y, { clickCount: 2 });
    await wait(200);
    await p.keyboard.type(text);
    await key('Escape');
  };
  const blank = async () => {
    await p.mouse.click(1240, 560);
    await wait(120);
  };

  await snap('welcome');

  // Şekiller
  await key('r');
  await drag(340, 190, 520, 290);
  await key('d');
  await drag(620, 160, 800, 320);
  await key('o');
  await drag(900, 190, 1080, 290);
  await key('u');
  await drag(630, 450, 790, 610);
  await label(430, 240, L.start);
  await label(710, 240, L.ready);
  await label(990, 240, L.done);
  await label(710, 560, L.fix);

  // Üçgene dolgu
  await p.mouse.click(631, 560);
  await wait(150);
  const swatches = await p.$$('.sk-panel .sk-swatch');
  if (swatches[8]) await swatches[8].click();
  await wait(150);
  await snap('style');

  // Metin düzenleme ekranı
  await blank();
  await p.mouse.click(430, 240, { clickCount: 2 });
  await wait(250);
  await snap('text');
  await key('Escape');

  // Oklar: bağlanırken (fare basılıyken) görüntü
  await key('a');
  await drag(430, 240, 700, 240, { steps: 18, release: false });
  await snap('bind');
  await p.mouse.up();
  await wait(120);
  await key('a');
  await drag(720, 240, 980, 240, { steps: 18 });
  await key('a');
  await drag(710, 250, 710, 540, { steps: 18 });
  await key('a');
  await drag(700, 560, 430, 250, { steps: 18 });

  // Not ve serbest çizim
  await key('t');
  await p.mouse.click(900, 470);
  await wait(200);
  await p.keyboard.type(L.note);
  await key('Escape');
  await key('p');
  await p.mouse.move(905, 505);
  await p.mouse.down();
  for (let i = 0; i <= 40; i++) await p.mouse.move(905 + i * 4.5, 505 + Math.sin(i / 2.2) * 4);
  await p.mouse.up();
  await key('v');
  await blank();
  await snap('flowchart');

  // Seçim
  await p.keyboard.down('Meta');
  await p.keyboard.press('a');
  await p.keyboard.up('Meta');
  await wait(150);
  await snap('select');
  await blank();

  // Katmanlar: başlık + bitiş şeklini grupla
  await p.mouse.click(341, 240);
  await p.keyboard.down('Shift');
  await p.mouse.click(1079, 240);
  await p.keyboard.up('Shift');
  await p.keyboard.down('Meta');
  await p.keyboard.press('g');
  await p.keyboard.up('Meta');
  await p.keyboard.down('Alt');
  await p.keyboard.press('KeyL');
  await p.keyboard.up('Alt');
  await wait(300);
  await snap('layers');
  await p.keyboard.down('Alt');
  await p.keyboard.press('KeyL');
  await p.keyboard.up('Alt');
  await blank();

  // Menü
  await p.click('.sk-top-left .sk-icon-btn');
  await wait(300);
  await snap('menu');
  await p.keyboard.press('Escape');
  await blank();

  // Dışa aktarma
  await p.keyboard.down('Meta');
  await p.keyboard.down('Shift');
  await p.keyboard.press('e');
  await p.keyboard.up('Shift');
  await p.keyboard.up('Meta');
  await wait(900);
  await snap('export');
  await p.keyboard.press('Escape');
  await wait(150);

  // Koyu tema
  await p.click('.sk-top-left .sk-icon-btn');
  await wait(250);
  for (const it of await p.$$('.sk-menu > button')) {
    const html = await it.evaluate((e) => e.innerHTML);
    if (html.includes('lucide-moon')) {
      await it.click();
      break;
    }
  }
  await wait(250);
  await blank();
  await snap('dark');
  await p.close();

  // Mobil (aynı tarayıcı profili: sahne kayıtlı)
  const m = await browser.newPage();
  await m.setViewport({ width: 390, height: 800, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  await m.evaluateOnNewDocument((l) => {
    localStorage.setItem('draw-lang', l);
    localStorage.setItem('theme', 'light');
  }, lang);
  await m.goto(URL, { waitUntil: 'networkidle0' });
  await wait(1200);
  await m.keyboard.down('Shift');
  await m.keyboard.press('Digit1');
  await m.keyboard.up('Shift');
  await wait(300);
  await m.screenshot({ path: join(outDir, `${lang}-mobile.webp`), type: 'webp', quality: 82 });
  await m.close();
}

for (const lang of ['tr', 'en']) {
  // Her dil temiz bir profille başlar
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
  await shoot(browser, lang);
  await browser.close();
  console.log('ok', lang);
}
