export interface Image {
  url: string;
  alt?: string;
}

export interface Date {
  day: number;
  month: number;
  year: number;
}

export interface Moment {
  id: string;
  images: Image[];
  title: string;
  date: string; // "GG.AA.YYYY" formatında
  location?: string;
  description?: string;
}

export const momentsData: Moment[] = [
  {
    id: "1",
    images: [
      { url: "/images/moments/photo1.jpg", alt: "Mangal" },
      { url: "/images/moments/photo2.jpg", alt: "Elif & Metin" },
    ],
    title: "Kurt Dere Yaylası Mangal",
    date: "11.01.2025",
    location: "Trabzon, Türkiye",
    description: `Hafta sonu doğa yürüyüşü ve mangal. Çok güzel bir gün. 
                  Birlikte yaptığımız en güzel aktivite.`
  },
  {
    id: "2",
    images: [
      { url: "/images/moments/isteme.JPG", alt: "İsteme" },
    ],
    title: "İsteme Merasimi",
    date: "08.12.2024",
    location: "Trabzon, Türkiye",
    description: `Kız isteme merasiminden bir kare. 🙂`
  },
  {
    id: "3",
    images: [
      { url: "/images/moments/nisantoreni.jpg", alt: "İsteme" },
      { url: "/images/moments/nisantoreni2.jpg", alt: "İsteme" },
    ],
    title: "Elif & Metin Nişan Töreni",
    date: "05.04.2025",
    location: "Trabzon, Türkiye",
    description: `Elif & Metin'in nişan töreninden bir kare. 🙂 05.04.2025 tarihinde yapıldı.`
  }
]; 