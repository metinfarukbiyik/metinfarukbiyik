export interface Experience {
  company: string;
  role: string;
  period: string;
  responsibilities: string[];
}

export interface Education {
  school: string;
  department: string;
  period: string;
  level: string;
  details: string[];
}

export interface AdditionalInfo {
  hobbies: string;
  competencies: string;
  skills: string;
  drivingLicenses: string;
}

export const personalInfo = {
  name: "Metin Faruk Bıyık",
  linkedin: "https://www.linkedin.com/in/metinbiyik/",
  instagram: "https://instagram.com/_metinbiyik",
  address: "Aydınlıkevler, Ortahisar/TRABZON",
  phone: "+90 (540) 461 35 43",
  email: "metin@biyik.dev",
  web: "biyik.dev",
  summary: `Metin Faruk Bıyık, 22.04.1999 tarihinde Trabzon’da doğmuş olup, hâlen Trabzon’da ikamet etmektedir. 2025 yılında askerlik hizmetini tamamlamış ve aynı yıl evlenerek dünya evine girmiştir. Hayatının her alanında samimi, dürüst ve güvene dayalı ilişkiler kurmayı ilke edinmiştir.

Kariyeri boyunca kurumsal ve profesyonel firmalarda çeşitli sorumluluklar üstlenmiş; bu süreçte önemli ve somut başarılara imza atmıştır. Çözüm odaklı yaklaşımı, etik değerlere verdiği önem ve güçlü empati yeteneği sayesinde hem ekip çalışmalarında hem de bireysel görevlerinde güvenilir ve istikrarlı bir profil ortaya koymuştur. Belirlediği kariyer hedeflerini gerçekleştirmek adına disiplinli ve kararlı bir şekilde ilerleyen bir profesyoneldir.`
};

export const experiences: Experience[] = [
  {
    company: "Sosyal Güvenlik Kurumu",
    role: "Yazılım Geliştirme Stajyeri",
    period: "2016 - 2017",
    responsibilities: [
      "Yazılım geliştirme süreçlerine destek",
      "Temel programlama ve sistem mantığına dair uygulamalı deneyim"
    ]
  },
  {
    company: "ALP Telekomünikasyon",
    role: "Baz İstasyonu Teknisyeni",
    period: "2018 - 2020",
    responsibilities: [
      "GSM altyapı sistemlerinin kurulum, bakım ve arıza giderme işlemleri",
      "Saha çalışmaları ve teknik destek faaliyetleri"
    ]
  },
  {
    company: "NTM Elektrik & Elektronik A.Ş.",
    role: "RN Rework İş Emri Planlama & Ekip Yönetimi",
    period: "2020 - 2023",
    responsibilities: [
      "İş emirlerine bağlı olarak iş planlama ve süreç organizasyonu",
      "Rework süreçleri için malzeme analizi, stok kontrolü ve takibi",
      "Yapılan işlemlerin dokümantasyonunun hazırlanması ve raporlanması",
      "Kalite standartlarına uygun çalışma ve kontrol süreçleri",
      "Malzeme yönetimi ve kaynak optimizasyonu"
    ]
  },
  {
    company: "Turkcell Global Bilgi",
    role: "Müşteri Temsilcisi & Takım Koçu",
    period: "2023 - 2025",
    responsibilities: [
      "Müşteri taleplerinin etkin ve çözüm odaklı yönetimi",
      "Ekip içi performans takibi ve yeni çalışanların koçluğu",
      "Müşteri memnuniyetini artırmaya yönelik süreç iyileştirmeleri"
    ]
  },
  {
    company: "AK İletişim",
    role: "Baz İstasyonu Teknisyeni",
    period: "2025 - 2025",
    responsibilities: [
      "GSM altyapı sistemlerinin kurulum, bakım ve arıza giderme işlemleri",
      "Saha çalışmaları ve teknik destek faaliyetleri"
    ]
  },
  {
    company: "Turkcell Superonline",
    role: "Superonline FTTH Teknisyeni",
    period: "2025 - 2025",
    responsibilities: [
      "Superonline altyapı sonrası evlere fiber internet kurulumu"
    ]
  },
  {
    company: "CNL İletişim",
    role: "Ofis Yöneticisi",
    period: "2026 - Devam",
    responsibilities: [
      "Ofis içi operasyonların yönetimi ve idari süreçlerin yürütülmesi",
      "Şirket envanterinin takibi, stok kontrolü ve envanter hareketlerinin kayıt altına alınması",
      "Sahada gerçekleştirilen işlerin süreç, kalite ve tamamlanma durumlarının kontrol edilmesi",
      "Malzeme giriş-çıkışlarının ve ekipman dağıtımlarının düzenli olarak takip edilmesi",
      "Saha ekipleri ile ofis arasındaki iletişim ve iş akışının koordinasyonunun sağlanması"
    ]
  },
];

export const educations: Education[] = [
  {
    school: "ŞEHİT ÜNAL BIÇAKÇI MESLEKİ VE TEKNİK ANADOLU LİSESİ",
    department: "Bilişim Teknolojileri Alanı Web Programcılığı",
    period: "2015 - 2018",
    level: "Lise",
    details: [
      "HTML, CSS ve temel JavaScript kullanarak statik web sayfaları geliştirme",
      "Temel veritabanı ve algoritma mantığı eğitimi",
      "Web teknolojileri ve yazılım mantığına giriş"
    ]
  },
  {
    school: "ATATÜRK ÜNİVERSİTESİ AÇIK ÖĞRETİM FAKÜLTESİ",
    department: "Bilgi Yönetimi",
    period: "2022 - 2026",
    level: "Ön Lisans",
    details: [
      "Bilgi sistemleri ve veri yönetimi üzerine akademik eğitim",
      "Analitik düşünme ve problem çözme yetkinlikleri",
      "Dokümantasyon, raporlama ve bilgi organizasyonu becerileri"
    ]
  }
];

export const additionalInfo: AdditionalInfo = {
  hobbies: "Kamp yapmak, balık tutmak, müzik dinlemek ve fotoğraf çekmek.",
  competencies: "Doğa ve spor aktiviteleri sayesinde disiplin, stres yönetimi ve odaklanma becerisi.",
  skills: "Müşteri İlişkileri Yönetimi, Zaman Yönetimi ve Önceliklendirme, Ekip Yönetimi ve Takım Çalışması, Teknik Dokümantasyon ve Raporlama.",
  drivingLicenses: "B, B1, D, D1, F, M, SRC-1, SRC-3"
};

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
}

export const certificates: Certificate[] = [
  { id: '1', title: 'Müşteri Deneyimi Sertifikası', issuer: 'Turkcell Akademi', date: 'Ekim 2023' },
  { id: '2', title: 'Turkcell Satış 2.0 Sertifikası', issuer: 'Turkcell Akademi', date: 'Mayıs 2024' },
  { id: '3', title: 'Müşteri Deneyimi 2.0 Sertifikası', issuer: 'Turkcell Akademi', date: 'Temmuz 2024' },
  { id: '4', title: 'Turkcell Robotik Süreç Otomasyonu (RPA)', issuer: 'BTK Akademi', date: 'Ocak 2025' },
  { id: '5', title: 'Excel\'de Dashboard ve İleri Fonksiyonlar', issuer: 'BTK Akademi', date: 'Şubat 2025' },
  { id: '6', title: 'Yüksek İrtifa Liderlik Sertifikası', issuer: 'Turkcell Akademi', date: 'Mart 2025' },
  { id: '7', title: 'Yüksek İrtifa Teknoloji Sertifikası', issuer: 'Turkcell Akademi', date: 'Mart 2025' },
  { id: '8', title: 'Satış Esasları Sertifikası', issuer: 'LinkedIn Learning', date: 'Mayıs 2025' }
];

export interface Equipment {
  id: string;
  name: string;
  category: string;
  image: string;
  specs: string;
}

export interface Project {
  id: string;
  name: string;
  url: string;
  description: string;
  icon: string;
}

export const projects: Project[] = [
  {
    id: '1',
    name: 'BIYIK.DEV',
    url: 'https://biyik.dev',
    description: 'Şahsıma ait kişisel portfolyo ve özgeçmiş sitesi.',
    icon: 'Globe'
  },
  {
    id: '2',
    name: 'ELIFOGRETMEN.COM.TR',
    url: 'https://elifogretmen.com.tr',
    description: 'Elif Öğretmen, Türkçe öğretmeni tanıtım web sitesi.',
    icon: 'GraduationCap'
  },
  {
    id: '3',
    name: 'BAYEN.COM.TR',
    url: 'https://bayen.com.tr',
    description: 'Yangın güvenliği ve yapı sistemleri kurumsal web sitesi çalışması.',
    icon: 'Building2'
  },
  {
    id: '4',
    name: 'CNLILETISIM.COM',
    url: 'https://cnliletisim.com',
    description: 'GSM Teknolojileri kurulumu yapan firmanın tanıtım web sitesi.',
    icon: 'Smartphone'
  }
];

export const equipments: Equipment[] = [
  { 
    id: '1', 
    name: 'MacBook Air M4', 
    category: 'Bilgisayar', 
    image: 'macbook.png',
    specs: 'M4 işlemci, 16GB RAM, 512GB SSD'
  },
  { 
    id: '2', 
    name: 'DELL P3223QE 31,5" 4K', 
    category: 'Monitör', 
    image: 'monitor.png',
    specs: '4K IPS Panel, 60Hz, HDR'
  },
  { 
    id: '3', 
    name: 'Huawei MateView GT 27" 2K', 
    category: 'Monitör', 
    image: 'monitor2.png',
    specs: '2K VA Panel, 165Hz'
  },
  { 
    id: '4', 
    name: 'Logitech MX Keys Keyboard', 
    category: 'Klavye', 
    image: 'klavye.png',
    specs: 'Kablosuz Premium Klavye'
  },
  { 
    id: '5', 
    name: 'Logitech MX Master 3 Mouse', 
    category: 'Mouse', 
    image: 'mouse.png',
    specs: 'Ergonomik Kablosuz Mouse'
  },
  { 
    id: '6', 
    name: 'JBL 720BT Headphones', 
    category: 'Ses', 
    image: 'kulaklik.png',
    specs: 'Kablosuz Kulaklık, ANC'
  },
  { 
    id: '7', 
    name: 'Samsung Soundbar', 
    category: 'Ses', 
    image: 'soundbar.png',
    specs: '2.1 Kanal Ses Sistemi'
  },
  { 
    id: '8', 
    name: 'iPhone 14 Pro Max', 
    category: 'Telefon', 
    image: 'telefon.png',
    specs: '128GB, Deep Purple'
  },
  { 
    id: '9', 
    name: 'JBL Flip6 Speaker', 
    category: 'Ses', 
    image: 'flip6.png',
    specs: 'Taşınabilir Bluetooth Hoparlör'
  },
  { 
    id: '10', 
    name: 'xDrive Fırtına Gaming Chair', 
    category: 'Mobilya', 
    image: 'koltuk.png',
    specs: 'Ergonomik Oyuncu Koltuğu'
  }
];
