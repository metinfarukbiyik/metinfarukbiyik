import { isSanityConfigured } from '@/sanity/env';
import StudioClient from './StudioClient';

export const dynamic = 'force-static';

export const metadata = {
  title: 'İçerik yönetimi',
  robots: { index: false, follow: false },
};

const StudioPage = () => {
  if (!isSanityConfigured) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24">
        <p className="text-sm font-semibold text-brand-600">Kurulum gerekli</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
          Sanity projesi henüz bağlanmadı
        </h1>
        <p className="mt-4 text-base leading-7 text-gray-600">
          Editörü açabilmek için bir Sanity projesi oluşturup proje kimliğini ortam
          değişkenlerine eklemeniz gerekiyor.
        </p>
        <ol className="mt-6 space-y-3 text-sm leading-6 text-gray-700">
          <li>
            1. Terminalde <code className="rounded bg-gray-100 px-1.5 py-0.5">npx sanity login</code>{' '}
            komutunu çalıştırıp giriş yapın.
          </li>
          <li>
            2.{' '}
            <code className="rounded bg-gray-100 px-1.5 py-0.5">
              npx sanity projects create &quot;biyik.dev&quot;
            </code>{' '}
            ile proje oluşturun.
          </li>
          <li>
            3. Proje kimliğini{' '}
            <code className="rounded bg-gray-100 px-1.5 py-0.5">.env.local</code> dosyasında{' '}
            <code className="rounded bg-gray-100 px-1.5 py-0.5">NEXT_PUBLIC_SANITY_PROJECT_ID</code>{' '}
            olarak tanımlayın.
          </li>
        </ol>
      </div>
    );
  }

  return <StudioClient />;
};

export default StudioPage;
