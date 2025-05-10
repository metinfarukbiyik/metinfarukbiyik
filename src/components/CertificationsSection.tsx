"use client"

import { useState } from "react";
import { PDFModal } from "./PDFModal";
import { Medal, Eye } from "lucide-react";

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
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="relative bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-secondary/5 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 p-6 flex flex-col gap-3 min-h-[180px]"
            >
              <div className="absolute -top-5 left-5 bg-white dark:bg-zinc-900 rounded-full shadow p-2 border border-gray-100 dark:border-gray-700">
                <Medal className="text-secondary dark:text-secondary w-7 h-7" />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-lg font-semibold mb-1 mt-3 text-gray-900 dark:text-gray-100">{cert.name}</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">{cert.institution}</p>
                <p className="text-gray-400 dark:text-gray-400 text-xs mb-3">{cert.date}</p>
                {cert.pdfUrl && (
                  <button
                    onClick={() => {
                      setSelectedPDF(cert.pdfUrl || null);
                      setSelectedName(cert.name);
                    }}
                    className="flex items-center text-secondary dark:text-secondary hover:text-secondary/80 dark:hover:text-secondary/80 font-medium text-sm underline underline-offset-4 transition-colors pl-0 mt-2"
                  >
                    <Eye className="w-4 h-4 mr-2" />
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