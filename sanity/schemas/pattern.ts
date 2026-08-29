import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pattern',
  title: 'Pattern',
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
      name: 'order',
      title: 'Order',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
