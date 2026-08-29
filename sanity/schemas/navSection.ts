import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'navSection',
  title: 'Navigation Section',
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
    }),
    defineField({ name: 'order', title: 'Order', type: 'number' }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'navItem',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'href', title: 'Href', type: 'string' },
            { name: 'badge', title: 'Badge', type: 'string' },
          ],
          preview: { select: { title: 'label', subtitle: 'href' } },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
