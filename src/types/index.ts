export interface Experience {
  title: string;
  company: string;
  date: string;
  description: string[];
  technologies?: string[];
}

export interface Education {
  school: string;
  degree: string;
  date: string;
  description?: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Contact {
  email: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface CV {
  name: string;
  title: string;
  summary: string;
  contact: Contact;
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

// Genel Tipler
export interface Image {
  url: string;
  alt?: string;
}

// Kitap Tipleri
export interface Book {
  id: number;
  title: string;
  author: string;
  image: string;
}

export interface BookCollection {
  read: Book[];
  toRead: Book[];
}

// Anlar Tipleri
export interface Moment {
  id: string;
  images: Image[];
  title: string;
  date: string;
  location?: string;
  description?: string;
}

// Ekipman Tipleri
export interface Equipment {
  name: string;
  image: string;
}

export interface EquipmentCategory {
  title: string;
  items: Equipment[];
}

export interface EquipmentData {
  [key: string]: EquipmentCategory;
}

// Sayfa Props Tipleri
export interface PageTitleProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  image?: string;
  variant?: "home" | "page";
}

// Modal Props Tipleri
export interface ImageModalProps {
  images: Image[];
  currentImageIndex: number;
  isOpen: boolean;
  onClose: () => void;
} 