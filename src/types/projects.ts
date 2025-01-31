export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export interface Technology {
  name: string;
  iconType: keyof typeof import('@/components/icons/TechnologyIcons').TechnologyIcons;
  color: string;
} 