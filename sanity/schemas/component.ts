import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'component',
  title: 'Component',
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
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Actions', value: 'actions' },
          { title: 'Forms', value: 'forms' },
          { title: 'Navigation', value: 'navigation' },
          { title: 'Data Display', value: 'data-display' },
          { title: 'Feedback', value: 'feedback' },
          { title: 'Layout', value: 'layout' },
        ],
      },
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: ['stable', 'beta', 'deprecated'] },
      initialValue: 'stable',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'figmaUrl',
      title: 'Figma URL',
      type: 'url',
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
    select: { title: 'name', subtitle: 'category' },
  },
})
