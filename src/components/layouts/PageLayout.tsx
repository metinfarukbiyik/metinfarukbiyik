"use client";

import { PageTitleProps } from "@/types";
import PageTitle from "@/components/PageTitle";
import Footer from "@/components/Footer";
import BackgroundDots from "@/components/BackgroundDots";

interface PageLayoutProps {
  children: React.ReactNode;
  pageTitle?: PageTitleProps;
}

export default function PageLayout({ children, pageTitle }: PageLayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-background via-background/95 to-background/90 overflow-x-hidden">
      {/* Dekoratif Arka Plan */}
      <BackgroundDots />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 pt-0 pb-16 sm:px-6 lg:px-8">
          {pageTitle && (
            <PageTitle
              title={pageTitle.title}
              description={pageTitle.description}
              image={pageTitle.image}
              variant={pageTitle.variant}
            >
              {pageTitle.children}
            </PageTitle>
          )}
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
} 