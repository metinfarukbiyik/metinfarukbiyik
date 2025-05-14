import { Metadata } from "next";
import { booksData } from "@/data/books";

export const metadata: Metadata = {
  title: "Okuyorum | Metin Faruk Bıyık - Geliştirici",
  description: "Okuduğum kitaplar, kitap özetleri ve düşüncelerim. Kişisel gelişim, teknoloji ve edebiyat alanında okuma notları ve tavsiyeler.",
  keywords: [
    "Kitap Önerileri",
    "Kitap İncelemeleri",
    "Okuma Listesi",
    "Teknoloji Kitapları",
    "Kişisel Gelişim",
    "Metin Faruk Bıyık Kitap Tavsiyeleri",
    "Yazılımcı Okumaları"
  ],
  alternates: {
    canonical: "https://biyik.dev/okuyorum"
  },
  openGraph: {
    title: "Okuyorum | Metin Faruk Bıyık - Geliştirici",
    description: "Okuduğum kitaplar, kitap özetleri ve düşüncelerim. Kişisel gelişim, teknoloji ve edebiyat alanında okuma notları ve tavsiyeler.",
    url: "https://biyik.dev/okuyorum",
    type: "website",
    locale: "tr_TR",
    images: booksData.read.map((book) => ({
      url: book.image,
      width: 800,
      height: 1200,
      alt: book.title
    }))
  },
  twitter: {
    card: "summary_large_image",
    title: "Okuyorum | Metin Faruk Bıyık - Geliştirici",
    description: "Okuduğum kitaplar, kitap özetleri ve düşüncelerim.",
    creator: "@_metinbiyik",
    images: [booksData.read[0].image]
  },
  category: "Blog",
  applicationName: "Metin Faruk Bıyık - Kişisel Web Sitesi"
}; 