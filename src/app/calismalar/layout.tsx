import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Çalışmalarım | Metin Faruk Bıyık",
  description: "Geliştirdiğim projeler, kullandığım teknolojiler ve yazılım alanındaki deneyimlerim. Her proje, profesyonel gelişimime katkı sağlayarak yeni beceriler edinmemi sağladı.",
  openGraph: {
    title: "Çalışmalarım | Metin Faruk Bıyık",
    description: "Geliştirdiğim projeler, kullandığım teknolojiler ve yazılım alanındaki deneyimlerim. Her proje, profesyonel gelişimime katkı sağlayarak yeni beceriler edinmemi sağladı.",
    type: "website",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Çalışmalarım | Metin Faruk Bıyık",
    description: "Geliştirdiğim projeler, kullandığım teknolojiler ve yazılım alanındaki deneyimlerim. Her proje, profesyonel gelişimime katkı sağlayarak yeni beceriler edinmemi sağladı.",
  },
};

export default function CalismalarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative min-h-screen">
      {/* Dekoratif Arka Plan */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/2 dark:to-secondary/2" />
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] bg-[size:20px_20px] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      
      {/* İçerik */}
      <div className="relative">
        {children}
      </div>
    </section>
  );
} 