import Link from "next/link";
import { Home } from "lucide-react";
import PageLayout from "@/components/layouts/PageLayout";

export default function NotFound() {
  return (
    <PageLayout>
      <div className="flex min-h-[80vh] flex-col items-center justify-center p-8 text-center">
        <div className="space-y-6">
          {/* 404 Başlık */}
          <h1 className="relative text-[8rem] font-bold leading-none text-primary/20 sm:text-[12rem]">
            <span className="absolute inset-0 animate-float bg-gradient-to-b from-primary via-primary/50 to-transparent bg-clip-text text-transparent">
              404
            </span>
            404
          </h1>

          {/* Açıklama */}
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-card-foreground sm:text-3xl">
              Sayfa Bulunamadı
            </h2>
            <p className="text-base text-muted-foreground sm:text-lg">
              Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
            </p>
          </div>

          {/* Ana Sayfaya Dön Butonu */}
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary transition-colors hover:bg-primary/20"
          >
            <Home className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
            <span>Ana Sayfaya Dön</span>
          </Link>
        </div>
      </div>
    </PageLayout>
  );
} 