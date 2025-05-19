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
            className="mt-6 text-base text-muted-foreground/80 sm:text-lg leading-relaxed"
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
          <section className="relative rounded-xl bg-white/5 dark:bg-zinc-800/5 p-6 backdrop-blur-2xl">
            <div className="absolute inset-0 rounded-xl ring-1 ring-black/5 ring-inset dark:ring-white/5" />
            <div className="relative">
              <h2 className="mb-5 flex items-center gap-3 text-xl font-bold">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <Contact2 className="h-[18px] w-[18px] text-primary" />
                </div>
                <span className="text-primary">
                  İletişim
                </span>
              </h2>
              <ContactSection contact={cvData.contact} />
            </div>
          </section>

          {/* Yetenekler */}
          <section className="relative rounded-xl bg-white/5 dark:bg-zinc-800/5 p-6 backdrop-blur-2xl">
            <div className="absolute inset-0 rounded-xl ring-1 ring-black/5 ring-inset dark:ring-white/5" />
            <div className="relative">
              <h2 className="mb-5 flex items-center gap-3 text-xl font-bold">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/10">
                  <Code2 className="h-[18px] w-[18px] text-secondary" />
                </div>
                <span className="text-secondary">
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
          <section className="relative rounded-xl bg-white/5 dark:bg-zinc-800/5 p-6 backdrop-blur-2xl">
            <div className="absolute inset-0 rounded-xl ring-1 ring-black/5 ring-inset dark:ring-white/5" />
            <div className="relative">
              <h2 className="mb-5 flex items-center gap-3 text-2xl font-bold">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <Building2 className="h-[18px] w-[18px] text-primary" />
                </div>
                <span className="text-primary">
                  Deneyim
                </span>
              </h2>
              <ExperienceSection experiences={cvData.experience} />
            </div>
          </section>

          {/* Eğitim */}
          <section className="relative rounded-xl bg-white/5 dark:bg-zinc-800/5 p-6 backdrop-blur-2xl">
            <div className="absolute inset-0 rounded-xl ring-1 ring-black/5 ring-inset dark:ring-white/5" />
            <div className="relative">
              <h2 className="mb-5 flex items-center gap-3 text-2xl font-bold">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                  <BookOpen className="h-[18px] w-[18px] text-accent" />
                </div>
                <span className="text-accent">
                  Eğitim
                </span>
              </h2>
              <EducationSection education={cvData.education} />
            </div>
          </section>

          {/* Sertifikalar */}
          <section className="relative rounded-xl bg-white/5 dark:bg-zinc-800/5 p-6 backdrop-blur-2xl">
            <div className="absolute inset-0 rounded-xl ring-1 ring-black/5 ring-inset dark:ring-white/5" />
            <div className="relative">
              <h2 className="mb-5 flex items-center gap-3 text-2xl font-bold">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/10">
                  <Medal className="h-[18px] w-[18px] text-secondary" />
                </div>
                <span className="text-secondary">
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
