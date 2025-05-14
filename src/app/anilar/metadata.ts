import { Metadata } from "next";
import { momentsData } from "@/data/moments";

export const metadata: Metadata = {
  title: "Anılar | Metin Faruk Bıyık - Geliştirici",
  description: "Hayatımdan özel anılar, fotoğraflar ve hatıralar. Her bir fotoğraf bir hikaye, her bir anı bir deneyim.",
  keywords: [
    "Metin Faruk Bıyık Anıları",
    "Kişisel Blog",
    "Fotoğraf Galerisi",
    "Yaşam Hikayeleri",
    "Trabzon Anıları",
    "Dijital Günlük",
    "Yaşam Deneyimleri"
  ],
  alternates: {
    canonical: "https://biyik.dev/anilar"
  },
  openGraph: {
    title: "Anılar | Metin Faruk Bıyık - Geliştirici",
    description: "Hayatımdan özel anılar, fotoğraflar ve hatıralar. Her bir fotoğraf bir hikaye, her bir anı bir deneyim.",
    url: "https://biyik.dev/anilar",
    type: "website",
    locale: "tr_TR",
    images: momentsData.map((moment) => ({
      url: moment.images[0].url,
      width: 1200,
      height: 630,
      alt: moment.title
    }))
  },
  twitter: {
    card: "summary_large_image",
    title: "Anılar | Metin Faruk Bıyık - Geliştirici",
    description: "Hayatımdan özel anılar, fotoğraflar ve hatıralar.",
    creator: "@_metinbiyik",
    images: [momentsData[0].images[0].url]
  },
  category: "Blog",
  applicationName: "Metin Faruk Bıyık - Kişisel Web Sitesi"
}; 