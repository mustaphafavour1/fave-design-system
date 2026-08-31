import { navigation } from './navigation'

export interface SearchItem {
  title: string
  section: string
  href: string
}

// Flattens the static IA backbone (see navigation.ts) into a searchable
// list. Products aren't included here since they're dynamic — the caller
// merges those in separately from a live Sanity fetch.
export function getStaticSearchIndex(): SearchItem[] {
  const items: SearchItem[] = []

  for (const section of navigation) {
    if (section.href) {
      items.push({ title: section.label, section: section.label, href: section.href })
      continue
    }
    for (const item of section.items ?? []) {
      items.push({ title: item.label, section: section.label, href: item.href })
    }
    for (const group of section.groups ?? []) {
      for (const item of group.items) {
        items.push({ title: item.label, section: `${section.label} / ${group.label}`, href: item.href })
      }
    }
  }

  return items
}
