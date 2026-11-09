import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

// Exercise the browser-independent print geometry and PDF writer without a DOM.
const source = await readFile(
  new URL('../src/lib/passport-photo.ts', import.meta.url),
  'utf8',
);
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
const compiledModule = { exports: {} };
new Function('exports', 'module', compiled)(
  compiledModule.exports,
  compiledModule,
);
const {
  photoLayout,
  photoSizes,
  paperSizes,
  printSpacing,
  photosPerSheet,
  cutMarks,
  createPhotoPdf,
  photoDocumentName,
  drawCrop,
  backgroundWhiteness,
  photoPurposes,
  mmToPixels,
} = compiledModule.exports;
let variants = 0;

for (const size of Object.keys(photoSizes)) {
  for (const count of [1, 2, 4, 8]) {
    for (const paper of Object.keys(paperSizes)) {
      for (const orientation of ['auto', 'portrait', 'landscape']) {
        for (const borderless of [false, true]) {
          if (borderless && !paperSizes[paper].borderless) continue;
          const { margin: PRINT_MARGIN, gap: PHOTO_GAP } =
            printSpacing(borderless);
          const layout = photoLayout(
            size,
            count,
            paper,
            orientation,
            borderless,
          );
          assert.equal(layout.borderless, borderless);
          assert.equal(layout.pages.flat().length, count);
          assert(layout.pages.every((page) => page.length > 0));
          if (orientation !== 'auto')
            assert.equal(layout.orientation, orientation);
          const stock = paperSizes[paper];
          assert.deepEqual(
            [layout.paper.width, layout.paper.height].sort(),
            [stock.width, stock.height].sort(),
          );
          const dimensions = photoSizes[size];
          const capacity = (w, h) =>
            Math.floor(
              (w - 2 * PRINT_MARGIN + PHOTO_GAP) /
                (dimensions.width + PHOTO_GAP),
            ) *
            Math.floor(
              (h - 2 * PRINT_MARGIN + PHOTO_GAP) /
                (dimensions.height + PHOTO_GAP),
            );
          const maxCapacity =
            orientation === 'auto'
              ? Math.max(
                  capacity(stock.width, stock.height),
                  capacity(stock.height, stock.width),
                )
              : capacity(layout.paper.width, layout.paper.height);
          assert.equal(layout.pages.length, Math.ceil(count / maxCapacity));
          assert.equal(
            photosPerSheet(size, paper, orientation, borderless),
            maxCapacity,
          );
          for (const cells of layout.pages)
            for (const mark of cutMarks(cells, layout.paper, borderless)) {
              // Marks stay on the paper and never touch or cross a photo.
              for (const t of [0, 0.5, 1]) {
                const x = mark.x1 + (mark.x2 - mark.x1) * t;
                const y = mark.y1 + (mark.y2 - mark.y1) * t;
                assert(x >= 0 && y >= 0);
                assert(x <= layout.paper.width && y <= layout.paper.height);
                assert(
                  cells.every(
                    (c) =>
                      x < c.x - 0.01 ||
                      x > c.x + c.width + 0.01 ||
                      y < c.y - 0.01 ||
                      y > c.y + c.height + 0.01,
                  ),
                );
              }
            }
          for (const cells of layout.pages) {
            cells.forEach((cell, index) => {
              assert.equal(cell.width, dimensions.width);
              assert.equal(cell.height, dimensions.height);
              assert(cell.x >= PRINT_MARGIN && cell.y >= PRINT_MARGIN);
              assert(cell.x + cell.width <= layout.paper.width - PRINT_MARGIN);
              assert(
                cell.y + cell.height <= layout.paper.height - PRINT_MARGIN,
              );
              cells
                .slice(index + 1)
                .forEach((other) =>
                  assert(
                    cell.x + cell.width + PHOTO_GAP <= other.x ||
                      other.x + other.width + PHOTO_GAP <= cell.x ||
                      cell.y + cell.height + PHOTO_GAP <= other.y ||
                      other.y + other.height + PHOTO_GAP <= cell.y,
                  ),
                );
            });
          }
          for (const marks of [true, false]) {
            // Image encoding is the browser's responsibility; these bytes test binary PDF offsets.
            const imageBytes = new Uint8Array([255, 216, 0, 128, 255, 217]);
            const canvas = {
              width: mmToPixels(dimensions.width),
              height: mmToPixels(dimensions.height),
              toBlob: (callback) => callback(new Blob([imageBytes])),
            };
            const blob = await createPhotoPdf(
              canvas,
              size,
              count,
              marks,
              paper,
              orientation,
              borderless,
            );
            const text = Buffer.from(await blob.arrayBuffer()).toString(
              'latin1',
            );
            const mediaBox = `/MediaBox [0 0 ${((layout.paper.width * 72) / 25.4).toFixed(5)} ${((layout.paper.height * 72) / 25.4).toFixed(5)}]`;
            assert.equal(text.split(mediaBox).length - 1, layout.pages.length);
            assert(text.includes(`/Count ${layout.pages.length}`));
            assert(text.includes('/PrintScaling /None'));
            assert.equal((text.match(/\/Photo Do/g) || []).length, count);
            assert.equal(
              (text.match(/ l S/g) || []).length,
              marks
                ? layout.pages.reduce(
                    (sum, cells) =>
                      sum + cutMarks(cells, layout.paper, borderless).length,
                    0,
                  )
                : 0,
            );
            if (marks && !borderless)
              assert.equal((text.match(/ l S/g) || []).length, count * 8);
            assert.equal((text.match(/\/Subtype \/Image/g) || []).length, 1);
            const xref = Number(text.match(/startxref\n(\d+)/)[1]);
            assert.equal(text.slice(xref, xref + 4), 'xref');
            const xrefLines = text.slice(xref).split('\n');
            const objects = Number(xrefLines[1].split(' ')[1]);
            xrefLines
              .slice(3, 3 + objects - 1)
              .forEach((entry, i) =>
                assert(
                  text
                    .slice(Number(entry.slice(0, 10)))
                    .startsWith(`${i + 1} 0 obj`),
                ),
              );
            variants++;
          }
        }
      }
    }
  }
}
// Borderless 10 × 15: four 50 × 60 mm biometric photos fit on one sheet (2 × 2).
{
  const layout = photoLayout('large', 4, '10x15', 'auto', true);
  assert.equal(layout.pages.length, 1);
  assert.equal(layout.orientation, 'portrait');
  assert.deepEqual(
    layout.pages[0].map(({ x, y }) => [x, y]),
    [
      [0, 15],
      [50, 15],
      [0, 75],
      [50, 75],
    ],
  );
  assert.equal(photosPerSheet('large', '10x15', 'auto', true), 4);
  assert.equal(photosPerSheet('large', '10x15', 'auto', false), 2);
  assert.equal(photosPerSheet('standard', '10x15', 'auto', true), 8);
  // Guides print only in the empty strips above and below the grid.
  const marks = cutMarks(layout.pages[0], layout.paper, true);
  assert(marks.length > 0);
  assert(
    marks.every(
      (m) => Math.max(m.y1, m.y2) <= 15 || Math.min(m.y1, m.y2) >= 135,
    ),
  );
  assert(marks.some((m) => m.x1 === 50 && m.x2 === 50));
  // A4 ignores the borderless flag.
  assert.equal(photoLayout('large', 4, 'A4', 'auto', true).borderless, false);
}
assert.equal(photoLayout('large', 8, '10x15').pages.length, 4);
{
  const pixels = (width, height, paint) => {
    const data = new Uint8ClampedArray(width * height * 4);
    for (let y = 0; y < height; y++)
      for (let x = 0; x < width; x++)
        data.set([...paint(x, y), 255], (y * width + x) * 4);
    return data;
  };
  // White background with a dark "head" in the centre passes.
  const head = (x, y) =>
    x > 15 && x < 45 && y > 8 ? [60, 40, 30] : [248, 248, 246];
  assert.equal(backgroundWhiteness(pixels(60, 72, head), 60, 72).white, true);
  // Blue studio background fails; light grey with a colour cast fails too.
  assert.equal(
    backgroundWhiteness(
      pixels(60, 72, () => [40, 90, 200]),
      60,
      72,
    ).white,
    false,
  );
  assert.equal(
    backgroundWhiteness(
      pixels(60, 72, () => [230, 215, 170]),
      60,
      72,
    ).white,
    false,
  );
}
assert.deepEqual(photoPurposes.biometric.sizes, ['large']);
assert.equal(photoSizes.large.width, 50);
assert.equal(photoSizes.large.height, 60);
assert.equal(photoLayout('standard', 8, '10x15').pages.length, 2);
assert.equal(photoLayout('standard', 4, '10x15').pages.length, 1);
assert.equal(
  photoDocumentName('standard', 8, '10x15'),
  'biyik-dev_Vesikalik-Fotograf_10x15_35x45mm_8-Adet.pdf',
);
assert.equal(
  photoDocumentName('large', 4, 'A4', 'İş Başvurusu / Özgeçmiş'),
  'biyik-dev_Is-Basvurusu-Ozgecmis_A4_50x60mm_4-Adet.pdf',
);
assert.equal(
  photoDocumentName('large', 4, 'A4', '  / .. '),
  'biyik-dev_Vesikalik-Fotograf_A4_50x60mm_4-Adet.pdf',
);
for (const size of Object.keys(photoSizes)) {
  for (const zoom of [1, 1.5, 3])
    for (const horizontal of [0, 50, 100])
      for (const vertical of [0, 50, 100]) {
        let draw;
        const canvas = {
          getContext: () => ({
            fillRect() {},
            drawImage(...args) {
              draw = args;
            },
          }),
        };
        drawCrop(
          canvas,
          { naturalWidth: 1200, naturalHeight: 1600 },
          size,
          zoom,
          horizontal,
          vertical,
        );
        const [, x, y, width, height] = draw;
        assert(
          x >= 0 &&
            y >= 0 &&
            x + width <= 1200.00001 &&
            y + height <= 1600.00001,
        );
      }
}
console.log(
  `${variants} PDF variants passed: A4/10x15 (bordered and borderless), all sizes/counts/orientations, pagination, physical dimensions, spacing, crop bounds and file names.`,
);
