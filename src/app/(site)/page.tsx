import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import myPhoto from '@/assets/images/my.png';
import Section from '@/components/ui/Section';
import PostRow from '@/components/blog/PostRow';
import { getLatestPosts } from '@/lib/blog';
import { personalInfo } from '@/data/cvData';
import { byk } from '@/data/bykData';
import { geocam } from '@/data/geocamData';
import { ArrowRight, Download, Linkedin, Mail, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ana Sayfa',
  description:
    "Metin Faruk Bıyık'ın kişisel sitesi: son yazılar, öne çıkan projeler ve kısa tanıtım.",
  keywords: ['Metin Faruk Bıyık', 'biyik.dev', 'blog', 'projeler', 'Trabzon'],
  alternates: { canonical: '/' },
};

const HomePage = async () => {
  const latestPosts = await getLatestPosts(2);

  return (
    <div className="animate-fade-up">
      <section className="flex flex-col gap-8 border-b border-gray-200 pb-12 sm:flex-row sm:items-center">
        <Image
          src={myPhoto}
          alt={personalInfo.name}
          priority
          placeholder="blur"
          className="h-28 w-28 shrink-0 rounded-2xl object-cover ring-1 ring-gray-900/10 sm:h-36 sm:w-36"
        />
        <div className="min-w-0">
          <span className="inline-flex items-center rounded-md bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700 ring-1 ring-inset ring-brand-700/10">
            {personalInfo.title}
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {personalInfo.name}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-gray-600">
            Saha operasyonları, müşteri deneyimi ve yazılım geliştirme alanlarında çalışan bir
            profesyonelim. Trabzon’da yaşıyor, iOS ve web projeleri geliştiriyorum.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="/cv/metinfarukbiyik-cv.pdf"
              download
              className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
            >
              <Download size={16} />
              Özgeçmişi indir
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 transition-colors hover:bg-gray-50"
            >
              <Mail size={16} />
              E-posta gönder
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 ring-1 ring-inset ring-gray-300 transition-colors hover:bg-gray-50 hover:text-gray-900"
              aria-label="LinkedIn profili"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </section>

      {latestPosts.length > 0 && (
        <Section
          title="Blogdan son yazılarım"
          description="Hayatımdan notlar, gezdiğim yerler ve geliştirdiğim projeler."
          actions={
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              Tümünü gör
              <ArrowRight size={15} />
            </Link>
          }
        >
          <div className="space-y-3">
            {latestPosts.map((post) => (
              <PostRow key={post.slug} post={post} />
            ))}
          </div>
        </Section>
      )}

      <Section
        title="Öne çıkan projeler"
        actions={
          <Link
            href="/projeler"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            Tümünü gör
            <ArrowRight size={15} />
          </Link>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/geocam"
            className="group flex h-full flex-col gap-4 rounded-2xl bg-gray-900 p-5"
          >
            <Image
              src={geocam.icon}
              alt={`${geocam.name} uygulama ikonu`}
              width={56}
              height={56}
              className="h-14 w-14 shrink-0 rounded-2xl ring-1 ring-white/15"
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-semibold text-white">{geocam.name}</h3>
                <span className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-0.5 text-xs font-medium text-white">
                  <Star size={11} className="fill-amber-400 text-amber-400" />
                  {geocam.rating}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-gray-300">
                App Store’da yayınlanan, konum doğrulamalı saha ve denetim kamerası.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white">
              Detayları gör
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>

          <Link
            href="/byk-seri-baski-pro"
            className="group flex h-full flex-col gap-4 rounded-2xl bg-white p-5 ring-1 ring-gray-900/5 transition-shadow hover:shadow-md"
          >
            <Image
              src={byk.icon}
              alt={`${byk.name} program ikonu`}
              width={56}
              height={56}
              className="h-14 w-14 shrink-0 rounded-2xl ring-1 ring-gray-900/10"
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-semibold text-gray-900">{byk.name}</h3>
                <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                  Windows
                </span>
                <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                  macOS
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-gray-600">{byk.slogan}</p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
              Detayları gör
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
      </Section>
    </div>
  );
};

export default HomePage;
