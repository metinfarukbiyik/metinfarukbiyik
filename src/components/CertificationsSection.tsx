"use client"

import { useState } from "react";
import { PDFModal } from "./PDFModal";
import { Medal, Eye, Calendar, Building } from "lucide-react";

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
    <section className="py-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="relative bg-white dark:bg-zinc-800/80 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 p-5 flex flex-col min-h-[180px] group hover:bg-gradient-to-br hover:from-white hover:to-gray-50 dark:hover:from-zinc-800 dark:hover:to-zinc-900/90 hover:border-secondary/20 dark:hover:border-secondary/20"
            >
              <div className="absolute -top-3 left-4 bg-white dark:bg-zinc-800 rounded-full shadow p-1.5 border border-gray-200 dark:border-gray-700 group-hover:border-secondary/30 dark:group-hover:border-secondary/30 transition-all duration-300">
                <Medal className="text-secondary dark:text-secondary w-5 h-5" />
              </div>
              
              <div className="flex-1 flex flex-col pt-3">
                <h3 className="text-base font-semibold mb-2 mt-2 text-gray-900 dark:text-gray-100">{cert.name}</h3>
                
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Building className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{cert.institution}</p>
                </div>
                
                <div className="flex items-center gap-1.5 mb-3">
                  <Calendar className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                  <p className="text-gray-600 dark:text-gray-400 text-xs">{cert.date}</p>
                </div>
                
                {cert.pdfUrl && (
                  <button
                    onClick={() => {
                      setSelectedPDF(cert.pdfUrl || null);
                      setSelectedName(cert.name);
                    }}
                    className="inline-flex items-center text-secondary dark:text-secondary hover:text-secondary/80 dark:hover:text-secondary/80 text-xs mt-auto"
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    Sertifikayı Görüntüle
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedPDF && (
        <PDFModal
          isOpen={!!selectedPDF}
          onClose={() => setSelectedPDF(null)}
          pdfUrl={selectedPDF}
          title={selectedName}
        />
      )}
    </section>
  );
} 