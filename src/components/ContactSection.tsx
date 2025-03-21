import { Mail, Phone, MapPin, Globe, Linkedin, Instagram, Info, Github } from "lucide-react";

interface ContactSectionProps {
  contact: {
    email: string;
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
          title="E-posta ile iletişime geçin"
          className="group flex items-center gap-3 rounded-lg bg-card/30 p-3 ring-1 ring-black/5 dark:ring-white/5 transition-all duration-300 hover:bg-card/50 hover:ring-primary/20 dark:hover:ring-primary/20"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:scale-105 group-hover:bg-primary/20">
            <Mail className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">E-posta</span>
            <span className="text-sm text-card-foreground/80 transition-colors duration-300 group-hover:text-card-foreground">
              {contact.email}
            </span>
          </div>
        </a>


        {/* Konum */}
        <div className="group flex items-center gap-3 rounded-lg bg-card/30 p-3 ring-1 ring-black/5 dark:ring-white/5 transition-all duration-300 hover:bg-card/50 hover:ring-primary/20 dark:hover:ring-primary/20">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:scale-105 group-hover:bg-primary/20">
            <MapPin className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Konum</span>
            <span className="text-sm text-card-foreground/80 transition-colors duration-300 group-hover:text-card-foreground">
              {contact.location}
            </span>
          </div>
        </div>

        {/* Website */}
        <a
          href={contact.website}
          title="Kişisel web sitemi ziyaret edin"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 rounded-lg bg-card/30 p-3 ring-1 ring-black/5 dark:ring-white/5 transition-all duration-300 hover:bg-card/50 hover:ring-primary/20 dark:hover:ring-primary/20"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:scale-105 group-hover:bg-primary/20">
            <Globe className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Website</span>
            <span className="text-sm text-card-foreground/80 transition-colors duration-300 group-hover:text-card-foreground">
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
            title="LinkedIn profilimi ziyaret edin"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="group flex h-10 w-10 items-center justify-center rounded-lg bg-card/30 ring-1 ring-black/5 dark:ring-white/5 transition-all duration-300 hover:bg-card/50 hover:ring-primary/20 dark:hover:ring-primary/20"
          >
            <div className="text-primary transition-all duration-300 group-hover:scale-110">
              <Linkedin className="h-5 w-5" />
            </div>
          </a>

          {/* GitHub */}
          <a
            href={`https://github.com/${contact.social.github}`}
            title="GitHub profilimi ziyaret edin"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="group flex h-10 w-10 items-center justify-center rounded-lg bg-card/30 ring-1 ring-black/5 dark:ring-white/5 transition-all duration-300 hover:bg-card/50 hover:ring-primary/20 dark:hover:ring-primary/20"
          >
            <div className="text-primary transition-all duration-300 group-hover:scale-110">
              <Github className="h-5 w-5" />
            </div>
          </a>

          {/* X (Twitter) */}
          <a
            href={`https://x.com/${contact.social.twitter}`}
            title="X profilimi takip edin"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="group flex h-10 w-10 items-center justify-center rounded-lg bg-card/30 ring-1 ring-black/5 dark:ring-white/5 transition-all duration-300 hover:bg-card/50 hover:ring-primary/20 dark:hover:ring-primary/20"
          >
            <div className="text-primary transition-all duration-300 group-hover:scale-110">
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
            title="Instagram profilimi takip edin"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="group flex h-10 w-10 items-center justify-center rounded-lg bg-card/30 ring-1 ring-black/5 dark:ring-white/5 transition-all duration-300 hover:bg-card/50 hover:ring-primary/20 dark:hover:ring-primary/20"
          >
            <div className="text-primary transition-all duration-300 group-hover:scale-110">
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
                className="group flex items-center gap-3 rounded-lg bg-card/30 p-3 ring-1 ring-black/5 dark:ring-white/5 transition-all duration-300 hover:bg-card/50 hover:ring-primary/20 dark:hover:ring-primary/20"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:scale-105 group-hover:bg-primary/20">
                  <Info className="h-4 w-4" />
                </div>
                <span className="text-sm text-card-foreground/80 transition-colors duration-300 group-hover:text-card-foreground">
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