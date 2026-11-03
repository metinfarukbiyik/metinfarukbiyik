import { Download, Mail } from 'lucide-react';
import AboutToc from '@/components/about/AboutToc';
import CertificateList from '@/components/CertificateList';
import ContactCta from '@/components/ContactCta';
import EquipmentList from '@/components/EquipmentList';
import { Badge, ButtonLink, DataList, PageHeader, SectionHeader, TextLink } from '@/components/ui';
import {
  additionalInfo,
  certificates,
  educations,
  equipments,
  experiences,
  personalInfo,
} from '@/data/cvData';
import { pageMetadata, seoPages } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = pageMetadata(seoPages.about);

const toc = [
  { id: 'profil', label: 'Profil' },
  { id: 'deneyim', label: 'Deneyim' },
  { id: 'egitim', label: 'Eğitim' },
  { id: 'sertifikalar', label: 'Sertifikalar' },
  { id: 'yetkinlikler', label: 'Yetkinlikler' },
  { id: 'ekipmanlar', label: 'Çalışma alanı' },
];

const split = (value: string) => value.split(',').map((item) => item.trim().replace(/\.$/, ''));

export default function AboutPage() {
  const timeline = experiences.slice().reverse();
  return (
    <div className="container">
      <PageHeader
        crumbs={[{ name: 'Hakkımda', href: '/hakkimda' }]}
        kicker="hakkımda"
        title="İşin arkasındaki kişi."
        description="Sahada kablo çeken, ofiste süreç planlayan ve bu deneyimi yazılıma dönüştüren biri. Profil, deneyim, eğitim ve sertifikalarım."
        actions={
          <>
            <ButtonLink href={site.cv} download variant="primary" icon={<Download aria-hidden="true" />}>
              Özgeçmişi indir
            </ButtonLink>
            <ButtonLink href="/iletisim" icon={<Mail aria-hidden="true" />}>
              İletişim
            </ButtonLink>
          </>
        }
      />

      <div className="about-layout">
        <aside className="about-aside">
          <AboutToc items={toc} />
        </aside>

        <div className="about-content">
          <section id="profil" className="about-section" aria-labelledby="profil-baslik">
            <SectionHeader id="profil-baslik" kicker="profil" index="01" title="Kısaca ben" line />
            <div className="prose about-summary">
              {personalInfo.summary.split('\n\n').map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
            <DataList
              columns={2}
              items={[
                { label: 'Konum', value: personalInfo.address },
                {
                  label: 'E-posta',
                  value: <TextLink href={`mailto:${personalInfo.email}`}>{personalInfo.email}</TextLink>,
                },
                {
                  label: 'Telefon',
                  value: (
                    <TextLink href={`tel:${personalInfo.phone.replace(/[^\d+]/g, '')}`}>
                      {personalInfo.phone}
                    </TextLink>
                  ),
                },
                {
                  label: 'Bağlantılar',
                  value: (
                    <span className="inline-links">
                      <TextLink href={site.github}>GitHub</TextLink>
                      <TextLink href={site.linkedin}>LinkedIn</TextLink>
                    </span>
                  ),
                },
              ]}
            />
          </section>

          <section id="deneyim" className="about-section" aria-labelledby="deneyim-baslik">
            <SectionHeader
              id="deneyim-baslik"
              kicker="deneyim"
              index="02"
              title="Kurumdan sahaya, sahadan yazılıma."
              description={`${experiences.length} pozisyon · telekomünikasyon, operasyon, müşteri deneyimi ve yazılım.`}
              line
            />
            <ol className="timeline">
              {timeline.map((exp, index) => {
                const current = exp.period.includes('Devam');
                return (
                  <li key={`${exp.company}-${exp.period}`} className="timeline-item" data-current={current || undefined}>
                    <span className="timeline-node" aria-hidden="true" />
                    <div className="timeline-head">
                      <h3 className="title-4">{exp.role}</h3>
                      <span className="text-meta">{exp.period.replace(' - ', ' — ')}</span>
                    </div>
                    <p className="timeline-org">
                      {exp.company}
                      {current && (
                        <Badge tone="accent" live>
                          Şu an
                        </Badge>
                      )}
                      {index === timeline.length - 1 && <Badge code>ilk adım</Badge>}
                    </p>
                    <ul className="timeline-list">
                      {exp.responsibilities.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ol>
          </section>

          <section id="egitim" className="about-section" aria-labelledby="egitim-baslik">
            <SectionHeader id="egitim-baslik" kicker="eğitim" index="03" title="Web programcılığından kamu yönetimine." line />
            <div className="edu-grid">
              {educations
                .slice()
                .reverse()
                .map((edu) => (
                  <article key={`${edu.school}-${edu.department}`} className="card edu-card">
                    <div className="edu-card-top">
                      <Badge tone={edu.ongoing ? 'accent' : 'neutral'} dot={edu.ongoing}>
                        {edu.level} · {edu.status}
                      </Badge>
                      <span className="text-meta">{edu.ongoing ? `${edu.period}’dan beri` : edu.period}</span>
                    </div>
                    <h3 className="title-4">{edu.department}</h3>
                    <p className="edu-school">{edu.school.toLocaleLowerCase('tr').replace(/(^|\s)\S/g, (c) => c.toLocaleUpperCase('tr'))}</p>
                    <ul className="timeline-list">
                      {edu.details.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                ))}
            </div>
          </section>

          <section id="sertifikalar" className="about-section" aria-labelledby="sertifikalar-baslik">
            <SectionHeader
              id="sertifikalar-baslik"
              kicker="sertifikalar"
              index="04"
              title="Öğrenmeye devam."
              description={`${certificates.length} sertifika · Turkcell Akademi, BTK Akademi ve LinkedIn Learning.`}
              line
            />
            <CertificateList />
          </section>

          <section id="yetkinlikler" className="about-section" aria-labelledby="yetkinlikler-baslik">
            <SectionHeader id="yetkinlikler-baslik" kicker="yetkinlikler" index="05" title="Teknik olmayan taraf da önemli." line />
            <div className="skill-groups">
              <div>
                <h3 className="title-4">Yetenekler</h3>
                <div className="badge-cloud">
                  {split(additionalInfo.skills).map((item) => (
                    <Badge key={item} tone="accent">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="title-4">Sürücü belgeleri & SRC</h3>
                <div className="badge-cloud">
                  {split(additionalInfo.drivingLicenses).map((item) => (
                    <Badge key={item} outline>
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="title-4">Kişisel yetkinlikler</h3>
                <p className="text-small">{additionalInfo.competencies}</p>
              </div>
              <div>
                <h3 className="title-4">İlgi alanları</h3>
                <p className="text-small">{additionalInfo.hobbies}</p>
              </div>
            </div>
          </section>

          <section id="ekipmanlar" className="about-section" aria-labelledby="ekipmanlar-baslik">
            <SectionHeader
              id="ekipmanlar-baslik"
              kicker="çalışma alanı"
              index="06"
              title="Masamdaki ekipmanlar."
              description={`${equipments.length} parça · her gün kullandığım donanımlar.`}
              line
            />
            <EquipmentList />
          </section>
        </div>
      </div>

      <ContactCta />
    </div>
  );
}
