# Portföy SEO yapılandırması

SEO kapsamı, bu depodaki biyik.dev sayfalarıdır. Diğer projelerin kendi alan adlarındaki kaynak kodlarını değiştirmez.

Her proje için benzersiz başlık, açıklama, canonical adres, Open Graph ve Twitter kartı tanımlanır. Proje türüne göre SoftwareApplication veya CreativeWork yapılandırılmış verisi eklenir. Proje listesi ItemList, web proje detayları BreadcrumbList içerir. Tüm herkese açık sayfalar sitemap.xml içinde bulunur; Studio ve API yolları robots.txt içinde hariç tutulur.

## Anahtar kelime grupları

- **BYK Music:** YouTube MP3 indirici, YouTube MP4 indirici, oynatma listesi indirme, Windows müzik indirme programı, macOS video indirici.
- **GeoCam: Audit:** GPS kamera, konum damgalı fotoğraf, saha denetim kamerası, iPhone tarih saat kamera, telekom saha fotoğrafı.
- **BYK Seri Baskı Pro:** barkod yazdırma programı, Excel barkod baskı, seri numarası etiketi, TSPL etiket yazıcı, toplu etiket baskı.
- **biyik.dev:** Metin Faruk Bıyık, yazılım geliştirici portföyü, kişisel web sitesi, Trabzon yazılım geliştirici.
- **Elif Öğretmen:** Türkçe öğretmeni web sitesi, öğretmen tanıtım sitesi, eğitim web tasarımı.
- **BAYEN:** yangın güvenliği web sitesi, yapı sistemleri, kurumsal web tasarım.
- **Creda System:** iş emri takip sistemi, personel yönetimi, CRM ERP, eğitim takibi, kurumsal veri yönetimi.

Bunlar proje içeriklerine göre belirlenen hedef terimlerdir; arama hacmi veya sıralama ölçümü yapılmamıştır. Terimler meta keywords alanına eklenir; başlıklar, açıklamalar ve görünür içerik de projelerin konusunu açıkça anlatır.

## Kaynaklar ve bakım

- Proje içeriği ve anahtar kelimeler: `src/data/projects.ts`
- Ortak metadata ve proje şemaları: `src/lib/seo.ts`
- Sosyal paylaşım görseli: `src/app/og/route.tsx`
- Sitemap: `src/app/sitemap.ts`
- BYK Music özellikleri ve indirmeleri: https://github.com/metinfarukbiyik/byk-music

Yayın sonrası sitemap adresi: https://biyik.dev/sitemap.xml. Arama motorlarındaki tarama ve indeksleme durumu ayrıca Search Console üzerinden takip edilebilir.

## Proje adresleri

Tüm proje detayları `/projeler/<proje-adi>` yapısını kullanır. Uygulama adresleri `/projeler/geocam`, `/projeler/byk-music` ve `/projeler/byk-seri-baski-pro` olarak düzenlenmiştir. Eski `/geocam`, `/byk-music` ve `/byk-seri-baski-pro` adresleri HTTP 308 ile kalıcı olarak yeni adreslere yönlenir. Canonical, JSON-LD, site içi bağlantılar ve sitemap yeni adresleri kullanır.
