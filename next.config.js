/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400, // 1 gün
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Görsel optimizasyonu ayarları
    quality: 80, // Görsel kalitesi (daha düşük değer = daha küçük dosya)
  },
  // Performans optimizasyonları
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Diğer optimizasyonlar
  poweredByHeader: false,
  compress: true,
  // Görsellerin daha hızlı yüklenmesi için optimizasyonlar
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  }
}

module.exports = nextConfig 