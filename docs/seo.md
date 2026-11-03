# biyik.dev SEO yapılandırması

Tüm sayfa başlıkları, açıklamaları ve anahtar kelimeleri tek bir yerden yönetilir.

## Kaynaklar

- Sayfa bazlı başlık / açıklama / anahtar kelime: `src/lib/seo.ts` → `seoPages`
- Proje sayfaları: `src/data/projects.ts` → `seoTitle`, `seoDescription`, `keywords`
- Araçlar: `src/data/tools.ts`
- Sosyal paylaşım görseli: `src/app/og/route.tsx` (`title`, `description`, `label` parametreleri)
- Favicon ve uygulama ikonu: `src/app/icon.tsx`, `src/app/apple-icon.tsx`, `src/app/manifest.ts`
- Sitemap ve robots: `src/app/sitemap.ts`, `src/app/robots.ts`

## Kurallar

- Başlıklar, kullanıcının aradığı ifadeyle başlar; sonuna otomatik olarak `| biyik.dev` eklenir.
- Açıklamalar ~160 karakteri geçmez ve sayfanın görünür içeriğiyle örtüşür.
- Anahtar kelimeler genel (ör. “internet hız testi”) ve uzun kuyruk (ör. “4,5 x 6 vesikalık”) terimleri birlikte içerir.
- Her iç sayfa görünür bir sayfa yolu ve `BreadcrumbList` şeması üretir (`PageHeader` / `Breadcrumbs`).

## Yapılandırılmış veri

| Sayfa | Şema |
| --- | --- |
| Tüm site | `Person`, `WebSite` |
| Projeler / Araçlar | `CollectionPage` + `ItemList` |
| Uygulama detayı | `SoftwareApplication` (+ `downloadUrl`) |
| Web projesi detayı | `CreativeWork` |
| Araç sayfaları | `WebApplication` (ücretsiz `Offer`) + `FAQPage` |
| BYK Seri Baskı Pro | `FAQPage` (sorun giderme) |
| İletişim | `ContactPage` + `ContactPoint` |

FAQ şeması yalnızca sayfada görünen `Faq` bileşeninden üretilir; görünmeyen soru-cevap eklenmez.

Anahtar kelimeler proje içeriğine göre seçilmiştir; arama hacmi ölçümü yapılmamıştır. Sıralama ve indeksleme Search Console’dan izlenmelidir: https://biyik.dev/sitemap.xml

## Adresler

Tüm projeler `/projeler/<slug>` altında tek bir dinamik rotadan üretilir. Eski `/geocam`, `/byk-music`, `/byk-seri-baski-pro`, `/ozgecmis`, `/sertifikalar` ve `/ekipmanlar` adresleri `next.config.ts` içinde kalıcı olarak yönlendirilir.
