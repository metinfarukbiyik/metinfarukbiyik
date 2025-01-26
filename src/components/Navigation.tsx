"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const links = [
  {
    href: "/",
    label: "Ana Sayfa",
    title: "Ana Sayfa - Metin Faruk Bıyık'ın kişisel web sitesi",
  },
  {
    href: "/ekipmanlar",
    label: "Ekipmanlar",
    title: "Ekipmanlar - Kullandığım teknolojiler ve araçlar",
  },
  {
    href: "/anlar",
    label: "Anlar",
    title: "Anlar - Hayatımdan özel anlar ve fotoğraflar",
  },
  {
    href: "/okuyorum",
    label: "Oku/Yorum",
    title: "Oku/Yorum - Okuduğum ve okumayı planladığım kitaplar",
  },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Masaüstü Menü */}
      <div className="fixed top-4 left-0 right-0 z-50 mx-auto w-fit hidden md:block">
        <nav className="flex items-center gap-1 rounded-full bg-white/[0.075] p-1 backdrop-blur-xl dark:bg-black/[0.075] ring-1 ring-black/5 dark:ring-white/5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              title={link.title}
              className={cn(
                "relative px-4 py-2 text-sm transition-colors rounded-full",
                pathname === link.href
                  ? "text-black dark:text-white font-medium"
                  : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
              )}
            >
              {pathname === link.href && (
                <motion.div
                  layoutId="bubble"
                  className="absolute inset-0 bg-white dark:bg-black rounded-full mix-blend-difference"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative mix-blend-normal">{link.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobil Menü */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 rounded-full bg-white/[0.075] px-4 py-2.5 text-sm text-black/80 ring-1 ring-black/5 backdrop-blur-xl dark:bg-black/[0.075] dark:text-white/80 dark:ring-white/5 transition-all duration-300 hover:bg-white/[0.1] dark:hover:bg-white/[0.025] hover:ring-black/10 dark:hover:ring-white/10 active:scale-95"
        >
          {isOpen ? (
            <X className="h-4 w-4 transition-transform duration-200" />
          ) : (
            <Menu className="h-4 w-4 transition-transform duration-200" />
          )}
        </button>

        <AnimatePresence>
          {isOpen && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40"
                onClick={() => setIsOpen(false)}
              />

              {/* Menü İçeriği */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="fixed top-0 left-0 bottom-0 w-64 bg-white/80 dark:bg-black/80 backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/5 shadow-xl z-50"
              >
                <div className="flex flex-col h-full">
                  {/* Menü Başlığı */}
                  <div className="flex items-center justify-between p-4 border-b border-black/5 dark:border-white/5">
                    <h2 className="text-sm font-medium">Menü</h2>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Menü Linkleri */}
                  <div className="flex-1 overflow-y-auto py-4">
                    <div className="px-3 space-y-1">
                      {links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "flex items-center px-3 py-2 text-sm rounded-lg transition-colors relative",
                            {
                              "text-black dark:text-white font-medium": pathname === link.href,
                              "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5": pathname !== link.href,
                            }
                          )}
                        >
                          {pathname === link.href && (
                            <motion.div
                              layoutId="mobile-bubble"
                              className="absolute inset-0 bg-black/[0.04] dark:bg-white/[0.04] rounded-lg"
                              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                          )}
                          <span className="relative">{link.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
} 