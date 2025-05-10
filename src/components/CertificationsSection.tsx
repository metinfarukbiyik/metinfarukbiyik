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
        <h2 className="text-3xl font-bold text-center mb-12">Sertifikalarım</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col gap-3 min-h-[180px]"
            >
              <div className="absolute -top-5 left-5 bg-white rounded-full shadow p-2 border border-gray-100">
                <Medal className="text-yellow-500 w-7 h-7" />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-lg font-semibold mb-1 mt-3">{cert.name}</h3>
                <p className="text-gray-700 text-sm mb-1">{cert.institution}</p>
                <p className="text-gray-400 text-xs mb-3">{cert.date}</p>
                {cert.pdfUrl && (
                  <button
                    onClick={() => {
                      setSelectedPDF(cert.pdfUrl || null);
                      setSelectedName(cert.name);
                    }}
                    className="flex items-center text-secondary hover:text-secondary/80 font-medium text-sm underline underline-offset-4 transition-colors pl-0 mt-2"
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