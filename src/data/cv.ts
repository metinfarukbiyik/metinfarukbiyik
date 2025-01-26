interface CV {
  name: string;
  title: string;
  summary: string;
  contact: {
    email: string;
    phone: string;
    location: string;
    website: string;
    social: {
      github: string;
      linkedin: string;
      twitter: string;
      instagram: string;
    };
    additionalInfo: string[];
  };
  skills: {
    softSkills: string[];
    technical: {
      programs: string[];
      webDevelopment: string[];
    };
  };
  education: {
    school: string;
    degree: string;
    field?: string;
    date: string;
  }[];
  experience: {
    company: string;
    position: string;
    date: string;
    description?: string;
  }[];
  certifications: {
    name: string;
    date: string;
  }[];
  languages: string[];
}

export const cvData: CV = {
  name: "Metin Faruk Bıyık",
  title: "Geliştirici",
  summary: "Web teknolojileri ve modern uygulama geliştirme alanında kendini sürekli geliştiren, öğrenmeye ve ve paylaşmaya tutkulu bir geliştirici <strong>Çözüm odaklı hizmetler sunuyorum.</strong>",
  contact: {
    email: "mb.metinbiyik@gmail.com",
    phone: "+90 (540) 461 35 43",
    location: "Trabzon, Türkiye",
    website: "https://biyik.dev",
    social: {
      github: "metinfarukbiyik",
      linkedin: "metinbiyik",
      twitter: "_metinbiyik",
      instagram: "_metinbiyik"
    },
    additionalInfo: [
      "Seyahat engelim bulunmamaktadır.",
      "B, B1, M, F sınıfı ehliyet",
      "SRC-3 belgesi"
    ]
  },
  skills: {
    softSkills: [
      "Takım Çalışması",
      "Çözüm Odaklı",
      "Analiz ve Problem Çözme",
      "Güçlü İletişim"
    ],
    technical: {
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
        "SCSS",
        "JavaScript",
        "React",
        "Next.js"
      ]
    }
  },
  education: [
    {
      school: "Atatürk Üniversitesi",
      degree: "Ön Lisans",
      field: "Bilgi Yönetimi",
      date: "2016 - Güncel",
    },
    {
      school: "Şehit Ünal Bıçakçı Mesleki ve Teknik Anadolu Lisesi",
      degree: "Lise",
      field: "Web Programcılığı",
      date: "2012 - 2016",
    },
  ],
  experience: [
    {
      company: "Turkcell Global Bilgi",
      position: "Müşteri Temsilcisi & Takım Koçu",
      date: "2023 - Güncel"
    },
    {
      company: "NTM Elektrik Elektronik A.Ş.",
      position: "RN Rework İş Emirleri & Saha Yönetimi",
      date: "2020 - 2023"
    },
    {
      company: "ALP Telekomünikasyon",
      position: "Baz İstasyonu Kurulum Teknisyeni",
      date: "2018 - 2020"
    },
    {
      company: "Sosyal Güvenlik Kurumu",
      position: "Yazılım Geliştirme Stajı",
      date: "2016 - 2017"
    }
  ],
  certifications: [
    {
      name: "Turkcell Dijital Teknolojiler Sertifikası",
      date: "Eylül 2023"
    },
    {
      name: "Müşteri Deneyimi Sertifikası",
      date: "Ekim 2023"
    },
    {
      name: "Turkcell Satış 2.0 Sertifikası",
      date: "Mayıs 2024"
    },
    {
      name: "Müşteri Deneyimi 2.0 Sertifikası",
      date: "Temmuz 2024"
    }
  ],
  languages: [
    "Türkçe (Anadil)",
    "İngilizce (Başlangıç)"
  ]
} as const; 