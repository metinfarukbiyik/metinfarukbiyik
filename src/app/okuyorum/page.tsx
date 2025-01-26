import Image from "next/image";
import { booksData } from "@/data/books";
import { BookOpen, BookMarked } from "lucide-react";
import PageLayout from "@/components/layouts/PageLayout";
import { Book } from "@/types";
import { Metadata } from "next";

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

function BookCard({ book, isRead = true }: { book: Book; isRead?: boolean }) {
  return (
    <div
      className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white/[0.075] via-white/[0.035] to-transparent dark:from-black/[0.075] dark:via-black/[0.035] dark:to-transparent backdrop-blur-md shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-black/10 dark:border-white/10"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${
        isRead ? 'from-primary/[0.02] to-secondary/[0.02]' : 'from-secondary/[0.02] to-primary/[0.02]'
      } opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      {/* Kitap Görseli */}
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        <Image
          src={book.image}
          alt={book.title}
          fill
          loading="lazy"
          className={`object-cover transition-all duration-500 group-hover:scale-105 ${!isRead && 'grayscale'}`}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Kitap Bilgileri */}
      <div className="p-3">
        <h3 className="font-medium text-sm text-card-foreground line-clamp-2">
          {book.title}
        </h3>
        <p className="text-xs text-muted-foreground/90 line-clamp-1 mt-0.5">
          {book.author}
        </p>
      </div>

      {/* Dekoratif Kenar Efekti */}
      <div className="absolute inset-[-1px] bg-gradient-to-br from-black/[0.1] to-transparent dark:from-white/[0.05] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
}

export default function OkuyorumPage() {
  return (
    <PageLayout
      pageTitle={{
        title: "Oku/Yorum",
        description: "Kişisel okuma yolculuğumda, tamamladığım ve gelecekte keşfetmeyi planladığım kitapların bir koleksiyonu. Her bir kitap, bilgi birikimime ve dünya görüşüme katkıda bulunan değerli bir kaynak."
      }}
    >
      {/* Okuduklarım */}
      <div className="mt-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-xl">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Okuduklarım
          </h2>
        </div>
        <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {booksData.read.map((book) => (
            <BookCard key={book.id} book={book} isRead={true} />
          ))}
        </div>
      </div>

      {/* Okuyacaklarım */}
      <div className="mt-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/10 backdrop-blur-xl">
            <BookMarked className="h-5 w-5 text-secondary" />
          </div>
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-secondary to-secondary/80 bg-clip-text text-transparent">
            Okuyacaklarım
          </h2>
        </div>
        <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {booksData.toRead.map((book) => (
            <BookCard key={book.id} book={book} isRead={false} />
          ))}
        </div>
      </div>
    </PageLayout>
  );
} 