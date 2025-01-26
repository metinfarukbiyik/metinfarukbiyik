import { Metadata } from "next";
import Image from "next/image";
import { setupData } from "@/data/setup";
import PageLayout from "@/components/layouts/PageLayout";

export const metadata: Metadata = {
  title: "Ekipmanlarım | Metin Faruk Bıyık",
  description: "Günlük hayatımda ve geliştirme süreçlerimde kullandığım ekipmanlar, yazılımlar ve araçlar.",
  openGraph: {
    title: "Ekipmanlarım | Metin Faruk Bıyık",
    description: "Günlük hayatımda ve geliştirme süreçlerimde kullandığım ekipmanlar, yazılımlar ve araçlar.",
  },
};

export default function SetupPage() {
  return (
    <PageLayout
      pageTitle={{
        title: "Ekipmanlarım",
        description: "Günlük hayatımda projelerimi inşa etmek, üretkenliğimi artırmak ve yaşamımı düzenlemek için kullandığım teknolojiler, araçlar ve ürünler. Bu bölümde, hangi ekipmanları kullandığımı görebilirsiniz."
      }}
    >
      {/* Ekipmanlar Grid */}
      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {setupData.bilgisayar.items.map((item, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/[0.05] via-white/[0.025] to-transparent dark:from-black/[0.05] dark:via-black/[0.025] dark:to-transparent backdrop-blur-md shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-black/10 dark:border-white/10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.01] to-secondary/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative p-6">
              <h3 className="font-medium text-card-foreground text-lg text-center mb-8 tracking-wide">
                {item.name}
              </h3>
              
              <div className="aspect-square relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent dark:from-black/[0.02] p-8 border border-black/5 dark:border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-secondary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain p-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-[2deg] filter brightness-[1.02] contrast-[1.02]"
                />
              </div>
            </div>

            {/* Dekoratif Kenar Efekti */}
            <div className="absolute inset-[-1px] bg-gradient-to-br from-black/[0.1] to-transparent dark:from-white/[0.05] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>
        ))}
      </div>
    </PageLayout>
  );
} 