import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';

/**
 * Content-Security-Policy for the public site. Next.js and JSON-LD need inline scripts and the
 * pages are statically rendered, so nonces are not an option; 'unsafe-inline' stays while every
 * other source is pinned to the hosts the tools really call.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://www.googletagmanager.com`,
  "style-src 'self' 'unsafe-inline'",
  // Photos picked in the tools are shown as blob: and data: URLs.
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "media-src 'self' blob: data:",
  "worker-src 'self' blob:",
  [
    "connect-src 'self'",
    ...(isDev ? ['ws:'] : []),
    // Google Analytics, including the hosts Google Signals reports to
    'https://*.googletagmanager.com',
    'https://*.google-analytics.com',
    'https://analytics.google.com',
    'https://*.analytics.google.com',
    'https://*.g.doubleclick.net',
    'https://www.google.com',
    // Speed test, DNS lookup and IP address tools
    'https://speed.cloudflare.com',
    'https://cloudflare-dns.com',
    'https://api.ipify.org',
    'https://api6.ipify.org',
    'https://ipapi.co',
  ].join(' '),
  "frame-src 'self'",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "manifest-src 'self'",
  ...(isDev ? [] : ['upgrade-insecure-requests']),
].join('; ');

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    // No tool needs these; fullscreen, clipboard and wake lock keep their defaults.
    value:
      'camera=(), microphone=(), geolocation=(), payment=(), usb=(), serial=(), hid=(), midi=(), accelerometer=(), gyroscope=(), magnetometer=(), display-capture=()',
  },
];

const nextConfig: NextConfig = {
  agentRules: false,
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      // Sanity Studio loads its own scripts and talks to the Sanity API, so it stays outside the CSP.
      {
        source: '/((?!studio(?:/|$)).*)',
        headers: [{ key: 'Content-Security-Policy', value: csp }],
      },
    ];
  },
  async redirects() {
    return [
      { source: '/geocam', destination: '/projeler/geocam', permanent: true },
      {
        source: '/byk-music',
        destination: '/projeler/byk-music',
        permanent: true,
      },
      {
        source: '/byk-seri-baski-pro',
        destination: '/projeler/byk-seri-baski-pro',
        permanent: true,
      },
      {
        source: '/araclar/ag-sorunu-teshis',
        destination: '/araclar/internet-hiz-testi',
        permanent: true,
      },
      { source: '/ozgecmis', destination: '/hakkimda', permanent: true },
      {
        source: '/sertifikalar',
        destination: '/hakkimda#sertifikalar',
        permanent: true,
      },
      {
        source: '/ekipmanlar',
        destination: '/hakkimda#ekipmanlar',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: '**.notion.so' },
      { protocol: 'https', hostname: '**.amazonaws.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
};

export default nextConfig;
