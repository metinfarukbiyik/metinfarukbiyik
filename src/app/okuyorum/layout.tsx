import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oku/Yorum | Metin Faruk Bıyık - Geliştirici",
  description:
    "Kişisel okuma yolculuğumda, tamamladığım ve gelecekte keşfetmeyi planladığım kitapların bir koleksiyonu. Her bir kitap, bilgi birikimime ve dünya görüşüme katkıda bulunan değerli bir kaynak.",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://biyik.dev/okuyorum",
    title: "Oku/Yorum | Metin Faruk Bıyık - Geliştirici",
    description:
      "Kişisel okuma yolculuğumda, tamamladığım ve gelecekte keşfetmeyi planladığım kitapların bir koleksiyonu. Her bir kitap, bilgi birikimime ve dünya görüşüme katkıda bulunan değerli bir kaynak.",
    siteName: "Metin Faruk Bıyık - Geliştirici",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oku/Yorum | Metin Faruk Bıyık - Geliştirici",
    description:
      "Kişisel okuma yolculuğumda, tamamladığım ve gelecekte keşfetmeyi planladığım kitapların bir koleksiyonu. Her bir kitap, bilgi birikimime ve dünya görüşüme katkıda bulunan değerli bir kaynak.",
  },
};

export default function OkuyorumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 