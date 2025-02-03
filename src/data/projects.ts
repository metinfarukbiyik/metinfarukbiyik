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
    name: "HTML5",
    iconType: "HTML5",
    color: "#E34F26"
  },
  {
    name: "CSS3",
    iconType: "CSS",
    color: "#264DE4"
  },
  {
    name: "Tailwind CSS",
    iconType: "Tailwind",
    color: "#38BDF8"
  },
  {
    name: "JavaScript",
    iconType: "JavaScript",
    color: "#F0DB4F"
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
    name: "DeepSeek",
    iconType: "DeepSeek",
    color: "#4D6BFE"
  },
  {
    name: "Supabase",
    iconType: "Supabase",
    color: "#3ECF8E"
  },
  {
    name: "Firebase",
    iconType: "Firebase",
    color: "#FFA000"
  },
  {
    name: "Claude AI",
    iconType: "Claude",
    color: "#D97757"
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
    technologies: ["Next.js", "Tailwind CSS"],
    githubUrl: "https://github.com/metinfarukbiyik/metinfarukbiyik",
    liveUrl: "https://biyik.dev",
    featured: true
  },
  {
    id: "2",
    title: "TurkceYaz.im - Doğru Türkçe Kullanım Rehberi",
    description: "Next.js ve Tailwind CSS kullanılarak geliştirilen modern ve minimalist kişisel web sitesi.",
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