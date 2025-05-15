"use client";

import { useState } from "react";
import Image from "next/image";
import { momentsData } from "@/data/moments";
import { Calendar, MapPin } from "lucide-react";
import ImageModal from "@/components/ImageModal";
import PageLayout from "@/components/layouts/PageLayout";
import { motion } from "framer-motion";

const formatDate = (dateStr: string) => {
  const [day, month, year] = dateStr.split('.').map(Number);
  const aylar = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];

  return `${day} ${aylar[month - 1]} ${year}`;
};

export default function AnlarPage() {
  const [modalState, setModalState] = useState<{
    images: Array<{url: string; alt?: string}>;
    currentIndex: number;
    isOpen: boolean;
  }>({
    images: [],
    currentIndex: 0,
    isOpen: false
  });

  const openModal = (images: Array<{url: string; alt?: string}>, index: number) => {
    setModalState({
      images,
      currentIndex: index,
      isOpen: true
    });
  };

  const closeModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  // Anıları tarihe göre sırala (en yeni en üstte)
  const sortedMoments = [...momentsData].sort((a, b) => {
    const dateA = new Date(a.date.split('.').reverse().join('-'));
    const dateB = new Date(b.date.split('.').reverse().join('-'));
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <PageLayout
      pageTitle={{
        title: "Anılar",
        description: "Hayatımdan özel anılar, fotoğraflar ve hatıralar. Her bir fotoğraf bir hikaye, her bir anı bir deneyim.",
      }}
    >
      {/* Fotoğraf Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-max"
      >
        {sortedMoments.map((moment, idx) => (
          <motion.div
            key={moment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            className="group relative overflow-hidden rounded-2xl bg-white/[0.02] dark:bg-black/[0.02] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-black/5 dark:border-white/5"
          >
            {/* Fotoğraflar */}
            <div className="relative">
              {moment.images.length === 2 ? (
                // İki fotoğraflı düzen
                <div className="relative aspect-[16/9] w-full">
                  <div className="absolute inset-0 grid grid-cols-2 gap-1">
                    {moment.images.map((image, index) => (
                      <div
                        key={index}
                        className="relative h-full cursor-pointer overflow-hidden"
                        onClick={() => openModal(moment.images, index)}
                      >
                        <Image
                          src={image.url}
                          alt={image.alt || `${moment.title} - ${moment.description || ''} ${moment.location ? `(${moment.location})` : ''}`}
                          fill
                          loading="lazy"
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                // Tek fotoğraflı düzen
                <div
                  className="relative aspect-[16/9] cursor-pointer overflow-hidden"
                  onClick={() => openModal(moment.images, 0)}
                >
                  <Image
                    src={moment.images[0].url}
                    alt={moment.images[0].alt || `${moment.title} - ${moment.description || ''} ${moment.location ? `(${moment.location})` : ''}`}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
            </div>

            {/* İçerik Alanı */}
            <div className="relative space-y-3 p-5">
              <h3 className="font-medium text-sm text-black/90 dark:text-white/90 line-clamp-2 group-hover:text-primary/90">
                {moment.title}
              </h3>
              
              <div className="flex flex-wrap items-center gap-2 text-sm">
                {moment.date && (
                  <div className="flex items-center gap-1.5 bg-black/[0.02] dark:bg-white/[0.02] px-3 py-1 rounded-full">
                    <Calendar className="h-4 w-4 text-primary/80" />
                    <time dateTime={moment.date} className="font-medium">
                      {formatDate(moment.date)}
                    </time>
                  </div>
                )}
                
                {moment.location && (
                  <div className="flex items-center gap-1.5 bg-black/[0.02] dark:bg-white/[0.02] px-3 py-1 rounded-full">
                    <MapPin className="h-4 w-4 text-secondary/80" />
                    <span className="font-medium">{moment.location}</span>
                  </div>
                )}
              </div>

              {moment.description && (
                <p className="text-sm text-black/60 dark:text-white/60 line-clamp-2 leading-relaxed">
                  {moment.description}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal */}
      <ImageModal
        images={modalState.images}
        currentImageIndex={modalState.currentIndex}
        isOpen={modalState.isOpen}
        onClose={closeModal}
      />
    </PageLayout>
  );
} 