import { ImageResponse } from 'next/og';

/** The b/ monogram rendered as a PNG for favicons and the manifest. */
export function brandIcon(size: number) {
  const radius = Math.round(size * 0.24);
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1e2227',
          borderRadius: radius,
          color: '#f6f4ef',
          fontSize: size * 0.5,
          fontWeight: 600,
          letterSpacing: -size * 0.03,
          fontFamily: 'monospace',
        }}
      >
        b<span style={{ color: '#a9cdb0' }}>/</span>
      </div>
    ),
    { width: size, height: size },
  );
}
