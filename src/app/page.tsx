import { cvData } from "@/data/cv";
import ContactSection from "@/components/ContactSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import CertificationsSection from "@/components/CertificationsSection";
import {
  User2,
  GraduationCap,
  Briefcase,
  Lightbulb,
  Award
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
            className="mt-10 text-base text-muted-foreground/80 sm:text-lg leading-relaxed max-w-2xl"
            dangerouslySetInnerHTML={{ __html: cvData.summary }}
          />
        )
      }}
    >
      {/* Ana İçerik */}
      <div className="mt-6 grid gap-8 md:grid-cols-3">
        {/* Sol Sütun */}
        <div className="space-y-8 md:col-span-1">
          <section className="group relative rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 backdrop-blur-2xl transition-all duration-500 hover:bg-white/15 hover:shadow-2xl hover:shadow-primary/5 dark:bg-black/20 dark:hover:bg-black/30 dark:backdrop-blur-none dark:from-transparent dark:via-transparent dark:to-transparent">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 dark:from-transparent dark:via-transparent dark:to-transparent" />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-black/10 ring-inset dark:ring-white/10" />
            <div className="relative">
              <h2 className="group mb-6 flex items-center gap-2 text-2xl font-semibold">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-xl transition-all duration-300 group-hover:from-primary/30 group-hover:to-primary/20">
                  <User2 className="h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent transition-colors duration-300 group-hover:from-primary group-hover:to-primary">
                  İletişim
                </span>
              </h2>
              <ContactSection contact={cvData.contact} />
            </div>
          </section>

          <section className="group relative rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 backdrop-blur-2xl transition-all duration-500 hover:bg-white/15 hover:shadow-2xl hover:shadow-secondary/5 dark:bg-black/20 dark:hover:bg-black/30 dark:backdrop-blur-none dark:from-transparent dark:via-transparent dark:to-transparent">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-secondary/10 via-transparent to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 dark:from-transparent dark:via-transparent dark:to-transparent" />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-black/10 ring-inset dark:ring-white/10" />
            <div className="relative">
              <h2 className="group mb-6 flex items-center gap-2 text-2xl font-semibold">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/10 backdrop-blur-xl transition-all duration-300 group-hover:from-secondary/30 group-hover:to-secondary/20">
                  <Lightbulb className="h-5 w-5 text-secondary transition-transform duration-300 group-hover:scale-110" />
                </div>
                <span className="bg-gradient-to-r from-secondary to-secondary/80 bg-clip-text text-transparent transition-colors duration-300 group-hover:from-secondary group-hover:to-secondary">
                  Yetenekler
                </span>
              </h2>
              <SkillsSection skills={cvData.skills} />
            </div>
          </section>
        </div>

        {/* Sağ Sütun */}
        <div className="space-y-8 md:col-span-2">
          <section className="group relative rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 backdrop-blur-2xl transition-all duration-500 hover:bg-white/15 hover:shadow-2xl hover:shadow-accent/5 dark:bg-black/20 dark:hover:bg-black/30 dark:backdrop-blur-none dark:from-transparent dark:via-transparent dark:to-transparent">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 dark:from-transparent dark:via-transparent dark:to-transparent" />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-black/10 ring-inset dark:ring-white/10" />
            <div className="relative">
              <h2 className="group mb-6 flex items-center gap-2 text-2xl font-semibold">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 backdrop-blur-xl transition-all duration-300 group-hover:from-accent/30 group-hover:to-accent/20">
                  <Briefcase className="h-5 w-5 text-accent transition-transform duration-300 group-hover:scale-110" />
                </div>
                <span className="bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent transition-colors duration-300 group-hover:from-accent group-hover:to-accent">
                  Deneyim
                </span>
              </h2>
              <ExperienceSection experiences={cvData.experience} />
            </div>
          </section>

          <section className="group relative rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 backdrop-blur-2xl transition-all duration-500 hover:bg-white/15 hover:shadow-2xl hover:shadow-primary/5 dark:bg-black/20 dark:hover:bg-black/30 dark:backdrop-blur-none dark:from-transparent dark:via-transparent dark:to-transparent">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 dark:from-transparent dark:via-transparent dark:to-transparent" />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-black/10 ring-inset dark:ring-white/10" />
            <div className="relative">
              <h2 className="group mb-6 flex items-center gap-2 text-2xl font-semibold">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-xl transition-all duration-300 group-hover:from-primary/30 group-hover:to-primary/20">
                  <GraduationCap className="h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent transition-colors duration-300 group-hover:from-primary group-hover:to-primary">
                  Eğitim
                </span>
              </h2>
              <EducationSection education={cvData.education} />
            </div>
          </section>

          <section className="group relative rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 backdrop-blur-2xl transition-all duration-500 hover:bg-white/15 hover:shadow-2xl hover:shadow-secondary/5 dark:bg-black/20 dark:hover:bg-black/30 dark:backdrop-blur-none dark:from-transparent dark:via-transparent dark:to-transparent">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-secondary/10 via-transparent to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 dark:from-transparent dark:via-transparent dark:to-transparent" />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-black/10 ring-inset dark:ring-white/10" />
            <div className="relative">
              <h2 className="group mb-6 flex items-center gap-2 text-2xl font-semibold">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/10 backdrop-blur-xl transition-all duration-300 group-hover:from-secondary/30 group-hover:to-secondary/20">
                  <Award className="h-5 w-5 text-secondary transition-transform duration-300 group-hover:scale-110" />
                </div>
                <span className="bg-gradient-to-r from-secondary to-secondary/80 bg-clip-text text-transparent transition-colors duration-300 group-hover:from-secondary group-hover:to-secondary">
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
