import { NextResponse, type NextRequest } from 'next/server';

const DRAW_HOST = 'draw.biyik.dev';
const DRAW_PASSTHROUGH = /^\/(draw(\/|$)|draw-docs\/|draw-sw\.js|icon|apple-icon|favicon|manifest|robots\.txt|sitemap\.xml)/;
const MAIN_HOSTS = new Set(['biyik.dev', 'www.biyik.dev']);

/**
 * draw.biyik.dev → /draw sayfası. Ana alan adındaki /draw da alt alan adına taşınır,
 * böylece çizimler (tarayıcıda saklanan) tek bir adreste toplanır.
 */
export function proxy(request: NextRequest) {
  const host = (request.headers.get('host') ?? '').split(':')[0];
  const { pathname } = request.nextUrl;

  if (host === DRAW_HOST && pathname === '/') {
    return NextResponse.rewrite(new URL('/draw', request.url));
  }

  // draw.biyik.dev/docs → /draw/docs (Türkçe), /docs/en → İngilizce
  if (host === DRAW_HOST && (pathname === '/docs' || pathname.startsWith('/docs/'))) {
    return NextResponse.rewrite(new URL(`/draw${pathname}`, request.url));
  }

  // Alt alan adında yalnızca çizim tahtası ve onun dosyaları sunulur; geri kalanı ana siteye
  if (host === DRAW_HOST && !DRAW_PASSTHROUGH.test(pathname)) {
    return NextResponse.redirect(`https://biyik.dev${pathname}${request.nextUrl.search}`, 308);
  }

  if (MAIN_HOSTS.has(host) && (pathname === '/draw' || pathname.startsWith('/draw/'))) {
    return NextResponse.redirect(`https://${DRAW_HOST}${pathname.slice('/draw'.length) || '/'}${request.nextUrl.search}`, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/|draw-assets/|api/).*)'],
};
