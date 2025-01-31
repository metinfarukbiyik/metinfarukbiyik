"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Code2, ExternalLink, Github } from "lucide-react";
import { useTheme } from "next-themes";
import PageLayout from "@/components/layouts/PageLayout";
import { projects, technologies } from "@/data/projects";
import { TechnologyIcons } from "@/components/icons/TechnologyIcons";

export default function CalismalarPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <PageLayout
      pageTitle={{
        title: "Çalışmalarım",
        description: "Bu sayfada, geliştirdiğim projeler ve kullandığım teknolojiler hakkında bilgiler bulabilirsiniz. Her proje, profesyonel gelişimime katkı sağlayarak yeni beceriler edinmemi ve teknolojilere derinlemesine hâkim olmamı sağladı. Yapay zeka kullanımıyla, süreçleri yarı yarıya hızlandırıp performansı artırarak daha verimli çözümler ürettim.",
      }}
    >
      {/* Teknolojiler Bölümü */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8">Teknolojiler</h2>
        <div className="flex flex-wrap gap-3">
          {technologies.map((tech) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative flex flex-row items-center gap-2 px-3 py-2 rounded-lg bg-white/50 dark:bg-black/40 border border-black/[0.08] dark:border-white/[0.08] hover:border-black/[0.12] dark:hover:border-white/[0.12] transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${tech.color}05 0%, ${tech.color}02 100%)`,
              }}
            >
              {/* Dekoratif Arka Plan Efektleri */}
              <div 
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, ${tech.color}0A 0%, ${tech.color}05 100%)`,
                }}
              />
              
              {/* İkon */}
              <div className="relative flex items-center justify-center w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                {(() => {
                  const Icon = TechnologyIcons[tech.iconType];
                  return (
                    <Icon 
                      className={`w-full h-full transition-colors ${
                        tech.name === "Next.JS" || tech.name === "TypeScript" || tech.name === "OpenAI"
                          ? "dark:!text-white" 
                          : ""
                      }`}
                      style={{ 
                        color: tech.color,
                        opacity: isDark ? (
                          tech.name === "GitHub" ? 0.9 : 
                          tech.name === "Next.JS" || tech.name === "TypeScript" || tech.name === "OpenAI" ? 1 : 
                          0.8
                        ) : 0.9
                      }}
                    />
                  );
                })()}
              </div>

              {/* İsim */}
              <p className="relative text-sm font-medium text-black/70 dark:text-white/70">
                {tech.name}
              </p>

              {/* Hover Efekti için Overlay */}
              <div 
                className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/[0.05] dark:ring-white/[0.05] group-hover:ring-black/[0.08] dark:group-hover:ring-white/[0.08] transition-all duration-300" 
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projeler Bölümü */}
      <section className="relative">
        {/* Arkaplan Dekorasyonu */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/[0.01] to-transparent dark:from-white/[0.01] pointer-events-none" />
        
        <h2 className="text-2xl font-semibold mb-8 relative">Projeler</h2>
        <div className="space-y-8">
          {projects.map((project) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative flex gap-6 p-6 rounded-xl bg-gradient-to-br from-white/70 to-white/50 dark:from-white/[0.08] dark:to-white/[0.05] hover:from-white/80 hover:to-white/60 dark:hover:from-white/[0.12] dark:hover:to-white/[0.08] border border-black/[0.05] dark:border-white/[0.05] transition-all duration-300"
            >
              {/* Sol taraf - İkon */}
              <div className="shrink-0">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <Code2 className="w-8 h-8 text-primary" />
                </div>
              </div>

              {/* Sağ taraf - İçerik */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl font-semibold truncate text-black/90 dark:text-white/90">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-3 shrink-0">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                      >
                        <Github className="w-5 h-5 text-black/70 dark:text-white/70" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5 text-black/70 dark:text-white/70" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="mt-2 text-black/60 dark:text-white/60">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary/90"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}