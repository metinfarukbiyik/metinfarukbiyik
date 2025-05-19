"use client"

import { useState } from "react";
import { PDFModal } from "./PDFModal";
import { Eye, Calendar, Building, Scroll } from "lucide-react";

interface Certification {
  name: string;
  institution: string;
  date: string;
  pdfUrl?: string;
}

interface CertificationsSectionProps {
  certifications: Certification[];
}

export default function CertificationsSection({ certifications }: CertificationsSectionProps) {
  const [selectedPDF, setSelectedPDF] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string>("");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {certifications.map((cert, index) => (
        <div key={index} className="group relative">
          {/* İçerik kartı */}
          <div className="group/card relative overflow-hidden rounded-2xl border border-white/20 dark:border-zinc-700/40 bg-gradient-to-br from-white/70 via-white/60 to-white/50 dark:from-zinc-800/50 dark:via-zinc-800/40 dark:to-zinc-800/30 p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-lg shadow-sm group-hover:border-secondary/20 group-hover:shadow-md aspect-square flex flex-col">
            {/* Arkaplan efektleri */}
            <div className="pointer-events-none absolute -right-12 top-0 h-48 w-48 rounded-full bg-secondary/5 blur-2xl transition-all duration-500 group-hover:bg-secondary/10" />
            <div className="pointer-events-none absolute -left-12 bottom-0 h-40 w-40 rounded-full bg-secondary/5 blur-2xl transition-all duration-500 group-hover:bg-secondary/10" />
            
            {/* Decorative certificate icon */}
            <div className="absolute top-4 right-4 text-secondary/30 group-hover:text-secondary/40 transition-colors duration-300">
              <Scroll className="w-10 h-10" strokeWidth={1} />
            </div>
            
            <div className="relative z-10 flex-1 flex flex-col">
              {/* Sertifika başlığı - sabit yükseklik */}
              <div className="h-16 flex items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white group-hover:text-secondary transition-all duration-300 line-clamp-2">
                  {cert.name}
                </h3>
              </div>
              
              {/* Bilgi bölümü - sabit konumda */}
              <div className="flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  {/* Kurum */}
                  <div className="flex items-center gap-2 text-gray-600 dark:text-white/70 group-hover:text-gray-800 dark:group-hover:text-white/90 transition-colors duration-300">
                    <div className="p-1 rounded-md bg-secondary/5 group-hover:bg-secondary/10 transition-colors duration-300">
                      <Building className="h-3.5 w-3.5 text-secondary/80" />
                    </div>
                    <span className="text-sm">{cert.institution}</span>
                  </div>

                  {/* Tarih bilgisi */}
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 group-hover:text-secondary/80 transition-colors duration-300">
                    <div className="p-1 rounded-md bg-secondary/5 group-hover:bg-secondary/10 transition-colors duration-300">
                      <Calendar className="h-3.5 w-3.5 text-secondary/80" />
                    </div>
                    <span className="text-xs">{cert.date}</span>
                  </div>
                </div>
                
                {/* Sertifika görüntüleme butonu */}
                <div className="w-full flex justify-center mt-4">
                  {cert.pdfUrl && (
                    <button
                      onClick={() => {
                        setSelectedPDF(cert.pdfUrl || null);
                        setSelectedName(cert.name);
                      }}
                      className="text-xs text-secondary hover:text-secondary/90 transition-colors duration-300 flex items-center gap-1.5 border border-secondary/20 hover:border-secondary/40 rounded-lg py-1.5 px-3"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Sertifikayı Görüntüle</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Hover efekti için kenar parlaması */}
            <div className="absolute inset-px rounded-xl bg-gradient-to-r from-transparent via-secondary/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
          </div>
        </div>
      ))}

      {selectedPDF && (
        <PDFModal
          isOpen={!!selectedPDF}
          onClose={() => setSelectedPDF(null)}
          pdfUrl={selectedPDF}
          title={selectedName}
        />
      )}
    </div>
  );
} 