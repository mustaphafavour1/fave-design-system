import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

import { schemaTypes } from './sanity/schema'
import { structure } from './sanity/structure'

export default defineConfig({
  name: 'default',
  title: 'Fave Design System',

  projectId: 'm7vu676k',
  dataset: 'production',

  plugins: [structureTool({ structure }), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
