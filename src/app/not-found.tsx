import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFound = () => (
  <div className="flex min-h-screen flex-col bg-canvas">
    <Navbar />
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
      <p className="font-mono text-xs text-subtle">404</p>
      <h1 className="mt-3 text-3xl font-medium tracking-tight text-fg">
        Sayfa bulunamadı
      </h1>
      <p className="mt-3 max-w-md text-base leading-7 text-muted">
        Aradığınız sayfa taşınmış, silinmiş veya geçici olarak kullanım dışı olabilir.
      </p>
      <div className="mt-8 flex items-center gap-3">
        <Link
          href="/"
          className="rounded-md bg-fg px-4 py-2.5 text-sm text-canvas hover:opacity-90"
        >
          Ana sayfaya dön
        </Link>
        <Link
          href="/hakkimda"
          className="rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-fg hover:bg-hover"
        >
          Hakkımda
        </Link>
      </div>
    </main>
    <Footer />
  </div>
);

export default NotFound;
