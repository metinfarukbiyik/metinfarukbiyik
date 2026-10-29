import Image from 'next/image';
import { ArrowUpRight, Check, Mail, MessageCircle, X } from 'lucide-react';
import { pageMetadata, projectSchema } from '@/lib/seo';
import { portfolioProjects } from '@/data/projects';
import ProductIntro from '@/components/ProductIntro';
import BykDownloads from '@/components/byk/BykDownloads';
import ProjectList from '@/components/ProjectList';
import JsonLd from '@/components/JsonLd';
import AccordionItem from '@/components/ui/AccordionItem';
import HashOpenDetails from '@/components/ui/HashOpenDetails';
import {
  byk,
  downloads,
  excelColumns,
  faqs,
  features,
  labelSamples,
  portableDownload,
  printers,
  usageSteps,
} from '@/data/bykData';

const project = portfolioProjects.find((p) => p.slug === 'byk-seri-baski-pro')!;
export const metadata = pageMetadata(
  'BYK Seri Baskı Pro — Barkod Etiket Programı',
  byk.metaDescription,
  project.href,
  project.keywords,
);

export default function BykPage() {
  return (
    <div className="animate-fade-up">
      <HashOpenDetails />
      <ProductIntro
        name={byk.name}
        icon={byk.icon}
        platform="Windows · macOS"
        slogan={byk.slogan}
        description={byk.description}
      >
        <BykDownloads />
      </ProductIntro>
      <figure className="product-screenshot">
        <Image
          src={byk.banner}
          alt="BYK Seri Baskı Pro — Excel’den toplu seri numarası ve barkod etiketi baskısı"
          width={1280}
          height={440}
          priority
          sizes="(max-width: 768px) 90vw, 900px"
        />
        <figcaption>BYK Seri Baskı Pro — toplu etiket baskısı</figcaption>
      </figure>
      <section className="project-detail-section">
        <h2>Excel’den etikete, tek bir uygulamada.</h2>
        <ul className="feature-checks feature-details">
          {features.map((feature) => (
            <li key={feature.title}>
              <Check size={16} />
              <div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section className="project-detail-section">
        <h2>Üç adımda kullanmaya başla</h2>
        <ol className="usage-steps">
          {usageSteps.map((step, index) => (
            <li key={step.title}>
              <span>0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="project-detail-section">
        <h2>Excel formatı</h2>
        <p>İlk satır başlık, her satır bir etiket.</p>
        <dl className="project-facts">
          {excelColumns.map((column) => (
            <div key={column.column}>
              <dt>
                {column.column} · {column.required ? 'Zorunlu' : 'İsteğe bağlı'}
              </dt>
              <dd>{column.meaning}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="project-detail-section">
        <h2>Etiket örnekleri</h2>
        <p>
          Programın kendi önizleme motoruyla üretildi; baskıda da böyle çıkar.
        </p>
        <div className="label-gallery">
          {labelSamples.map((sample) => (
            <figure
              key={sample.src}
              className={`product-screenshot${sample.width > sample.height ? ' wide-label' : ''}`}
            >
              <div className="label-preview">
                <Image
                  src={sample.src}
                  alt={sample.alt}
                  width={sample.width}
                  height={sample.height}
                  sizes="(max-width: 640px) 80vw, 440px"
                />
              </div>
              <figcaption>
                <strong>{sample.title}</strong> · {sample.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section className="project-detail-section">
        <h2>Marka stilleri</h2>
        <p>Firma adı dört stilde: düz, çerçeveli, siyah bant, çizgili.</p>
        <figure className="product-screenshot">
          <div className="no-scrollbar overflow-x-auto p-4">
            <Image
              src={byk.brandStyles}
              alt="Etikette dört marka stili: düz, çerçeveli, siyah bant ve çizgili"
              width={1328}
              height={135}
              className="min-w-[560px]"
              sizes="(max-width: 768px) 90vw, 900px"
            />
          </div>
          <figcaption>Firma adını etiketine uygun biçimde düzenle.</figcaption>
        </figure>
      </section>
      <section className="project-detail-section">
        <h2>Uyumlu yazıcılar</h2>
        <div className="installation-grid">
          {[
            { group: printers.supported, Icon: Check },
            { group: printers.unsupported, Icon: X },
          ].map(({ group, Icon }) => (
            <div key={group.title}>
              <h3 className="flex items-center gap-2">
                <Icon size={16} />
                {group.title}
              </h3>
              <p>{group.description}</p>
              <ul className="printer-brands">
                {group.brands.map((brand) => (
                  <li key={brand}>{brand}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p>
          Emin değilsen yazıcının kılavuzunda “TSPL” ifadesini ara ya da model
          adıyla bize yaz.
        </p>
      </section>
      <section className="project-detail-section">
        <h2>Kurulum</h2>
        <div className="installation-grid">
          {downloads.map((item) => (
            <div key={item.platform}>
              <h3>{item.label}</h3>
              <ol className="installation-steps">
                {item.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <p>{item.note}</p>
            </div>
          ))}
        </div>
        <a href={portableDownload.url} className="text-button">
          {portableDownload.label} <ArrowUpRight size={14} />
        </a>
        <p className="mt-4">{byk.offlineNote}</p>
      </section>
      <section className="project-detail-section">
        <h2>Sık sorulanlar</h2>
        {faqs.map((faq, index) => (
          <AccordionItem
            key={faq.id}
            id={faq.id}
            index={`0${index + 1}`}
            title={faq.question}
          >
            <p className="text-sm leading-6 text-muted">{faq.answer}</p>
          </AccordionItem>
        ))}
      </section>
      <section className="project-detail-section">
        <h2>İletişim ve destek</h2>
        <p>Yazıcı uyumu, kurulum ya da baskı ayarı için yaz.</p>
        <div className="download-actions">
          <a href={`mailto:${byk.email}`} className="pill-button">
            <Mail size={15} />
            {byk.email}
          </a>
          <a
            href={byk.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="pill-button"
          >
            <MessageCircle size={15} />
            WhatsApp
          </a>
        </div>
      </section>
      <section className="project-detail-section">
        <h2>Diğer uygulamalar</h2>
        <div className="list-panel">
          <ProjectList
            projects={portfolioProjects.filter(
              (p) => p.category === 'Uygulama' && p.slug !== project.slug,
            )}
          />
        </div>
      </section>
      <JsonLd
        data={{ ...projectSchema(project), downloadUrl: downloads[0].url }}
      />
    </div>
  );
}
