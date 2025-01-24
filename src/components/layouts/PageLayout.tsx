"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { PageTitleProps } from "@/types";
import PageTitle from "@/components/PageTitle";
import Footer from "@/components/Footer";
import BackgroundDots from "@/components/BackgroundDots";

interface PageLayoutProps {
  children: React.ReactNode;
  pageTitle?: PageTitleProps;
}

export default function PageLayout({ children, pageTitle }: PageLayoutProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-background via-background/95 to-background/90 overflow-x-hidden">
      {/* Dekoratif Arka Plan */}
      <BackgroundDots />

      {/* Container */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Profil Fotoğrafı - Navigation ile aynı hizada */}
        {!isHome && (
          <motion.div
            layoutId="profile-image"
            className="fixed top-4 z-50 hidden md:block"
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 25
            }}
          >
            <div className="relative h-[40px] w-[40px] shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-primary/5 via-primary/10 to-transparent backdrop-blur-xl shadow-lg shadow-primary/10 dark:shadow-primary/5">
              {/* Dekoratif Kenarlar ve Parlaklık */}
              <div className="absolute -inset-[0.5px] rounded-full bg-gradient-to-b from-white/50 via-white/20 to-white/30 dark:from-white/20 dark:via-white/10 dark:to-white/5 opacity-50" />
              <div className="absolute -inset-[1px] rounded-full bg-gradient-to-br from-primary/30 via-primary/20 to-transparent" />
              <div className="absolute -inset-[1.5px] rounded-full bg-gradient-to-br from-white/20 via-transparent to-primary/10 blur-[0.5px]" />
              
              {/* Dış Halkalar */}
              <div className="absolute -inset-2 rounded-full border border-white/20 dark:border-white/10" />
              <div className="absolute -inset-3 rounded-full border border-white/10 dark:border-white/5" />
              
              {/* İç Parlaklık */}
              <div className="absolute inset-[1px] rounded-full bg-gradient-to-br from-white/10 via-transparent to-primary/5" />
              
              {/* Görsel */}
              <div className="absolute inset-[2px] overflow-hidden rounded-full">
                <Image
                  src="/profile.jpg"
                  alt="Profile"
                  fill
                  className="object-cover"
                  sizes="40px"
                  priority
                />
                {/* Hafif Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10" />
              </div>
              
              {/* İnce Kenar Çizgisi */}
              <div className="absolute inset-0 rounded-full ring-1 ring-primary/10 bg-gradient-to-br from-white/20 via-transparent to-primary/10" />
            </div>
          </motion.div>
        )}

        <main className="flex-1">
          <div className="pb-16">
            {pageTitle && (
              <PageTitle
                title={pageTitle.title}
                description={pageTitle.description}
                variant={pageTitle.variant}
              >
                {pageTitle.children}
              </PageTitle>
            )}
            {children}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
} 