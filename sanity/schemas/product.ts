import { defineField, defineType } from 'sanity'

// Curated icon names — must stay in sync with lib/icons.tsx once the
// Next.js app resolves these to actual Phosphor icon components (§8,
// icon-resolver pattern). Free-text icon names are deliberately not
// allowed here so a typo can never silently break an icon.
const featureIcons = [
  'House',
  'User',
  'Users',
  'ChartBar',
  'ChartLine',
  'ShieldCheck',
  'Lightning',
  'Globe',
  'Wallet',
  'Bell',
  'Gear',
  'Lock',
  'CreditCard',
  'ChatCircle',
  'DeviceMobile',
  'Rocket',
  'Sparkle',
  'Clock',
  'MapPin',
  'Envelope',
]

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({
      name: 'type',
      title: 'Product Type',
      type: 'string',
      options: {
        list: ['Consumer Web', 'Consumer Mobile', 'Internal Admin', 'Enterprise / B2B'],
      },
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: ['Live', 'Beta', 'In Development'] },
      initialValue: 'Live',
    }),
    defineField({ name: 'liveUrl', title: 'Live URL', type: 'url' }),
    defineField({ name: 'figmaUrl', title: 'Figma URL', type: 'url' }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'feature',
          fields: [
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: { list: featureIcons },
            },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
          ],
          preview: { select: { title: 'title', subtitle: 'description' } },
        },
      ],
    }),
    defineField({
      name: 'colors',
      title: 'Colours',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'colorSwatch',
          fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'hex', title: 'Hex', type: 'string' },
          ],
          preview: { select: { title: 'name', subtitle: 'hex' } },
        },
      ],
    }),
    defineField({
      name: 'screenshots',
      title: 'Key Screens',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'caption', title: 'Caption', type: 'string' }],
        },
      ],
    }),
    defineField({
      name: 'showOnSite',
      title: 'Show on site',
      description:
        'Pulls the product from the live site without deleting its content. The page must call notFound() when this is off, before falling through to static fallback data.',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({ name: 'order', title: 'Order', type: 'number' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'type', media: 'logo' },
  },
})
