import { revalidatePath, revalidateTag } from 'next/cache';

interface WebhookBody {
  slug?: string | { current?: string };
}

const readSlug = (body: WebhookBody) =>
  typeof body.slug === 'string' ? body.slug : body.slug?.current;

/**
 * CMS'te bir yazı yayınlandığında buraya webhook gönderilir ve ilgili sayfalar tazelenir.
 * Örnek: POST https://biyik.dev/api/revalidate  (header: x-webhook-secret)
 */
export const POST = async (request: Request) => {
  const secret = process.env.REVALIDATE_SECRET;

  if (!secret || request.headers.get('x-webhook-secret') !== secret) {
    return Response.json({ revalidated: false, error: 'Yetkisiz istek.' }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as WebhookBody;
  const slug = readSlug(body);

  revalidateTag('posts', 'max');
  revalidatePath('/blog');
  revalidatePath('/');
  if (slug) revalidatePath(`/blog/${slug}`);

  return Response.json({ revalidated: true, slug: slug ?? null, at: Date.now() });
};
