import { Github, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from 'lucide-react';
import JsonLd from '@/components/JsonLd';
import { Badge, ButtonLink, Frame, PageHeader, Section, Tooltip } from '@/components/ui';
import { personalInfo } from '@/data/cvData';
import { pageMetadata, seoPages } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = pageMetadata(seoPages.contact);

const phone = personalInfo.phone.replace(/[^\d+]/g, '');
const mailto = (subject: string) => `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;

const topics = [
  'Web sitesi projesi',
  'Mobil / masaüstü uygulama',
  'Kurumsal sistem',
  'Uygulamalarım hakkında destek',
  'İş birliği',
  'Sadece merhaba',
];

const channels: {
  name: string;
  value: string;
  href: string;
  icon: LucideIcon;
  hint: string;
}[] = [
  { name: 'LinkedIn', value: 'in/metinbiyik', href: site.linkedin, icon: Linkedin, hint: 'Profesyonel ağ' },
  { name: 'GitHub', value: 'metinfarukbiyik', href: site.github, icon: Github, hint: 'Açık kaynak projeler' },
  { name: 'Instagram', value: '@_metinbiyik', href: site.instagram, icon: Instagram, hint: 'Gündelik paylaşımlar' },
];

const process = [
  { title: 'Tanışalım', text: 'İhtiyacını, hedef kitleni ve beklentilerini dinliyorum.' },
  { title: 'Planlayalım', text: 'Kapsamı, teknolojiyi ve takvimi sade bir yol haritasına döküyorum.' },
  { title: 'Geliştirelim', text: 'Ara teslimlerle ilerliyor, geri bildiriminle şekillendiriyorum.' },
  { title: 'Yayına alalım', text: 'Yayın, alan adı ve sonrasındaki bakımda yanında oluyorum.' },
];

function ChannelIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="icon-tile" aria-hidden="true">
      <Icon strokeWidth={1.6} />
    </span>
  );
}

export default function ContactPage() {
  return (
    <div className="container">
      <PageHeader
        crumbs={[{ name: 'İletişim', href: '/iletisim' }]}
        title="iletişim"
        count="yeni projelere açık"
        description="Bir web sitesi, uygulama ya da kurumsal sistem fikrin mi var? Konunu seç, e-postan hazır olsun. Telefon ve sosyal medya kanalları da hemen aşağıda."
        meta={
          <>
            <Badge icon={<MapPin aria-hidden="true" />}>{site.city}, Türkiye · uzaktan çalışmaya uygun</Badge>
          </>
        }
      />

      <div className="contact-grid">
        <Frame
          tabs={[{ label: 'yeni-mesaj.eml', icon: <Mail strokeWidth={1.75} />, modified: true }]}
          meta="taslak"
          className="compose"
          aria-labelledby="compose-baslik"
        >
          <dl className="compose-fields">
            <div>
              <dt>Kime</dt>
              <dd className="mono">{site.email}</dd>
            </div>
            <div>
              <dt>Konu</dt>
              <dd>Aşağıdan seç</dd>
            </div>
          </dl>
          <h2 id="compose-baslik" className="title-3">
            Ne hakkında konuşalım?
          </h2>
          <ul className="compose-topics">
            {topics.map((topic) => (
              <li key={topic}>
                <a href={mailto(topic)} className="compose-topic">
                  <Mail aria-hidden="true" />
                  {topic}
                </a>
              </li>
            ))}
          </ul>
          <div className="compose-actions">
            <ButtonLink href={`mailto:${site.email}`} variant="primary" icon={<Mail aria-hidden="true" />}>
              E-posta yaz
            </ButtonLink>
            <span className="text-meta">Konu seçince e-posta uygulaman açılır.</span>
          </div>
        </Frame>

        <div className="channel-list">
          <div className="card channel">
            <ChannelIcon icon={Phone} />
            <div className="channel-copy">
              <h2 className="title-4">Telefon & WhatsApp</h2>
              <p className="mono channel-value">{personalInfo.phone}</p>
            </div>
            <div className="channel-actions">
              <Tooltip content="Telefonla ara">
                <ButtonLink href={`tel:${phone}`} size="sm" iconOnly aria-label="Telefonla ara">
                  <Phone aria-hidden="true" />
                </ButtonLink>
              </Tooltip>
              <Tooltip content="WhatsApp’tan yaz">
                <ButtonLink
                  href={`https://wa.me/${phone.replace('+', '')}`}
                  external
                  trailing={null}
                  size="sm"
                  iconOnly
                  variant="soft"
                  aria-label="WhatsApp’tan yaz"
                >
                  <MessageCircle aria-hidden="true" />
                </ButtonLink>
              </Tooltip>
            </div>
          </div>
          {channels.map((channel) => (
            <div key={channel.name} className="card card-interactive channel">
              <ChannelIcon icon={channel.icon} />
              <div className="channel-copy">
                <h2 className="title-4">
                  <a href={channel.href} target="_blank" rel="noopener noreferrer" className="card-link">
                    {channel.name}
                    <span className="sr-only"> (yeni sekmede açılır)</span>
                  </a>
                </h2>
                <p className="mono channel-value">{channel.value}</p>
              </div>
              <span className="text-meta channel-hint">{channel.hint} ↗</span>
            </div>
          ))}
        </div>
      </div>

      <Section
        id="surec"
        kicker="süreç"
        title="Bir proje nasıl ilerler?"
        description="Küçük bir tanıtım sitesinden kurumsal bir sisteme kadar aynı sade yaklaşım."
      >
        <ol className="steps steps-4">
          {process.map((step, index) => (
            <li key={step.title} className="card">
              <span className="steps-index mono">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="title-4">{step.title}</h3>
              <p className="text-small">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: `${site.name} — İletişim`,
          url: `${site.url}/iletisim`,
          inLanguage: 'tr',
          mainEntity: {
            '@type': 'Person',
            '@id': `${site.url}/#person`,
            name: site.name,
            email: site.email,
            telephone: phone,
            address: { '@type': 'PostalAddress', addressLocality: site.city, addressCountry: 'TR' },
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'customer support',
              email: site.email,
              telephone: phone,
              availableLanguage: ['Turkish'],
            },
            sameAs: channels.map((c) => c.href),
          },
        }}
      />
    </div>
  );
}
