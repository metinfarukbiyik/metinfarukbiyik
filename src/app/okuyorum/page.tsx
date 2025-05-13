"use client";

import Image from "next/image";
import { booksData } from "@/data/books";
import { BookOpen, BookMarked } from "lucide-react";
import PageLayout from "@/components/layouts/PageLayout";
import { Book } from "@/types";
import { motion } from "framer-motion";

function BookCard({ book, isRead = true }: { book: Book; isRead?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-xl bg-white/[0.02] dark:bg-black/[0.02] shadow-sm hover:shadow-md transition-all duration-300 border border-black/5 dark:border-white/5"
    >      
      {/* Kitap Görseli */}
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        <Image
          src={book.image}
          alt={book.title}
          fill
          loading="lazy"
          className={`object-cover transition-transform duration-300 group-hover:scale-[1.02] ${!isRead && 'grayscale hover:grayscale-0'}`}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Kitap Bilgileri */}
      <div className="p-4">
        <h3 className="font-medium text-sm text-black/90 dark:text-white/90 line-clamp-2 group-hover:text-primary/90">
          {book.title}
        </h3>
        <p className="text-xs text-black/60 dark:text-white/60 line-clamp-1 mt-1">
          {book.author}
        </p>
      </div>
    </motion.div>
  );
}

export default function OkuyorumPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <PageLayout
      pageTitle={{
        title: "Oku/Yorum",
        description: "Kişisel okuma yolculuğumda, tamamladığım ve gelecekte keşfetmeyi planladığım kitapların bir koleksiyonu. Her bir kitap, bilgi birikimime ve dünya görüşüme katkıda bulunan değerli bir kaynak."
      }}
    >
      {/* Okuduklarım */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-12"
      >
        <div className="flex items-center gap-3 mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 dark:bg-primary/10"
          >
            <BookOpen className="h-5 w-5 text-primary" />
          </motion.div>
          <h2 className="text-2xl font-semibold text-primary">
            Okuduklarım
          </h2>
        </div>
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          {booksData.read.map((book) => (
            <BookCard key={book.id} book={book} isRead={true} />
          ))}
        </motion.div>
      </motion.div>

      {/* Okuyacaklarım */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-16"
      >
        <div className="flex items-center gap-3 mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/5 dark:bg-secondary/10"
          >
            <BookMarked className="h-5 w-5 text-secondary" />
          </motion.div>
          <h2 className="text-2xl font-semibold text-secondary">
            Okuyacaklarım
          </h2>
        </div>
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          {booksData.toRead.map((book) => (
            <BookCard key={book.id} book={book} isRead={false} />
          ))}
        </motion.div>
      </motion.div>
    </PageLayout>
  );
} 