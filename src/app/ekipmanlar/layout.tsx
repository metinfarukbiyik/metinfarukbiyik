import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ekipmanlar | Metin Faruk Bıyık - Geliştirici",
  description:
    "Günlük hayatımda projelerimi inşa etmek, üretkenliğimi artırmak ve yaşamımı düzenlemek için kullandığım teknolojiler, araçlar ve ürünler.",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://biyik.dev/ekipmanlar",
    title: "Ekipmanlar | Metin Faruk Bıyık - Geliştirici",
    description:
      "Günlük hayatımda projelerimi inşa etmek, üretkenliğimi artırmak ve yaşamımı düzenlemek için kullandığım teknolojiler, araçlar ve ürünler.",
    siteName: "Metin Faruk Bıyık - Geliştirici",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ekipmanlar | Metin Faruk Bıyık - Geliştirici",
    description:
      "Günlük hayatımda projelerimi inşa etmek, üretkenliğimi artırmak ve yaşamımı düzenlemek için kullandığım teknolojiler, araçlar ve ürünler.",
  },
};

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="relative min-h-screen">
      {children}
    </main>
  );
} 