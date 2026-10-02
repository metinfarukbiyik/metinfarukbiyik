export interface FeatureGroup {
  title: string;
  icon: string;
  color: string;
  items: string[];
}

export const ayet = {
  name: '1 Ayet',
  tagline: 'iOS ve Android uygulaması',
  slogan: 'Her güne bir ayet, her ayete bir tefekkür.',
  icon: '/images/1ayet/1ayet.png',
  storeUrl: undefined as string | undefined,
  status: 'App Store onayında',
  description:
    'Modern hayatın telaşı içinde Kur’an-ı Kerim ile bağını diri tutmak isteyenler için dikkati dağıtmayan bir huzur durağı. Güne tek bir ayet meali ve o ayetin özünden süzülmüş bir tefekkür duasıyla odaklanmayı sağlar. Mealler Diyanet İşleri Başkanlığı meali esas alınarak derlenmiştir.',
  privacy: 'Reklam yok, izleme yok. Veriler yalnızca cihazınızda kalır.',
  badges: ['iOS', 'Android', 'Ücretsiz', 'İnternetsiz çalışır'],
};

export const featureGroups: FeatureGroup[] = [
  {
    title: 'Günün ayeti',
    icon: 'BookOpen',
    color: 'bg-emerald-50 text-emerald-700',
    items: [
      'Her gün bir ayet meali, sure adı, cüz ve ayet numarasıyla',
      'Diyanet İşleri Başkanlığı meali',
      'Önceki günlere veya rastgele bir ayete tek dokunuşla bakma',
    ],
  },
  {
    title: 'Tefekkür ve dua',
    icon: 'Heart',
    color: 'bg-amber-50 text-amber-700',
    items: [
      'Ayetin temasına uygun samimi bir yakarış',
      'Hamd, sabır, tevekkül, tövbe, adalet ve umut gibi konular',
      'Açılıp kapanabilen zarif dua kartı',
    ],
  },
  {
    title: 'Cuma ve hatırlatma',
    icon: 'Bell',
    color: 'bg-teal-50 text-teal-700',
    items: [
      'Cuma günü özel karşılama kartı ve tebrik paylaşımı',
      'Serbest saat seçimli günlük ayet hatırlatıcısı',
      'Belirli bir tarih için tefekkür randevusu',
    ],
  },
];

export const extraFeatures: FeatureGroup[] = [
  {
    title: 'Ana ekran widget',
    icon: 'LayoutGrid',
    color: 'bg-sky-50 text-sky-700',
    items: [
      'Uygulamayı açmadan günün ayetini görün',
      'Küçük, yatay ve büyük olmak üzere üç boyut',
      'Sekiz renk seçeneği veya uygulama temasıyla eşleme',
    ],
  },
  {
    title: 'Paylaşım ve not',
    icon: 'Share2',
    color: 'bg-rose-50 text-rose-700',
    items: [
      '9:16 dikey hikaye kartı üretimi',
      'Fotoğraflara yüksek çözünürlükte kaydetme',
      'Favori ayetler ve kişisel tefekkür notları',
    ],
  },
  {
    title: 'Görünüm',
    icon: 'Palette',
    color: 'bg-violet-50 text-violet-700',
    items: [
      'Sekiz huzurlu renk teması',
      'Küçük, standart ve büyük yazı boyutu',
      'Cihazın açık/koyu modunu izleyen sistem teması',
    ],
  },
];

export const useCases: string[] = [
  'Günlük hatim ve tefekkür',
  'Cuma tebriği paylaşımı',
  'Ana ekranda ayet widget’ı',
  'Kişisel not ve favoriler',
];

export const privacyPoints: string[] = [
  'Uygulamada reklam yer almaz',
  'Kişisel veri, kullanım alışkanlığı veya analiz toplanmaz',
  'Favoriler, notlar ve tercihler yalnızca cihazda saklanır',
  'Mealler uygulamaya gömülüdür; internet olmadan da çalışır',
];

export const appInfo: { label: string; value: string }[] = [
  { label: 'Geliştirici', value: 'Metin Faruk Bıyık' },
  { label: 'Kategori', value: 'Yaşam tarzı' },
  { label: 'Uyumluluk', value: 'iPhone · Android' },
  { label: 'Durum', value: 'App Store onayında' },
  { label: 'Fiyat', value: 'Ücretsiz' },
  { label: 'Bağlantı', value: 'İnternetsiz çalışır' },
];

export const themes: string[] = [
  'Parşömen',
  'Gece',
  'Zümrüt',
  'Safir',
  'Pişmiş toprak',
  'Adaçayı',
  'Gül kurusu',
  'Sistem',
];
