import { defineArrayMember, defineField, defineType } from 'sanity';

const turkishSlug = (input: string) =>
  input
    .toLocaleLowerCase('tr')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 96);

export const post = defineType({
  name: 'post',
  title: 'Blog yazısı',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Başlık',
      type: 'string',
      validation: (rule) => rule.required().max(90),
    }),
    defineField({
      name: 'slug',
      title: 'Adres (slug)',
      type: 'slug',
      description: 'Yazının adresi: biyik.dev/blog/adres',
      options: { source: 'title', slugify: turkishSlug, maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Özet',
      type: 'text',
      rows: 3,
      description: 'Kartlarda ve Google sonuçlarında görünen kısa açıklama.',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'cover',
      title: 'Öne çıkan görsel',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Görsel açıklaması',
          type: 'string',
          description: 'Görme engelliler ve arama motorları için.',
        }),
      ],
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: ['Gezi', 'Hayat', 'Teknoloji', 'Kariyer', 'Fotoğraf'],
        layout: 'radio',
      },
      initialValue: 'Hayat',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Etiketler',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'location',
      title: 'Konum',
      type: 'string',
      description: 'Gezi yazılarında yazının başında gösterilir. Örnek: Trabzon, Türkiye',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Yayın tarihi',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Öne çıkar',
      type: 'boolean',
      description: 'Blog sayfasının en üstünde büyük kart olarak gösterilir.',
      initialValue: false,
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO açıklaması',
      type: 'text',
      rows: 2,
      description: 'Boş bırakılırsa özet kullanılır.',
    }),
    defineField({
      name: 'body',
      title: 'İçerik',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Paragraf', value: 'normal' },
            { title: 'Başlık', value: 'h2' },
            { title: 'Alt başlık', value: 'h3' },
            { title: 'Alıntı', value: 'blockquote' },
          ],
          lists: [
            { title: 'Madde', value: 'bullet' },
            { title: 'Numaralı', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Kalın', value: 'strong' },
              { title: 'İtalik', value: 'em' },
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Görsel açıklaması', type: 'string' }),
            defineField({ name: 'caption', title: 'Alt yazı', type: 'string' }),
          ],
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Yayın tarihi (yeniden eskiye)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'cover' },
  },
});
