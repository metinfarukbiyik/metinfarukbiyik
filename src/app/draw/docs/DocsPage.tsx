import type { ReactNode } from 'react';
import { DRAW_REPO, DRAW_VERSION } from '../about';
import './docs.css';

export type DocsLang = 'tr' | 'en';

const APP_URL = 'https://draw.biyik.dev';
const img = (lang: DocsLang, name: string) => `/draw-docs/${lang}-${name}.webp`;

function Shot({ lang, name, alt, narrow }: { lang: DocsLang; name: string; alt: string; narrow?: boolean }) {
  return (
    <figure className={`dx-shot${narrow ? ' is-narrow' : ''}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img(lang, name)} alt={alt} loading="lazy" />
    </figure>
  );
}

function Code({ children, lang }: { children: string; lang?: string }) {
  return (
    <pre className="dx-code" data-lang={lang}>
      <code>{children}</code>
    </pre>
  );
}

function Step({ id, n, title, children }: { id: string; n: number | string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="dx-step">
      <h2>
        <span className="dx-step-n">{n}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

const K = ({ children }: { children: ReactNode }) => <kbd className="dx-kbd">{children}</kbd>;

const INSTALL = `npm install github:metinfarukbiyik/biyik-draw
# peer dependencies
npm install react react-dom lucide-react`;

const USAGE = `import { Draw } from 'biyik-draw/react';
import 'biyik-draw/styles.css';

export default function Whiteboard() {
  return (
    // The board fills its positioned parent
    <div style={{ position: 'relative', height: 640 }}>
      <Draw lang="en" storageKey="my-board" />
    </div>
  );
}`;

const NEXT = `'use client';
import dynamic from 'next/dynamic';

// Canvas and IndexedDB are browser-only: skip SSR
const Whiteboard = dynamic(() => import('./Whiteboard'), { ssr: false });`;

const ENGINE = `import { Editor, exportToSvg } from 'biyik-draw';

const editor = new Editor();
editor.load(JSON.parse(fileText)); // a .biyikdraw file

const svg = exportToSvg(editor.elements, editor.files, {
  background: '#ffffff',
  theme: 'light',
  scale: 1,
});`;

const FONT = `<!-- Handwriting font (Caveat) — or: npm i @fontsource/caveat -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap" />`;

const T = {
  tr: {
    title: 'Dokümantasyon',
    lead: 'draw.biyik.dev, tarayıcıda çalışan ve el çizimi görünümü veren bir beyaz tahtadır. Bu kısa eğitimde adım adım bir akış şeması çiziyor, sonra tahtayı kendi projene nasıl ekleyeceğini gösteriyoruz.',
    open: 'Tahtayı aç',
    toc: 'İçindekiler',
    other: 'English',
    otherHref: '/docs/en',
    s: {
      start: 'Başlarken',
      shapes: 'Şekil çiz',
      text: 'Metin ve etiketler',
      arrows: 'Oklar ve bağlama',
      select: 'Seç, taşı, döndür',
      layers: 'Katmanlar ve gruplar',
      files: 'Menü ve dosyalar',
      export: 'Dışa aktarma',
      share: 'Paylaş ve çevrimdışı',
      teach: 'Öğretmenler ve tablet için',
      theme: 'Koyu tema ve mobil',
      keys: 'Kısayollar',
      dev: 'Kendi projene ekle',
      license: 'Gizlilik ve lisans',
    },
  },
  en: {
    title: 'Documentation',
    lead: 'draw.biyik.dev is a whiteboard with a hand-drawn look that runs in your browser. In this short tutorial we draw a flowchart step by step, then show how to add the board to your own project.',
    open: 'Open the board',
    toc: 'Contents',
    other: 'Türkçe',
    otherHref: '/docs',
    s: {
      start: 'Getting started',
      shapes: 'Draw shapes',
      text: 'Text and labels',
      arrows: 'Arrows and binding',
      select: 'Select, move, rotate',
      layers: 'Layers and groups',
      files: 'Menu and files',
      export: 'Export',
      share: 'Share and offline',
      teach: 'For teachers and tablets',
      theme: 'Dark theme and mobile',
      keys: 'Shortcuts',
      dev: 'Add it to your project',
      license: 'Privacy and license',
    },
  },
} as const;

export default function DocsPage({ lang }: { lang: DocsLang }) {
  const t = T[lang];
  const tr = lang === 'tr';
  const ids = Object.keys(t.s) as (keyof typeof t.s)[];

  return (
    <div className="dx">
      <header className="dx-header">
        <a className="dx-brand" href={APP_URL}>
          <svg viewBox="0 0 32 32" width="26" height="26" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="2.5" y="2.5" width="27" height="27" rx="8" strokeWidth="1.6" />
            <path d="M9 21.5c2.2-.3 3.4-1.2 4.6-2.5l7.6-7.7a1.9 1.9 0 0 0-2.7-2.7l-7.7 7.6c-1.2 1.2-2.1 2.4-2.5 4.6" strokeWidth="1.7" />
            <path d="M8 25.2c3.4-1 6.5-.6 9 .2s5 1 7-.6" strokeWidth="1.5" />
          </svg>
          <span>
            draw<span className="dx-brand-domain">.biyik.dev</span>
          </span>
          <span className="dx-badge">{t.title}</span>
        </a>
        <nav className="dx-header-nav">
          <a className="dx-link" href={t.otherHref} hrefLang={tr ? 'en' : 'tr'}>
            {t.other}
          </a>
          <a className="dx-link" href={DRAW_REPO}>
            GitHub
          </a>
          <a className="dx-btn" href={APP_URL}>
            {t.open} →
          </a>
        </nav>
      </header>

      <div className="dx-layout">
        <aside className="dx-toc" aria-label={t.toc}>
          <p className="dx-toc-title">{t.toc}</p>
          <ol>
            {ids.map((id) => (
              <li key={id}>
                <a href={`#${id}`}>{t.s[id]}</a>
              </li>
            ))}
          </ol>
        </aside>

        <main className="dx-main">
          <div className="dx-hero">
            <p className="dx-kicker">v{DRAW_VERSION} · MIT</p>
            <h1>{tr ? 'draw.biyik.dev nasıl kullanılır?' : 'How to use draw.biyik.dev'}</h1>
            <p className="dx-lead">{t.lead}</p>
            <Shot lang={lang} name="flowchart" alt={tr ? 'Eğitimin sonunda çizilen akış şeması' : 'The flowchart drawn in this tutorial'} />
          </div>

          <Step id="start" n={1} title={t.s.start}>
            {tr ? (
              <p>
                <a href={APP_URL}>draw.biyik.dev</a> adresini aç. Hesap ya da kurulum gerekmez. Tuval boşken karşılama
                ekranı görünür: buradan kayıtlı bir dosyayı açabilir, kısayolları görebilir ya da doğrudan çizmeye
                başlayabilirsin. Çizimlerin otomatik olarak <strong>yalnızca bu tarayıcıya</strong> kaydedilir.
              </p>
            ) : (
              <p>
                Open <a href={APP_URL}>draw.biyik.dev</a>. No account or install is needed. While the canvas is empty you
                see the welcome screen: open a saved file, check the shortcuts, or just start drawing. Your work is saved
                automatically, <strong>only in this browser</strong>.
              </p>
            )}
            <Shot lang={lang} name="welcome" alt={tr ? 'Karşılama ekranı' : 'Welcome screen'} />
          </Step>

          <Step id="shapes" n={2} title={t.s.shapes}>
            {tr ? (
              <>
                <p>Üstteki araç çubuğundan bir şekil seç ve tuvalde sürükle. Her aracın bir kısayolu vardır:</p>
                <ul>
                  <li>
                    <K>R</K> dikdörtgen, <K>D</K> eşkenar dörtgen, <K>U</K> üçgen, <K>O</K> elips
                  </li>
                  <li>
                    <K>A</K> ok, <K>L</K> çizgi, <K>P</K> kalem, <K>T</K> metin, <K>E</K> silgi
                  </li>
                  <li>
                    Çizerken <K>Shift</K> kare/daire yapar, <K>Alt</K> merkezden çizer. Araçtaki kilit (<K>Q</K>) açıksa
                    araç her çizimden sonra seçime dönmez.
                  </li>
                </ul>
                <p>
                  Bir şekil seçiliyken soldaki <strong>stil panelinden</strong> kontur ve arka plan rengini, dolgu tipini
                  (tarama, çapraz, tam), kalınlığı, çizgi stilini, el izi düzeyini ve köşeleri değiştirebilirsin.
                </p>
              </>
            ) : (
              <>
                <p>Pick a shape in the toolbar at the top and drag on the canvas. Every tool has a shortcut:</p>
                <ul>
                  <li>
                    <K>R</K> rectangle, <K>D</K> diamond, <K>U</K> triangle, <K>O</K> ellipse
                  </li>
                  <li>
                    <K>A</K> arrow, <K>L</K> line, <K>P</K> pen, <K>T</K> text, <K>E</K> eraser
                  </li>
                  <li>
                    Hold <K>Shift</K> for a square/circle and <K>Alt</K> to draw from the center. With the tool lock (
                    <K>Q</K>) on, the tool stays active after each shape.
                  </li>
                </ul>
                <p>
                  With a shape selected, the <strong>style panel</strong> on the left changes stroke and background
                  colors, fill (hachure, cross-hatch, solid), stroke width, stroke style, sloppiness and edges.
                </p>
              </>
            )}
            <Shot lang={lang} name="style" alt={tr ? 'Stil paneli ve seçili üçgen' : 'Style panel with a selected triangle'} />
          </Step>

          <Step id="text" n={3} title={t.s.text}>
            {tr ? (
              <p>
                Bir şeklin içine <strong>çift tıkla</strong> ve yaz: metin şeklin etiketi olur ve şekille birlikte
                taşınır. Boş bir yere çift tıklamak ya da <K>T</K> ile tıklamak serbest metin ekler. Bitirmek için{' '}
                <K>Esc</K> ya da dışarı tıkla. Yazı tipi (el yazısı, normal, kod), boyut ve hizalama da panelden seçilir.
              </p>
            ) : (
              <p>
                <strong>Double-click</strong> inside a shape and type: the text becomes the shape’s label and moves with
                it. Double-click on empty space, or click with <K>T</K>, to add free text. Press <K>Esc</K> or click
                outside to finish. Font (handwritten, normal, code), size and alignment are in the panel too.
              </p>
            )}
            <Shot lang={lang} name="text" alt={tr ? 'Şekil etiketi düzenleniyor' : 'Editing a shape label'} />
          </Step>

          <Step id="arrows" n={4} title={t.s.arrows}>
            {tr ? (
              <p>
                <K>A</K> ile bir şeklin içinden başlayıp başka bir şeklin üzerine sürükle. Hedef şekil mavi kenarla
                vurgulanır; bıraktığında ok <strong>iki şekle de bağlanır</strong>. Şekilleri taşıdığında, büyüttüğünde ya
                da döndürdüğünde ok kendiliğinden takip eder. Okun uçlarını panelden değiştirebilir (ok, üçgen, nokta,
                çubuk), tıklayıp tıklayarak çok noktalı çizgi çizebilirsin.
              </p>
            ) : (
              <p>
                Press <K>A</K>, start inside one shape and drag onto another. The target is highlighted with a blue
                outline; when you release, the arrow is <strong>bound to both shapes</strong>. Move, resize or rotate the
                shapes and the arrow follows. Change arrowheads in the panel (arrow, triangle, dot, bar), or click point
                by point to draw a multi-point line.
              </p>
            )}
            <Shot lang={lang} name="bind" alt={tr ? 'Ok bir şekle bağlanıyor' : 'Binding an arrow to a shape'} />
          </Step>

          <Step id="select" n={5} title={t.s.select}>
            {tr ? (
              <ul>
                <li>Tıklayarak seç, boş alanda sürükleyerek kutu seçimi yap, <K>Shift</K> ile seçime ekle.</li>
                <li>Köşe tutamaçları boyutlandırır, üstteki yuvarlak tutamaç döndürür (<K>Shift</K> ile 15° adım).</li>
                <li>
                  <K>Alt</K> ile sürüklemek kopyalar; <K>⌘D</K> çoğaltır, <K>⇧H</K>/<K>⇧V</K> çevirir.
                </li>
                <li>Birden çok öğe seçiliyken panelden hizalayabilir ve eşit aralıkla dağıtabilirsin.</li>
              </ul>
            ) : (
              <ul>
                <li>Click to select, drag on empty space for a box selection, add to it with <K>Shift</K>.</li>
                <li>Corner handles resize, the round handle on top rotates (<K>Shift</K> snaps to 15°).</li>
                <li>
                  <K>Alt</K>-drag duplicates; <K>⌘D</K> duplicates in place, <K>⇧H</K>/<K>⇧V</K> flip.
                </li>
                <li>With several elements selected, align and distribute them from the panel.</li>
              </ul>
            )}
            <Shot lang={lang} name="select" alt={tr ? 'Çoklu seçim' : 'Multiple selection'} />
          </Step>

          <Step id="layers" n={6} title={t.s.layers}>
            {tr ? (
              <p>
                Sağ üstteki katman düğmesi (<K>⌥L</K>) her öğeyi liste olarak gösterir. Satırları sürükleyerek sırala,
                çift tıklayarak adlandır; göz simgesi gizler, kilit simgesi öğeyi tuvalde seçilemez yapar. Seçili
                öğeleri <K>⌘G</K> ile grupla: gruplar listede açılıp kapanan klasör olarak görünür ve birlikte taşınır.
              </p>
            ) : (
              <p>
                The layers button at the top right (<K>⌥L</K>) lists every element. Drag rows to reorder, double-click
                to rename; the eye hides an element and the lock makes it unselectable on the canvas. Group a selection
                with <K>⌘G</K>: groups appear as collapsible folders and move together.
              </p>
            )}
            <Shot lang={lang} name="layers" alt={tr ? 'Katmanlar paneli ve grup' : 'Layers panel with a group'} />
          </Step>

          <Step id="files" n={7} title={t.s.files}>
            {tr ? (
              <p>
                Sol üstteki menüden dosya açar (<K>⌘O</K>) ve kaydedersin (<K>⌘S</K>). Kayıtlar kendi biçimimiz olan{' '}
                <code>.biyikdraw</code> dosyasıdır; başka bir cihazda açarak çalışmaya devam edebilirsin. Izgara, tema,
                dil (TR/EN) ve tuval rengi de buradadır.
              </p>
            ) : (
              <p>
                The menu at the top left opens (<K>⌘O</K>) and saves (<K>⌘S</K>) files. Saves use our own{' '}
                <code>.biyikdraw</code> format, so you can continue on another device. Grid, theme, language (TR/EN) and
                canvas color live here too.
              </p>
            )}
            <Shot lang={lang} name="menu" alt={tr ? 'Ana menü' : 'Main menu'} />
          </Step>

          <Step id="export" n={8} title={t.s.export}>
            {tr ? (
              <p>
                <strong>Dışa aktar</strong> (<K>⌘⇧E</K>) çizimi PNG ya da SVG olarak indirir veya panoya kopyalar.
                Yalnızca seçili öğeleri, arka planlı/şeffaf, açık/koyu ve 1×–3× ölçekte alabilirsin.
              </p>
            ) : (
              <p>
                <strong>Export</strong> (<K>⌘⇧E</K>) downloads the drawing as PNG or SVG, or copies it to the clipboard.
                Choose selected elements only, with or without background, light or dark, at 1×–3× scale.
              </p>
            )}
            <Shot lang={lang} name="export" alt={tr ? 'Dışa aktarma penceresi' : 'Export dialog'} />
          </Step>

          <Step id="share" n={9} title={t.s.share}>
            {tr ? (
              <>
                <p>
                  Sağ üstteki <strong>Paylaş</strong> düğmesi bir bağlantı üretir. Bağlantı çizimin kendisini (sıkıştırılmış
                  olarak) içerir; adresin <code>#</code> kısmı tarayıcıdan sunucuya hiç gönderilmediği için çizimin hiçbir
                  sunucuya yüklenmez ve hesap gerekmez.
                </p>
                <ul>
                  <li>
                    Bağlantıyı açan kişi çizimi <strong>salt okunur</strong> görür; kaydırıp yakınlaştırabilir, isterse{' '}
                    <strong>Tahtama ekle</strong> ile kendi tahtasına kopyalar. Kendi çizimleri silinmez.
                  </li>
                  <li>
                    <strong>Çevrimdışı paylaşım:</strong> “HTML dosyası” internet olmadan her tarayıcıda açılan tek bir
                    dosyadır (yazı tipleri içinde). E-posta, mesaj ya da USB ile gönderebilirsin; menüdeki “Aç” ile yeniden
                    düzenlenebilir.
                  </li>
                  <li>
                    draw.biyik.dev bir kez açıldıktan sonra <strong>internet olmadan da</strong> çalışır; paylaşım
                    bağlantıları da çevrimdışıyken açılır.
                  </li>
                </ul>
              </>
            ) : (
              <>
                <p>
                  The <strong>Share</strong> button at the top right creates a link. The link contains the drawing itself
                  (compressed); the <code>#</code> part of a URL is never sent to a server, so your drawing is not
                  uploaded anywhere and no account is needed.
                </p>
                <ul>
                  <li>
                    Whoever opens the link sees the drawing <strong>read-only</strong>; they can pan and zoom, and copy it
                    into their own board with <strong>Add to my board</strong>. Their own drawings are kept.
                  </li>
                  <li>
                    <strong>Offline sharing:</strong> the “HTML file” is a single file that opens in any browser without
                    internet (fonts included). Send it by email, chat or USB; reopen it for editing with “Open”.
                  </li>
                  <li>
                    After the first visit draw.biyik.dev <strong>works without internet</strong>, and share links open
                    offline too.
                  </li>
                </ul>
              </>
            )}
            <div className="dx-pair is-even">
              <Shot lang={lang} name="share" alt={tr ? 'Paylaş penceresi' : 'Share dialog'} />
              <Shot lang={lang} name="view" alt={tr ? 'Paylaşılan çizimin salt okunur görünümü' : 'Read-only view of a shared drawing'} />
            </div>
          </Step>

          <Step id="teach" n={10} title={t.s.teach}>
            {tr ? (
              <>
                <p>
                  Tabletten ders anlatan öğretmenler için: tahtayı projeksiyona ya da akıllı tahtaya yansıtıp kalemle
                  anlatabilirsin.
                </p>
                <ul>
                  <li>
                    <strong>Ders modu</strong> (<K>⌥P</K> ya da menü): tam ekran, sade görünüm. Alttaki büyük düğmelerle
                    kalem, fosforlu kalem, lazer, silgi, beş renk, üç kalınlık, kâğıt deseni, geri al ve{' '}
                    <strong>yeni sayfa</strong> tek dokunuşla.
                  </li>
                  <li>
                    <strong>Kâğıt desenleri</strong>: kareli, noktalı, çizgili defter ve{' '}
                    <strong>kılavuz çizgili</strong> (dört çizgili güzel yazı defteri). Desen yakınlaştırınca tahtayla
                    birlikte büyür; dışa aktarmaya da eklenebilir.
                  </li>
                  <li>
                    <strong>Fosforlu kalem</strong> (<K>M</K>): yazının üstünü boyar ama örtmez; özneyi, yüklemi ya da
                    yeni kelimeleri işaretlemek için.
                  </li>
                  <li>
                    <strong>Lazer işaretçi</strong> (<K>K</K>): tahtaya bir şey eklemeden gösterir; iz bir saniyede söner.
                  </li>
                  <li>
                    <strong>Kalem basıncı</strong>: Apple Pencil ve benzeri kalemlerde bastırdıkça çizgi kalınlaşır,
                    yazı doğal görünür.
                  </li>
                  <li>
                    <strong>Avuç içi koruması</strong>: kalem algılanınca parmak ve avuç içi çizmez, yalnızca kaydırır ve
                    yakınlaştırır. Menüdeki “Yalnızca kalemle çiz” ile kapatılabilir.
                  </li>
                  <li>
                    <strong>Sağ tık menüsü</strong>: masaüstünde sağ tık, tablette <strong>basılı tut</strong>. Kes,
                    kopyala, panoya PNG/SVG/metin, stil kopyala, metni şekle bağla, metni kutu içine al, çerçeveye al,
                    katman sırası, çevir, kilitle.
                  </li>
                </ul>
              </>
            ) : (
              <>
                <p>
                  For teachers who teach from a tablet: mirror the board to a projector or smart board and explain with
                  the pen.
                </p>
                <ul>
                  <li>
                    <strong>Teaching mode</strong> (<K>⌥P</K> or the menu): full screen, distraction-free. Big buttons
                    at the bottom for pen, highlighter, laser, eraser, five colors, three widths, paper pattern, undo and{' '}
                    <strong>new page</strong>.
                  </li>
                  <li>
                    <strong>Paper patterns</strong>: grid, dotted, lined and <strong>handwriting</strong> paper (the
                    four-line guide used to teach handwriting). The pattern scales with the board and can be included in
                    exports.
                  </li>
                  <li>
                    <strong>Highlighter</strong> (<K>M</K>): marks text without covering it, for subjects, verbs or new
                    words.
                  </li>
                  <li>
                    <strong>Laser pointer</strong> (<K>K</K>): point without drawing; the trail fades in a second.
                  </li>
                  <li>
                    <strong>Pen pressure</strong>: with Apple Pencil and similar pens the stroke gets thicker as you
                    press, so handwriting looks natural.
                  </li>
                  <li>
                    <strong>Palm rejection</strong>: once a pen is detected, fingers and palms pan and zoom instead of
                    drawing. Turn it off with “Draw with pen only” in the menu.
                  </li>
                  <li>
                    <strong>Context menu</strong>: right-click on desktop, <strong>press and hold</strong> on a tablet.
                    Cut, copy, copy as PNG/SVG/text, copy style, bind text to a shape, wrap text in a box, wrap in a
                    frame, layer order, flip, lock.
                  </li>
                </ul>
              </>
            )}
            <Shot lang={lang} name="teach" alt={tr ? 'Ders modu, kılavuz çizgili kâğıt ve lazer işaretçi' : 'Teaching mode with handwriting paper and laser pointer'} />
            <Shot lang={lang} name="context" alt={tr ? 'Sağ tık menüsü' : 'Context menu'} />
          </Step>

          <Step id="theme" n={11} title={t.s.theme}>
            {tr ? (
              <p>
                Koyu temada renkler otomatik uyarlanır. Telefonda araç çubuğu alta iner; iki parmakla yakınlaştırıp
                kaydırabilir, stil panelini kaydırıcı düğmesiyle açabilirsin.
              </p>
            ) : (
              <p>
                Colors adapt automatically in dark mode. On phones the toolbar moves to the bottom; pinch to zoom and pan,
                and open the style panel with the sliders button.
              </p>
            )}
            <div className="dx-pair">
              <Shot lang={lang} name="dark" alt={tr ? 'Koyu tema' : 'Dark theme'} />
              <Shot lang={lang} name="mobile" alt={tr ? 'Mobil görünüm' : 'Mobile view'} narrow />
            </div>
          </Step>

          <Step id="keys" n={12} title={t.s.keys}>
            <div className="dx-keys">
              {(tr
                ? [
                    ['Geri al / yinele', '⌘Z / ⌘⇧Z'],
                    ['Kopyala / yapıştır', '⌘C / ⌘V'],
                    ['Çoğalt', '⌘D'],
                    ['Grupla / çöz', '⌘G / ⌘⇧G'],
                    ['Öne / arkaya', '⌘] / ⌘['],
                    ['Stil kopyala / yapıştır', '⌘⌥C / ⌘⌥V'],
                    ['Kilitle', '⌘⇧L'],
                    ['Tümünü sığdır', '⇧1'],
                    ['Ders modu', '⌥P'],
                    ['Fosforlu kalem / lazer', 'M / K'],
                    ['Panoya PNG', '⇧⌥C'],
                    ['Kaydır', 'Boşluk + sürükle'],
                    ['Yakınlaştır', '⌘ + tekerlek'],
                    ['Tüm kısayollar', '?'],
                  ]
                : [
                    ['Undo / redo', '⌘Z / ⌘⇧Z'],
                    ['Copy / paste', '⌘C / ⌘V'],
                    ['Duplicate', '⌘D'],
                    ['Group / ungroup', '⌘G / ⌘⇧G'],
                    ['Forward / backward', '⌘] / ⌘['],
                    ['Copy / paste style', '⌘⌥C / ⌘⌥V'],
                    ['Lock', '⌘⇧L'],
                    ['Zoom to fit', '⇧1'],
                    ['Teaching mode', '⌥P'],
                    ['Highlighter / laser', 'M / K'],
                    ['Copy as PNG', '⇧⌥C'],
                    ['Pan', 'Space + drag'],
                    ['Zoom', '⌘ + wheel'],
                    ['All shortcuts', '?'],
                  ]
              ).map(([a, b]) => (
                <div key={a}>
                  <span>{a}</span>
                  <K>{b}</K>
                </div>
              ))}
            </div>
            <p className="dx-note">{tr ? 'Windows ve Linux’ta ⌘ yerine Ctrl kullan.' : 'On Windows and Linux use Ctrl instead of ⌘.'}</p>
          </Step>

          <Step id="dev" n={13} title={t.s.dev}>
            {tr ? (
              <p>
                Tahta açık kaynaktır ve hiçbir harici çizim kütüphanesine dayanmaz. Kaynak kodu{' '}
                <a href={DRAW_REPO}>GitHub’da</a>. Paketi GitHub’dan kurup kendi React projene ekleyebilirsin:
              </p>
            ) : (
              <p>
                The board is open source and does not depend on any third-party drawing library. The source is on{' '}
                <a href={DRAW_REPO}>GitHub</a>. Install it from GitHub and drop it into your React app:
              </p>
            )}
            <Code lang="bash">{INSTALL}</Code>
            <Code lang="tsx">{USAGE}</Code>
            <p>
              {tr
                ? 'Next.js’te bileşeni yalnızca tarayıcıda yükle:'
                : 'In Next.js, load the component on the client only:'}
            </p>
            <Code lang="tsx">{NEXT}</Code>
            <p>{tr ? 'El yazısı için Caveat yazı tipini sayfana ekle:' : 'Add the Caveat font for handwriting:'}</p>
            <Code lang="html">{FONT}</Code>
            <h3>{tr ? 'Özellikler (props)' : 'Props'}</h3>
            <div className="dx-table">
              {(
                [
                  ['lang', "'tr' | 'en'", tr ? 'Arayüz dili; verilmezse tarayıcı dili.' : 'UI language; defaults to the browser language.'],
                  ['storageKey', 'string', tr ? 'IndexedDB anahtarı (varsayılan sketch).' : 'IndexedDB key (default sketch).'],
                  ['initialTheme', "'light' | 'dark'", tr ? 'Başlangıç teması; verilmezse sistem.' : 'Initial theme; defaults to the system.'],
                  ['onThemeChange', '(theme) => void', tr ? 'Tema değişince çağrılır.' : 'Called when the theme changes.'],
                  ['handFont', 'string', tr ? 'El yazısı için CSS font-family.' : 'CSS font-family for handwriting.'],
                  ['brand', 'ReactNode', tr ? 'Karşılama ekranındaki logo.' : 'Logo on the welcome screen.'],
                  ['links', '{ label, href, icon }[]', tr ? 'Menünün altındaki bağlantılar.' : 'Links at the bottom of the menu.'],
                  ['docsUrl', 'string', tr ? 'Menüde dokümantasyon bağlantısı.' : 'Documentation link in the menu.'],
                  ['about', 'AboutInfo', tr ? '“Hakkında” penceresi.' : 'Content of the About dialog.'],
                ] as const
              ).map(([name, type, desc]) => (
                <div key={name}>
                  <code>{name}</code>
                  <code className="dx-type">{type}</code>
                  <span>{desc}</span>
                </div>
              ))}
            </div>
            <h3>{tr ? 'Yalnızca motor' : 'Engine only'}</h3>
            <p>
              {tr
                ? 'Arayüz olmadan, sahneyi kodla okuyup SVG/PNG üretmek için motoru doğrudan kullan:'
                : 'Use the engine directly to read scenes and produce SVG/PNG without the UI:'}
            </p>
            <Code lang="ts">{ENGINE}</Code>
            <p>
              {tr ? 'Renkler ' : 'Colors are '}
              <code>.sk-app</code>
              {tr ? ' üzerindeki ' : ' customizable through the '}
              <code>--sk-*</code>
              {tr ? ' CSS değişkenleriyle özelleştirilebilir.' : ' CSS variables on it.'}
            </p>
          </Step>

          <Step id="license" n={14} title={t.s.license}>
            {tr ? (
              <p>
                Çizimler ve görseller yalnızca tarayıcında (IndexedDB) saklanır; sunucuya hiçbir şey gönderilmez. Kod MIT
                lisansıyla açıktır: kullanabilir, değiştirebilir ve kendi projelerinde dağıtabilirsin.
              </p>
            ) : (
              <p>
                Drawings and images are stored only in your browser (IndexedDB); nothing is sent to a server. The code is
                MIT licensed: use it, change it and ship it in your own projects.
              </p>
            )}
            <p className="dx-cta">
              <a className="dx-btn" href={APP_URL}>
                {t.open} →
              </a>
              <a className="dx-btn is-ghost" href={DRAW_REPO}>
                GitHub
              </a>
            </p>
          </Step>
        </main>
      </div>

      <footer className="dx-footer">
        <span>
          © {new Date().getFullYear()} <a href="https://biyik.dev">Metin Faruk Bıyık</a> · MIT
        </span>
        <a href={t.otherHref}>{t.other}</a>
      </footer>
    </div>
  );
}
