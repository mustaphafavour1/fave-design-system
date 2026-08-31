import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'brandPage',
  title: 'Brand Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Use logo / colours / typography / voice to match the Brand section pages.',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'dos',
      title: "Do's",
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'donts',
      title: "Don'ts",
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'fontSpecimens',
      title: 'Font Specimens',
      description: 'Major fonts in use across products (Typography page only). Drag to reorder.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'fontSpecimen',
          fields: [
            { name: 'fontFamily', title: 'Font name', type: 'string', validation: (Rule) => Rule.required() },
            {
              name: 'googleFont',
              title: 'Google Fonts family name',
              description: 'Exact family name as it appears on fonts.google.com, e.g. "Plus Jakarta Sans". Leave blank if it isn’t on Google Fonts.',
              type: 'string',
            },
            { name: 'caption', title: 'Caption', description: 'What it’s used for.', type: 'string' },
            { name: 'usedBy', title: 'Used by', description: 'Product name, e.g. "MonieMatch".', type: 'string' },
          ],
          preview: { select: { title: 'fontFamily', subtitle: 'usedBy' } },
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
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
