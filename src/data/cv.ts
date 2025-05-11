interface CV {
  name: string;
  title: string;
  status: string;
  summary: string;
  contact: {
    email: string;
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
    institution: string;
    pdfUrl: string;
  }[];
  languages: string[];
}

export const cvData: CV = {
  name: "Metin Faruk Bıyık",
  title: "Geliştirici",
  status: "Çalışmaya Açık",
  summary: "Web teknolojileri ve modern uygulama geliştirme alanında kendini sürekli geliştiren, öğrenmeye ve ve paylaşmaya tutkulu bir geliştirici. <strong>Çözüm odaklı hizmetler sunuyorum.</strong>",
  contact: {
    email: "mb.metinbiyik@gmail.com",
    location: "Trabzon, Türkiye",
    website: "https://biyik.dev",
    social: {
      github: "metinfarukbiyik",
      linkedin: "metinbiyik",
      twitter: "_metinbiyik",
      instagram: "_metinbiyik"
    },
    additionalInfo: [
      "Ehliyet: B, B1, D, D1, F, M",
      "Seyahat Engeli: Yok",
      "Ek Belge: SRC-1, SRC-3 ve Psikoteknik Belgesi"
    ]
  },
  skills: {
    softSkills: [
      "Takım Çalışması",
      "İleri Seviye Bilgisayar Kullanımı",
      "Çözüm Odaklı",
      "Analiz ve Problem Çözme",
      "Güçlü İletişim",
      "Hızlı Öğrenme",
      "Kullanıcı Deneyimi",
      "İş Planlama",
    ],
    technical: {
      programs: [
        "MS Word",
        "MS Excel",
        "MS PowerPoint",
        "Adobe Photoshop",
        "Adobe Illustrator",
        "Canva",
        "Figma",
        "MS Teams",
      ],
      webDevelopment: [
        "HTML",
        "CSS",
        "SCSS",
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Tailwind CSS",
        "Bootstrap",
      ]
    }
  },
  education: [
    {
      school: "Atatürk Üniversitesi",
      degree: "Ön Lisans",
      field: "Bilgi Yönetimi",
      date: "2022 - Güncel",
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
      position: "RN Rework İş Emirleri & Ekip Yönetimi",
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
      name: "Müşteri Deneyimi Sertifikası",
      date: "Ekim 2023",
      institution: "Turkcell Akademi",
      pdfUrl: "/certificates/metinfarukbiyik_musterideneyimi.pdf"
    },
    {
      name: "Turkcell Satış 2.0 Sertifikası",
      date: "Mayıs 2024",
      institution: "Turkcell Akademi",
      pdfUrl: "/certificates/metinfarukbiyik_satis20.pdf"
    },
    {
      name: "Müşteri Deneyimi 2.0 Sertifikası",
      date: "Temmuz 2024",
      institution: "Turkcell Akademi",
      pdfUrl: "/certificates/metinfarukbiyik_musterideneyimi20.pdf"
    },
    {
      name: "Turkcell Robotik Süreç Otomasyonu (RPA)",
      date: "Ocak 2025",
      institution: "BTK Akademi",
      pdfUrl: "/certificates/metinfarukbiyik_robotiksurec.pdf"
    },
    {
      name: "Excel'de Dashboard ve İleri Fonksiyonlar",
      date: "Şubat 2025",
      institution: "BTK Akademi",
      pdfUrl: "/certificates/metinfarukbiyik_exceldeilerifonksiyonlar.pdf"
    },
    {
      name: "Yüksek İrtifa Liderlik Sertifikası",
      date: "Mart 2025",
      institution: "Turkcell Akademi",
      pdfUrl: "/certificates/metinfarukbiyik_yuksekirtifalider.pdf"
    },
    {
      name: "Yüksek İrtifa Teknoloji Sertifikası",
      date: "Mart 2025",
      institution: "Turkcell Akademi",
      pdfUrl: "/certificates/metinfarukbiyik_yuksekirtifateknoloji.pdf"
    },
  ],
  languages: [
    "Türkçe (Anadil)",
    "İngilizce (Başlangıç)"
  ]
} as const; 