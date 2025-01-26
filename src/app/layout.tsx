import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Metin Faruk Bıyık",
    default: "Metin Faruk Bıyık",
  },
  description: "Metin Faruk Bıyık'ın kişisel web sitesi",
  openGraph: {
    title: "Metin Faruk Bıyık",
    description: "Metin Faruk Bıyık'ın kişisel web sitesi",
    url: "https://biyik.dev",
    siteName: "Metin Faruk Bıyık",
  },
  metadataBase: new URL("https://biyik.dev"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="!scroll-smooth">
      <body className={inter.className}>
        <div className="relative min-h-screen bg-gradient-to-b from-white via-white to-white/95 text-black dark:from-black dark:via-black dark:to-black/95 dark:text-white">
          <Navigation />
          <main className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
