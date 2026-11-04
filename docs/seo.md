# biyik.dev SEO yapılandırması

Tüm sayfa başlıkları, açıklamaları ve anahtar kelimeleri tek bir yerden yönetilir.

## Kaynaklar

- Sayfa bazlı başlık / açıklama / anahtar kelime: `src/lib/seo.ts` → `seoPages`
- Proje sayfaları: `src/data/projects.ts` → `seoTitle`, `seoDescription`, `keywords`
- Araçlar: `src/data/tools.ts`
- Sosyal paylaşım görselleri: `src/lib/og-cards.ts` (içerik) + `src/app/og/[key]/route.tsx` (çizim)
- Favicon ve uygulama ikonu: `src/app/icon.tsx`, `src/app/apple-icon.tsx`, `src/app/manifest.ts`
- Sitemap ve robots: `src/app/sitemap.ts`, `src/app/robots.ts`

## Kurallar

- Başlıklar, kullanıcının aradığı ifadeyle başlar; sonuna otomatik olarak `| biyik.dev` eklenir.
- Açıklamalar ~160 karakteri geçmez ve sayfanın görünür içeriğiyle örtüşür.
- Anahtar kelimeler genel (ör. “internet hız testi”) ve uzun kuyruk (ör. “4,5 x 6 vesikalık”) terimleri birlikte içerir.
- Her iç sayfa görünür bir sayfa yolu ve `BreadcrumbList` şeması üretir (`PageHeader` / `Breadcrumbs`).

## Sosyal paylaşım önizlemeleri

WhatsApp, X (Twitter), Facebook ve LinkedIn bağlantı önizlemesi için her sayfa şunları üretir: `og:title`, `og:description`, `og:url`, `og:type`, `og:locale`, `og:image` (+ `width`, `height`, `alt`, `type`) ve `twitter:card=summary_large_image`, `twitter:image` (+ `alt`).

- Görseller build sırasında statik PNG olarak üretilir: `https://biyik.dev/og/<anahtar>` (ör. `/og/araclar_qr-kod-olusturucu`). Kısa, sabit ve önbelleklenebilir adres, tarayıcıların görseli hızlı ve güvenilir biçimde almasını sağlar.
- Boyut 1200 × 630, ağırlık 300 KB altı (WhatsApp sınırı). Yazı tipleri `src/assets/fonts` içinde gömülüdür (Inter, JetBrains Mono · OFL).
- Her araç kendi görselini taşır; QR aracının görselindeki kod okunabilir ve araca götürür.
- Yeni sayfa eklendiğinde kartı `src/lib/og-cards.ts` içine eklemek yeterlidir.

Denetim: `npm run build`, `npx next start -p 3123`, ardından `npm run check:seo`. Betik sitemap’teki her adreste başlık/açıklama uzunluğunu, tüm OG ve Twitter etiketlerini, canonical adresi ve görselin boyut/ağırlığını kontrol eder.

Yayından sonra önbelleği yenilemek için: Facebook Sharing Debugger (WhatsApp da bu önbelleği kullanır), LinkedIn Post Inspector.

## Yapılandırılmış veri

| Sayfa | Şema |
| --- | --- |
| Tüm site | `Person`, `WebSite` |
| Projeler / Araçlar | `CollectionPage` + `ItemList` |
| Uygulama detayı | `SoftwareApplication` (+ `downloadUrl`) |
| Web projesi detayı | `CreativeWork` |
| Araç sayfaları (vesikalık, QR kod, hız testi, IP) | `WebApplication` (ücretsiz `Offer`) + `FAQPage` |
| BYK Seri Baskı Pro | `FAQPage` (sorun giderme) |
| İletişim | `ContactPage` + `ContactPoint` |

FAQ şeması yalnızca sayfada görünen `Faq` bileşeninden üretilir; görünmeyen soru-cevap eklenmez.

Anahtar kelimeler proje içeriğine göre seçilmiştir; arama hacmi ölçümü yapılmamıştır. Sıralama ve indeksleme Search Console’dan izlenmelidir: https://biyik.dev/sitemap.xml

## Adresler

Tüm projeler `/projeler/<slug>` altında tek bir dinamik rotadan üretilir. Eski `/geocam`, `/byk-music`, `/byk-seri-baski-pro`, `/ozgecmis`, `/sertifikalar` ve `/ekipmanlar` adresleri `next.config.ts` içinde kalıcı olarak yönlendirilir.
