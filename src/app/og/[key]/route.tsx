import { ImageResponse } from 'next/og';
import { getOgCard, ogCards, ogFonts, type OgVisual } from '@/lib/og-cards';
import { site } from '@/lib/site';

// Every card is rendered once at build time and served as a static PNG,
// so WhatsApp, X, Facebook and LinkedIn crawlers get a fast, cacheable file.
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return ogCards().map((card) => ({ key: card.key }));
}

const c = {
  paper: '#f6f4ef',
  surface: '#fbfaf7',
  line: '#e3dfd5',
  ink: '#1e2227',
  muted: '#5f6368',
  subtle: '#6f7277',
  accent: '#33625c',
  accentSoft: '#e2ebe8',
  accentLine: '#c6d8d3',
};

const dots = `data:image/svg+xml;base64,${Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><defs><pattern id="d" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="12" cy="12" r="1.4" fill="#d9d4c8"/></pattern></defs><rect width="1200" height="630" fill="url(#d)"/></svg>`,
).toString('base64')}`;

function Visual({ visual }: { visual: OgVisual }) {
  if (visual.kind === 'mark') {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 300,
          height: 300,
          borderRadius: 64,
          background: c.ink,
          color: c.paper,
          fontFamily: 'Mono',
          fontSize: 150,
        }}
      >
        {visual.text}
        {visual.accent && <span style={{ color: '#a9cdb0' }}>{visual.accent}</span>}
      </div>
    );
  }
  const size = visual.kind === 'icon' ? 200 : 300;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
      {/* eslint-disable-next-line @next/next/no-img-element -- rendered by Satori, not the browser */}
      <img
        src={visual.src}
        width={size}
        height={size}
        alt=""
        style={{
          borderRadius: visual.kind === 'icon' ? 44 : visual.kind === 'photo' ? 150 : 24,
          border: visual.kind === 'illustration' ? `2px solid ${c.line}` : 'none',
          background: visual.kind === 'photo' ? c.accentSoft : '#fff',
          objectFit: 'cover',
        }}
      />
      {visual.caption && (
        <div style={{ display: 'flex', fontFamily: 'Mono', fontSize: 20, color: c.subtle }}>{visual.caption}</div>
      )}
    </div>
  );
}

export async function GET(_request: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const card = getOgCard(key);
  if (!card) return new Response('Not found', { status: 404 });
  const address = card.address ?? `${site.domain}${card.path === '/' ? '' : card.path}`;
  const titleSize = card.title.length > 22 ? 52 : 62;

  return new ImageResponse(
    (
      <div style={{ display: 'flex', width: '100%', height: '100%', padding: 44, background: c.paper, position: 'relative' }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- rendered by Satori, not the browser */}
        <img src={dots} width={1200} height={630} alt="" style={{ position: 'absolute', top: 0, left: 0 }} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            border: `2px solid ${c.line}`,
            borderRadius: 26,
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
              borderBottom: `2px solid ${c.line}`,
              background: c.surface,
            }}
          >
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ width: 15, height: 15, borderRadius: 8, background: '#e3a598' }} />
              <div style={{ width: 15, height: 15, borderRadius: 8, background: '#e6cf95' }} />
              <div style={{ width: 15, height: 15, borderRadius: 8, background: '#a9cdb0' }} />
            </div>
            <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
              <div
                style={{
                  display: 'flex',
                  padding: '6px 22px',
                  borderRadius: 999,
                  border: `2px solid ${c.line}`,
                  background: c.paper,
                  fontFamily: 'Mono',
                  fontSize: 19,
                  color: c.muted,
                }}
              >
                {address}
              </div>
            </div>
            <div style={{ display: 'flex', fontFamily: 'Mono', fontSize: 17, color: c.subtle }}>200 OK</div>
          </div>

          <div style={{ display: 'flex', flex: 1, padding: '40px 56px 0', gap: 48 }}>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', fontFamily: 'Mono', fontSize: 22, color: c.accent }}>
                <span style={{ color: c.accentLine, marginRight: 12 }}>{'//'}</span>
                {card.kicker}
              </div>
              <div
                style={{
                  display: 'flex',
                  marginTop: 22,
                  fontSize: titleSize,
                  fontWeight: 700,
                  lineHeight: 1.08,
                  letterSpacing: -2,
                  color: c.ink,
                }}
              >
                {card.title}
              </div>
              <div
                style={{
                  display: 'block',
                  marginTop: 20,
                  fontSize: 25,
                  lineHeight: 1.45,
                  color: c.muted,
                  lineClamp: 2,
                  overflow: 'hidden',
                }}
              >
                {card.description}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 'auto', paddingTop: 20, paddingBottom: 8 }}>
                {card.chips.map((chip) => (
                  <div
                    key={chip}
                    style={{
                      display: 'flex',
                      padding: '7px 14px',
                      borderRadius: 9,
                      border: `2px solid ${c.accentLine}`,
                      background: c.accentSoft,
                      fontFamily: 'Mono',
                      fontSize: 18,
                      color: c.accent,
                    }}
                  >
                    {chip}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 320 }}>
              <Visual visual={card.visual} />
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              margin: '22px 56px 0',
              padding: '18px 0 22px',
              borderTop: `2px solid ${c.line}`,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                borderRadius: 10,
                background: c.ink,
                color: c.paper,
                fontFamily: 'Mono',
                fontSize: 20,
              }}
            >
              b<span style={{ color: '#a9cdb0' }}>/</span>
            </div>
            <div style={{ display: 'flex', fontSize: 22, fontWeight: 600, color: c.ink }}>biyik.dev</div>
            <div style={{ display: 'flex', fontSize: 20, color: c.subtle }}>· {site.name}</div>
            <div style={{ display: 'flex', marginLeft: 'auto', alignItems: 'center', gap: 10, fontFamily: 'Mono', fontSize: 18, color: c.muted }}>
              <div style={{ width: 11, height: 11, borderRadius: 2, background: c.accent }} />
              {card.status ?? 'Hazır'}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: ogFonts(),
      headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=31536000, stale-while-revalidate=86400' },
    },
  );
}
