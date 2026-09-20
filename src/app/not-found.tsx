import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFound = () => (
  <div className="flex min-h-screen flex-col">
    <Navbar />
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
      <p className="text-sm font-semibold text-brand-600">404</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Sayfa bulunamadı
      </h1>
      <p className="mt-3 max-w-md text-base leading-7 text-gray-600">
        Aradığınız sayfa taşınmış, silinmiş veya geçici olarak kullanım dışı olabilir.
      </p>
      <div className="mt-8 flex items-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
        >
          Ana sayfaya dön
        </Link>
        <Link
          href="/ozgecmis"
          className="rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 transition-colors hover:bg-gray-50"
        >
          Özgeçmiş
        </Link>
      </div>
    </main>
    <Footer />
  </div>
);

export default NotFound;
