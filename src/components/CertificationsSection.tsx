"use client"

import { useState } from "react";
import { PDFModal } from "./PDFModal";

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

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Sertifikalarım</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">{cert.name}</h3>
              <p className="text-gray-600 mb-2">{cert.institution}</p>
              <p className="text-gray-500 mb-4">{cert.date}</p>
              {cert.pdfUrl && (
                <button
                  onClick={() => setSelectedPDF(cert.pdfUrl || null)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Sertifikayı Görüntüle
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      {selectedPDF && (
        <PDFModal
          isOpen={!!selectedPDF}
          onClose={() => setSelectedPDF(null)}
          pdfUrl={selectedPDF}
        />
      )}
    </section>
  );
} 