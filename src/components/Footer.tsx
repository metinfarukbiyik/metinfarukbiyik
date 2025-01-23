import PDFDownloadButton from "@/components/PDFDownloadButton";

export default function Footer() {
  return (
    <footer className="relative">
      <div className="relative border-t border-black/5 dark:border-white/5">
        <div className="relative bg-gradient-to-b from-white/5 via-white/[0.025] to-transparent backdrop-blur-xl dark:bg-black/20 dark:backdrop-blur-none dark:from-transparent dark:via-transparent dark:to-transparent">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground/80">
              {/* Sol Taraf */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span>Built with</span>
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.5711 5.03457L6.21418 16.2721C6.12956 16.4505 6.2222 16.6613 6.41724 16.6613H7.99565C8.12491 16.6613 8.24067 16.5844 8.28879 16.4661L13.1976 6.22008C13.2822 6.04167 13.1896 5.83093 12.9945 5.83093H11.8644C11.7352 5.83093 11.6194 5.90778 11.5711 5.03457Z"
                      fill="currentColor"
                    />
                    <path
                      d="M15.5403 12.9697L13.9714 16.2721C13.8868 16.4505 13.9794 16.6613 14.1745 16.6613H15.7529C15.8821 16.6613 15.9979 16.5844 16.046 16.4661L17.5432 13.2661C17.6278 13.0877 17.5352 12.8769 17.3401 12.8769H16.21C16.0808 12.8769 15.9649 12.9538 15.5403 12.9697Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>Next.js</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span>•</span>
                  <span>Deployed on</span>
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 1L24 22H0L12 1Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>Vercel</span>
                </div>
              </div>

              {/* Sağ Taraf */}
              <div className="flex flex-wrap items-center gap-4">
                <PDFDownloadButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 