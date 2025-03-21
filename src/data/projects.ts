import { Project, Technology } from "@/types/projects";

export const technologies: Technology[] = [
  {
    name: "React",
    iconType: "React",
    color: "#087EA4"
  },
  {
    name: "Next.JS",
    iconType: "NextJs",
    color: "#000000"
  },
  {
    name: "Tailwind CSS",
    iconType: "Tailwind",
    color: "#38BDF8"
  },
  {
    name: "TypeScript",
    iconType: "TypeScript",
    color: "#3178C6"
  },
  {
    name: "VS Code",
    iconType: "VSCode",
    color: "#007ACC"
  },
  {
    name: "Supabase",
    iconType: "Supabase",
    color: "#3ECF8E"
  },
  {
    name: "OpenAI",
    iconType: "OpenAI",
    color: "#000000"
  },
  {
    name: "Vercel",
    iconType: "Vercel",
    color: "#000000"
  },
  {
    name: "v0",
    iconType: "V0",
    color: "#000000"
  }
];

export const projects: Project[] = [
  {
    id: "1",
    title: "Metin Faruk Bıyık - Portfolio",
    description: "Next.js ve Tailwind CSS kullanılarak geliştirilen modern ve minimalist kişisel web sitesi.",
    technologies: ["Next.js", "Tailwind CSS", "TypeScript"],
    githubUrl: "https://github.com/metinfarukbiyik/metinfarukbiyik",
    liveUrl: "https://biyik.dev",
    featured: true
  },
  {
    id: "2",
    title: "TurkceYaz.im - Doğru Türkçe Kullanım Rehberi",
    description: "Türkçenin zenginliklerini keşfedin, dilinizi güçlendirin. TDK standartlarına uygun, doğru ve etkili Türkçe kullanımı için kapsamlı rehberiniz.",
    technologies: ["Next.js", "Tailwind CSS", "TypeScript"],
    githubUrl: "https://github.com/metinfarukbiyik/turkceyaz-im",
    liveUrl: "https://turkceyaz.im",
    featured: true
  },
  {
    id: "3",
    title: "Elif Sena Öztürk | Türkçe Öğretmeni & Eğitim Koçu",
    description: "Elif Sena Öztürk için hazırlanan Türkçe Öğretmeni ve Eğitim Koçu web sitesi.",
    technologies: ["Next.js", "Tailwind CSS", "TypeScript"],
    githubUrl: "https://github.com/metinfarukbiyik",
    liveUrl: "https://elifogretmen.com.tr",
    featured: true
  },
];