"use client";

import { motion } from "framer-motion";
import { Code2, ExternalLink, Github, Sparkles } from "lucide-react";
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
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <div className="flex items-center gap-3 mb-8">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-6 h-6 text-primary" />
          </motion.div>
          <h2 className="text-2xl font-semibold text-primary">
            Teknolojiler
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group relative flex flex-row items-center gap-2 px-4 py-2.5 rounded-xl bg-white/50 dark:bg-black/40 hover:bg-white/60 dark:hover:bg-black/50 transition-colors duration-200"
            >              
              {/* İkon */}
              <motion.div 
                className="relative flex items-center justify-center w-5 h-5"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
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
              </motion.div>

              {/* İsim */}
              <p className="relative text-sm font-medium text-black/70 dark:text-white/70">
                {tech.name}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Projeler Bölümü */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative"
      >
        <div className="flex items-center gap-3 mb-8">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-xl opacity-50" />
            <Code2 className="w-6 h-6 text-primary" />
          </motion.div>
          <h2 className="text-2xl font-semibold text-primary">
            Projeler
          </h2>
        </div>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              className="group relative flex gap-6 p-6 rounded-2xl bg-gradient-to-br from-white/70 to-white/50 dark:from-white/[0.08] dark:to-white/[0.05] hover:from-white/80 hover:to-white/60 dark:hover:from-white/[0.12] dark:hover:to-white/[0.08] border border-black/[0.05] dark:border-white/[0.05] transition-all duration-300"
            >
              {/* Sol taraf - İkon */}
              <div className="shrink-0">
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: -3 }}
                  transition={{ duration: 0.2 }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Code2 className="w-8 h-8 text-primary relative z-10" />
                </motion.div>
              </div>

              {/* Sağ taraf - İçerik */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl font-semibold truncate text-primary">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-3 shrink-0">
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors relative group/link"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-xl opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                        <Github className="w-5 h-5 text-black/70 dark:text-white/70 relative z-10" />
                      </motion.a>
                    )}
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors relative group/link"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-xl opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                        <ExternalLink className="w-5 h-5 text-black/70 dark:text-white/70 relative z-10" />
                      </motion.a>
                    )}
                  </div>
                </div>

                <p className="mt-2 text-black/60 dark:text-white/60">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <motion.span
                      key={tech}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary/90 ring-1 ring-primary/20 backdrop-blur-xl transition-all duration-300 hover:bg-primary/20 hover:ring-primary/30"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Dekoratif Kenar Efektleri */}
              <div className="absolute inset-[-1px] bg-gradient-to-br from-primary/[0.1] via-secondary/[0.05] to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
              <div className="absolute inset-[-1px] bg-gradient-to-tl from-white/[0.05] to-transparent dark:from-white/[0.02] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
            </motion.article>
          ))}
        </div>
      </motion.section>
    </PageLayout>
  );
}