import { revalidatePath, revalidateTag } from 'next/cache';

/**
 * CMS veya içerik güncellemesinde ilgili sayfalar tazelenir.
 * Örnek: POST https://biyik.dev/api/revalidate  (header: x-webhook-secret)
 */
export const POST = async (request: Request) => {
  const secret = process.env.REVALIDATE_SECRET;

  if (!secret || request.headers.get('x-webhook-secret') !== secret) {
    return Response.json({ revalidated: false, error: 'Yetkisiz istek.' }, { status: 401 });
  }

  revalidateTag('posts', 'max');
  revalidatePath('/');
  revalidatePath('/hakkimda');
  revalidatePath('/projeler');
  revalidatePath('/1-ayet');

  return Response.json({ revalidated: true, at: Date.now() });
};
