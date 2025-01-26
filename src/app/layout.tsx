import { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./providers";
import ThemeToggle from "@/components/ThemeToggle";
import Navigation from "@/components/Navigation";
import { outfit } from "./fonts";
import Script from "next/script";
import { AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL("https://biyik.dev"),
  title: "Metin Faruk Bıyık - Geliştirici",
  description: "Web teknolojileri ve modern uygulama geliştirme alanında kendini sürekli geliştiren, öğrenmeye ve paylaşmaya tutkulu bir geliştirici.",
  authors: [{ name: "Metin Faruk Bıyık", url: "https://biyik.dev" }],
  creator: "Metin Faruk Bıyık",
  publisher: "Metin Faruk Bıyık",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://biyik.dev",
    title: "Metin Faruk Bıyık - Geliştirici",
    description: "Web teknolojileri ve modern uygulama geliştirme alanında kendini sürekli geliştiren, öğrenmeye ve paylaşmaya tutkulu bir geliştirici.",
    siteName: "Metin Faruk Bıyık - Geliştirici",
  },
  twitter: {
    card: "summary_large_image",
    title: "Metin Faruk Bıyık - Geliştirici",
    description: "Web teknolojileri ve modern uygulama geliştirme alanında kendini sürekli geliştiren, öğrenmeye ve paylaşmaya tutkulu bir geliştirici.",
    creator: "@_metinbiyik",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning className={`${outfit.variable}`}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RDVEGG0ZB5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-RDVEGG0ZB5');
          `}
        </Script>
      </head>
      <body className={`${outfit.className} font-sans antialiased selection:bg-primary/10 selection:text-primary`}>
        <ThemeProvider>
          <div className="relative">
            <Navigation />
            <ThemeToggle />
            <AnimatePresence mode="wait">
              {children}
            </AnimatePresence>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
