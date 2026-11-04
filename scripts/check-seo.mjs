// Audits every sitemap URL for search and social-preview tags.
// Usage: npm run build && npx next start -p 3123 & node scripts/check-seo.mjs http://localhost:3123
const base = process.argv[2] ?? 'http://localhost:3123';
const live = 'https://biyik.dev';
const local = (url) => url.replace(live, base);

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const decode = (v) => v?.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, "'");
const meta = (html, attr, name) =>
  decode(html.match(new RegExp(`<meta ${attr}="${name}" content="([^"]*)"`))?.[1]);

let failures = 0;
for (const url of urls) {
  const html = await (await fetch(local(url))).text();
  const problems = [];
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1]);
  const description = meta(html, 'name', 'description');
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (!title) problems.push('title yok');
  else if (title.length > 70) problems.push(`title uzun (${title.length})`);
  if (!description) problems.push('description yok');
  else if (description.length > 170) problems.push(`description uzun (${description.length})`);
  if (canonical !== url) problems.push(`canonical ${canonical}`);
  if (!meta(html, 'name', 'keywords')) problems.push('keywords yok');
  for (const key of ['og:title', 'og:description', 'og:url', 'og:type', 'og:site_name', 'og:locale', 'og:image', 'og:image:width', 'og:image:height', 'og:image:alt', 'og:image:type'])
    if (!meta(html, 'property', key)) problems.push(`${key} yok`);
  for (const key of ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image', 'twitter:image:alt'])
    if (!meta(html, 'name', key)) problems.push(`${key} yok`);
  const image = meta(html, 'property', 'og:image');
  let size = '';
  if (image) {
    if (!image.startsWith('https://')) problems.push('og:image mutlak https değil');
    const res = await fetch(local(image));
    const bytes = new Uint8Array(await res.arrayBuffer());
    const width = (bytes[16] << 24) | (bytes[17] << 16) | (bytes[18] << 8) | bytes[19];
    const height = (bytes[20] << 24) | (bytes[21] << 16) | (bytes[22] << 8) | bytes[23];
    size = `${width}×${height} ${Math.round(bytes.length / 1024)}KB`;
    if (res.status !== 200) problems.push(`görsel ${res.status}`);
    if (res.headers.get('content-type') !== 'image/png') problems.push('görsel png değil');
    if (width !== 1200 || height !== 630) problems.push(`görsel ${width}×${height}`);
    if (bytes.length > 300 * 1024) problems.push('görsel 300KB üstü');
  }
  failures += problems.length ? 1 : 0;
  console.log(`${problems.length ? '✗' : '✓'} ${url.replace(live, '') || '/'}  [${size}]  ${title?.length}/${description?.length}${problems.length ? `\n    ${problems.join(' · ')}` : ''}`);
}
console.log(failures ? `\n${failures} sayfada sorun var.` : `\n${urls.length} sayfanın tamamı geçti.`);
process.exit(failures ? 1 : 0);
