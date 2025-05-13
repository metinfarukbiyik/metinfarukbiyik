"use client";

import Image from "next/image";
import { booksData } from "@/data/books";
import { BookOpen, BookMarked, User, BookText, Sparkles, ScrollText } from "lucide-react";
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
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.01] to-transparent dark:from-white/[0.005] dark:to-transparent backdrop-blur-3xl"
    >      
      {/* Kitap Görseli */}
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        <div className="absolute -inset-1 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 dark:from-primary/5 dark:to-secondary/5 opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-700 z-0" />
        <Image
          src={book.image}
          alt={book.title}
          fill
          loading="lazy"
          className={`object-cover transition-all duration-500 group-hover:scale-[1.02] relative z-10 ${!isRead && 'grayscale hover:grayscale-0'}`}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-20" />
      </div>

      {/* Kitap Bilgileri */}
      <div className="relative space-y-2.5 p-4 bg-white/[0.02] dark:bg-black/[0.02] backdrop-blur-lg">
        {/* Başlık */}
        <div className="flex items-start gap-2">
          <BookText className="h-3.5 w-3.5 text-primary/60 mt-0.5 flex-shrink-0 transition-colors duration-300 group-hover:text-primary/80" />
          <h3 className="font-medium text-sm text-black/80 dark:text-white/80 line-clamp-2 group-hover:text-primary/90 transition-colors duration-300">
            {book.title}
          </h3>
        </div>

        {/* Yazar */}
        <div className="flex items-center gap-2">
          <User className="h-3.5 w-3.5 text-secondary/60 flex-shrink-0 transition-colors duration-300 group-hover:text-secondary/80" />
          <p className="text-xs text-black/50 dark:text-white/50 line-clamp-1 group-hover:text-secondary/90 transition-colors duration-300">
            {book.author}
          </p>
        </div>
      </div>

      {/* İnce Kenar Çizgisi */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/[0.02] dark:ring-white/[0.02] group-hover:ring-primary/5 dark:group-hover:ring-primary/5 transition-all duration-500" />
      
      {/* Hover Efekti */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/[0.02] to-secondary/[0.02] opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
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
        <div className="flex items-center gap-4 mb-10">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="relative group"
          >
            <div className="absolute -inset-3 bg-gradient-to-br from-primary/20 to-transparent dark:from-primary/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent backdrop-blur-xl transition-all duration-300">
              <BookOpen className="h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110" />
            </div>
          </motion.div>
          <div className="space-y-1">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent flex items-center gap-2"
            >
              Okuduklarım
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Sparkles className="h-4 w-4 text-primary/60" />
              </motion.div>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm text-black/40 dark:text-white/40"
            >
              Tamamladığım ve bana ilham veren kitaplar
            </motion.p>
          </div>
        </div>
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
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
        className="mt-20"
      >
        <div className="flex items-center gap-4 mb-10">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="relative group"
          >
            <div className="absolute -inset-3 bg-gradient-to-br from-secondary/20 to-transparent dark:from-secondary/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-secondary/5 to-transparent dark:from-secondary/10 dark:to-transparent backdrop-blur-xl transition-all duration-300">
              <ScrollText className="h-5 w-5 text-secondary transition-transform duration-300 group-hover:scale-110" />
            </div>
          </motion.div>
          <div className="space-y-1">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-2xl font-semibold bg-gradient-to-r from-secondary to-secondary/70 bg-clip-text text-transparent flex items-center gap-2"
            >
              Okuyacaklarım
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <BookMarked className="h-4 w-4 text-secondary/60" />
              </motion.div>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-sm text-black/40 dark:text-white/40"
            >
              Keşfetmeyi planladığım ve merakla beklediğim kitaplar
            </motion.p>
          </div>
        </div>
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          {booksData.toRead.map((book) => (
            <BookCard key={book.id} book={book} isRead={false} />
          ))}
        </motion.div>
      </motion.div>
    </PageLayout>
  );
} 