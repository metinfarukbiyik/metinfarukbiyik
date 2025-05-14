import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Okuyorum | Metin Faruk Bıyık - Geliştirici",
  description: "Kişisel okuma yolculuğumda, tamamladığım ve gelecekte keşfetmeyi planladığım kitapların bir koleksiyonu. Her bir kitap, bilgi birikimime ve dünya görüşüme katkıda bulunan değerli bir kaynak.",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://biyik.dev/okuyorum",
    title: "Okuyorum | Metin Faruk Bıyık - Geliştirici",
    description: "Kişisel okuma yolculuğumda, tamamladığım ve gelecekte keşfetmeyi planladığım kitapların bir koleksiyonu. Her bir kitap, bilgi birikimime ve dünya görüşüme katkıda bulunan değerli bir kaynak.",
    siteName: "Metin Faruk Bıyık - Geliştirici",
  },
  twitter: {
    card: "summary_large_image",
    title: "Okuyorum | Metin Faruk Bıyık - Geliştirici",
    description: "Kişisel okuma yolculuğumda, tamamladığım ve gelecekte keşfetmeyi planladığım kitapların bir koleksiyonu. Her bir kitap, bilgi birikimime ve dünya görüşüme katkıda bulunan değerli bir kaynak.",
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