export interface ContactInfo {
  label: string;
  value: string;
  href?: string;
  type: 'email' | 'location' | 'website';
}

export interface AdditionalInfo {
  label: string;
  value: string;
}

export interface Skill {
  name: string;
  category: 'personal' | 'program' | 'web';
}

export interface Certificate {
  title: string;
  issuer: string;
  date: string;
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
}

export interface Education {
  school: string;
  detail: string;
  degree: string;
  duration: string;
}

export interface AboutData {
  description: string;
  contact: ContactInfo[];
  additionalInfo: AdditionalInfo[];
  skills: {
    personal: string[];
    programs: string[];
    webDevelopment: string[];
  };
  certificates: Certificate[];
  experience: Experience[];
  education: Education[];
}

export const aboutData: AboutData = {
  description: "Baz İstasyonu Teknisyeni olarak çalışıyorum. Yapay zeka teknolojileri üzerine araştırma yapıyorum. Bu alandaki gelişmeleri takip ediyor, iş süreçlerimde kullanarak verimliliği artırmak için yenilikçi çözümler geliştiriyorum.",
  
  contact: [
    {
      label: "📧 E-posta",
      value: "mb.metinbiyik@gmail.com",
      href: "mailto:mb.metinbiyik@gmail.com",
      type: "email"
    },
    {
      label: "📍 Lokasyon",
      value: "Trabzon, Türkiye",
      type: "location"
    },
    {
      label: "🌐 Web",
      value: "biyik.dev",
      href: "https://biyik.dev",
      type: "website"
    }
  ],

  additionalInfo: [
    {
      label: "🚗 Ehliyet",
      value: "B, B1, D, D1, F, M"
    },
    {
      label: "✈️ Seyahat Engeli",
      value: "Yok"
    },
    {
      label: "📜 Ek Belge",
      value: "SRC-1, SRC-3, Psikoteknik Belgesi"
    }
  ],

  skills: {
    personal: [
      "İleri Seviye Bilgisayar Kullanımı",
      "Analiz ve Problem Çözme",
      "Takım Çalışması",
      "Çözüm Odaklı",
      "Güçlü İletişim",
      "Hızlı Öğrenme",
      "Kullanıcı Deneyimi",
      "İş Planlama"
    ],
    programs: [
      "MS Word",
      "MS Excel",
      "MS PowerPoint",
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Canva"
    ],
    webDevelopment: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js"
    ]
  },

  certificates: [
    {
      title: "Müşteri Deneyimi Sertifikası",
      issuer: "Turkcell Akademi",
      date: "Ekim 2023"
    },
    {
      title: "Turkcell Satış 2.0 Sertifikası",
      issuer: "Turkcell Akademi",
      date: "Mayıs 2024"
    },
    {
      title: "Müşteri Deneyimi 2.0 Sertifikası",
      issuer: "Turkcell Akademi",
      date: "Temmuz 2024"
    },
    {
      title: "Turkcell Robotik Süreç Otomasyonu (RPA)",
      issuer: "BTK Akademi",
      date: "Ocak 2025"
    },
    {
      title: "Excel'de Dashboard ve İleri Fonksiyonlar",
      issuer: "BTK Akademi",
      date: "Şubat 2025"
    },
    {
      title: "Yüksek İrtifa Liderlik Sertifikası",
      issuer: "Turkcell Akademi",
      date: "Mart 2025"
    },
    {
      title: "Yüksek İrtifa Teknoloji Sertifikası",
      issuer: "Turkcell Akademi",
      date: "Mart 2025"
    },
    {
      title: "Müşteriyi Tanımak Sertifikası",
      issuer: "BTK Akademi",
      date: "Mayıs 2025"
    },
    {
      title: "Satış Esasları Sertifikası",
      issuer: "LinkedIn Learning",
      date: "Mayıs 2025"
    }
  ],

  experience: [
    {
      company: "Ak İletişim",
      position: "Baz İstasyonu Teknisyeni",
      duration: "2025 - Güncel"
    },
    {
      company: "Turkcell Global Bilgi",
      position: "Müşteri Temsilcisi & Takım Koçu",
      duration: "2023 - 2025"
    },
    {
      company: "NTM Elektrik Elektronik A.Ş.",
      position: "RN Rework İş Emirleri & Ekip Yönetimi",
      duration: "2020 - 2023"
    },
    {
      company: "ALP Telekomünikasyon",
      position: "Baz İstasyonu Kurulum Teknisyeni",
      duration: "2018 - 2020"
    },
    {
      company: "Sosyal Güvenlik Kurumu",
      position: "Yazılım Geliştirme Stajı",
      duration: "2016 - 2017"
    }
  ],

  education: [
    {
      school: "Atatürk Üniversitesi",
      detail: "Açık Öğretim Fakültesi",
      degree: "Ön Lisans",
      duration: "2022 - Güncel"
    },
    {
      school: "Şehit Ünal Bıçakçı MTAL",
      detail: "Mesleki ve Teknik Anadolu Lisesi",
      degree: "Lise Diploması",
      duration: "2012 - 2016"
    }
  ]
}; 