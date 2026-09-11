import React from 'react';
import { Link } from 'react-router-dom';
import myPhoto from '../assets/images/my.png';
import Section from '../components/ui/Section';
import { personalInfo, experiences, educations, additionalInfo } from '../data/cvData';
import { geocam } from '../data/geocamData';
import {
  ArrowRight,
  Car,
  Download,
  Globe,
  Heart,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Star,
  Wrench,
} from 'lucide-react';

const contactItems = [
  { icon: MapPin, label: 'Adres', value: personalInfo.address, href: undefined },
  {
    icon: Phone,
    label: 'Telefon',
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone.replace(/[^\d+]/g, '')}`,
  },
  { icon: Mail, label: 'E-posta', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
  { icon: Globe, label: 'Web', value: personalInfo.web, href: `https://${personalInfo.web}` },
];

const extraItems = [
  { icon: Heart, title: 'İlgi alanları', value: additionalInfo.hobbies },
  { icon: Sparkles, title: 'Kişisel yetkinlikler', value: additionalInfo.competencies },
  { icon: Wrench, title: 'Yetenekler', value: additionalInfo.skills },
  { icon: Car, title: 'Sürücü belgeleri & SRC', value: additionalInfo.drivingLicenses },
];

const HomePage: React.FC = () => (
  <div className="animate-fade-up">
    {/* Hero */}
    <section className="flex flex-col gap-8 border-b border-gray-200 pb-12 sm:flex-row sm:items-center">
      <img
        src={myPhoto}
        alt={personalInfo.name}
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
          Saha operasyonları, müşteri deneyimi ve yazılım geliştirme alanlarında çalışan bir profesyonelim.
          Trabzon’da yaşıyor, iOS ve web projeleri geliştiriyorum.
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

    {/* Hakkımda */}
    <Section title="Hakkımda">
      <div className="rounded-2xl bg-gray-50 p-6 ring-1 ring-gray-900/5">
        <p className="whitespace-pre-line text-sm leading-7 text-gray-700">{personalInfo.summary}</p>
      </div>
    </Section>

    {/* İletişim */}
    <Section title="İletişim" description="Bana en hızlı ulaşabileceğiniz kanallar.">
      <dl className="grid gap-4 sm:grid-cols-2">
        {contactItems.map(({ icon: Icon, label, value, href }) => {
          const content = (
            <>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Icon size={18} />
              </span>
              <span className="min-w-0">
                <dt className="text-xs font-medium text-gray-500">{label}</dt>
                <dd className="truncate text-sm font-semibold text-gray-900">{value}</dd>
              </span>
            </>
          );

          return href ? (
            <a
              key={label}
              href={href}
              {...(label === 'Web' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="flex items-center gap-4 rounded-xl bg-white p-4 ring-1 ring-gray-900/5 transition-shadow hover:shadow-md"
            >
              {content}
            </a>
          ) : (
            <div key={label} className="flex items-center gap-4 rounded-xl bg-white p-4 ring-1 ring-gray-900/5">
              {content}
            </div>
          );
        })}
      </dl>
    </Section>

    {/* Öne çıkan proje */}
    <Section title="Öne çıkan proje">
      <Link
        to="/geocam"
        className="group flex flex-col gap-5 rounded-2xl bg-gray-900 p-6 sm:flex-row sm:items-center"
      >
        <img
          src={geocam.icon}
          alt={`${geocam.name} uygulama ikonu`}
          className="h-16 w-16 shrink-0 rounded-2xl ring-1 ring-white/15"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-white">{geocam.name}</h3>
            <span className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-0.5 text-xs font-medium text-white">
              <Star size={11} className="fill-amber-400 text-amber-400" />
              {geocam.rating}
            </span>
          </div>
          <p className="mt-1 text-sm leading-6 text-gray-300">
            App Store’da yayınlanan, konum doğrulamalı saha ve denetim kamerası.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white">
          Detayları gör
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>
    </Section>

    {/* Deneyim */}
    <Section title="Deneyim">
      <ol>
        {experiences
          .slice()
          .reverse()
          .map((exp, index, list) => (
            <li key={`${exp.company}-${exp.period}`} className="flex gap-4 pb-8 last:pb-0">
              <div className="relative flex w-3 shrink-0 justify-center">
                {index !== list.length - 1 && (
                  <span
                    className="absolute left-1/2 top-4 -bottom-2 w-px -translate-x-1/2 bg-gray-200"
                    aria-hidden
                  />
                )}
                <span className="relative mt-[7px] h-2.5 w-2.5 rounded-full bg-brand-600 ring-4 ring-white" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-base font-semibold text-gray-900">{exp.company}</h3>
                  <span className="text-xs font-medium text-gray-500">{exp.period}</span>
                </div>
                <p className="mt-0.5 text-sm font-medium text-brand-600">{exp.role}</p>
                <ul className="mt-3 space-y-1.5">
                  {exp.responsibilities.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm leading-6 text-gray-600">
                      <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-gray-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
      </ol>
    </Section>

    {/* Eğitim */}
    <Section title="Eğitim">
      <div className="grid gap-4 md:grid-cols-2">
        {educations
          .slice()
          .reverse()
          .map((edu) => (
            <div
              key={`${edu.school}-${edu.department}`}
              className={`rounded-2xl p-6 ring-1 ${
                edu.ongoing ? 'bg-brand-50/60 ring-brand-600/20 md:col-span-2' : 'bg-white ring-gray-900/5'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium ${
                    edu.ongoing ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {edu.ongoing && (
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-600" />
                    </span>
                  )}
                  {edu.level} - {edu.status}
                </span>
                <span className="text-xs font-medium text-gray-500">
                  {edu.ongoing ? `${edu.period}’dan beri` : edu.period}
                </span>
              </div>
              <h3 className="mt-3 text-sm font-semibold leading-6 text-gray-900">{edu.school}</h3>
              <p className="mt-0.5 text-sm text-brand-600">{edu.department}</p>
              <ul className="mt-3 space-y-1.5">
                {edu.details.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-6 text-gray-600">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-gray-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </Section>

    {/* Ek bilgiler */}
    <Section title="Ek bilgiler">
      <div className="grid gap-4 sm:grid-cols-2">
        {extraItems.map(({ icon: Icon, title, value }) => (
          <div key={title} className="rounded-2xl bg-white p-5 ring-1 ring-gray-900/5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Icon size={17} />
              </span>
              <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-600">{value}</p>
          </div>
        ))}
      </div>
    </Section>
  </div>
);

export default HomePage;
