import { cvData } from "@/data/cv";
import ContactSection from "@/components/ContactSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import CertificationsSection from "@/components/CertificationsSection";
import {
  Code2,
  Building2,
  BookOpen,
  Medal,
  Contact2
} from "lucide-react";
import PageLayout from "@/components/layouts/PageLayout";

export default function Home() {
  return (
    <PageLayout
      pageTitle={{
        title: cvData.name,
        description: cvData.title,
        image: "/profile.jpg",
        variant: "home",
        children: (
          <p 
            className="mt-6 text-base text-muted-foreground/80 sm:text-lg leading-relaxed max-w-2xl"
            dangerouslySetInnerHTML={{ __html: cvData.summary }}
          />
        )
      }}
    >
      {/* Ana İçerik */}
      <div className="mt-12 grid gap-8 md:grid-cols-12">
        {/* Sol Sütun - İletişim ve Yetenekler */}
        <div className="space-y-6 md:col-span-4">
          {/* İletişim */}
          <section className="group relative rounded-xl bg-gradient-to-br from-white/5 to-transparent p-6 backdrop-blur-2xl transition-all duration-500 hover:bg-white/10 dark:bg-black/10 dark:hover:bg-black/20">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute inset-0 rounded-xl ring-1 ring-black/5 ring-inset dark:ring-white/5" />
            <div className="relative">
              <h2 className="group mb-5 flex items-center gap-3 text-xl font-bold">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-transparent backdrop-blur-xl transition-all duration-300 group-hover:from-primary/20">
                  <Contact2 className="h-[18px] w-[18px] text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  İletişim
                </span>
              </h2>
              <ContactSection contact={cvData.contact} />
            </div>
          </section>

          {/* Yetenekler */}
          <section className="group relative rounded-xl bg-gradient-to-br from-white/5 to-transparent p-6 backdrop-blur-2xl transition-all duration-500 hover:bg-white/10 dark:bg-black/10 dark:hover:bg-black/20">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-secondary/5 via-transparent to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute inset-0 rounded-xl ring-1 ring-black/5 ring-inset dark:ring-white/5" />
            <div className="relative">
              <h2 className="group mb-5 flex items-center gap-3 text-xl font-bold">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-secondary/10 to-transparent backdrop-blur-xl transition-all duration-300 group-hover:from-secondary/20">
                  <Code2 className="h-[18px] w-[18px] text-secondary transition-transform duration-300 group-hover:scale-110" />
                </div>
                <span className="bg-gradient-to-r from-secondary to-secondary/80 bg-clip-text text-transparent">
                  Yetenekler
                </span>
              </h2>
              <SkillsSection skills={cvData.skills} />
            </div>
          </section>
        </div>

        {/* Sağ Sütun - Deneyim, Eğitim ve Sertifikalar */}
        <div className="space-y-6 md:col-span-8">
          {/* Deneyim */}
          <section className="group relative rounded-xl bg-gradient-to-br from-white/5 to-transparent p-6 backdrop-blur-2xl transition-all duration-500 hover:bg-white/10 dark:bg-black/10 dark:hover:bg-black/20">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute inset-0 rounded-xl ring-1 ring-black/5 ring-inset dark:ring-white/5" />
            <div className="relative">
              <h2 className="group mb-5 flex items-center gap-3 text-2xl font-bold">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-transparent backdrop-blur-xl transition-all duration-300 group-hover:from-primary/20">
                  <Building2 className="h-[18px] w-[18px] text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Deneyim
                </span>
              </h2>
              <ExperienceSection experiences={cvData.experience} />
            </div>
          </section>

          {/* Eğitim */}
          <section className="group relative rounded-xl bg-gradient-to-br from-white/5 to-transparent p-6 backdrop-blur-2xl transition-all duration-500 hover:bg-white/10 dark:bg-black/10 dark:hover:bg-black/20">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute inset-0 rounded-xl ring-1 ring-black/5 ring-inset dark:ring-white/5" />
            <div className="relative">
              <h2 className="group mb-5 flex items-center gap-3 text-2xl font-bold">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent/10 to-transparent backdrop-blur-xl transition-all duration-300 group-hover:from-accent/20">
                  <BookOpen className="h-[18px] w-[18px] text-accent transition-transform duration-300 group-hover:scale-110" />
                </div>
                <span className="bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">
                  Eğitim
                </span>
              </h2>
              <EducationSection education={cvData.education} />
            </div>
          </section>

          {/* Sertifikalar */}
          <section className="group relative rounded-xl bg-gradient-to-br from-white/5 to-transparent p-6 backdrop-blur-2xl transition-all duration-500 hover:bg-white/10 dark:bg-black/10 dark:hover:bg-black/20">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-secondary/5 via-transparent to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute inset-0 rounded-xl ring-1 ring-black/5 ring-inset dark:ring-white/5" />
            <div className="relative">
              <h2 className="group mb-5 flex items-center gap-3 text-2xl font-bold">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-secondary/10 to-transparent backdrop-blur-xl transition-all duration-300 group-hover:from-secondary/20">
                  <Medal className="h-[18px] w-[18px] text-secondary transition-transform duration-300 group-hover:scale-110" />
                </div>
                <span className="bg-gradient-to-r from-secondary to-secondary/80 bg-clip-text text-transparent">
                  Sertifikalar
                </span>
              </h2>
              <CertificationsSection certifications={cvData.certifications} />
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
