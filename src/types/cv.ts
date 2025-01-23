export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  github?: string;
  linkedin?: string;
  website?: string;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | "Present";
  description: string[];
  technologies: string[];
}

export interface Education {
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description?: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface CVData {
  name: string;
  title: string;
  summary: string;
  contact: ContactInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  languages?: string[];
  certifications?: {
    name: string;
    issuer: string;
    date: string;
    url?: string;
  }[];
} 