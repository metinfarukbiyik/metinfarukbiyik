# biyik.dev UI

biyik.dev’in kendi tasarım sistemi. Görsel dil sungur.dev çizgisinde: beyaz zemin, #fafafa düz ve gölgesiz kartlar (1px çizgi, 12px köşe), gri ve ikonsuz bölüm başlıkları, Geist yazı tipi, siyah-beyaz düğmeler, metin bağlantıları. macOS'tan kalanlar: gezinmeyi taşıyan Dinamik Ada, buzlu cam açılır pencereler ve yaylı hareketler.

## Temeller (`src/styles/tokens.css`)

- **Yazı tipi:** Geist / Geist Mono
- **Renk:** zemin `--paper` (#ffffff), kart `--surface`, metin `--ink`, vurgu siyah-beyaz `--accent` (mürekkep); ikon tonları `.tone-blue|green|orange|purple|pink|red|indigo|gray`; destek tonları `clay`, `sky`, `sun`, `rose`
- **Yerleşim:** 920 px konteyner; 900 px üstünde ızgaralar 3 sütun, araçlarda ayarlar solda / önizleme sağda (yapışkan)
- **Hareket:** `--spring`, `--spring-soft`, `--ease-out`
- **Tipografi ölçeği:** `title-display`, `title-1` … `title-4`, `lead`, `text-small`, `text-meta`
- **Ağırlıklar:** 400 / 500 / 600
- **Kontroller:** 28 / 34 / 44 px yükseklik; 4 px ızgara

## Bileşenler (`src/components/ui`)

| Bileşen | Kullanım |
| --- | --- |
| `Button`, `ButtonLink`, `buttonClass()` | Tek aile, sungur.dev çizgisi: düz siyah ana düğme (koyu temada beyaz), çerçeveli ikincil; basınca küçülme/gradyan yok. `primary`, `secondary`, `accent` (= primary), `soft`, `ghost`, `danger` · `sm` / `md` / `lg` · `trailing="arrow" \| "external"` |
| `TextLink` | Alttan çizgi animasyonlu bağlantı; dış bağlantılarda otomatik ↗ ve yeni sekme |
| `Badge` | `tone`, `dot`, `live` (nabız), `code` (`<etiket>` görünümü), `outline` |
| `Tooltip` | Yalnızca CSS; hover ve klavye odağında görünür, `aria-describedby` bağlar |
| `Heading`, `Kicker` | Anlamsal seviye (`as`) ile görsel boyut (`size`) ayrıdır |
| `PageHeader`, `Breadcrumbs` | Sütunla hizalı, ince çerçeveli açık gri kutu: başlık + küçük sayaç etiketi (`count`), sağda eylemler, açıklama; etiketler ince ayraçla ayrılmış mono metin. Sayfa yolu yalnızca BreadcrumbList şemasında |
| `Section`, `SectionHeader` | Bölüm ritmi ve başlıkları |
| `Frame` | Tarayıcı penceresi çerçevesi |
| `Segmented` | Filtre düğmeleri |
| `DataList` | Anahtar / değer ızgarası |
| `Faq` | Açılır SSS + FAQPage şeması |
| `DynamicIsland` | Yapışık üst çubuğun sağında (solda portre, ad, ünvan); açık, ince çerçeveli renksiz hap. Genişleyince sola ve aşağı, içeriğin üstüne açılır: sayfa adı, hızlı gezinme, ilerleme halkası; tıklayınca panel. Yanında tema uydusu. Olay göstermek için `notifyIsland()` (`src/lib/island.ts`) |

Sınıf adları Tailwind yardımcı sınıflarıyla çakışmamalıdır (ör. `h-1` yerine `title-1`).
