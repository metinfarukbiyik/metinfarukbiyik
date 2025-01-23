"use client";

import { useState } from "react";
import Image from "next/image";
import { momentsData } from "@/data/moments";
import { Calendar, MapPin, Instagram } from "lucide-react";
import ImageModal from "@/components/ImageModal";
import PageLayout from "@/components/layouts/PageLayout";

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

  // Anları tarihe göre sırala (en yeni en üstte)
  const sortedMoments = [...momentsData].sort((a, b) => {
    const dateA = new Date(a.date.split('.').reverse().join('-'));
    const dateB = new Date(b.date.split('.').reverse().join('-'));
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <PageLayout
      pageTitle={{
        title: "Anlar",
        description: "Hayatımdan küçük kesitler, değer verdiğim anılar ve beni etkileyen deneyimlerin kısa hikayeleri. Bu bölüm, yaşadığım anlamlı anları ve bu anların üzerimde bıraktığı izleri yansıtıyor.",
        children: (
          <a
            href="https://instagram.com/_metinbiyik"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full font-medium text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:from-[#9B4DCA] hover:via-[#FE3434] hover:to-[#FF8C4F] shadow-md"
          >
            <Instagram className="h-5 w-5" />
            <span className="font-semibold">@_metinbiyik</span>
          </a>
        )
      }}
    >
      {/* Fotoğraf Grid */}
      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 auto-rows-max">
        {sortedMoments.map((moment) => (
          <div
            key={moment.id}
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-transparent dark:from-black/10 dark:via-black/5 dark:to-transparent backdrop-blur-xl shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1 border border-white/10 dark:border-white/5"
          >
            {/* Fotoğraflar */}
            <div className={`relative ${
              moment.images.length === 1 ? 'p-0' : 'p-0'
            }`}>
              {moment.images.length === 2 ? (
                // İki fotoğraflı düzen
                <div className="relative aspect-[16/9] w-full">
                  <div className="absolute inset-0 grid grid-cols-2 gap-1 p-0">
                    {/* İlk Fotoğraf */}
                    <div
                      className="relative h-full cursor-pointer overflow-hidden"
                      onClick={() => openModal(moment.images, 0)}
                    >
                      <Image
                        src={moment.images[0].url}
                        alt={moment.images[0].alt || moment.title}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>

                    {/* İkinci Fotoğraf */}
                    <div
                      className="relative h-full cursor-pointer overflow-hidden"
                      onClick={() => openModal(moment.images, 1)}
                    >
                      <Image
                        src={moment.images[1].url}
                        alt={moment.images[1].alt || moment.title}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>
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
                    alt={moment.images[0].alt || moment.title}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              )}
            </div>

            {/* İçerik Alanı */}
            <div className="relative space-y-4 p-6 bg-gradient-to-t from-white/[0.04] to-transparent dark:from-black/[0.04]">
              <h3 className="font-semibold text-xl tracking-tight text-card-foreground">
                {moment.title}
              </h3>
              
              <div className="flex flex-wrap items-center gap-3 text-sm">
                {moment.date && (
                  <div className="flex items-center gap-1.5 bg-black/[0.03] dark:bg-white/[0.03] px-3 py-1.5 rounded-full backdrop-blur-sm">
                    <Calendar className="h-4 w-4 text-primary/80" />
                    <time dateTime={moment.date} className="font-medium">
                      {formatDate(moment.date)}
                    </time>
                  </div>
                )}
                
                {moment.location && (
                  <div className="flex items-center gap-1.5 bg-black/[0.03] dark:bg-white/[0.03] px-3 py-1.5 rounded-full backdrop-blur-sm">
                    <MapPin className="h-4 w-4 text-secondary/80" />
                    <span className="font-medium">{moment.location}</span>
                  </div>
                )}
              </div>

              {moment.description && (
                <p className="text-sm text-muted-foreground/90 line-clamp-2 leading-relaxed">
                  {moment.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

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