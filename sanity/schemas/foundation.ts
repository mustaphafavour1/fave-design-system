import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'foundation',
  title: 'Foundation',
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
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'rules',
      title: 'Usage Rules',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'rule',
          fields: [
            { name: 'term', title: 'Term', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
          ],
          preview: { select: { title: 'term', subtitle: 'description' } },
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
