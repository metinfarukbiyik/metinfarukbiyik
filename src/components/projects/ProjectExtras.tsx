import { ArrowRight, Check, MapPin, ShieldCheck, X } from 'lucide-react';
import { Badge, DataList, Faq, Section } from '@/components/ui';
import {
  controls,
  faqs as bizimKoyFaqs,
  featureGroups as bizimKoyFeatures,
  gameInfo,
  levels,
  playSteps,
} from '@/data/bizimKoyData';
import { excelColumns, faqs, printers, usageSteps } from '@/data/bykData';
import { appInfo, featureGroups, privacyPoints, useCases } from '@/data/geocamData';

function SeriBaskiExtras() {
  return (
    <>
      <Section id="nasil-calisir" kicker="nasıl çalışır" title="Üç adımda toplu etiket." tight>
        <ol className="steps">
          {usageSteps.map((step, index) => (
            <li key={step.title} className="card">
              <span className="steps-index mono">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="title-4">{step.title}</h3>
              <p className="text-small">{step.description}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section id="excel" kicker="excel düzeni" title="Excel sütunları" tight>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Sütun</th>
                <th scope="col">Anlamı</th>
                <th scope="col">Durum</th>
              </tr>
            </thead>
            <tbody>
              {excelColumns.map((col) => (
                <tr key={col.column}>
                  <td className="mono">{col.column}</td>
                  <td>{col.meaning}</td>
                  <td>
                    <Badge tone={col.required ? 'clay' : 'neutral'}>{col.required ? 'Zorunlu' : 'İsteğe bağlı'}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <Section id="yazicilar" kicker="uyumluluk" title="Hangi yazıcılarla çalışır?" tight>
        <div className="compat-grid">
          {[printers.supported, printers.unsupported].map((group, index) => (
            <div key={group.title} className="card compat-card" data-ok={index === 0}>
              <div className="compat-head">
                {index === 0 ? <Check aria-hidden="true" /> : <X aria-hidden="true" />}
                <h3 className="title-4">{group.title}</h3>
              </div>
              <p className="text-small">{group.description}</p>
              <div className="badge-cloud">
                {group.brands.map((brand) => (
                  <Badge key={brand} tone={index === 0 ? 'accent' : 'neutral'} outline={index !== 0}>
                    {brand}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section id="sss" kicker="sık sorulanlar" title="Sorun giderme" tight>
        <Faq items={faqs} />
      </Section>
    </>
  );
}

function GeoCamExtras() {
  return (
    <>
      <Section id="ozellikler" kicker="özellikler" title="Sahada ihtiyaç duyulan her bilgi, tek fotoğrafta." tight>
        <div className="feature-grid">
          {featureGroups.map((group) => (
            <div key={group.title} className="card">
              <h3 className="title-4">{group.title}</h3>
              <ul className="check-list">
                {group.items.map((item) => (
                  <li key={item}>
                    <Check aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
      <Section id="kullanim" kicker="kimler için" title="Kullanım alanları" tight>
        <div className="badge-cloud badge-cloud-lg">
          {useCases.map((item) => (
            <Badge key={item} icon={<MapPin aria-hidden="true" />}>
              {item}
            </Badge>
          ))}
        </div>
      </Section>
      <Section id="gizlilik" kicker="gizlilik" title="Verilerin cihazında kalır." tight>
        <ul className="check-list check-list-lg">
          {privacyPoints.map((item) => (
            <li key={item}>
              <ShieldCheck aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </Section>
      <Section id="uygulama-bilgileri" kicker="app store" title="Uygulama bilgileri" tight>
        <DataList items={appInfo} />
      </Section>
    </>
  );
}

function BizimKoyExtras() {
  return (
    <>
      <Section id="nasil-oynanir" kicker="nasıl oynanır" title="Dört köylüden bir şehre." tight>
        <ol className="steps steps-4">
          {playSteps.map((step, index) => (
            <li key={step.title} className="card">
              <span className="steps-index mono">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="title-4">{step.title}</h3>
              <p className="text-small">{step.description}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section id="seviyeler" kicker="itibar" title="Köy seviyeleri" tight>
        <p className="text-small">Her seviye yeni meslekler, yapılar ve geliştirmeler açar.</p>
        <ol className="level-path">
          {levels.map((level, index) => (
            <li key={level}>
              <Badge tone={index === levels.length - 1 ? 'accent' : 'neutral'} outline={index !== levels.length - 1}>
                {level}
              </Badge>
              {index < levels.length - 1 && <ArrowRight aria-hidden="true" />}
            </li>
          ))}
        </ol>
      </Section>
      <Section id="ozellikler" kicker="özellikler" title="Kur, üret, ticaret yap, birlikte büyü." tight>
        <div className="feature-grid">
          {bizimKoyFeatures.map((group) => (
            <div key={group.title} className="card">
              <h3 className="title-4">{group.title}</h3>
              <ul className="check-list">
                {group.items.map((item) => (
                  <li key={item}>
                    <Check aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
      <Section id="kontroller" kicker="klavye" title="Kontroller" tight>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Tuş</th>
                <th scope="col">İşlev</th>
              </tr>
            </thead>
            <tbody>
              {controls.map((control) => (
                <tr key={control.keys}>
                  <td className="mono">{control.keys}</td>
                  <td>{control.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-meta table-note">Telefonda haritayı parmağınla kaydırıp iki parmakla yakınlaştırabilirsin.</p>
      </Section>
      <Section id="oyun-bilgileri" kicker="künye" title="Oyun bilgileri" tight>
        <DataList items={gameInfo} />
      </Section>
      <Section id="sss" kicker="sık sorulanlar" title="Merak edilenler" tight>
        <Faq items={bizimKoyFaqs} />
      </Section>
    </>
  );
}

/** Product-specific sections rendered below the shared project layout. */
export default function ProjectExtras({ slug }: { slug: string }) {
  if (slug === 'bizim-koy') return <BizimKoyExtras />;
  if (slug === 'byk-seri-baski-pro') return <SeriBaskiExtras />;
  if (slug === 'geocam') return <GeoCamExtras />;
  return null;
}
