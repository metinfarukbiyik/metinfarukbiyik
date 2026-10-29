import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  agentRules: false,
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
