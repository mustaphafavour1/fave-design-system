import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'changelogEntry',
  title: 'Changelog Entry',
  type: 'document',
  fields: [
    defineField({
      name: 'version',
      title: 'Version',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'releaseType',
      title: 'Release Type',
      type: 'string',
      options: { list: ['major', 'minor', 'patch'] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'changes',
      title: 'Changes',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'change',
          fields: [
            {
              name: 'type',
              title: 'Type',
              type: 'string',
              options: { list: ['Added', 'Changed', 'Fixed', 'Removed'] },
            },
            { name: 'description', title: 'Description', type: 'string' },
          ],
          preview: { select: { title: 'description', subtitle: 'type' } },
        },
      ],
    }),
  ],
  orderings: [
    {
      title: 'Date, New to Old',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'version', subtitle: 'releaseType' },
  },
})
