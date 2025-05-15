import { Metadata } from "next";
import { booksData } from "@/data/books";

export const metadata: Metadata = {
  title: "Oku/Yorum | Metin Faruk Bıyık",
  description: "Kişisel okuma yolculuğumda, tamamladığım ve gelecekte keşfetmeyi planladığım kitapların bir koleksiyonu. Her bir kitap, bilgi birikimime ve dünya görüşüme katkıda bulunan değerli bir kaynak.",
  authors: [{ name: "Metin Faruk Bıyık", url: "https://biyik.dev" }],
  publisher: "Metin Faruk Bıyık",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Oku/Yorum | Metin Faruk Bıyık",
    description: "Kişisel okuma yolculuğumda, tamamladığım ve gelecekte keşfetmeyi planladığım kitapların bir koleksiyonu. Her bir kitap, bilgi birikimime ve dünya görüşüme katkıda bulunan değerli bir kaynak.",
    type: "website",
    locale: "tr_TR",
    images: [...booksData.read, ...booksData.toRead].map((book) => ({
      url: book.image,
      width: 1200,
      height: 630,
      alt: book.title,
    })),
  },
  twitter: {
    card: "summary_large_image",
    title: "Oku/Yorum | Metin Faruk Bıyık",
    description: "Kişisel okuma yolculuğumda, tamamladığım ve gelecekte keşfetmeyi planladığım kitapların bir koleksiyonu. Her bir kitap, bilgi birikimime ve dünya görüşüme katkıda bulunan değerli bir kaynak.",
  },
}; 