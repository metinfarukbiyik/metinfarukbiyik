# 📝 Blog Sistemi Kullanım Rehberi

Bu proje, **Markdown (.md) dosyaları** ile blog yazıları yayınlamak için sade ve etkili bir sistem kullanır.

## 📁 Klasör Yapısı

```
public/
└── blog/
    ├── javascript-modern-gelistirme-yontemleri.md
    ├── python-veri-analizi-baslangic-rehberi.md
    └── [diğer-yazılar].md
```

## ✍️ Yeni Blog Yazısı Ekleme

### 1. Markdown Dosyası Oluşturma

`public/blog/` klasörüne yeni bir `.md` dosyası ekleyin:

```bash
public/blog/yeni-yazim.md
```

### 2. Front Matter Formatı

Her markdown dosyası şu front matter formatına sahip olmalıdır:

```markdown
---
title: "Yazı Başlığı"
description: "Yazı açıklaması ve özeti"
category: "KATEGORİ"
date: "15 Mart 2024"
readTime: "5 dk okuma"
slug: "yazi-basligi-slug"
published: true
---

# Yazı İçeriği Buradan Başlar

Bu kısımda markdown formatında yazınızı yazabilirsiniz.

## Alt Başlık

- Liste öğesi 1
- Liste öğesi 2

```javascript
// Kod blokları
const example = "Merhaba Dünya!";
```

```

### 3. Slug Listesini Güncelleme

`src/utils/blogUtils.ts` dosyasındaki `getAllBlogPosts` fonksiyonunda `slugs` dizisine yeni yazınızın slug'ını ekleyin:

```typescript
const slugs = [
  'javascript-modern-gelistirme-yontemleri',
  'python-veri-analizi-baslangic-rehberi',
  'yeni-yazim', // ← Yeni yazınız
];
```

## 🎨 Desteklenen Markdown Özellikleri

- **Başlıklar**: `#`, `##`, `###`
- **Kalın/İtalik**: `**kalın**`, `*italik*`
- **Kod**: `` `inline code` `` ve ```kod blokları```
- **Listeler**: Madde işaretli ve numaralı
- **Linkler**: `[metin](url)`
- **Alıntılar**: `> alıntı metni`

## 🔧 Teknik Detaylar

### Kullanılan Teknolojiler
- **React**: Kullanıcı arayüzü
- **react-markdown**: Markdown render
- **remark-gfm**: GitHub Flavored Markdown desteği

### Blog Sayfaları
- **Ana Blog**: `/blog` - Tüm yazıların listesi
- **Yazı Detayı**: `/blog/[slug]` - Tekil yazı sayfası
- **Ana Sayfa**: Son 3 yazı "Son Yazılar" bölümünde

### SEO Optimizasyonu
- Her yazı için otomatik meta tags
- Sosyal medya paylaşım desteği
- Arama motoru dostu URL'ler

## 📝 Örnek Blog Yazısı

```markdown
---
title: "React Hooks ile State Yönetimi"
description: "React Hooks kullanarak modern state yönetimi teknikleri"
category: "TEKNOLOJİ"
date: "20 Mart 2024"
readTime: "8 dk okuma"
slug: "react-hooks-state-yonetimi"
published: true
---

# React Hooks ile State Yönetimi

React Hooks, fonksiyonel komponentlerde state kullanmamızı sağlar...

## useState Hook'u

```javascript
const [count, setCount] = useState(0);
```

Bu şekilde basit state yönetimi yapabilirsiniz.
```

## 🚀 Gelecek Geliştirmeler

- [ ] Otomatik slug listesi oluşturma
- [ ] Yazı arama özelliği
- [ ] Kategori filtreleme
- [ ] RSS feed desteği
- [ ] Yazı tarihi sıralama seçenekleri

## 💡 İpuçları

1. **Slug Formatı**: Türkçe karakterler yerine İngilizce karakter kullanın
2. **Görsel Ekleme**: Markdown içinde görsel için `![alt](url)` formatını kullanın
3. **Kod Dili**: Kod bloklarında dil belirtmeyi unutmayın (```javascript)
4. **SEO**: Title ve description'ları arama motoru dostu yazın

Bu sistem sayesinde blog yazılarınızı kolayca yönetebilir ve modern bir blog deneyimi sunabilirsiniz! 🎉 