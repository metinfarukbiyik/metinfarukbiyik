import { ArrowLeft } from 'lucide-react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { ButtonLink, Frame, Kicker } from '@/components/ui';

export default function NotFound() {
  return (
    <div className="shell">
      <a href="#icerik" className="skip-link">
        İçeriğe geç
      </a>
      <Navbar />
      <main id="icerik" className="main">
        <div className="container container-narrow not-found">
          <Frame title="biyik.dev/???" meta="404" className="rise">
            <pre className="not-found-code mono" aria-hidden="true">
              {'HTTP/1.1 404 Not Found\nContent-Type: text/html; charset=utf-8\n\n<!-- Bu sayfa taşınmış ya da hiç var olmamış olabilir. -->'}
            </pre>
          </Frame>
          <div className="not-found-copy rise rise-2">
            <Kicker>404 · sayfa bulunamadı</Kicker>
            <h1 className="title-1">Bu adreste bir sayfa yok.</h1>
            <p className="lead">
              Aradığın sayfa taşınmış veya silinmiş olabilir. Ana sayfadan, projelerden ya da araçlardan devam
              edebilirsin.
            </p>
            <div className="hero-actions">
              <ButtonLink href="/" variant="primary" icon={<ArrowLeft aria-hidden="true" />}>
                Ana sayfaya dön
              </ButtonLink>
              <ButtonLink href="/projeler">Projeler</ButtonLink>
              <ButtonLink href="/araclar" variant="ghost">
                Araçlar
              </ButtonLink>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <div className="scroll-fade scroll-fade-top" aria-hidden="true" />
      <div className="scroll-fade scroll-fade-bottom" aria-hidden="true" />
    </div>
  );
}
