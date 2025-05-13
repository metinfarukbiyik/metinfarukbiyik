import { Metadata } from "next";
import { booksData } from "@/data/books";

export const metadata: Metadata = {
  title: "Okuyorum | Metin Faruk Bıyık",
  description: "Okuduğum, okumakta olduğum ve okumayı planladığım kitaplar. Kendimi geliştirmek için sürekli yeni şeyler öğreniyorum.",
  authors: [{ name: "Metin Faruk Bıyık", url: "https://biyik.dev" }],
  publisher: "Metin Faruk Bıyık",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Okuyorum | Metin Faruk Bıyık",
    description: "Okuduğum, okumakta olduğum ve okumayı planladığım kitaplar. Kendimi geliştirmek için sürekli yeni şeyler öğreniyorum.",
    images: [...booksData.read, ...booksData.toRead].map((book) => ({
      url: book.image,
      width: 1200,
      height: 630,
      alt: book.title,
    })),
  },
}; 