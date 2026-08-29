import { defineField, defineType } from 'sanity'

/**
 * Singleton — enforced via sanity/structure.ts pinning this type to a
 * fixed document ID ("brandSettings"), not via a schema-level API.
 */
export default defineType({
  name: 'brandSettings',
  title: 'Brand Settings',
  type: 'document',
  fields: [
    defineField({ name: 'orgName', title: 'Organization Name', type: 'string' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({
      name: 'logoLight',
      title: 'Logo (for light backgrounds)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'logoDark',
      title: 'Logo (for dark backgrounds)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'primaryColor', title: 'Primary Colour (hex)', type: 'string' }),
  ],
  preview: {
    select: { title: 'orgName' },
    prepare({ title }) {
      return { title: title || 'Brand Settings' }
    },
  },
})
