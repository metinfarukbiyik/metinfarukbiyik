import { Metadata } from "next";
import { momentsData } from "@/data/moments";

export const metadata: Metadata = {
  title: "Anlar | Metin Faruk Bıyık",
  description: "Hayatımdan özel anlar, fotoğraflar ve hatıralar. Her bir fotoğraf bir hikaye, her bir an bir deneyim.",
  openGraph: {
    title: "Anlar | Metin Faruk Bıyık",
    description: "Hayatımdan özel anlar, fotoğraflar ve hatıralar. Her bir fotoğraf bir hikaye, her bir an bir deneyim.",
    images: momentsData.map((moment) => ({
      url: moment.images[0].url,
      width: 1200,
      height: 630,
      alt: moment.title,
    })),
  },
}; 