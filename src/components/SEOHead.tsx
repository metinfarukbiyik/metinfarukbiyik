import { Helmet } from 'react-helmet-async';
import type { SEOData } from '../utils/seo';

interface SEOHeadProps {
  seo: SEOData;
}

export function SEOHead({ seo }: SEOHeadProps) {
  const currentUrl = window.location.href;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="author" content={seo.author || "Metin Faruk Bıyık"} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Turkish" />
      <meta name="revisit-after" content="7 days" />
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:type" content={seo.type || "website"} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:locale" content="tr_TR" />
      <meta property="og:site_name" content="Metin Faruk Bıyık" />
      {seo.image && <meta property="og:image" content={seo.image} />}
      {seo.image && <meta property="og:image:alt" content={seo.title} />}
      {seo.image && <meta property="og:image:width" content="1200" />}
      {seo.image && <meta property="og:image:height" content="630" />}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@_metinbiyik" />
      <meta name="twitter:creator" content="@_metinbiyik" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      {seo.image && <meta name="twitter:image" content={seo.image} />}
      {seo.image && <meta name="twitter:image:alt" content={seo.title} />}
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#ff6900" />
      <meta name="msapplication-TileColor" content="#ff6900" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Structured Data - JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": seo.type === "profile" ? "Person" : "WebSite",
          "name": "Metin Faruk Bıyık",
          "url": currentUrl,
          "description": seo.description,
          ...(seo.type === "profile" && {
            "jobTitle": "Baz İstasyonu Teknisyeni & Front-End Developer",
            "worksFor": {
              "@type": "Organization",
              "name": "Turkcell Global Bilgi"
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Trabzon",
              "addressCountry": "TR"
            },
            "sameAs": [
              "https://github.com/metinfarukbiyik",
              "https://linkedin.com/in/metinbiyik",
              "https://instagram.com/_metinbiyik",
              "https://x.com/_metinbiyik"
            ]
          }),
          ...(seo.image && { "image": seo.image })
        })}
      </script>
    </Helmet>
  );
} 