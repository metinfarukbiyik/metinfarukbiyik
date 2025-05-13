import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anlar | Metin Faruk Bıyık - Geliştirici",
  description:
    "Hayatımdan küçük kesitler, değer verdiğim anılar ve beni etkileyen deneyimlerin kısa hikayeleri.",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://biyik.dev/anlar",
    title: "Anlar | Metin Faruk Bıyık - Geliştirici",
    description:
      "Hayatımdan küçük kesitler, değer verdiğim anılar ve beni etkileyen deneyimlerin kısa hikayeleri.",
    siteName: "Metin Faruk Bıyık - Geliştirici",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anlar | Metin Faruk Bıyık - Geliştirici",
    description:
      "Hayatımdan küçük kesitler, değer verdiğim anılar ve beni etkileyen deneyimlerin kısa hikayeleri.",
  },
};

export default function AnlarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 