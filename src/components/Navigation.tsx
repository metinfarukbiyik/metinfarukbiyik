"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Home, Monitor, Code, Camera, Book, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const links = [
  {
    href: "/",
    label: "Ana Sayfa",
    title: "Ana Sayfa - Metin Faruk Bıyık'ın kişisel web sitesi",
    icon: Home,
  },
  {
    href: "/hakkimda",
    label: "Hakkımda",
    title: "Hakkımda - Metin Faruk Bıyık kimdir?",
    icon: User,
  },
  {
    href: "/ekipmanlar",
    label: "Ekipmanlar",
    title: "Ekipmanlar - Kullandığım teknolojiler ve araçlar",
    icon: Monitor,
  },
  {
    href: "/calismalar",
    label: "Çalışmalar",
    title: "Çalışmalar - Geliştirdiğim projeler ve kullandığım teknolojiler",
    icon: Code,
  },
  {
    href: "/anilar",
    label: "Anılar",
    title: "Anılar - Hayatımdan özel anılar ve fotoğraflar",
    icon: Camera,
  },
  {
    href: "/okuyorum",
    label: "Oku/Yorum",
    title: "Okuyorum - Okuduğum ve okumayı planladığım kitaplar",
    icon: Book,
  },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll durumunu takip et
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Masaüstü Menü */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={cn(
          "fixed top-4 left-0 right-0 z-50 mx-auto w-fit hidden md:block transition-all duration-500",
          isScrolled && "top-2 scale-[0.97]"
        )}
      >
        <nav className="flex items-center gap-1 rounded-full bg-white/[0.08] p-1.5 backdrop-blur-xl dark:bg-black/[0.08] ring-1 ring-black/5 dark:ring-white/5 shadow-lg shadow-black/[0.03] dark:shadow-white/[0.03]">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            
            return (
              <Link
                key={link.href}
                href={link.href}
                title={link.title}
                className={cn(
                  "relative px-4 py-2.5 text-sm transition-all duration-300 rounded-full flex items-center gap-2 overflow-hidden",
                  isActive
                    ? "text-white dark:text-black font-medium"
                    : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="bubble"
                    className="absolute inset-0 bg-black dark:bg-white"
                    transition={{ 
                      type: "spring",
                      bounce: 0.15,
                      duration: 0.5
                    }}
                  />
                )}
                <motion.div
                  initial={false}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    color: isActive ? "currentColor" : "currentColor"
                  }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10"
                >
                  <Icon className="h-4 w-4" />
                </motion.div>
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </motion.div>

      {/* Mobil Menü */}
      <div className={cn(
        "fixed top-4 left-4 z-50 md:hidden transition-all duration-300",
        isScrolled && "top-2"
      )}>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 rounded-full bg-white/[0.08] px-4 py-2.5 text-sm text-black/80 ring-1 ring-black/5 backdrop-blur-xl dark:bg-black/[0.08] dark:text-white/80 dark:ring-white/5 transition-all duration-300 hover:bg-white/[0.12] dark:hover:bg-white/[0.03] hover:ring-black/10 dark:hover:ring-white/10 shadow-lg shadow-black/[0.03] dark:shadow-white/[0.03]"
        >
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40"
                onClick={() => setIsOpen(false)}
              />

              <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 left-0 bottom-0 w-72 bg-white/90 dark:bg-black/90 backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/5 shadow-2xl z-50"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-4 border-b border-black/5 dark:border-white/5">
                    <motion.h2 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-sm font-medium bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
                    >
                      Menü
                    </motion.h2>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsOpen(false)}
                      className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </motion.button>
                  </div>

                  <div className="flex-1 overflow-y-auto py-4">
                    <div className="px-3 space-y-1">
                      {links.map((link, index) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        
                        return (
                          <motion.div
                            key={link.href}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 + 0.1 }}
                          >
                            <Link
                              href={link.href}
                              onClick={() => setIsOpen(false)}
                              className={cn(
                                "flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-all duration-300 relative overflow-hidden",
                                isActive
                                  ? "text-white dark:text-black font-medium"
                                  : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                              )}
                            >
                              {isActive && (
                                <motion.div
                                  layoutId="mobile-bubble"
                                  className="absolute inset-0 bg-black dark:bg-white"
                                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                                />
                              )}
                              <motion.div
                                initial={false}
                                animate={{
                                  scale: isActive ? 1.1 : 1,
                                  color: isActive ? "currentColor" : "currentColor"
                                }}
                                transition={{ duration: 0.2 }}
                                className="relative z-10"
                              >
                                <Icon className="h-4 w-4" />
                              </motion.div>
                              <span className="relative z-10">{link.label}</span>
                            </Link>
                          </motion.div>
                        );
                      })}
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