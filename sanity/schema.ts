import type { SchemaTypeDefinition } from 'sanity'

import component from './schemas/component'
import foundation from './schemas/foundation'
import pattern from './schemas/pattern'
import brandPage from './schemas/brandPage'
import brandSettings from './schemas/brandSettings'
import product from './schemas/product'
import changelogEntry from './schemas/changelogEntry'
import navSection from './schemas/navSection'

export const schemaTypes: SchemaTypeDefinition[] = [
  component,
  foundation,
  pattern,
  brandPage,
  brandSettings,
  product,
  changelogEntry,
  navSection,
]
