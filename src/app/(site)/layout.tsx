import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { site } from '@/lib/site';

const SiteLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex min-h-screen flex-col">
    <Navbar />
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      {children}
    </main>
    <Footer />

    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`}
      strategy="afterInteractive"
    />
    <Script id="ga" strategy="afterInteractive">
      {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${site.gaId}');`}
    </Script>
  </div>
);

export default SiteLayout;
