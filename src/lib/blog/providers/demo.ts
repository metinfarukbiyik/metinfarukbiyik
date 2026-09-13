import type { BlogProvider, Post } from '../types';
import { estimateReadingMinutes, slugifyHeading, toSummary } from '../types';

const p = (text: string) => ({ type: 'paragraph' as const, text: [{ text }] });
const h = (level: 2 | 3, text: string) => ({
  type: 'heading' as const,
  level,
  text,
  id: slugifyHeading(text),
});
const ul = (items: string[]) => ({
  type: 'list' as const,
  ordered: false,
  items: items.map((item) => [{ text: item }]),
});

const drafts: Omit<Post, 'readingMinutes'>[] = [
  {
    slug: 'karadeniz-yaylalarinda-bir-hafta',
    title: 'Karadeniz yaylalarında bir hafta',
    excerpt:
      'Trabzon’dan çıkıp sisin içinde kaybolduğumuz yedi gün: rotalar, konaklama notları ve fotoğraf çekerken öğrendiklerim.',
    category: 'Gezi',
    tags: ['Trabzon', 'Yayla', 'Fotoğraf'],
    publishedAt: '2026-08-24T09:00:00.000Z',
    location: 'Trabzon, Türkiye',
    featured: true,
    blocks: [
      p(
        'Yaz sonunda birkaç gün izin yapıp Doğu Karadeniz yaylalarını dolaşmaya karar verdik. Plan basitti: her gün bir yayla, her akşam farklı bir manzara. Gerçekte olan ise sisin bizi her seferinde şaşırtmasıydı.',
      ),
      h(2, 'Rota nasıl şekillendi'),
      p(
        'Trabzon merkezden çıkıp önce Hıdırnebi’ye, oradan Sultanmurat üzerinden Pokut ve Gito taraflarına geçtik. Yol boyunca en çok işimize yarayan şey, her sabah hava durumuna göre rotayı yeniden kurmak oldu.',
      ),
      ul([
        'Sabah erken çıkmak: öğleden sonra sis neredeyse her gün bastırıyor.',
        'Yakıtı tam doldurmak: yaylalarda istasyon bulmak kolay değil.',
        'Kalın bir mont: ağustos ortasında bile gece sıcaklık 8 dereceye kadar düşüyor.',
      ]),
      h(2, 'Fotoğraf çekerken öğrendiklerim'),
      p(
        'Sisli havada otomatik pozlama sürekli yanılıyor. Poz telafisini bir durak artırmak, bulutların içindeki dokuyu kurtarmaya yetti. Bir de konum bilgisini fotoğrafa damgalamak, hangi kareyi nerede çektiğimi sonradan hatırlamak için beklediğimden çok işe yaradı.',
      ),
      {
        type: 'quote',
        text: 'En iyi kare, beklemeyi göze aldığınız karedir. Sis dağılana kadar yarım saat beklemek çoğu zaman tüm günü kurtarıyor.',
      },
      h(2, 'Bir dahaki sefere'),
      p(
        'Gelecek yıl aynı rotayı sonbaharda denemek istiyorum. Yeşilin yerini sarıya bıraktığı o iki haftalık pencerede, aynı yollar bambaşka görünüyor.',
      ),
    ],
  },
  {
    slug: 'geocam-audit-nasil-ortaya-cikti',
    title: 'GeoCam: Audit nasıl ortaya çıktı?',
    excerpt:
      'Sahada çözemediğim küçük bir sorun, App Store’da yayınlanan bir uygulamaya dönüştü. Fikirden yayına kadar geçen süreç.',
    category: 'Teknoloji',
    tags: ['iOS', 'SwiftUI', 'Ürün'],
    publishedAt: '2026-07-12T09:00:00.000Z',
    blocks: [
      p(
        'Saha çalışmalarında en sık karşılaştığım sorun, çekilen fotoğrafın nerede ve ne zaman çekildiğinin sonradan kanıtlanamamasıydı. Elimizdeki çözüm, fotoğrafın üstüne elle not düşmekti. Bu da hem yavaş hem de güvenilmezdi.',
      ),
      h(2, 'Önce kendi ihtiyacım için yazdım'),
      p(
        'İlk sürüm yalnızca tarih ve koordinat basan küçük bir uygulamaydı. Birkaç hafta sonra ekipteki arkadaşlar da kullanmak isteyince, ayarlanabilir bilgi katmanı ve şirket logosu ekleme gibi özellikler geldi.',
      ),
      h(2, 'Yayına giderken zorlayan kısımlar'),
      ul([
        'Konum izinlerini kullanıcıyı korkutmadan açıklamak',
        'İnternet olmadan da adres çözümlemesinin çalışması',
        'Filigranın yatay çekimlerde bozulmaması',
      ]),
      p(
        'App Store incelemesi ilk denemede geçti; asıl zaman alan kısım ekran görüntüleri ve açıklama metniydi. Uygulamanın ne işe yaradığını tek cümlede anlatmak, kodu yazmaktan zor çıktı.',
      ),
    ],
  },
  {
    slug: 'yeni-bir-sayfa-2026',
    title: '2026’da yeni bir sayfa',
    excerpt:
      'Askerlik, evlilik ve yeni bir işin ardından hayatımın nereye gittiğine dair kısa bir değerlendirme.',
    category: 'Hayat',
    tags: ['Kişisel', 'Değerlendirme'],
    publishedAt: '2026-06-02T09:00:00.000Z',
    blocks: [
      p(
        'Son iki yıl, hayatımda en çok şeyin aynı anda değiştiği dönem oldu. Askerliği tamamladım, evlendim ve kariyerimde yönümü teknolojiye doğru çevirdim.',
      ),
      h(2, 'Ne öğrendim'),
      p(
        'Planların bozulduğu her seferde, esnek kalmanın planı savunmaktan daha değerli olduğunu gördüm. Bir de şunu: kendi işini kurmasan bile, kendi araçlarını yapmak insanı özgürleştiriyor.',
      ),
      h(2, 'Bundan sonrası'),
      p(
        'Bu blogda hem gezdiğim yerleri hem de geliştirdiğim projeleri paylaşacağım. Amacım düzenli yazmak; ayda en az iki yazı hedefliyorum.',
      ),
    ],
  },
];

const posts: Post[] = drafts.map((draft) => ({
  ...draft,
  readingMinutes: estimateReadingMinutes(draft.blocks),
}));

const demoProvider: BlogProvider = {
  name: 'demo',
  async listPosts() {
    return posts.map(toSummary);
  },
  async getPost(slug) {
    return posts.find((post) => post.slug === slug) ?? null;
  },
};

export default demoProvider;
