import PDFDownloadButton from "@/components/PDFDownloadButton";

export default function Footer() {
  return (
    <footer className="mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-black/5 dark:border-white/5 py-4">
          <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
            <div className="flex flex-wrap justify-center gap-x-1 gap-y-2 sm:justify-start">
              <div className="group flex items-center">
                <span className="text-xs text-black/60 dark:text-white/60 transition-colors group-hover:text-black dark:group-hover:text-white">
                  Built with
                </span>
                <div className="ml-1 flex items-center">
                  <svg
                    className="ml-1 h-3 w-3 text-black/60 dark:text-white/60 transition-colors group-hover:text-black dark:group-hover:text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.5711 5.03457L6.21418 16.2721C6.12956 16.4505 6.2222 16.6613 6.41724 16.6613H7.99565C8.12491 16.6613 8.24067 16.5844 8.28879 16.4661L13.1976 6.22008C13.2822 6.04167 13.1896 5.83093 12.9945 5.83093H11.8644C11.7352 5.83093 11.6194 5.90778 11.5711 5.03457Z"
                      className="fill-current"
                    />
                    <path
                      d="M15.5403 12.9697L13.9714 16.2721C13.8868 16.4505 13.9794 16.6613 14.1745 16.6613H15.7529C15.8821 16.6613 15.9979 16.5844 16.046 16.4661L17.5432 13.2661C17.6278 13.0877 17.5352 12.8769 17.3401 12.8769H16.21C16.0808 12.8769 15.9649 12.9538 15.5403 12.9697Z"
                      className="fill-current"
                    />
                  </svg>
                  <span className="ml-1 text-xs text-black/60 dark:text-white/60 transition-colors group-hover:text-black dark:group-hover:text-white">Next.js</span>
                </div>
              </div>

              <span className="text-black/20 dark:text-white/20">&middot;</span>

              <div className="group flex items-center">
                <span className="text-xs text-black/60 dark:text-white/60 transition-colors group-hover:text-black dark:group-hover:text-white">
                  Deployed on
                </span>
                <div className="ml-1 flex items-center">
                  <svg
                    className="ml-1 h-3 w-3 text-black/60 dark:text-white/60 transition-colors group-hover:text-black dark:group-hover:text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 1L24 22H0L12 1Z"
                      className="fill-current"
                    />
                  </svg>
                  <span className="ml-1 text-xs text-black/60 dark:text-white/60 transition-colors group-hover:text-black dark:group-hover:text-white">Vercel</span>
                </div>
              </div>
            </div>

            <div className="scale-90">
              <PDFDownloadButton />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 