# biyik.dev UI

biyik.dev’in kendi tasarım sistemi. Fikir: web’in geçmişinden bugüne. Kâğıt tonunda zemin, ince nokta ızgarası, tarayıcı penceresi çerçeveleri, adres çubuğu biçiminde gezinme, `// yorum` stilinde etiketler ve 1999 tarayıcılarını anımsatan “Hazır” durum çubuğu.

## Temeller (`src/styles/tokens.css`)

- **Yazı tipi:** Inter (metin), JetBrains Mono (etiketler, sayılar, araçlar)
- **Renk:** kâğıt `--paper`, mürekkep `--ink`, tek vurgu rengi yumuşak petrol yeşili `--accent`; destek tonları `clay`, `sky`, `sun`, `rose`
- **Tipografi ölçeği:** `title-display`, `title-1` … `title-4`, `lead`, `text-small`, `text-meta`
- **Ağırlıklar:** yalnızca 400 / 500 / 600
- **Kontroller:** 32 / 40 / 48 px yükseklik; 4 px ızgara

## Bileşenler (`src/components/ui`)

| Bileşen | Kullanım |
| --- | --- |
| `Button`, `ButtonLink`, `buttonClass()` | `primary`, `secondary`, `accent`, `soft`, `ghost`, `danger` · `sm` / `md` / `lg` · `trailing="arrow" \| "external"` |
| `TextLink` | Alttan çizgi animasyonlu bağlantı; dış bağlantılarda otomatik ↗ ve yeni sekme |
| `Badge` | `tone`, `dot`, `live` (nabız), `code` (`<etiket>` görünümü), `outline` |
| `Tooltip` | Yalnızca CSS; hover ve klavye odağında görünür, `aria-describedby` bağlar |
| `Heading`, `Kicker` | Anlamsal seviye (`as`) ile görsel boyut (`size`) ayrıdır |
| `PageHeader`, `Breadcrumbs` | Her iç sayfanın başı; sayfa yolu + BreadcrumbList şeması |
| `Section`, `SectionHeader` | Bölüm ritmi ve başlıkları |
| `Frame` | Tarayıcı penceresi çerçevesi |
| `Segmented` | Filtre düğmeleri |
| `DataList` | Anahtar / değer ızgarası |
| `Faq` | Açılır SSS + FAQPage şeması |

Sınıf adları Tailwind yardımcı sınıflarıyla çakışmamalıdır (ör. `h-1` yerine `title-1`).
