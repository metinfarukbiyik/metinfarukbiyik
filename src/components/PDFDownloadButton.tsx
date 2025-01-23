"use client";

import { useState } from "react";
import { FileDown } from "lucide-react";

export default function PDFDownloadButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const a = document.createElement("a");
      a.href = "/metinfarukbiyik_cv.pdf";
      a.download = "metinfarukbiyik_cv.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("PDF indirme hatası:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isLoading}
      className="group flex items-center gap-2 rounded-full bg-white/[0.075] px-3 py-1.5 text-xs text-black/80 ring-1 ring-black/5 backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.1] hover:text-black dark:bg-white/10 dark:text-white/80 dark:ring-white/10 dark:hover:bg-white/20"
    >
      <FileDown
        className="h-4 w-4 transition-transform group-hover:translate-y-0.5 group-active:translate-y-1"
        aria-hidden="true"
      />
      <span>
        {isLoading ? "İndiriliyor..." : "CV'mi İndir"}
      </span>
    </button>
  );
}