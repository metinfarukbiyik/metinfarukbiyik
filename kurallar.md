# Kişisel CV Web Sitesi Oluşturma Kuralları

# Detaylı Prompt Rehberi

## 1. Proje Kurulumu ve Temel Yapı

### 1.1 Proje Başlangıcı
* "Next.js 13+ ve TailwindCSS kullanarak modern bir kişisel portfolio sitesi oluşturmak istiyorum. App Router kullanılsın ve TypeScript desteği olsun. Projenin temel yapısını ve gerekli paketleri kurar mısın?"

### 1.2 Tasarım Sistemi
* "Projede kullanılacak renk paleti, tipografi ve temel bileşenleri içeren bir tasarım sistemi oluşturalım. Tailwind config dosyasında özelleştirilmiş renkler, fontlar ve spacing değerleri olsun. Ayrıca karanlık/aydınlık mod için renk değişkenleri tanımlayalım."

### 1.3 Layout ve Navigasyon
* "Tüm sayfalarda kullanılacak bir layout yapısı oluşturalım. Üstte modern bir navbar, altta footer olsun. Navbar'da sayfa linkleri ve tema değiştirme butonu bulunsun. Mobil görünümde hamburger menü kullanılsın."

## 2. Ana Sayfa (CV) Tasarımı

### 2.1 Hero Bölümü
* "Ana sayfanın üst kısmında (hero section) minimal ve etkileyici bir tasarım istiyorum. Sol tarafta profil fotoğrafı, sağ tarafta isim, unvan ve kısa bir özgeçmiş yazısı olsun. Arka planda gradient ve blur efektleri kullanalım."

### 2.2 CV Grid Yapısı
"CV içeriğini iki kolonlu bir grid yapısında gösterelim:
- Sol kolon: İletişim bilgileri, sosyal medya linkleri ve yetenekler
- Sağ kolon: Deneyim, eğitim ve sertifikalar
Mobil görünümde tek kolon olacak şekilde responsive olsun."

### 2.3 Timeline Tasarımı
* "Deneyim ve eğitim bölümlerini modern bir timeline tasarımıyla gösterelim. Her bir kartın sol tarafında tarih ve timeline çizgisi, sağ tarafında içerik olsun. Kartlara hover efektleri ekleyelim."

## 3. Çalışmalar Sayfası

### 3.1 Proje Grid Yapısı
"Projelerimi 3 kolonlu bir grid yapısında göstermek istiyorum. Her proje kartı şunları içersin:
- Proje görseli (hover'da zoom efekti)
- Başlık ve kısa açıklama
- Kullanılan teknolojiler (etiketler)
- GitHub ve canlı site linkleri (hover'da görünsün)"

### 3.2 Filtreleme Sistemi
* "Projeleri kategorilerine göre filtreleyebileceğim bir sistem ekleyelim. Üstte filtre butonları olsun (Tümü, Web, Mobil, UI/UX gibi). Filtre değişimlerinde smooth geçiş animasyonları kullanalım."

## 4. Anlar (Fotoğraf Galerisi) Sayfası

### 4.1 Masonry Grid
* "Fotoğrafları masonry grid yapısında, responsive olarak gösterelim. Grid 4 kolon olsun ve ekran küçüldükçe kolon sayısı azalsın. Fotoğraflar lazy loading ile yüklensin."

### 4.2 Lightbox ve Detaylar
"Fotoğraflara tıklandığında açılacak bir lightbox komponenti oluşturalım. Lightbox'ta:
- Fotoğrafın büyük hali
- Çekim bilgileri (tarih, konum)
- Önceki/sonraki fotoğraf navigasyonu
- Zoom özelliği olsun"

## 5. Ekipmanlar Sayfası

### 5.1 Kategori Tabları
"Ekipmanları kategorilere ayıralım (Kamera, Lens, Bilgisayar, Ses gibi). Üstte tab menüsü olsun ve kategoriler arası geçişlerde fade animasyonu kullanalım."

### 5.2 Ekipman Kartları
"Her ekipman için detaylı bir kart tasarımı yapalım:
- Ekipman görseli
- İsim ve model
- Teknik özellikler
- Satın alma tarihi ve fiyat
- İnceleme ve satın alma linkleri"

## 6. Okuyorum Sayfası

### 6.1 Kitap Listesi
* "Kitapları durumlarına göre gruplandıralım (Okuyorum, Tamamladım, Okumak İstiyorum). Her grup için farklı bir renk kodu kullanalım. Üstte durum filtresi olsun."

### 6.2 Kitap Kartları
"Her kitap için şık bir kart tasarımı yapalım:
- Kitap kapağı
- Yazar ve başlık
- Okuma durumu (renkli etiket)
- Okuma tarihi
- Puanlama (5 yıldız sistemi)
- Goodreads linki"

## 7. Animasyonlar ve Geçişler

### 7.1 Sayfa Geçişleri
* "Sayfalar arası geçişlerde smooth animasyonlar kullanalım. Framer Motion ile fade ve slide efektleri ekleyelim. Sayfa yüklenirken içerikler sırayla animate olsun."

### 7.2 Micro-interaksiyonlar
"Kullanıcı deneyimini zenginleştirecek micro-interaksiyonlar ekleyelim:
- Buton hover efektleri
- Scroll-bazlı animasyonlar
- Loading durumları
- Form input efektleri"

## 8. SEO ve Performans

### 8.1 SEO Optimizasyonu
* "Her sayfa için dinamik meta etiketleri, Open Graph ve Twitter Card'ları ayarlayalım. Semantic HTML kullanımına dikkat edelim ve schema markup ekleyelim."

### 8.2 Performans İyileştirmeleri
"Lighthouse skorlarını optimize edelim:
- Görsel optimizasyonları
- Font loading stratejileri
- Code splitting
- Caching politikaları"

* Bu promptları sırayla kullanarak, modern ve profesyonel bir portfolio sitesi oluşturabilirsiniz. Her prompt, projenin belirli bir bölümüne odaklanır ve AI size gerekli kod ve yapılandırmaları sağlayacaktır. 

_____

## 0. Başlangıç

### 0.1 Projeyi Oluşturma
```bash
# Next.js projesini oluştur
npx create-next-app@latest my-portfolio --typescript --tailwind --app

# Gerekli paketleri yükle
npm install lucide-react next-themes clsx tailwind-merge framer-motion
```

### 0.2 Geliştirme Ortamı Kurulumu
1. VS Code Eklentileri:
   - Tailwind CSS IntelliSense
   - ESLint
   - Prettier
   - TypeScript
   - PostCSS Language Support

2. `.vscode/settings.json` ayarları:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

## 1. Proje Yapısı

### 1.1 Temel Dizin Yapısı
```
src/
├── app/
│   ├── page.tsx              # Ana sayfa bileşeni
│   ├── layout.tsx            # Kök layout bileşeni
│   ├── providers.tsx         # Context sağlayıcıları
│   ├── globals.css           # Global stiller
│   ├── fonts.ts             # Font tanımlamaları
│   ├── not-found.tsx        # 404 sayfası
│   ├── opengraph-image.tsx  # Sosyal medya önizleme
│   ├── calismalar/         # Çalışmalar sayfası
│   ├── anlar/              # Anlar sayfası
│   ├── ekipmanlar/         # Ekipmanlar sayfası
│   └── okuyorum/           # Okuma listesi sayfası
├── components/              # Yeniden kullanılabilir bileşenler
│   ├── layouts/            # Sayfa düzenleri
│   ├── ui/                 # UI bileşenleri
│   ├── ContactSection.tsx  # İletişim bölümü
│   ├── EducationSection.tsx # Eğitim bölümü
│   ├── ExperienceSection.tsx # Deneyim bölümü
│   ├── SkillsSection.tsx   # Yetenekler bölümü
│   └── CertificationsSection.tsx # Sertifikalar bölümü
├── data/                   # Veri dosyaları
│   └── cv.ts              # CV verilerinin tutulduğu dosya
├── types/                  # TypeScript tip tanımlamaları
└── lib/                    # Yardımcı fonksiyonlar
```

### 1.2 Teknoloji Yığını
- Next.js 13+ (App Router)
- TailwindCSS
- Lucide Icons
- TypeScript
- next-themes (Karanlık/Aydınlık mod)
- clsx & tailwind-merge (Koşullu sınıf birleştirme)

### 1.3 Konfigürasyon Dosyaları

#### tailwind.config.js
```javascript
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      colors: {
        border: 'var(--border)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        // ... diğer renk tanımlamaları
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
```

#### next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'your-domain.com'],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
```

## 2. Sayfa Yapıları

### 2.1 Ana Sayfa (page.tsx)

#### Layout Yapısı
```tsx
// src/app/page.tsx
export default function Home() {
  return (
    <PageLayout
      pageTitle={{
        title: cvData.name,
        description: cvData.title,
        image: "/profile.jpg",
        variant: "home",
        children: (
          <p className="mt-6 text-base text-muted-foreground/80 sm:text-lg leading-relaxed max-w-2xl">
            {cvData.summary}
          </p>
        )
      }}
    >
      <div className="mt-12 grid gap-8 md:grid-cols-12">
        {/* Sol Sütun */}
        <div className="space-y-6 md:col-span-4">
          <ContactSection contact={cvData.contact} />
          <SkillsSection skills={cvData.skills} />
        </div>
        
        {/* Sağ Sütun */}
        <div className="space-y-6 md:col-span-8">
          <ExperienceSection experiences={cvData.experience} />
          <EducationSection education={cvData.education} />
          <CertificationsSection certifications={cvData.certifications} />
        </div>
      </div>
    </PageLayout>
  )
}
```

#### Stil Detayları
1. Grid Yapısı:
   ```css
   .grid {
     display: grid;
     gap: 2rem; /* gap-8 */
   }
   
   @media (min-width: 768px) {
     .grid {
       grid-template-columns: repeat(12, minmax(0, 1fr));
     }
     
     .md\:col-span-4 {
       grid-column: span 4 / span 4;
     }
     
     .md\:col-span-8 {
       grid-column: span 8 / span 8;
     }
   }
   ```

2. Responsive Davranış:
   - Mobil: Tek kolon
   - Tablet ve üzeri: İki kolonlu grid
   - Geniş ekran: Maksimum genişlik sınırlaması

### 2.2 Çalışmalar Sayfası (calismalar/page.tsx)

#### Proje Kartı Yapısı
```tsx
// src/app/calismalar/components/ProjectCard.tsx
interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group relative rounded-xl overflow-hidden">
      {/* Görsel Alanı */}
      <div className="aspect-video relative">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* İçerik Alanı */}
      <div className="absolute bottom-0 p-6 w-full">
        <h2 className="text-xl font-bold text-white mb-2">
          {project.title}
        </h2>
        <p className="text-white/80 line-clamp-2 mb-4">
          {project.description}
        </p>
        <div className="flex gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 rounded-full bg-white/10 text-white text-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute bottom-6 right-6 flex gap-2">
          {project.links.github && (
            <Link href={project.links.github} className="hover:text-primary">
              <Github className="h-6 w-6" />
            </Link>
          )}
          {project.links.live && (
            <Link href={project.links.live} className="hover:text-primary">
              <ExternalLink className="h-6 w-6" />
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
```

#### Grid Yapısı
```tsx
// src/app/calismalar/page.tsx
export default function ProjectsPage() {
  return (
    <PageLayout
      pageTitle={{
        title: "Çalışmalarım",
        description: "Geliştirdiğim projeler ve çalışmalar"
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </PageLayout>
  )
}
```

### 2.3 Anlar Sayfası (anlar/page.tsx)

#### Masonry Grid Yapısı
```tsx
// src/app/anlar/components/MasonryGrid.tsx
import { Masonry } from 'react-masonry-css'

const breakpointColumns = {
  default: 4,
  1280: 3,
  1024: 2,
  640: 1
}

export function MasonryGrid({ photos }: { photos: Photo[] }) {
  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="flex -ml-4 w-auto"
      columnClassName="pl-4 bg-clip-padding"
    >
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} />
      ))}
    </Masonry>
  )
}
```

#### Lightbox Entegrasyonu
```tsx
// src/app/anlar/components/PhotoCard.tsx
'use client'

import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'

export function PhotoCard({ photo }: { photo: Photo }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="relative mb-4 cursor-pointer group"
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          className="rounded-lg"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
          <div className="absolute bottom-4 left-4 text-white">
            <p className="font-medium">{photo.caption}</p>
            <p className="text-sm opacity-80">{photo.location}</p>
          </div>
        </div>
      </div>

      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={[{ src: photo.src }]}
      />
    </>
  )
}
```

### 2.4 Ekipmanlar Sayfası (ekipmanlar/page.tsx)

#### Kategori Yapısı
```typescript
// src/app/ekipmanlar/types.ts
interface Equipment {
  id: string;
  name: string;
  description: string;
  image: string;
  category: 'camera' | 'lens' | 'audio' | 'computer' | 'other';
  specs: {
    label: string;
    value: string;
  }[];
  purchaseDate: string;
  purchasePrice?: number;
  links?: {
    review?: string;
    purchase?: string;
  };
}

// src/app/ekipmanlar/data.ts
const categories = [
  {
    id: 'camera',
    label: 'Kamera Ekipmanları',
    icon: Camera,
  },
  {
    id: 'lens',
    label: 'Lensler',
    icon: Aperture,
  },
  // ... diğer kategoriler
] as const;
```

#### Ekipman Kartı
```tsx
// src/app/ekipmanlar/components/EquipmentCard.tsx
export function EquipmentCard({ equipment }: { equipment: Equipment }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="group relative rounded-xl overflow-hidden cursor-pointer"
      >
        <div className="aspect-square relative">
          <Image
            src={equipment.image}
            alt={equipment.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="font-medium">{equipment.name}</h3>
            <p className="text-sm opacity-80">{equipment.category}</p>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={equipment.name}
      >
        <div className="space-y-4">
          <Image
            src={equipment.image}
            alt={equipment.name}
            width={600}
            height={400}
            className="rounded-lg"
          />
          <p className="text-muted-foreground">{equipment.description}</p>
          <div className="grid grid-cols-2 gap-4">
            {equipment.specs.map((spec) => (
              <div key={spec.label}>
                <dt className="text-sm text-muted-foreground">{spec.label}</dt>
                <dd className="font-medium">{spec.value}</dd>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  )
}
```

### 2.5 Okuma Listesi (okuyorum/page.tsx)

#### Kitap Verisi ve Filtreleme
```typescript
// src/app/okuyorum/types.ts
interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  status: 'reading' | 'completed' | 'want-to-read';
  startDate?: string;
  endDate?: string;
  rating?: number;
  review?: string;
  tags: string[];
}

// src/app/okuyorum/components/BookFilter.tsx
export function BookFilter({
  activeStatus,
  onStatusChange,
}: {
  activeStatus: Book['status'] | 'all';
  onStatusChange: (status: Book['status'] | 'all') => void;
}) {
  return (
    <div className="flex gap-2 mb-8">
      {['all', 'reading', 'completed', 'want-to-read'].map((status) => (
        <button
          key={status}
          onClick={() => onStatusChange(status as Book['status'] | 'all')}
          className={clsx(
            'px-4 py-2 rounded-full text-sm font-medium transition-colors',
            activeStatus === status
              ? 'bg-primary text-white'
              : 'bg-card hover:bg-card/80'
          )}
        >
          {status === 'all' ? 'Tümü' : 
           status === 'reading' ? 'Okuyorum' :
           status === 'completed' ? 'Tamamlandı' : 'Okumak İstiyorum'}
        </button>
      ))}
    </div>
  )
}
```

#### Kitap Kartı
```tsx
// src/app/okuyorum/components/BookCard.tsx
export function BookCard({ book }: { book: Book }) {
  return (
    <div className="group relative">
      {/* Kitap Kapağı */}
      <div className="aspect-[2/3] relative rounded-lg overflow-hidden">
        <Image
          src={book.cover}
          alt={book.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Kitap Bilgileri */}
      <div className="absolute bottom-0 p-4 w-full">
        <h3 className="text-lg font-medium text-white">{book.title}</h3>
        <p className="text-white/80 text-sm">{book.author}</p>
        
        {/* Durum Etiketi */}
        <div className="mt-2">
          <span className={clsx(
            'px-2 py-1 rounded-full text-xs font-medium',
            book.status === 'reading' && 'bg-primary/20 text-primary',
            book.status === 'completed' && 'bg-green-500/20 text-green-500',
            book.status === 'want-to-read' && 'bg-yellow-500/20 text-yellow-500'
          )}>
            {book.status === 'reading' ? 'Okuyorum' :
             book.status === 'completed' ? 'Tamamlandı' : 
             'Okumak İstiyorum'}
          </span>
        </div>

        {/* Değerlendirme */}
        {book.rating && (
          <div className="mt-2 flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={clsx(
                  'h-4 w-4',
                  i < book.rating! ? 'text-yellow-500 fill-current' : 'text-gray-400'
                )}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
```

## 3. Bileşen Yapıları

### 3.1 Timeline Tasarımı
```tsx
{/* Ana timeline çizgisi */}
<div className="absolute left-[11px] top-0 h-full w-[2px] bg-gradient-to-b from-[renk]/5 via-[renk]/5 to-transparent" />

{/* Bağlantı çizgisi */}
<div className="absolute left-[11px] top-4 h-[2px] w-6 bg-gradient-to-r from-[renk]/5 to-[renk]/40 group-hover:from-[renk]/20 group-hover:to-[renk] transition-all duration-500" />

{/* Timeline noktası */}
<div className="absolute left-0 top-2">
  <div className="relative flex items-center justify-center">
    {/* Dış çerçeve */}
    <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-[renk]/10 to-transparent rotate-45 transition-all duration-300 group-hover:from-[renk]/30 group-hover:rotate-90" />
    {/* İç çerçeve */}
    <div className="absolute inset-1 rounded-lg bg-gradient-to-br from-[renk]/5 to-transparent rotate-45 transition-all duration-300 group-hover:from-[renk]/20 group-hover:-rotate-90" />
    {/* Merkez nokta */}
    <div className="absolute inset-2 rounded-md bg-[renk]/10 group-hover:bg-[renk]/30 transition-all duration-300" />
  </div>
</div>
```

### 3.2 Kart Tasarımı
```tsx
<section className="group relative rounded-xl bg-gradient-to-br from-white/5 to-transparent p-6 backdrop-blur-2xl transition-all duration-500 hover:bg-white/10 dark:bg-black/10 dark:hover:bg-black/20">
  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[renk]/5 via-transparent to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
  <div className="absolute inset-0 rounded-xl ring-1 ring-black/5 ring-inset dark:ring-white/5" />
  <div className="relative">
    {/* İçerik */}
  </div>
</section>
```

## 4. Tasarım Sistemi

### 4.1 Renk Paleti
```css
:root {
  --primary: #0ea5e9;    /* Ana renk */
  --secondary: #8b5cf6;  /* İkincil renk */
  --accent: #10b981;     /* Vurgu rengi */
  --background: #ffffff; /* Arka plan */
  --foreground: #020817; /* Ön plan */
  --muted: #64748b;     /* Soluk metin */
  --card: #ffffff;      /* Kart arka planı */
  --border: #e2e8f0;    /* Kenarlık */
}

.dark {
  --background: #020817;
  --foreground: #ffffff;
  --card: #1e293b;
  --border: #334155;
}
```

### 4.2 Özel Bileşenler
```tsx
// Button bileşeni
<Button
  variant="default | secondary | outline | ghost"
  size="sm | default | lg"
  className="custom-styles"
>
  İçerik
</Button>

// Card bileşeni
<Card>
  <CardHeader>
    <CardTitle>Başlık</CardTitle>
    <CardDescription>Açıklama</CardDescription>
  </CardHeader>
  <CardContent>İçerik</CardContent>
  <CardFooter>Alt Bilgi</CardFooter>
</Card>
```

## 5. Sayfa Geçişleri ve Animasyonlar

### 5.1 Sayfa Geçiş Efektleri
```tsx
'use client';

import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export default function PageWrapper({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
```

### 5.2 Bileşen Animasyonları
- Scroll bazlı görünüm animasyonları
- Hover efektleri
- Loading state animasyonları

## 6. Veri Yönetimi

### 6.1 CV Verisi
```typescript
interface CVData {
  name: string;
  title: string;
  summary: string;
  contact: {
    email: string;
    phone: string;
    location: string;
    website: string;
    social: {
      linkedin: string;
      twitter: string;
      instagram: string;
      github: string;
    };
    additionalInfo: string[];
  };
  experience: {
    company: string;
    position: string;
    date: string;
    description?: string;
  }[];
  education: {
    school: string;
    degree: string;
    field?: string;
    date: string;
  }[];
  certifications: {
    name: string;
    institution: string;
    date: string;
  }[];
  skills: {
    softSkills: string[];
    technical: {
      programs: string[];
      webDevelopment: string[];
    };
  };
}
```

### 6.2 Projeler Verisi
```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  links: {
    github?: string;
    live?: string;
    article?: string;
  };
  featured: boolean;
}
```

### 6.3 Fotoğraf Galerisi Verisi
```typescript
interface Photo {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  date: string;
  location?: string;
}
```

## 7. SEO ve Metadata

### 7.1 Sayfa Metadata
```tsx
export const metadata = {
  title: {
    default: "Site Başlığı",
    template: "%s | Site Başlığı"
  },
  description: "Sayfa açıklaması",
  openGraph: {
    title: "OG Başlık",
    description: "OG Açıklama",
    images: ["/og-image.png"]
  }
};
```

### 7.2 Robots.txt
```txt
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://site.com/sitemap.xml
```

## 8. Performans Optimizasyonu

### 8.1 İyi Uygulamalar
- Görüntü optimizasyonu için next/image kullanımı
- Gereksiz re-render'ları önlemek için memo kullanımı
- Tailwind JIT compiler kullanımı
- SVG ikonların inline kullanımı

### 8.2 SEO Optimizasyonu
- Semantic HTML kullanımı
- Meta etiketlerinin doğru kullanımı
- Erişilebilirlik kurallarına uyum
- Schema markup eklenmesi

## 9. Erişilebilirlik

### 9.1 ARIA Etiketleri
- Tüm etkileşimli elementler için aria-label
- Bölümler için aria-labelledby
- Modal ve drawer'lar için aria-modal
- Dinamik içerik için aria-live

### 9.2 Klavye Navigasyonu
- Tab index yönetimi
- Focus yönetimi
- Klavye kısayolları

## 10. Dağıtım ve CI/CD

### 10.1 Vercel Dağıtımı
- Otomatik dağıtım
- Environment variables
- Edge functions
- Image optimization

### 10.2 GitHub Actions
- Lint ve test kontrolleri
- Otomatik dağıtım
- Pull request kontrolleri 