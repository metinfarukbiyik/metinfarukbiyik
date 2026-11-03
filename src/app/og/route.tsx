import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

const ink = '#1e2227';
const paper = '#f6f4ef';
const line = '#e3dfd5';
const muted = '#5f6368';
const accent = '#33625c';

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const title = (params.get('title') || 'Metin Faruk Bıyık').slice(0, 90);
  const description = (params.get('description') || 'Web, mobil ve masaüstü uygulamaları.').slice(0, 170);
  const label = (params.get('label') || 'biyik.dev').slice(0, 32);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          padding: 56,
          background: paper,
          backgroundImage: 'radial-gradient(circle at 1px 1px, #d9d4c8 1.5px, transparent 0)',
          backgroundSize: '28px 28px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            border: `1px solid ${line}`,
            borderRadius: 24,
            background: '#ffffff',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: 64,
              padding: '0 28px',
              borderBottom: `1px solid ${line}`,
              background: '#fbfaf7',
            }}
          >
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ width: 16, height: 16, borderRadius: 8, background: '#e3a598' }} />
              <div style={{ width: 16, height: 16, borderRadius: 8, background: '#e6cf95' }} />
              <div style={{ width: 16, height: 16, borderRadius: 8, background: '#a9cdb0' }} />
            </div>
            <div
              style={{
                display: 'flex',
                marginLeft: 28,
                padding: '8px 18px',
                borderRadius: 999,
                border: `1px solid ${line}`,
                fontFamily: 'monospace',
                fontSize: 22,
                color: muted,
              }}
            >
              biyik.dev
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              flex: 1,
              padding: '48px 56px',
            }}
          >
            <div style={{ display: 'flex', fontFamily: 'monospace', fontSize: 24, color: accent }}>
              {`// ${label}`}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  display: 'flex',
                  fontSize: 62,
                  lineHeight: 1.1,
                  fontWeight: 700,
                  letterSpacing: -2,
                  color: ink,
                }}
              >
                {title}
              </div>
              <div style={{ display: 'flex', marginTop: 22, fontSize: 26, lineHeight: 1.45, color: muted }}>
                {description}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: ink,
                  color: paper,
                  fontFamily: 'monospace',
                  fontSize: 24,
                }}
              >
                b/
              </div>
              <div style={{ display: 'flex', fontSize: 24, color: ink, fontWeight: 600 }}>Metin Faruk Bıyık</div>
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
