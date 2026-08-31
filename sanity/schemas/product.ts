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
      name: 'category',
      title: 'Category',
      description: 'Free-text category for the showcase card, e.g. "Fintech / Investment Platform".',
      type: 'string',
    }),
    defineField({
      name: 'type',
      title: 'Product Type',
      type: 'string',
      options: {
        list: [
          'Consumer Web',
          'Consumer Mobile',
          'B2B2C Platform',
          'SaaS Dashboard',
          'Internal Admin',
          'Enterprise / B2B',
        ],
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
      title: 'Logo (Mark)',
      description: 'The icon/mark on its own — used in the identity box and recoloured in the brand-colours showcase below. Upload as SVG with a transparent background so recolouring works.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'logoHorizontal',
      title: 'Logo (Horizontal Lockup)',
      description: 'Icon and wordmark side by side.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'logoVertical',
      title: 'Logo (Vertical Lockup)',
      description: 'Icon above the wordmark, stacked.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({
      name: 'positioning',
      title: 'Positioning',
      description: 'The sharp one- or two-line statement of who this serves and how — market angle, not a feature list.',
      type: 'text',
    }),
    defineField({
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'stackItem',
          fields: [
            { name: 'layer', title: 'Layer', type: 'string' },
            { name: 'technology', title: 'Technology', type: 'string' },
          ],
          preview: { select: { title: 'layer', subtitle: 'technology' } },
        },
      ],
    }),
    defineField({
      name: 'typography',
      title: 'Typography',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'typographyRole',
          fields: [
            { name: 'role', title: 'Role', type: 'string' },
            { name: 'font', title: 'Font', type: 'string' },
            { name: 'notes', title: 'Notes', type: 'string' },
          ],
          preview: { select: { title: 'font', subtitle: 'role' } },
        },
      ],
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      description: 'Signature visual motifs or portfolio-worthy details — the things worth calling out about this product.',
      type: 'array',
      of: [{ type: 'string' }],
    }),
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
            { name: 'role', title: 'Role', type: 'string', description: 'e.g. "Primary background", "CTA accent"' },
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
      name: 'surfaces',
      title: 'Surfaces',
      description:
        'For a product with more than one distinct experience — e.g. the marketing website, the product itself, and an admin dashboard — break screenshots out per surface here. Skip this for a single-surface product; Key Screens above still covers that case.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'surface',
          fields: [
            {
              name: 'type',
              title: 'Type',
              type: 'string',
              options: { list: ['Website', 'Product', 'Admin Dashboard'] },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'label',
              title: 'Label',
              description: 'Optional display name override, e.g. "Organizer Dashboard" instead of "Admin Dashboard".',
              type: 'string',
            },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'liveUrl', title: 'Live URL', type: 'url' },
            {
              name: 'screenshots',
              title: 'Screenshots',
              type: 'array',
              of: [
                {
                  type: 'image',
                  options: { hotspot: true },
                  fields: [{ name: 'caption', title: 'Caption', type: 'string' }],
                },
              ],
            },
          ],
          preview: {
            select: { label: 'label', type: 'type', media: 'screenshots.0' },
            prepare({ label, type, media }) {
              return { title: label || type, subtitle: label ? type : undefined, media }
            },
          },
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
    select: { title: 'name', subtitle: 'category', media: 'logo' },
  },
})
