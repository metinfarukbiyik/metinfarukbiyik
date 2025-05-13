import { Mail, MapPin, Globe, Github, Linkedin, Twitter, Instagram, Car, Plane, FileCheck, Info } from "lucide-react";

interface ContactSectionProps {
  contact: {
    email: string;
    location: string;
    website: string;
    social: {
      github: string;
      linkedin: string;
      twitter: string;
      instagram: string;
    };
    additionalInfo?: string[];
  };
}

export default function ContactSection({ contact }: ContactSectionProps) {
  return (
    <div className="space-y-6">
      {/* Ana İletişim Bilgileri */}
      <div className="space-y-3">
        {/* Email */}
        <a
          href={`mailto:${contact.email}`}
          className="group flex items-center gap-3 rounded-lg bg-white/30 dark:bg-zinc-800/30 p-3 transition-all duration-300 hover:bg-white/50 dark:hover:bg-zinc-800/50 hover:shadow-md"
        >
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary/20" />
            <Mail className="h-4 w-4 text-primary transition-all duration-300 group-hover:scale-110" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 dark:text-gray-400">Email</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-primary">
              {contact.email}
            </span>
          </div>
        </a>

        {/* Lokasyon */}
        <div className="group flex items-center gap-3 rounded-lg bg-white/30 dark:bg-zinc-800/30 p-3 transition-all duration-300 hover:bg-white/50 dark:hover:bg-zinc-800/50 hover:shadow-md">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary/20" />
            <MapPin className="h-4 w-4 text-primary transition-all duration-300 group-hover:scale-110" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 dark:text-gray-400">Lokasyon</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-primary">
              {contact.location}
            </span>
          </div>
        </div>

        {/* Website */}
        <a
          href={contact.website}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 rounded-lg bg-white/30 dark:bg-zinc-800/30 p-3 transition-all duration-300 hover:bg-white/50 dark:hover:bg-zinc-800/50 hover:shadow-md"
        >
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary/20" />
            <Globe className="h-4 w-4 text-primary transition-all duration-300 group-hover:scale-110" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 dark:text-gray-400">Website</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-primary">
              {contact.website}
            </span>
          </div>
        </a>
      </div>

      {/* Sosyal Medya */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Sosyal Medya
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {/* Github */}
          <a
            href={`https://github.com/${contact.social.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-lg bg-white/20 dark:bg-zinc-800/20 p-2.5 transition-all duration-300 hover:bg-white/40 dark:hover:bg-zinc-800/40 hover:shadow-md"
          >
            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary/20" />
              <Github className="h-4 w-4 text-primary transition-all duration-300 group-hover:scale-110" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300 group-hover:text-primary">
              Github
            </span>
          </a>

          {/* LinkedIn */}
          <a
            href={`https://linkedin.com/in/${contact.social.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-lg bg-white/20 dark:bg-zinc-800/20 p-2.5 transition-all duration-300 hover:bg-white/40 dark:hover:bg-zinc-800/40 hover:shadow-md"
          >
            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary/20" />
              <Linkedin className="h-4 w-4 text-primary transition-all duration-300 group-hover:scale-110" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300 group-hover:text-primary">
              LinkedIn
            </span>
          </a>

          {/* Twitter */}
          <a
            href={`https://twitter.com/${contact.social.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-lg bg-white/20 dark:bg-zinc-800/20 p-2.5 transition-all duration-300 hover:bg-white/40 dark:hover:bg-zinc-800/40 hover:shadow-md"
          >
            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary/20" />
              <Twitter className="h-4 w-4 text-primary transition-all duration-300 group-hover:scale-110" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300 group-hover:text-primary">
              X
            </span>
          </a>

          {/* Instagram */}
          <a
            href={`https://instagram.com/${contact.social.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-lg bg-white/20 dark:bg-zinc-800/20 p-2.5 transition-all duration-300 hover:bg-white/40 dark:hover:bg-zinc-800/40 hover:shadow-md"
          >
            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary/20" />
              <Instagram className="h-4 w-4 text-primary transition-all duration-300 group-hover:scale-110" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300 group-hover:text-primary">
              Instagram
            </span>
          </a>
        </div>
      </div>

      {/* Ek Bilgiler */}
      {contact.additionalInfo && contact.additionalInfo.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Ek Bilgiler
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {contact.additionalInfo.map((info, index) => {
              const [title, value] = info.split(': ');
              let icon;
              
              if (title === "Ehliyet") {
                icon = <Car className="h-4 w-4" />;
              } else if (title === "Seyahat Engeli") {
                icon = <Plane className="h-4 w-4" />;
              } else if (title === "Ek Belge") {
                icon = <FileCheck className="h-4 w-4" />;
              } else {
                icon = <Info className="h-4 w-4" />;
              }
              
              return (
                <div
                  key={index}
                  className="group flex items-center gap-3 rounded-lg bg-white/20 dark:bg-zinc-800/20 p-3 transition-all duration-300 hover:bg-white/40 dark:hover:bg-zinc-800/40 hover:shadow-md"
                >
                  <div className="relative flex h-9 w-9 shrink-0 items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary/20" />
                    <div className="text-primary transition-all duration-300 group-hover:scale-110">
                      {icon}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 dark:text-gray-400">{title}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-primary">
                      {value}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
} 