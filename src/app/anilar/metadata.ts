import { Metadata } from "next";
import { momentsData } from "@/data/moments";

export const metadata: Metadata = {
  title: "Anılar | Metin Faruk Bıyık",
  description: "Hayatımdan özel anılar, fotoğraflar ve hatıralar. Her bir fotoğraf bir hikaye, her bir anı bir deneyim. Yaşamımın önemli anlarını ve deneyimlerimi paylaştığım kişisel koleksiyon.",
  openGraph: {
    title: "Anılar | Metin Faruk Bıyık",
    description: "Hayatımdan özel anılar, fotoğraflar ve hatıralar. Her bir fotoğraf bir hikaye, her bir anı bir deneyim. Yaşamımın önemli anlarını ve deneyimlerimi paylaştığım kişisel koleksiyon.",
    type: "website",
    locale: "tr_TR",
    images: momentsData.map((moment) => ({
      url: moment.images[0].url,
      width: 1200,
      height: 630,
      alt: moment.title,
    })),
  },
  twitter: {
    card: "summary_large_image",
    title: "Anılar | Metin Faruk Bıyık",
    description: "Hayatımdan özel anılar, fotoğraflar ve hatıralar. Her bir fotoğraf bir hikaye, her bir anı bir deneyim. Yaşamımın önemli anlarını ve deneyimlerimi paylaştığım kişisel koleksiyon.",
  },
}; 