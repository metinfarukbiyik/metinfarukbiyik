"use client";

import { useState } from "react";

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
      className="group relative flex items-center gap-2.5 rounded-full bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30 px-5 py-2.5 text-sm font-medium text-primary ring-1 ring-primary/20 backdrop-blur-xl transition-all duration-500 hover:shadow-[0_0_2rem_-0.5rem] hover:shadow-primary/30 hover:ring-primary/40 active:scale-95 disabled:pointer-events-none disabled:opacity-50 dark:from-primary/20 dark:via-primary/15 dark:to-primary/20 dark:text-primary/90 dark:ring-primary/10 dark:hover:shadow-primary/20 dark:hover:ring-primary/30"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 transition-all duration-300 group-hover:scale-110 group-active:scale-95"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10"
          className="stroke-primary"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M12 12V16M12 16L14 14M12 16L10 14"
          className="stroke-primary"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 20H16C17.1046 20 18 19.1046 18 18V14C18 12.8954 17.1046 12 16 12H8C6.89543 12 6 12.8954 6 14V18C6 19.1046 6.89543 20 8 20Z"
          className="stroke-primary"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="relative">
        {isLoading ? (
          <>
            <span className="animate-pulse">İndiriliyor</span>
            <span className="animate-[bounce_1s_infinite]">...</span>
          </>
        ) : (
          "CV Görüntüle"
        )}
      </span>
      <div className="absolute inset-0 -z-10 rounded-full bg-primary/5 blur-xl transition-all duration-500 group-hover:blur-2xl" />
    </button>
  );
}