/** Rule-based "what should I check next?" guide built on a speed test result. */

export type Connection = 'fiber' | 'vdsl' | 'mobile';
export type Medium = 'wired' | 'wifi5' | 'wifi24' | 'wifi';
export type Symptom = 'slow' | 'lag' | 'drops' | 'sites' | 'evening' | 'device';
export type Tone = 'ok' | 'warn' | 'bad';

export const connections: { value: Connection; label: string; hint: string }[] = [
  { value: 'fiber', label: 'Fiber', hint: 'FTTH, ONT cihazı' },
  { value: 'vdsl', label: 'VDSL / ADSL', hint: 'telefon hattı' },
  { value: 'mobile', label: 'Mobil', hint: '4.5G / 5G, hotspot' },
];

export const media: { value: Medium; label: string; hint: string }[] = [
  { value: 'wired', label: 'Kablolu', hint: 'Ethernet' },
  { value: 'wifi5', label: 'Wi-Fi 5 GHz', hint: 'ağ adında 5G' },
  { value: 'wifi24', label: 'Wi-Fi 2.4 GHz', hint: 'eski cihazlar' },
  { value: 'wifi', label: 'Wi-Fi', hint: 'bandı bilmiyorum' },
];

export const symptoms: { value: Symptom; label: string }[] = [
  { value: 'slow', label: 'Genel olarak yavaş' },
  { value: 'lag', label: 'Oyunda veya görüntülü görüşmede takılma' },
  { value: 'drops', label: 'Bağlantı kopuyor' },
  { value: 'sites', label: 'Yalnızca bazı site veya uygulamalar' },
  { value: 'evening', label: 'Akşam saatlerinde yavaşlıyor' },
  { value: 'device', label: 'Yalnızca tek bir cihazda' },
];

export const planPresets = [25, 50, 100, 200, 500, 1000];

export interface DiagnosisInput {
  connection: Connection;
  medium: Medium;
  /** Subscribed download speed in Mbps. */
  plan: number | null;
  download: number | null;
  upload: number | null;
  latency: number | null;
  jitter: number | null;
  symptoms: Symptom[];
}

export interface Finding {
  tone: Tone;
  text: string;
}

export interface Step {
  id: string;
  title: string;
  detail: string;
  link?: { href: string; label: string };
}

export interface Diagnosis {
  tone: Tone;
  headline: string;
  summary: string;
  findings: Finding[];
  steps: Step[];
}

const SPEED_TEST = { href: '/araclar/internet-hiz-testi', label: 'Hız testini aç' };

const STEPS: Record<string, Omit<Step, 'id'>> = {
  nearModem: {
    title: 'Modemin yanında tekrar ölç',
    detail:
      'Aynı odada, modemle arasında duvar olmadan bir test daha yap. Hız belirgin biçimde artıyorsa sorun hat değil, Wi-Fi kapsaması: modemi evin ortasına ve yüksek bir yere taşımak veya bir mesh/erişim noktası eklemek çözüm olur.',
    link: SPEED_TEST,
  },
  band5: {
    title: '5 GHz Wi-Fi ağına bağlan',
    detail:
      '2.4 GHz bandı duvarları iyi geçer ama pratikte 50–100 Mbps civarında kalır ve komşu ağlarla çakışır. Modemin 5 GHz ağına (çoğu zaman adının sonunda “5G” olur) bağlanıp tekrar ölç.',
  },
  wiredTest: {
    title: 'Kabloyla bağlanıp karşılaştır',
    detail:
      'Bilgisayarı Ethernet kablosuyla modeme bağlayıp ölç. Kablolu sonuç paketine yakınsa hattın sağlam, sorun kablosuz ağda demektir. Kablolu sonuç da düşükse sorun hatta veya modemdedir.',
    link: SPEED_TEST,
  },
  restart: {
    title: 'Modemi 30 saniye kapatıp yeniden aç',
    detail:
      'Uzun süre açık kalan modemler ısınabilir veya bağlantı tablosu dolabilir. Fişi çekip 30 saniye bekle, tekrar tak; ışıklar oturduktan sonra 2–3 dakika bekleyip yeniden ölç.',
  },
  background: {
    title: 'Arka planda çalışan indirmeleri durdur',
    detail:
      'Oyun güncellemeleri, bulut yedekleme (iCloud, Google Fotoğraflar, OneDrive), torrent veya başka bir cihazda 4K video hattı paylaşır. Ölçüm sırasında diğer cihazlarda yoğun kullanım olmadığından emin ol.',
  },
  ethernetCable: {
    title: 'Ethernet kablosunu ve portu kontrol et',
    detail:
      'Kablolu sonucun 90–95 Mbps’te takılması, bağlantının 100 Mbps’e düştüğünü gösterir. Cat5e veya Cat6 bir kablo kullan, kablonun ucundaki tırnağı ve modemdeki portu değiştir; bilgisayarın ağ ayarlarında bağlantı hızının 1 Gbps göründüğünü kontrol et.',
  },
  vdslSync: {
    title: 'Modem arayüzünde senkron hızına bak',
    detail:
      'Tarayıcıdan modem adresine (çoğunlukla 192.168.1.1) gir; “DSL durumu” bölümündeki senkron (bağlantı) hızını ve SNR değerini not al. Senkron hızı paketinin altındaysa sorun bina içi kablolamada veya santral tarafındadır; SNR 6 dB’nin altındaysa hat gürültülüdür.',
  },
  vdslWiring: {
    title: 'Splitter ve telefon kablolarını kontrol et',
    detail:
      'Modemi duvardaki ilk prize, splitter ile ve kısa bir kabloyla bağla. Hatta bağlı diğer telefon prizleri, eski uzatma kabloları ve ekleme yerleri kopma ve hız düşüşünün en sık nedenidir.',
  },
  fiberOnt: {
    title: 'Fiber modem (ONT) ışıklarını kontrol et',
    detail:
      'PON ışığı sabit yanmalı, LOS ışığı sönük olmalı. LOS kırmızı yanıp sönüyorsa fiber sinyali gelmiyordur: fiber kablonun bükülmediğini ve konnektörün yerinde olduğunu kontrol et, durum sürerse arıza kaydı aç.',
  },
  mobileSignal: {
    title: 'Sinyal gücünü ve cihazın yerini kontrol et',
    detail:
      'Mobil hatlarda hız büyük ölçüde sinyale bağlıdır. Modemi veya telefonu pencere kenarına, mümkünse yüksek bir yere taşı; 4.5G/5G simgesinin göründüğünü kontrol et. Kalın beton duvarlar ve bodrum katlar sinyali ciddi düşürür.',
  },
  mobileQuota: {
    title: 'Kotanı ve hız sınırını kontrol et',
    detail:
      'Paket kotası dolduğunda veya adil kullanım sınırı aşıldığında operatörler hızı düşürebilir. Operatörünün uygulamasından kalan kotanı ve hız sınırlaması olup olmadığını kontrol et.',
  },
  dns: {
    title: 'DNS sunucusunu değiştirip dene',
    detail:
      'Bazı sitelerin hiç açılmaması veya geç açılması çoğu zaman DNS kaynaklıdır. Cihazının veya modeminin DNS ayarını 1.1.1.1 (Cloudflare) ya da 8.8.8.8 (Google) olarak değiştirip tekrar dene.',
  },
  vpn: {
    title: 'VPN, reklam engelleyici ve güvenlik yazılımını kapat',
    detail:
      'VPN’ler trafiği uzak bir sunucudan geçirir; reklam engelleyiciler ve güvenlik yazılımları bazı adresleri engelleyebilir. Geçici olarak kapatıp sorunun sürdüğünü kontrol et.',
  },
  otherDevice: {
    title: 'Başka bir cihazla ölç',
    detail:
      'Aynı yerde ve aynı ağda telefonla ve bilgisayarla ayrı ayrı ölç. Yalnızca bir cihaz yavaşsa sorun o cihazın Wi-Fi kartında, ayarlarında veya yazılımlarındadır.',
    link: SPEED_TEST,
  },
  deviceUpdate: {
    title: 'Cihazı güncelle ve ağı yeniden tanıt',
    detail:
      'İşletim sistemi ve Wi-Fi sürücüsü güncellemelerini yükle, cihazda kayıtlı ağı “unut” ve yeniden bağlan. Eski cihazların Wi-Fi kartları (Wi-Fi 4 ve öncesi) hızlı paketlerde darboğaz olur.',
  },
  schedule: {
    title: 'Farklı saatlerde ölçüp kaydet',
    detail:
      'Sabah, öğle ve akşam 21:00 civarında ölç. Hız yalnızca akşamları düşüyorsa altyapıdaki yoğunluktan kaynaklanıyor olabilir; bu kayıtlar sağlayıcına başvururken en güçlü kanıtın olur. Hız testi sonuçları bu tarayıcıda geçmiş olarak saklanır.',
    link: SPEED_TEST,
  },
  channel: {
    title: 'Wi-Fi kanalını değiştir',
    detail:
      'Apartmanlarda komşu ağlar aynı kanalı kullanınca kopma ve takılma olur. Modem arayüzünde kanal seçimini “otomatik”ten çıkarıp 2.4 GHz için 1, 6 veya 11; 5 GHz için 36–48 arasında bir kanal dene.',
  },
  bufferbloat: {
    title: 'Yük altındaki gecikmeyi azalt',
    detail:
      'Biri büyük dosya indirirken veya yüklerken ping’in fırlaması (bufferbloat) oyun ve görüşmeleri bozar. Görüşme sırasında yedekleme ve indirmeleri durdur; modemin destekliyorsa QoS veya SQM özelliğini aç.',
  },
  isp: {
    title: 'Sonuçlarla birlikte sağlayıcına başvur',
    detail:
      'Kablolu bağlantıda, modemi yeniden başlattıktan sonra ve farklı saatlerde yaptığın ölçümler paketinin belirgin biçimde altındaysa arıza kaydı aç. Ölçüm tarihlerini, bağlantı türünü ve (VDSL’de) modemdeki senkron hızını paylaşmak süreci hızlandırır.',
  },
};

const step = (id: keyof typeof STEPS): Step => ({ id, ...STEPS[id] });
/** Cheapest and most likely checks first; contacting the provider is always last. */
const ORDER: (keyof typeof STEPS)[] = [
  'nearModem', 'band5', 'wiredTest', 'ethernetCable', 'restart', 'background', 'bufferbloat', 'channel',
  'dns', 'vpn', 'otherDevice', 'deviceUpdate', 'mobileSignal', 'mobileQuota',
  'fiberOnt', 'vdslSync', 'vdslWiring', 'schedule', 'isp',
];
const percent = (value: number) => `%${Math.round(value * 100)}`;
const mbps = (value: number) => `${value >= 100 ? Math.round(value) : value.toFixed(1).replace('.', ',')} Mbps`;

export function diagnose(input: DiagnosisInput): Diagnosis {
  const has = (symptom: Symptom) => input.symptoms.includes(symptom);
  const wifi = input.medium !== 'wired';
  const ratio = input.plan && input.download !== null ? input.download / input.plan : null;
  const findings: Finding[] = [];
  const steps = new Set<keyof typeof STEPS>();

  if (ratio !== null && input.download !== null) {
    const tone: Tone = ratio >= 0.8 ? 'ok' : ratio >= 0.5 ? 'warn' : 'bad';
    findings.push({
      tone,
      text: `İndirme ${mbps(input.download)} · paket hızına oranı ${percent(ratio)}${ratio >= 0.8 ? '; hat beklenen hızda.' : '.'}`,
    });
  } else if (input.download !== null) {
    findings.push({ tone: 'warn', text: `İndirme ${mbps(input.download)}. Paket hızını girersen karşılaştırma yapabilirim.` });
  }

  if (input.latency !== null) {
    // The test server is usually in Amsterdam or Frankfurt, so ~50–70 ms is normal from Türkiye.
    const tone: Tone = input.latency <= 80 ? 'ok' : input.latency <= 150 ? 'warn' : 'bad';
    findings.push({
      tone,
      text:
        tone === 'ok'
          ? `Gecikme ${Math.round(input.latency)} ms: normal aralıkta.`
          : `Gecikme ${Math.round(input.latency)} ms: ${tone === 'bad' ? 'çok yüksek' : 'beklenenden yüksek'}; oyun ve görüntülü görüşmeyi etkiler.`,
    });
  }
  if (input.jitter !== null && input.jitter > 15) {
    findings.push({
      tone: input.jitter > 40 ? 'bad' : 'warn',
      text: `Jitter ${Math.round(input.jitter)} ms: gecikme dalgalı; ses ve görüntüde takılma yapar.`,
    });
    steps.add('background');
    steps.add('bufferbloat');
    if (wifi) steps.add('channel');
  }
  if (input.upload !== null && input.upload < 5) {
    findings.push({
      tone: 'warn',
      text: `Yükleme ${mbps(input.upload)}: görüntülü görüşme ve dosya paylaşımı için düşük.`,
    });
  }

  const slow = has('slow') || (ratio !== null && ratio < 0.8);
  const wifiLimited = input.medium === 'wifi24' && input.plan !== null && input.plan > 100;
  if (wifiLimited)
    findings.push({ tone: 'warn', text: '2.4 GHz Wi-Fi pratikte 50–100 Mbps taşır; paketinin tamamını bu bantta göremezsin.' });
  const fastEthernet =
    input.medium === 'wired' && input.plan !== null && input.plan > 100 && input.download !== null && input.download >= 80 && input.download <= 100;
  if (fastEthernet)
    findings.push({ tone: 'warn', text: 'Kablolu sonuç 100 Mbps sınırında takılıyor; kablo veya port 100 Mbps’e düşmüş olabilir.' });

  if (slow) {
    if (wifi) {
      steps.add('nearModem');
      if (input.medium !== 'wifi5') steps.add('band5');
      steps.add('wiredTest');
    }
    if (fastEthernet) steps.add('ethernetCable');
    steps.add('background');
    steps.add('restart');
    if (input.connection === 'vdsl') steps.add('vdslSync');
    if (input.connection === 'fiber' && !wifi && ratio !== null && ratio < 0.5) steps.add('fiberOnt');
    if (input.connection === 'mobile') {
      steps.add('mobileSignal');
      steps.add('mobileQuota');
    }
  }
  if (has('drops')) {
    steps.add('restart');
    if (input.connection === 'vdsl') steps.add('vdslWiring');
    if (input.connection === 'fiber') steps.add('fiberOnt');
    if (input.connection === 'mobile') steps.add('mobileSignal');
    if (wifi) steps.add('channel');
  }
  if (has('lag') || (input.latency !== null && input.latency > 80)) {
    if (wifi) steps.add('wiredTest');
    steps.add('background');
    steps.add('bufferbloat');
  }
  if (has('sites')) {
    steps.add('dns');
    steps.add('vpn');
  }
  if (has('device')) {
    steps.add('otherDevice');
    steps.add('deviceUpdate');
    steps.add('vpn');
  }
  if (has('evening')) steps.add('schedule');
  if (wifi && slow && !has('device')) steps.add('otherDevice');
  if ((ratio !== null && ratio < 0.5) || has('drops') || has('evening')) {
    steps.add('schedule');
    steps.add('isp');
  }
  if (!steps.size) {
    steps.add('schedule');
    if (wifi) steps.add('wiredTest');
  }

  const worst: Tone = findings.some((f) => f.tone === 'bad') ? 'bad' : findings.some((f) => f.tone === 'warn') || input.symptoms.length ? 'warn' : 'ok';
  let headline: string;
  let summary: string;
  if (ratio !== null && ratio < 0.8 && wifi) {
    headline = 'Önce Wi-Fi’ı ele alalım';
    summary =
      'Ölçüm kablosuz ağda yapılmış. Hattın yavaş mı yoksa Wi-Fi’ın mı sınırladığını anlamanın en hızlı yolu modemin yanında ve kabloyla tekrar ölçmek.';
  } else if (ratio !== null && ratio < 0.5) {
    headline = input.connection === 'mobile' ? 'Sinyal ve kota tarafına bakalım' : 'Sorun hatta veya modemde olabilir';
    summary =
      input.connection === 'mobile'
        ? 'Mobil bağlantıda hız en çok sinyal gücüne ve kotaya bağlıdır.'
        : 'Kablolu ölçümde bile paketinin yarısından azını alıyorsun. Modemi yeniden başlatıp tekrar ölç; düzelmezse sağlayıcına başvurmak için kayıt topla.';
  } else if (ratio !== null && ratio < 0.8) {
    headline = 'Hız paketinin biraz altında';
    summary = 'Tek bir ölçüm kesin sonuç vermez. Aşağıdaki adımlarla farklı koşullarda tekrar ölç.';
  } else if (has('sites') || has('device')) {
    headline = 'Hat sağlam görünüyor; sorun daha dar bir yerde';
    summary = has('device')
      ? 'Belirtiler tek bir cihazı işaret ediyor; o cihazın ayarlarından başlayalım.'
      : 'Yalnızca bazı yerlerde yaşanan sorunlar çoğunlukla DNS, VPN veya engelleyici kaynaklıdır.';
  } else if (has('lag') || (input.latency !== null && input.latency > 80) || (input.jitter !== null && input.jitter > 15)) {
    headline = 'Hız yeterli; gecikmeye odaklanalım';
    summary = 'Oyun ve görüşmelerde belirleyici olan hız değil, gecikmenin düşük ve dengeli olmasıdır.';
  } else if (has('drops')) {
    headline = 'Kopmaların kaynağını bulalım';
    summary = 'Kopmalar çoğunlukla modem, iç kablolama veya Wi-Fi kanal çakışmasından kaynaklanır.';
  } else if (ratio !== null) {
    headline = 'Bağlantın paketinle uyumlu';
    summary = 'Ölçülen hız paketine yakın. Sorun yaşıyorsan belirtileri seç; ona göre adımlar önereyim.';
  } else {
    headline = 'Önce bir ölçüm yapalım';
    summary = 'Hız testi sonucu ve paket hızın olmadan yalnızca belirtilere göre öneri verebilirim.';
  }

  return { tone: worst, headline, summary, findings, steps: ORDER.filter((id) => steps.has(id)).map(step) };
}
