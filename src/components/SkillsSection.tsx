"use client"

import { useState } from "react";
import { Star, Monitor, Code } from "lucide-react";

interface SkillsSectionProps {
  skills: {
    softSkills: string[];
    technical: {
      programs: string[];
      webDevelopment: string[];
    };
  };
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  // Yıldız seviyelerini temsil etmek için bir fonksiyon (5 üzerinden)
  function getSkillLevel(skill: string): number {
    const highSkills = [
      "Takım Çalışması", "İleri Seviye Bilgisayar Kullanımı", "Hızlı Öğrenme",
      "MS Word", "HTML", "CSS", "İş Planlama", 
    ];
    
    const mediumHighSkills = [
      "Çözüm Odaklı", "Analiz ve Problem Çözme", "Güçlü İletişim",
       "JavaScript", "MS Excel", "React",
    ];
    
    if (highSkills.includes(skill)) return 5;
    if (mediumHighSkills.includes(skill)) return 4;
    return 3;
  }

  // Yıldızları render etmek için yardımcı fonksiyon
  const renderStars = (skill: string, colorClass: string) => {
    const level = getSkillLevel(skill);
    // Sabit bir dizi oluştur - performans optimizasyonu için
    const stars = [1, 2, 3, 4, 5,];
    
    return (
      <div className="flex space-x-0.5">
        {stars.map((starIndex) => (
          <Star 
            key={`${skill}-star-${starIndex}`}
            className={`h-3 w-3 ${
              starIndex <= level
                ? `text-${colorClass}` 
                : 'text-gray-300 dark:text-gray-600'
            }`} 
            fill={starIndex <= level ? "currentColor" : "none"}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Kişisel Yetenekler */}
      <div className="space-y-4">
        <h3 className="text-base font-medium text-card-foreground/90 flex items-center gap-2 mb-3">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Star className="h-3 w-3" />
          </div>
          <span>Kişisel Yetenekler</span>
        </h3>
        
        <div className="grid grid-cols-2 gap-2">
          {skills.softSkills.map((skill, index) => (
            <div 
              key={`soft-skill-${index}`} 
              className="flex items-center gap-2 rounded-lg bg-card/30 p-2 ring-1 ring-black/5 dark:ring-white/5 hover:bg-card/50 transition-all"
            >
              <span className="text-sm text-card-foreground/90 flex-1">{skill}</span>
              {renderStars(skill, "primary")}
            </div>
          ))}
        </div>
      </div>
      
      {/* Programlar */}
      <div className="space-y-4">
        <h3 className="text-base font-medium text-card-foreground/90 flex items-center gap-2 mb-3">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-secondary/10 text-secondary">
            <Monitor className="h-3 w-3" />
          </div>
          <span>Programlar</span>
        </h3>
        
        <div className="grid grid-cols-2 gap-2">
          {skills.technical.programs.map((program, index) => (
            <div 
              key={`program-${index}`} 
              className="flex items-center gap-2 rounded-lg bg-card/30 p-2 ring-1 ring-black/5 dark:ring-white/5 hover:bg-card/50 transition-all"
            >
              <span className="text-sm text-card-foreground/90 flex-1">{program}</span>
              {renderStars(program, "secondary")}
            </div>
          ))}
        </div>
      </div>
      
      {/* Web Geliştirme */}
      <div className="space-y-4">
        <h3 className="text-base font-medium text-card-foreground/90 flex items-center gap-2 mb-3">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent">
            <Code className="h-3 w-3" />
          </div>
          <span>Web Geliştirme</span>
        </h3>
        
        <div className="grid grid-cols-2 gap-2">
          {skills.technical.webDevelopment.map((tech, index) => (
            <div 
              key={`web-tech-${index}`}
              className="flex items-center gap-2 rounded-lg bg-card/30 p-2 ring-1 ring-black/5 dark:ring-white/5 hover:bg-card/50 transition-all"
            >
              <span className="text-sm text-card-foreground/90 flex-1">{tech}</span>
              {renderStars(tech, "accent")}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 