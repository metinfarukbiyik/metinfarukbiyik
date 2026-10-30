import SectionTitle from '@/components/ui/SectionTitle';
import {
  ArrowUpRight,
  ChevronDown,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  type LucideIcon,
} from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import JsonLd from '@/components/JsonLd';
import { personalInfo } from '@/data/cvData';
import { pageMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = pageMetadata(
  'İletişim',
  'Metin Faruk Bıyık ile iletişime geçin. Telefon, WhatsApp, e-posta, LinkedIn, Instagram ve GitHub bağlantıları; projeler ve iş birlikleri için ulaşın.',
  '/iletisim',
  [
    'Metin Faruk Bıyık iletişim',
    'biyik.dev iletişim',
    'yazılım geliştirici iletişim',
    'Trabzon',
  ],
);

const phone = personalInfo.phone.replace(/[^\d+]/g, '');
const methods = [
  {
    name: 'E-posta',
    value: personalInfo.email,
    description: 'Projeler, iş birlikleri ve soruların için.',
    href: `mailto:${personalInfo.email}`,
    icon: Mail,
    action: 'E-posta yaz',
  },
];
const socials = [
  {
    name: 'LinkedIn',
    value: 'metinbiyik',
    href: personalInfo.linkedin,
    icon: Linkedin,
    action: 'Profili aç',
    external: true,
  },
  {
    name: 'Instagram',
    value: '@_metinbiyik',
    href: personalInfo.instagram,
    icon: Instagram,
    action: 'Profili aç',
    external: true,
  },
  {
    name: 'GitHub',
    value: 'metinfarukbiyik',
    href: personalInfo.github,
    icon: Github,
    action: 'Profili aç',
    external: true,
  },
];

function ContactMethod({
  name,
  value,
  description,
  href,
  icon: Icon,
  action,
  external,
}: {
  name: string;
  value: string;
  description?: string;
  href: string;
  icon: LucideIcon;
  action: string;
  external?: boolean;
}) {
  return (
    <li>
      <a
        className="contact-method"
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        <span className="contact-method-icon" aria-hidden="true">
          <Icon size={20} strokeWidth={1.6} />
        </span>
        <span className="contact-method-copy">
          <span className="contact-method-label">{name}</span>
          <span className="contact-method-value">{value}</span>
          {description && (
            <span className="contact-method-description">{description}</span>
          )}
        </span>
        <span className="contact-method-action">
          {action}
          <ArrowUpRight size={14} aria-hidden="true" />
        </span>
      </a>
    </li>
  );
}

export default function ContactPage() {
  return (
    <div className="animate-fade-up">
      <PageHeader
        eyebrow="Bir merhaba / İletişim"
        title="Konuşalım."
        description="Bir projen, iş birliği fikrin veya sormak istediğin bir şey mi var? Aşağıdaki kanallardan bana ulaşabilirsin."
      />
      <section className="project-detail-section contact-section">
        <SectionTitle icon="contact">Doğrudan ulaş</SectionTitle>
        <ul className="contact-methods">
          {methods.map((method) => (
            <ContactMethod key={method.name} {...method} />
          ))}
          <li>
            <details className="phone-contact">
              <summary className="contact-method">
                <span className="contact-method-icon" aria-hidden="true">
                  <Phone size={20} strokeWidth={1.6} />
                </span>
                <span className="contact-method-copy">
                  <span className="contact-method-label">
                    Telefon / WhatsApp
                  </span>
                  <span className="contact-method-value">
                    {personalInfo.phone}
                  </span>
                </span>
                <span className="contact-method-action">
                  İletişim seç
                  <ChevronDown size={14} aria-hidden="true" />
                </span>
              </summary>
              <div className="phone-contact-options">
                <a href={`tel:${phone}`} className="pill-button">
                  <Phone size={14} aria-hidden="true" /> Ara
                </a>
                <a
                  href={`https://wa.me/${phone.replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-button"
                >
                  <MessageCircle size={14} aria-hidden="true" /> WhatsApp’tan
                  yaz
                </a>
              </div>
            </details>
          </li>
        </ul>
      </section>
      <section className="project-detail-section contact-section">
        <SectionTitle icon="contact">Sosyal medyada buluşalım</SectionTitle>
        <ul className="contact-methods">
          {socials.map((social) => (
            <ContactMethod key={social.name} {...social} />
          ))}
        </ul>
      </section>
      <div className="contact-location">
        <MapPin size={17} strokeWidth={1.6} aria-hidden="true" />
        <span>{personalInfo.address}</span>
      </div>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: `${personalInfo.name} — İletişim`,
          url: `${site.url}/iletisim`,
          inLanguage: 'tr',
          mainEntity: {
            '@type': 'Person',
            '@id': `${site.url}/#person`,
            name: personalInfo.name,
            email: personalInfo.email,
            telephone: phone,
            sameAs: socials.map((social) => social.href),
          },
        }}
      />
    </div>
  );
}
