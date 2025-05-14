"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import PageLayout from "@/components/layouts/PageLayout";
import { MapPin, Calendar, Briefcase } from "lucide-react";
import Script from "next/script";

export default function HakkimdaPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const quickInfo = [
    {
      icon: MapPin,
      label: "Konum",
      value: "Trabzon, Türkiye"
    },
    {
      icon: Calendar,
      label: "Doğum",
      value: "1999, Trabzon"
    },
    {
      icon: Briefcase,
      label: "Meslek",
      value: "Geliştirici"
    }
  ];

  return (
    <PageLayout pageTitle={{ title: "Hakkımda" }}>
      <Script id="person-schema" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": "https://biyik.dev/#person",
            "name": "Metin Faruk Bıyık",
            "givenName": "Metin Faruk",
            "familyName": "Bıyık",
            "gender": "Male",
            "birthPlace": {
              "@type": "Place",
              "name": "Trabzon, Türkiye"
            },
            "birthDate": "1999",
            "nationality": {
              "@type": "Country",
              "name": "Türkiye"
            },
            "alumniOf": {
              "@type": "CollegeOrUniversity",
              "name": "ATA AÖF",
              "department": "Bilgi Yönetimi"
            },
            "jobTitle": ["Geliştirici", "Takım Koçu"],
            "worksFor": {
              "@type": "Organization",
              "name": "Turkcell Global Bilgi"
            },
            "url": "https://biyik.dev",
            "sameAs": [
              "https://x.com/_metinbiyik",
              "https://github.com/metinbiyik",
              "https://linkedin.com/in/metinbiyik"
            ],
            "image": "https://biyik.dev/profile.jpg",
            "description": "Web teknolojileri ve modern uygulama geliştirme alanında kendini sürekli geliştiren, öğrenmeye ve paylaşmaya tutkulu bir geliştirici."
          }
        `}
      </Script>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mt-12 max-w-6xl mx-auto"
      >
        <div className="grid md:grid-cols-[320px_1fr] gap-12">
          {/* Sol Kolon - Profil Fotoğrafı ve Bilgiler */}
          <motion.div variants={item} className="space-y-6">
            {/* Profil Fotoğrafı */}
            <div className="group relative aspect-square mx-auto bg-card/50 rounded-2xl backdrop-blur-sm border border-border overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Parıltı Efekti */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" />
              
              {/* Kenar Işıltısı */}
              <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-br from-white/30 via-transparent to-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Ana Görsel Konteyneri */}
              <div className="relative h-full w-full rounded-2xl overflow-hidden">
                <Image
                  src="/profile.jpg"
                  alt="Metin Faruk Bıyık"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="320px"
                  priority
                />
                
                {/* Görsel Üzeri Efektler */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/5" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />
                
                {/* Hover Durumunda Görünecek İsim */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 via-black/30 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white text-center font-medium">Metin Faruk Bıyık</p>
                </div>
              </div>
            </div>

            {/* Hızlı Bilgiler */}
            <div className="bg-card/50 rounded-2xl p-6 backdrop-blur-sm border border-border divide-y divide-border/50 hover:shadow-xl transition-all duration-500 hover:bg-card/70">
              {quickInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div key={index} className={`flex items-center gap-3 ${index > 0 ? 'pt-4 mt-4' : ''} group/info`}>
                    <div className="p-2 rounded-lg bg-primary/10 group-hover/info:bg-primary/20 transition-colors duration-300">
                      <Icon className="w-4 h-4 text-primary group-hover/info:scale-110 transition-transform duration-300" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground group-hover/info:text-primary/70 transition-colors duration-300">{info.label}</div>
                      <div className="font-medium group-hover/info:text-primary transition-colors duration-300">{info.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Sağ Kolon - Hakkımda Yazısı */}
          <motion.div variants={item}>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {/* Giriş Paragrafı */}
              <div className="bg-gradient-to-br from-card/80 to-card/50 rounded-2xl p-8 backdrop-blur-sm border border-border shadow-xl hover:shadow-2xl hover:from-card/90 hover:to-card/60 transition-all duration-500">
                <p className="first:mt-0 text-lg leading-relaxed">
                  Ben Metin Faruk Bıyık. 1999 yılında Trabzon'da doğdum. Çalışkan, çözüm odaklı ve gelişime açık bir yapıya sahibim. Şu anda ATA AÖF Bilgi Yönetimi ön lisans öğrencisi olarak akademik kariyerime devam ederken aynı zamanda profesyonel iş hayatımda da aktif bir şekilde görev alıyorum. Teknolojiye olan ilgim, öğrenmeye duyduğum merak ve takım çalışmalarındaki uyum becerim, beni bulunduğum her ortamda öne çıkarmaktadır.
                </p>

                <div className="mt-8 space-y-6">
                  <p className="text-base text-muted-foreground leading-relaxed">
                    2018 ile 2020 yılları arasında ALP Telekom firmasında Baz İstasyonu Teknisyeni olarak görev aldım. Bu süre zarfında, telekomünikasyon altyapılarının kurulumu ve bakımı konularında kapsamlı deneyimler kazandım. Sahada çalışmak, hızlı ve etkili çözümler üretme yeteneğimi geliştirmemde önemli bir rol oynadı.
                  </p>

                  <p className="text-base text-muted-foreground leading-relaxed">
                    2020 yılında, NTM Elektrik & Elektronik bünyesinde yeni bir kariyer adımı atarak Rework süreçlerinden ve ekip yönetiminden sorumlu personel olarak görev yaptım. 2023 yılına kadar bu rolde, üretim kalitesini artırmaya yönelik süreç iyileştirme çalışmaları yürüttüm ve ekip koordinasyonunda aktif roller üstlendim. Bu dönemde liderlik becerilerimi geliştirerek daha büyük sorumluluklar almaya hazır hale geldim.
                  </p>

                  <p className="text-base text-muted-foreground leading-relaxed">
                    2023 yılından bu yana ise Turkcell Global Bilgi bünyesinde Individual Müşteri Temsilcisi ve Takım Koçu olarak görev yapmaktayım. Bu pozisyonda, müşteri memnuniyetini artırmaya yönelik stratejiler geliştirme ve etkin iletişim kurarak kaliteli hizmet sunma üzerine yoğunlaşmış durumdayım. Aynı zamanda takım arkadaşlarımın performanslarını destekleyerek hedeflere ulaşmaları için yol gösterici rol üstleniyorum.
                  </p>

                  <div className="w-full h-px bg-border/50 my-8" />

                  <p className="text-base text-muted-foreground leading-relaxed italic">
                    İş yaşamımda olduğu gibi özel hayatımda da disiplinli bir yaklaşım benimsiyorum. Kişisel gelişimime önem veriyor; spor, beslenme ve teknoloji alanlarında kendimi sürekli geliştirmeye çalışıyorum. Hedefim, hem bireysel hem de takım başarısına katkı sağlayabileceğim güçlü projelerde yer almak ve bulunduğum kurumlara değer katmak.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </PageLayout>
  );
} 