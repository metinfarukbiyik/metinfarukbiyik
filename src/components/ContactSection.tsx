import { Mail, Phone, MapPin, Globe, Linkedin, Instagram, Info, Github } from "lucide-react";

interface ContactSectionProps {
  contact: {
    email: string;
    phone: string;
    location: string;
    website: string;
    social: {
      linkedin: string;
      twitter: string;
      instagram: string;
      github: string;
    };
    additionalInfo: string[];
  };
}

export default function ContactSection({ contact }: ContactSectionProps) {
  return (
    <div className="space-y-6">
      {/* Temel İletişim Bilgileri */}
      <div className="grid grid-cols-1 gap-3">
        {/* Email */}
        <a
          href={`mailto:${contact.email}`}
          className="group flex items-center gap-3 rounded-lg bg-card/30 p-3 hover:bg-card/50 transition-colors"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
            <Mail className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">E-posta</span>
            <span className="text-sm text-card-foreground/80 group-hover:text-card-foreground transition-colors">
              {contact.email}
            </span>
          </div>
        </a>

        {/* Telefon */}
        <a
          href={`tel:${contact.phone}`}
          className="group flex items-center gap-3 rounded-lg bg-card/30 p-3 hover:bg-card/50 transition-colors"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
            <Phone className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Telefon</span>
            <span className="text-sm text-card-foreground/80 group-hover:text-card-foreground transition-colors">
              {contact.phone}
            </span>
          </div>
        </a>

        {/* Konum */}
        <div className="group flex items-center gap-3 rounded-lg bg-card/30 p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <MapPin className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Konum</span>
            <span className="text-sm text-card-foreground/80">
              {contact.location}
            </span>
          </div>
        </div>

        {/* Website */}
        <a
          href={contact.website}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 rounded-lg bg-card/30 p-3 hover:bg-card/50 transition-colors"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
            <Globe className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Website</span>
            <span className="text-sm text-card-foreground/80 group-hover:text-card-foreground transition-colors">
              {contact.website}
            </span>
          </div>
        </a>
      </div>

      {/* Sosyal Medya */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">
          Sosyal Medya
        </h3>
        <div className="flex gap-2">
          {/* LinkedIn */}
          <a
            href={`https://linkedin.com/in/${contact.social.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-10 w-10 items-center justify-center rounded-lg bg-card/30 hover:bg-card/50 transition-colors"
            title="LinkedIn"
          >
            <div className="text-primary group-hover:text-primary/80 transition-colors">
              <Linkedin className="h-5 w-5" />
            </div>
          </a>

          {/* GitHub */}
          <a
            href={`https://github.com/${contact.social.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-10 w-10 items-center justify-center rounded-lg bg-card/30 hover:bg-card/50 transition-colors"
            title="GitHub"
          >
            <div className="text-primary group-hover:text-primary/80 transition-colors">
              <Github className="h-5 w-5" />
            </div>
          </a>

          {/* X (Twitter) */}
          <a
            href={`https://x.com/${contact.social.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-10 w-10 items-center justify-center rounded-lg bg-card/30 hover:bg-card/50 transition-colors"
            title="X (Twitter)"
          >
            <div className="text-primary group-hover:text-primary/80 transition-colors">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-5 w-5 fill-current"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
            </div>
          </a>

          {/* Instagram */}
          <a
            href={`https://instagram.com/${contact.social.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-10 w-10 items-center justify-center rounded-lg bg-card/30 hover:bg-card/50 transition-colors"
            title="Instagram"
          >
            <div className="text-primary group-hover:text-primary/80 transition-colors">
              <Instagram className="h-5 w-5" />
            </div>
          </a>
        </div>
      </div>

      {/* Ek Bilgiler */}
      {contact.additionalInfo && contact.additionalInfo.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">
            Ek Bilgiler
          </h3>
          <div className="space-y-2">
            {contact.additionalInfo.map((info, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-lg bg-card/30 p-3"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Info className="h-4 w-4" />
                </div>
                <span className="text-sm text-card-foreground/80">
                  {info}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 