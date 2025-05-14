"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import PageLayout from "@/components/layouts/PageLayout";
import { Linkedin, Instagram, Twitter, Mail, MapPin, Calendar, Briefcase } from "lucide-react";

export default function HakkimdaPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
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
    <PageLayout
      pageTitle={{
        title: "Hakkımda"
      }}
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mt-12 max-w-6xl mx-auto"
      >
        <div className="grid md:grid-cols-[320px_1fr] gap-12">
          {/* Sol Kolon - Profil Fotoğrafı ve Bilgiler */}
          <motion.div variants={item} className="space-y-8">
            {/* Profil Fotoğrafı */}
            <div className="group relative aspect-square mx-auto bg-card/50 rounded-2xl backdrop-blur-sm border border-border overflow-hidden">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Parıltı Efekti */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
              
              {/* Kenar Işıltısı */}
              <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
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
            <div className="space-y-4 bg-card/50 rounded-2xl p-6 backdrop-blur-sm border border-border">
              {quickInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{info.label}</div>
                      <div className="font-medium">{info.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Sağ Kolon - Hakkımda Yazısı */}
          <motion.div variants={item} className="space-y-8">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {/* Giriş Paragrafı */}
              <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border">
                <p className="first:mt-0">
                  Merhaba, ben Metin Faruk Bıyık. 1999 yılında Trabzon'da doğdum. Çalışkan, çözüm odaklı ve gelişime açık bir yapıya sahibim. Şu anda ATA AÖF Bilgi Yönetimi ön lisans öğrencisi olarak akademik kariyerime devam ederken aynı zamanda profesyonel iş hayatımda da aktif bir şekilde görev alıyorum. Teknolojiye olan ilgim, öğrenmeye duyduğum merak ve takım çalışmalarındaki uyum becerim, beni bulunduğum her ortamda öne çıkarmaktadır.
                </p>
              </div>

              {/* Deneyimler */}
              <div className="mt-8">
                <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border space-y-6">
                  <p className="first:mt-0">
                    2018 ile 2020 yılları arasında ALP Telekom firmasında Baz İstasyonu Teknisyeni (Base Station Technician) olarak görev aldım. Bu süre zarfında, telekomünikasyon altyapılarının kurulumu (infrastructure installation) ve bakımı (maintenance) konularında kapsamlı deneyimler kazandım. Sahada çalışmak, hızlı ve etkili çözümler üretme yeteneğimi geliştirmemde önemli bir rol oynadı.
                  </p>

                  <div className="w-full h-px bg-border/50" />

                  <p className="first:mt-0">
                    2020 yılında, NTM Elektrik & Elektronik bünyesinde yeni bir kariyer adımı atarak Rework (yeniden işleme) süreçlerinden ve ekip yönetiminden (team management) sorumlu personel olarak görev yaptım. 2023 yılına kadar bu rolde, üretim kalitesini artırmaya yönelik süreç iyileştirme (process improvement) çalışmaları yürüttüm ve ekip koordinasyonunda aktif roller üstlendim. Bu dönemde liderlik becerilerimi geliştirerek daha büyük sorumluluklar almaya hazır hale geldim.
                  </p>

                  <div className="w-full h-px bg-border/50" />

                  <p className="first:mt-0">
                    2023 yılından bu yana ise Turkcell Global Bilgi bünyesinde Individual Müşteri Temsilcisi (Customer Representative) ve Takım Koçu (Team Coach) olarak görev yapmaktayım. Bu pozisyonda, müşteri memnuniyetini artırmaya yönelik stratejiler geliştirme (strategy development for customer satisfaction) ve etkin iletişim kurarak kaliteli hizmet sunma üzerine yoğunlaşmış durumdayım. Aynı zamanda takım arkadaşlarımın performanslarını destekleyerek hedeflere ulaşmaları için yol gösterici rol üstleniyorum.
                  </p>
                </div>
              </div>

              {/* Kapanış Paragrafı */}
              <div className="mt-8 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border">
                <p className="first:mt-0">
                  İş yaşamımda olduğu gibi özel hayatımda da disiplinli bir yaklaşım benimsiyorum. Kişisel gelişimime önem veriyor; spor, beslenme ve teknoloji alanlarında kendimi sürekli geliştirmeye çalışıyorum. Hedefim, hem bireysel hem de takım başarısına katkı sağlayabileceğim güçlü projelerde yer almak ve bulunduğum kurumlara değer katmak (to add value).
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </PageLayout>
  );
} 