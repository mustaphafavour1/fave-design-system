import { createClient, type SanityClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const client: SanityClient | null = projectId
  ? createClient({ projectId, dataset, apiVersion: '2024-01-01', useCdn: false })
  : null

export function urlFor(source: any) {
  // Fallback must still expose .width().url() so consuming pages don't
  // need a null-check at every call site when Sanity isn't configured.
  if (!client) return { width: (_: number) => ({ url: () => '' }), url: () => '' }
  return imageUrlBuilder(client).image(source)
}

const NO_DRAFTS = `!(_id in path("drafts.**"))`

async function sanityFetch(query: string, params: Record<string, unknown> = {}): Promise<any> {
  if (!client) return null
  try {
    return await client.fetch(query, params)
  } catch (err) {
    console.error('[Sanity] fetch error:', err)
    return null
  }
}

export async function getBrandPage(slug: string): Promise<any> {
  return sanityFetch(
    `*[_type == "brandPage" && slug.current == $slug && ${NO_DRAFTS}][0]{
      title, "slug": slug.current, description, body, dos, donts, colors, images
    }`,
    { slug }
  )
}

export async function getFoundation(slug: string): Promise<any> {
  return sanityFetch(
    `*[_type == "foundation" && slug.current == $slug && ${NO_DRAFTS}][0]{
      title, "slug": slug.current, description, rules
    }`,
    { slug }
  )
}

export async function getComponent(slug: string): Promise<any> {
  return sanityFetch(
    `*[_type == "component" && slug.current == $slug && ${NO_DRAFTS}][0]{
      name, "slug": slug.current, category, status, description, figmaUrl, dos, donts
    }`,
    { slug }
  )
}

export async function getPattern(slug: string): Promise<any> {
  return sanityFetch(
    `*[_type == "pattern" && slug.current == $slug && ${NO_DRAFTS}][0]{
      title, "slug": slug.current, description, dos, donts
    }`,
    { slug }
  )
}

export async function getChangelog(): Promise<any> {
  return sanityFetch(
    `*[_type == "changelogEntry" && ${NO_DRAFTS}] | order(date desc){
      version, releaseType, date, changes
    }`
  )
}

export async function getProduct(slug: string): Promise<any> {
  return sanityFetch(
    `*[_type == "product" && slug.current == $slug && ${NO_DRAFTS}][0]{
      name, "slug": slug.current, tagline, category, type, status, liveUrl, figmaUrl, logo,
      description, positioning, techStack, typography, highlights,
      features, colors, screenshots, showOnSite
    }`,
    { slug }
  )
}

export async function getProducts(): Promise<any> {
  return sanityFetch(
    `*[_type == "product" && showOnSite == true && ${NO_DRAFTS}] | order(order asc, name asc){
      name, "slug": slug.current, tagline, category, type, logo
    }`
  )
}

export async function getGuardrailDocs(platform: string): Promise<any> {
  return sanityFetch(
    `*[_type == "guardrailDoc" && platform == $platform && ${NO_DRAFTS}] | order(order asc, title asc){
      title, "fileUrl": file.asset->url
    }`,
    { platform }
  )
}

export async function getNavSections(): Promise<any> {
  return sanityFetch(
    `*[_type == "navSection" && ${NO_DRAFTS}] | order(order asc){
      title, "slug": slug.current, order, items
    }`
  )
}

export async function getSiteCounts(): Promise<any> {
  return sanityFetch(
    `{
      "components": count(*[_type == "component" && ${NO_DRAFTS}]),
      "products": count(*[_type == "product" && showOnSite == true && ${NO_DRAFTS}])
    }`
  )
}
