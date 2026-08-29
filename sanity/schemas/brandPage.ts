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
