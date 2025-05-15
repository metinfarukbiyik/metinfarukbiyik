import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anılar | Metin Faruk Bıyık - Geliştirici",
  description:
    "Hayatımdan küçük kesitler, değer verdiğim anılar ve beni etkileyen deneyimlerin kısa hikayeleri.",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://biyik.dev/anilar",
    title: "Anılar | Metin Faruk Bıyık - Geliştirici",
    description:
      "Hayatımdan küçük kesitler, değer verdiğim anılar ve beni etkileyen deneyimlerin kısa hikayeleri.",
    siteName: "Metin Faruk Bıyık - Geliştirici",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anılar | Metin Faruk Bıyık - Geliştirici",
    description:
      "Hayatımdan küçük kesitler, değer verdiğim anılar ve beni etkileyen deneyimlerin kısa hikayeleri.",
  },
};

export default function AnilarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 