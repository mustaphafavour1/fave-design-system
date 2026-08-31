import { defineField, defineType } from 'sanity'

// Convenience path alongside the git-tracked rules in /guardrails/*.md
// (see lib/guardrails.ts): upload a whole spec doc here and it renders
// on the matching Guardrails page within a minute, no PR needed. The
// git-tracked rules stay the source of truth for anything that needs
// review history or per-rule severity — this is for "I just have a
// document, put it on the site."
export default defineType({
  name: 'guardrailDoc',
  title: 'Guardrail Spec Upload',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'Websites', value: 'websites' },
          { title: 'Dashboards', value: 'dashboards' },
          { title: 'Mobile Apps', value: 'mobile' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'file',
      title: 'Spec document (.md)',
      type: 'file',
      description: 'A Markdown file. Optional YAML frontmatter with "category" and "severity" (must-fix / should-fix / recommended) will be picked up if present — otherwise it renders as plain content under the title above.',
      options: { accept: '.md,text/markdown' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'platform' },
  },
})
