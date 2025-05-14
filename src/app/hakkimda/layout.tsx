import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımda | Metin Faruk Bıyık - Geliştirici",
  description: "Trabzon'da yaşayan, web teknolojileri ve modern uygulama geliştirme alanında çalışan Metin Faruk Bıyık'ın kişisel web sitesi. Turkcell Global Bilgi'de Takım Koçu olarak görev yapıyor.",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://biyik.dev/hakkimda",
    title: "Hakkımda | Metin Faruk Bıyık - Geliştirici",
    description: "Trabzon'da yaşayan, web teknolojileri ve modern uygulama geliştirme alanında çalışan Metin Faruk Bıyık'ın kişisel web sitesi. Turkcell Global Bilgi'de Takım Koçu olarak görev yapıyor.",
    siteName: "Metin Faruk Bıyık - Geliştirici",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hakkımda | Metin Faruk Bıyık - Geliştirici",
    description: "Trabzon'da yaşayan, web teknolojileri ve modern uygulama geliştirme alanında çalışan Metin Faruk Bıyık'ın kişisel web sitesi.",
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