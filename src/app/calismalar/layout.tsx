import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Çalışmalar | Metin Faruk Bıyık - Geliştirici",
  description: "Web geliştirme, frontend ve modern teknolojiler alanında yaptığım projeler ve çalışmalar. React, Next.js ve modern web teknolojileri ile geliştirilen projeler.",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://biyik.dev/calismalar",
    title: "Çalışmalar | Metin Faruk Bıyık - Geliştirici",
    description: "Web geliştirme, frontend ve modern teknolojiler alanında yaptığım projeler ve çalışmalar. React, Next.js ve modern web teknolojileri ile geliştirilen projeler.",
    siteName: "Metin Faruk Bıyık - Geliştirici",
  },
  twitter: {
    card: "summary_large_image",
    title: "Çalışmalar | Metin Faruk Bıyık - Geliştirici",
    description: "Web geliştirme, frontend ve modern teknolojiler alanında yaptığım projeler ve çalışmalar.",
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