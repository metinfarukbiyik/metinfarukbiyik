import { Check, MapPin, ShieldCheck, X } from 'lucide-react';
import { Badge, DataList, Faq, Section } from '@/components/ui';
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

/** Product-specific sections rendered below the shared project layout. */
export default function ProjectExtras({ slug }: { slug: string }) {
  if (slug === 'byk-seri-baski-pro') return <SeriBaskiExtras />;
  if (slug === 'geocam') return <GeoCamExtras />;
  return null;
}
