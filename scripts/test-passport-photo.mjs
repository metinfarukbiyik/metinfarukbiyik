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
  photosPerSheet,
  cutFrames,
  createPhotoPdf,
  photoDocumentName,
  drawCrop,
  backgroundWhiteness,
  photoPurposes,
  mmToPixels,
} = compiledModule.exports;
let variants = 0;

const { PRINT_MARGIN, PHOTO_GAP, CUT_MARK_STYLE, photoCounts } =
  compiledModule.exports;
assert.deepEqual([...photoCounts], [1, 2, 4, 6, 8]);
assert(CUT_MARK_STYLE.width <= 0.05);

for (const size of Object.keys(photoSizes)) {
  for (const count of photoCounts) {
    for (const paper of Object.keys(paperSizes)) {
      for (const orientation of ['auto', 'portrait', 'landscape']) {
        const layout = photoLayout(size, count, paper, orientation);
        if (orientation !== 'auto')
          assert.equal(layout.orientation, orientation);
        assert.equal(layout.pages.flat().length, count);
        assert(layout.pages.every((page) => page.length > 0));
        const stock = paperSizes[paper];
        assert.deepEqual(
          [layout.paper.width, layout.paper.height].sort(),
          [stock.width, stock.height].sort(),
        );
        const dimensions = photoSizes[size];
        const capacity = (w, h) =>
          Math.floor(
            (w - 2 * PRINT_MARGIN + PHOTO_GAP) / (dimensions.width + PHOTO_GAP),
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
        assert.equal(photosPerSheet(size, paper, orientation), maxCapacity);
        assert.equal(layout.pages.length, Math.ceil(count / maxCapacity));
        for (const cells of layout.pages) {
          const frames = cutFrames(cells);
          // One frame per photo, hugging it from the outside.
          assert.equal(frames.length, cells.length);
          const w = CUT_MARK_STYLE.width;
          frames.forEach((frame, i) => {
            const c = cells[i];
            assert(Math.abs(frame.x + w / 2 - c.x) < 1e-9);
            assert(Math.abs(frame.y + w / 2 - c.y) < 1e-9);
            assert(Math.abs(frame.width - w - c.width) < 1e-9);
            assert(Math.abs(frame.height - w - c.height) < 1e-9);
            // Frame stays on the paper and clear of neighbouring photos.
            assert(frame.x - w / 2 >= 0 && frame.y - w / 2 >= 0);
            assert(frame.x + frame.width + w / 2 <= layout.paper.width);
            assert(frame.y + frame.height + w / 2 <= layout.paper.height);
          });
          // Full pages form a complete grid: rows are equally long.
          const rows = new Map();
          for (const c of cells) rows.set(c.y, (rows.get(c.y) ?? 0) + 1);
          if (layout.pages.length === 1)
            assert.equal(
              new Set(rows.values()).size,
              1,
              `${size} ${count} ${paper}`,
            );
          cells.forEach((cell, index) => {
            assert.equal(cell.width, dimensions.width);
            assert.equal(cell.height, dimensions.height);
            assert(cell.x >= PRINT_MARGIN && cell.y >= PRINT_MARGIN);
            assert(cell.x + cell.width <= layout.paper.width - PRINT_MARGIN);
            assert(cell.y + cell.height <= layout.paper.height - PRINT_MARGIN);
            cells
              .slice(index + 1)
              .forEach((other) =>
                assert(
                  cell.x + cell.width + PHOTO_GAP <= other.x + 1e-9 ||
                    other.x + other.width + PHOTO_GAP <= cell.x + 1e-9 ||
                    cell.y + cell.height + PHOTO_GAP <= other.y + 1e-9 ||
                    other.y + other.height + PHOTO_GAP <= cell.y + 1e-9,
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
          );
          const text = Buffer.from(await blob.arrayBuffer()).toString('latin1');
          const mediaBox = `/MediaBox [0 0 ${((layout.paper.width * 72) / 25.4).toFixed(5)} ${((layout.paper.height * 72) / 25.4).toFixed(5)}]`;
          assert.equal(text.split(mediaBox).length - 1, layout.pages.length);
          assert(text.includes(`/Count ${layout.pages.length}`));
          assert(text.includes('/PrintScaling /None'));
          assert.equal((text.match(/\/Photo Do/g) || []).length, count);
          assert.equal((text.match(/ re S/g) || []).length, marks ? count : 0);
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
// With a 2 mm gap, six 35 × 45 mm photos fit one 10 × 15 sheet as a 2 × 3 grid.
assert.deepEqual(
  photoLayout('standard', 6, '10x15').pages.map((p) => p.length),
  [6],
);
// Eight need two sheets: a full 2 × 3 page, then a row of 2.
assert.deepEqual(
  photoLayout('standard', 8, '10x15').pages.map((p) => p.length),
  [6, 2],
);
assert.equal(photoLayout('standard', 6, 'A4').pages.length, 1);
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
  `${variants} PDF variants passed: A4/10x15, all sizes/counts/orientations, pagination, regular grids, cut frames, physical dimensions, spacing, crop bounds and file names.`,
);
