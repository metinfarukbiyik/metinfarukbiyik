import { ImageResponse } from 'next/og';
import { getPost } from '@/lib/blog';
import { personalInfo } from '@/data/cvData';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Blog yazısı kapak görseli';

const gradients: Record<string, string> = {
  Gezi: 'linear-gradient(135deg, #0d9488 0%, #0891b2 50%, #0284c7 100%)',
  Hayat: 'linear-gradient(135deg, #4f7dfc 0%, #6366f1 50%, #7c3aed 100%)',
  Teknoloji: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 50%, #f43f5e 100%)',
};

const OpengraphImage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const post = await getPost(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background:
            gradients[post?.category ?? ''] ?? 'linear-gradient(135deg, #1f3f8f 0%, #376bfb 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, opacity: 0.85 }}>
          {post?.category ?? 'Blog'}
        </div>
        <div style={{ display: 'flex', fontSize: 68, fontWeight: 700, lineHeight: 1.15 }}>
          {post?.title ?? 'Blog'}
        </div>
        <div style={{ display: 'flex', fontSize: 30, opacity: 0.9 }}>
          {personalInfo.name} · biyik.dev
        </div>
      </div>
    ),
    size,
  );
};

export default OpengraphImage;
