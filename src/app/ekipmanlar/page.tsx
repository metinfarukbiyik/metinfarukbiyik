"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { setupData } from "@/data/setup";
import PageLayout from "@/components/layouts/PageLayout";
import { Monitor, Laptop, Smartphone, Keyboard, Mouse, Headphones, Speaker, Armchair } from "lucide-react";

// İkon eşleştirmeleri
const itemIcons: { [key: string]: any } = {
  "MacBook Air M2": Laptop,
  "DELL P3223QE 31,5\" 4K": Monitor,
  "iPhone 14 Pro Max": Smartphone,
  "Logitech MX Keys Keyboard": Keyboard,
  "Logitech MX Master 3 Mouse": Mouse,
  "xDrive Fırtına Gaming Chair": Armchair,
  "JBL 720BT Headphones": Headphones,
  "JBL Flip6 Speaker": Speaker,
  "Samsung Soundbar": Speaker,
};

export default function SetupPage() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <PageLayout
      pageTitle={{
        title: "Ekipmanlarım",
        description: "Günlük hayatımda projelerimi inşa etmek, üretkenliğimi artırmak ve yaşamımı düzenlemek için kullandığım teknolojiler, araçlar ve ürünler. Bu bölümde, hangi ekipmanları kullandığımı görebilirsiniz."
      }}
    >
      {/* Ekipmanlar Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {setupData.bilgisayar.items.map((item, index) => {
          const Icon = itemIcons[item.name] || Monitor;
          
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              {/* Arka Plan Kartı */}
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/5 to-primary/20 dark:from-primary/10 dark:via-secondary/5 dark:to-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse" />
              
              {/* Ana Kart */}
              <div className="relative flex flex-col bg-gradient-to-br from-white to-white/80 dark:from-black dark:to-black/95 rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/[0.08] backdrop-blur-xl">
                {/* Üst Kısım - Görsel */}
                <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-black/[0.01] to-black/[0.08] dark:from-white/[0.01] dark:to-white/[0.05] p-8 overflow-hidden group-hover:from-black/[0.02] group-hover:to-black/[0.12] dark:group-hover:from-white/[0.02] dark:group-hover:to-white/[0.08] transition-colors duration-500">
                  {/* Dekoratif Çizgiler */}
                  <div className="absolute inset-0 bg-grid-black/[0.015] dark:bg-grid-white/[0.015] bg-[size:16px_16px]" />
                  
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: -1 }}
                    transition={{ 
                      duration: 0.4, 
                      ease: [0.23, 1, 0.32, 1] // Özel easing fonksiyonu
                    }}
                    className="relative h-full flex items-center justify-center"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-6 drop-shadow-xl"
                    />
                  </motion.div>
                </div>

                {/* Alt Kısım - Bilgiler */}
                <div className="relative p-6 bg-gradient-to-b from-white/50 to-white dark:from-black/50 dark:to-black">
                  {/* İkon ve Başlık */}
                  <div className="flex items-start gap-4">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0 p-3 rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10"
                    >
                      <Icon className="w-5 h-5 text-primary" />
                    </motion.div>
                    <div>
                      <h3 className="font-medium text-base text-black dark:text-white group-hover:text-primary/90 dark:group-hover:text-primary/90 transition-colors duration-300">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-sm text-black/60 dark:text-white/60">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hover Efekti için Kenar Çizgisi */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/[0.08] dark:ring-white/[0.08] group-hover:ring-black/[0.15] dark:group-hover:ring-white/[0.15] transition-all duration-300" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </PageLayout>
  );
} 