import { Download } from 'lucide-react';
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

const split = (value: string) => value.split(',').map((item) => item.trim().replace(/\.$/, ''));

export default function AboutPage() {
  const timeline = experiences.slice().reverse();
  return (
    <div className="container">
      <PageHeader
        crumbs={[{ name: 'Hakkımda', href: '/hakkimda' }]}
        title="Hakkımda"
        count={`${String(experiences.length).padStart(2, '0')} pozisyon`}
        description="Telekomünikasyon saha operasyonları, iş planlama ve müşteri ilişkileri alanlarındaki deneyimimi yazılım geliştirme yetkinliğiyle bütünleştiriyorum. Bu sayfada profesyonel geçmişimi, eğitimimi, sertifikalarımı ve yetkinliklerimi bulabilirsiniz."
        actions={
          <ButtonLink href={site.cv} download variant="ghost" size="sm" icon={<Download aria-hidden="true" />}>
            Özgeçmiş
          </ButtonLink>
        }
      />

      <div className="about-content">
          <section id="profil" className="about-section" aria-labelledby="profil-baslik">
            <SectionHeader id="profil-baslik" title="Profil" />
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
             
             
              title="Deneyim"
              description={`${experiences.length} pozisyon · telekomünikasyon, operasyon, müşteri deneyimi ve yazılım.`}
            />
            <ol className="entries">
              {timeline.map((exp, index) => {
                const current = exp.period.includes('Devam');
                return (
                  <li
                    key={`${exp.company}-${exp.period}`}
                    id={`is-${index}`}
                    className={current ? 'entry entry-current' : 'entry'}
                  >
                    <div className="entry-head">
                      <h3>
                        {exp.company}
                        {current && <span className="job-now">şu an</span>}
                      </h3>
                      <span className="entry-date">{exp.period.replace(' - ', ' — ')}</span>
                    </div>
                    <p className="entry-meta">
                      {exp.role}
                      {index === timeline.length - 1 && (
                        <>
                          <span className="entry-sep" aria-hidden="true"> · </span>ilk adım
                        </>
                      )}
                    </p>
                    <ul className="entry-list">
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
            <SectionHeader id="egitim-baslik" title="Eğitim" />
            <ol className="entries">
              {educations
                .slice()
                .reverse()
                .map((edu) => (
                  <li key={`${edu.school}-${edu.department}`} className="entry">
                    <div className="entry-head">
                      <h3>{edu.department}</h3>
                      <span className="entry-date">{edu.ongoing ? `${edu.period} — Devam` : edu.period}</span>
                    </div>
                    <p className="entry-meta">
                      {edu.school.toLocaleLowerCase('tr')}
                      <span className="entry-sep" aria-hidden="true"> · </span>
                      {edu.level} · {edu.status}
                    </p>
                    <ul className="entry-list">
                      {edu.details.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </li>
                ))}
            </ol>
          </section>

          <section id="sertifikalar" className="about-section" aria-labelledby="sertifikalar-baslik">
            <SectionHeader
              id="sertifikalar-baslik"
             
             
              title="Sertifikalar"
              description={`${certificates.length} sertifika · Turkcell Akademi, BTK Akademi ve LinkedIn Learning.`}
            />
            <CertificateList />
          </section>

          <section id="yetkinlikler" className="about-section" aria-labelledby="yetkinlikler-baslik">
            <SectionHeader id="yetkinlikler-baslik" title="Yetkinlikler" />
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
             
             
              title="Çalışma alanı"
              description={`${equipments.length} parça · her gün kullandığım donanımlar.`}
            />
            <EquipmentList />
          </section>
      </div>

      <ContactCta />
    </div>
  );
}
