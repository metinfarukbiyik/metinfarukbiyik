import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ekipmanlarım | Metin Faruk Bıyık - Geliştirici",
  description:
    "Günlük hayatımda projelerimi inşa etmek, üretkenliğimi artırmak ve yaşamımı düzenlemek için kullandığım teknolojiler, araçlar ve ürünler.",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://biyik.dev/ekipmanlar",
    title: "Ekipmanlarım | Metin Faruk Bıyık - Geliştirici",
    description:
      "Günlük hayatımda projelerimi inşa etmek, üretkenliğimi artırmak ve yaşamımı düzenlemek için kullandığım teknolojiler, araçlar ve ürünler.",
    siteName: "Metin Faruk Bıyık - Geliştirici",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ekipmanlarım | Metin Faruk Bıyık - Geliştirici",
    description:
      "Günlük hayatımda projelerimi inşa etmek, üretkenliğimi artırmak ve yaşamımı düzenlemek için kullandığım teknolojiler, araçlar ve ürünler.",
  },
};

export default function EkipmanlarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 