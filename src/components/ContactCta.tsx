import { Mail } from 'lucide-react';
import { ButtonLink, Heading, Kicker } from '@/components/ui';
import { site } from '@/lib/site';

/** Closing call-to-action shared by the home, about and project pages. */
export default function ContactCta({
  title = 'Bir fikrin mi var? Birlikte hayata geçirelim.',
  description = 'Web sitesi, kurumsal sistem, mobil ya da masaüstü uygulama — ihtiyacını dinleyip en sade çözümü birlikte planlayalım.',
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="cta section" aria-labelledby="cta-baslik">
      <div className="cta-copy">
        <Kicker>iletişim</Kicker>
        <Heading id="cta-baslik" size="2">
          {title}
        </Heading>
        <p className="text-small">{description}</p>
      </div>
      <div className="cta-actions">
        <ButtonLink href="/iletisim" variant="primary" trailing="arrow">
          İletişime geç
        </ButtonLink>
        <ButtonLink
          href={`mailto:${site.email}`}
          variant="secondary"
          icon={<Mail aria-hidden="true" />}
        >
          {site.email}
        </ButtonLink>
      </div>
    </section>
  );
}
