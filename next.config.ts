import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/ekipmanlar/',
        destination: '/ekipmanlar',
        permanent: true,
      },
      {
        source: '/anilar/',
        destination: '/anilar',
        permanent: true,
      },
      {
        source: '/anlar',
        destination: '/anilar',
        permanent: true,
      },
      {
        source: '/anlar/',
        destination: '/anilar',
        permanent: true,
      },
      {
        source: '/okuyorum/',
        destination: '/okuyorum',
        permanent: true,
      },
    ];
  },
  /* config options here */
};

export default nextConfig;
