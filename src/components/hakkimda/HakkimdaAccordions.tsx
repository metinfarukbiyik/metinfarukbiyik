import AccordionItem from '@/components/ui/AccordionItem';
import CertificateList from '@/components/CertificateList';
import EquipmentList from '@/components/EquipmentList';
import HashOpenDetails from '@/components/ui/HashOpenDetails';
import {
  additionalInfo,
  certificates,
  educations,
  equipments,
  experiences,
  personalInfo,
} from '@/data/cvData';
const contactItems = [
  { label: 'Adres', value: personalInfo.address, href: undefined },
  {
    label: 'Telefon',
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone.replace(/[^\d+]/g, '')}`,
  },
  { label: 'E-posta', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
  { label: 'Web', value: personalInfo.web, href: `https://${personalInfo.web}` },
];

const extraItems = [
  { title: 'İlgi alanları', value: additionalInfo.hobbies },
  { title: 'Kişisel yetkinlikler', value: additionalInfo.competencies },
  { title: 'Yetenekler', value: additionalInfo.skills },
  { title: 'Sürücü belgeleri & SRC', value: additionalInfo.drivingLicenses },
];

const HakkimdaAccordions = () => (
  <>
    <HashOpenDetails />
    <div className="mt-2">
      <AccordionItem id="profil" index="01" title="Profil" defaultOpen>
        <p className="max-w-3xl whitespace-pre-line text-sm leading-5 text-muted">{personalInfo.summary}</p>
      </AccordionItem>

      <AccordionItem id="iletisim" index="02" title="İletişim">
        <dl className="grid gap-3 sm:grid-cols-2">
          {contactItems.map(({ label, value, href }) => (
            <div key={label} className="min-w-0 py-1">
              <dt className="text-xs text-subtle">{label}</dt>
              <dd className="break-words text-sm text-fg">
                {href ? (
                  <a
                    href={href}
                    {...(label === 'Web' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="text-button"
                  >
                    {value}
                  </a>
                ) : value}
              </dd>
            </div>
          ))}
        </dl>
      </AccordionItem>

      <AccordionItem id="deneyim" index="03" title="Deneyim" count={experiences.length}>
        <ol>
          {experiences
            .slice()
            .reverse()
            .map((exp, index, list) => (
              <li key={`${exp.company}-${exp.period}`} className="flex gap-3 pb-4 last:pb-0">
                <div className="relative flex w-3 shrink-0 justify-center">
                  {index !== list.length - 1 && (
                    <span
                      className="absolute top-4 bottom-[-8px] left-1/2 w-px -translate-x-1/2 bg-border"
                      aria-hidden
                    />
                  )}
                  <span className="relative mt-1.5 h-1.5 w-1.5 rounded-full bg-fg" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <h3 className="text-sm font-medium text-fg">{exp.company}</h3>
                    <span className="font-mono text-[11px] text-subtle">{exp.period}</span>
                  </div>
                  <p className="mt-0.5 text-sm text-muted">{exp.role}</p>
                  <ul className="mt-2 space-y-1">
                    {exp.responsibilities.map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-5 text-muted">
                        <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-subtle" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
        </ol>
      </AccordionItem>

      <AccordionItem id="egitim" index="04" title="Eğitim" count={educations.length}>
        <div className="divide-y divide-border border-y border-border">
          {educations
            .slice()
            .reverse()
            .map((edu) => (
              <div key={`${edu.school}-${edu.department}`} className="py-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span
                    className={`font-mono text-[11px] ${edu.ongoing ? 'text-brand-300' : 'text-subtle'}`}
                  >
                    {edu.level} · {edu.status}
                  </span>
                  <span className="font-mono text-[11px] text-subtle">
                    {edu.ongoing ? `${edu.period}’dan beri` : edu.period}
                  </span>
                </div>
                <h3 className="mt-2 text-sm font-semibold text-fg">{edu.school}</h3>
                <p className="mt-0.5 text-sm text-muted">{edu.department}</p>
                <ul className="mt-2 space-y-1">
                  {edu.details.map((item) => (
                    <li key={item} className="flex gap-2 text-sm leading-5 text-muted">
                      <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-subtle" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </AccordionItem>

      <AccordionItem id="sertifikalar" index="05" title="Sertifikalar" count={certificates.length}>
        <CertificateList />
      </AccordionItem>

      <AccordionItem id="ekipmanlar" index="06" title="Ekipmanlar" count={equipments.length}>
        <EquipmentList />
      </AccordionItem>

      <AccordionItem id="ek-bilgiler" index="07" title="Ek bilgiler">
        <div className="grid gap-4 sm:grid-cols-2">
          {extraItems.map(({ title, value }) => (
            <div key={title}>
              <h3 className="text-sm font-medium text-fg">{title}</h3>
              <p className="mt-2 text-sm leading-5 text-fg">{value}</p>
            </div>
          ))}
        </div>
      </AccordionItem>
    </div>
  </>
);

export default HakkimdaAccordions;
