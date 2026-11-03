import { Badge } from '@/components/ui';

const steps = [
  {
    year: '1999',
    tag: 'HTML 4.01',
    title: 'Web 1.0 ile aynı yaş',
    text: 'Trabzon’da doğdum. Aynı yıl HTML 4.01 yayımlandı; web hâlâ tablolar, GIF’ler ve çevirmeli bağlantılardan ibaretti.',
  },
  {
    year: '2015',
    tag: 'HTML · CSS · JS',
    title: 'İlk satırlar',
    text: 'Lisede Web Programcılığı alanında HTML, CSS ve JavaScript ile ilk statik sayfalarımı yazdım.',
  },
  {
    year: '2016',
    tag: 'SGK',
    title: 'İlk kurumsal deneyim',
    text: 'Sosyal Güvenlik Kurumu’nda yazılım geliştirme stajyeri olarak gerçek bir kurumun süreçlerini tanıdım.',
  },
  {
    year: '2018',
    tag: 'GSM · FTTH',
    title: 'İnternetin fiziksel tarafı',
    text: 'Baz istasyonlarında ve fiber altyapıda sahada çalıştım; bağlantının anteninden kablosuna kadar her katmanını gördüm.',
  },
  {
    year: '2020',
    tag: 'Süreç · Ekip',
    title: 'Planlama ve insan',
    text: 'İş emri planlama, ekip yönetimi ve takım koçluğu ile yazılımın asıl kullanıcısını, iş süreçlerini öğrendim.',
  },
  {
    year: 'Bugün',
    tag: 'Web · iOS · Masaüstü',
    title: 'İhtiyaçtan ürüne',
    text: 'Sahada ve ofiste gördüğüm ihtiyaçları BYK Music, GeoCam: Audit, Seri Baskı Pro ve Creda System gibi ürünlere dönüştürüyorum.',
    current: true,
  },
];

/** Horizontal timeline: personal milestones on the timeline of the web. */
export default function WebJourney() {
  return (
    <ol className="journey" aria-label="Web yolculuğu">
      {steps.map((step) => (
        <li key={step.year} className="journey-step" data-current={step.current || undefined}>
          <span className="journey-year mono">{step.year}</span>
          <span className="journey-node" aria-hidden="true" />
          <Badge tone={step.current ? 'accent' : 'neutral'} code>
            {step.tag}
          </Badge>
          <h3 className="title-4">{step.title}</h3>
          <p className="text-small">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
