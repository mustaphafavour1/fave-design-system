import type { StructureResolver } from 'sanity/structure'

// Brand Settings is a singleton: Sanity v3 has no schema-level way to
// lock a document type to one instance, so it's enforced here instead,
// by always pointing at the same fixed document ID.
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Brand Settings')
        .id('brandSettings')
        .child(
          S.document()
            .schemaType('brandSettings')
            .documentId('brandSettings')
            .title('Brand Settings')
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'brandSettings'
      ),
    ])
