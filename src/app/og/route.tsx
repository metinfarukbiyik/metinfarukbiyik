import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';
export async function GET(request: NextRequest) {
  const title = (
    request.nextUrl.searchParams.get('title') || 'Metin Faruk Bıyık'
  ).slice(0, 90);
  const description = (
    request.nextUrl.searchParams.get('description') ||
    'Web, mobil ve masaüstü uygulamaları.'
  ).slice(0, 180);
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#e8f1ff',
        display: 'flex',
        padding: 48,
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'white',
          border: '1px solid #d9e2ee',
          borderRadius: 22,
          padding: 58,
          width: '100%',
        }}
      >
        <div style={{ display: 'flex', fontSize: 27, color: '#3974bb' }}>
          biyik.dev / Metin Faruk Bıyık
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 55,
              lineHeight: 1.12,
              fontWeight: 700,
              color: '#26384b',
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 24,
              lineHeight: 1.5,
              marginTop: 24,
              color: '#64748b',
            }}
          >
            {description}
          </div>
        </div>
        <div style={{ display: 'flex', color: '#697c93', fontSize: 20 }}>
          Fikirden çalışan ürüne.
        </div>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
