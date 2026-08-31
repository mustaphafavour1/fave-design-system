import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { getGuardrailDocs } from './sanity'

export type GuardrailPlatform = 'websites' | 'dashboards' | 'mobile'

export interface GuardrailRule {
  title: string
  category: string
  severity: 'must-fix' | 'should-fix' | 'recommended'
  tags?: string[]
  order?: number
  slug: string
  body: string
}

export interface UploadedGuardrailDoc {
  title: string
  slug: string
  category?: string
  severity?: GuardrailRule['severity']
  body: string
}

const ROOT = path.join(process.cwd(), 'guardrails')

// Build-time filesystem read — Server Components only (Node runtime, not
// Edge). Source of truth stays git-tracked markdown, not Sanity: see the
// spec's content-ownership table for why this one type breaks the pattern.
export function getGuardrailsByPlatform(platform: GuardrailPlatform): Record<string, GuardrailRule[]> {
  const dir = path.join(ROOT, platform)
  if (!fs.existsSync(dir)) return {}

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'))
  const rules: GuardrailRule[] = files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8')
    const { data, content } = matter(raw)
    return { ...(data as Omit<GuardrailRule, 'slug' | 'body'>), slug: file.replace(/\.md$/, ''), body: content }
  })

  return rules
    .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity) || a.title.localeCompare(b.title))
    .reduce((groups: Record<string, GuardrailRule[]>, rule) => {
      ;(groups[rule.category] ??= []).push(rule)
      return groups
    }, {})
}

// Convenience path: a .md file uploaded straight into a Studio document,
// fetched and parsed at render time — no PR needed, unlike the rules
// above. Frontmatter (category/severity) is honoured if present, but
// isn't required; an upload with none just renders as plain content.
export async function getUploadedGuardrails(platform: GuardrailPlatform): Promise<UploadedGuardrailDoc[]> {
  const docs = await getGuardrailDocs(platform)
  if (!Array.isArray(docs) || docs.length === 0) return []

  const parsed = await Promise.all(
    docs.map(async (doc: any): Promise<UploadedGuardrailDoc | null> => {
      if (!doc?.fileUrl) return null
      try {
        const res = await fetch(doc.fileUrl)
        if (!res.ok) return null
        const raw = await res.text()
        const { data, content } = matter(raw)
        return {
          title: doc.title,
          slug: String(doc.title).toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          category: (data as any)?.category,
          severity: (data as any)?.severity,
          body: content.trim(),
        }
      } catch (err) {
        console.error(`[Guardrails] failed to fetch/parse uploaded doc "${doc?.title}":`, err)
        return null
      }
    })
  )

  return parsed.filter((doc): doc is UploadedGuardrailDoc => doc !== null)
}

export async function getGuardrailCount(platform: GuardrailPlatform): Promise<number> {
  const grouped = getGuardrailsByPlatform(platform)
  const fileRuleCount = Object.values(grouped).reduce((sum, rules) => sum + rules.length, 0)
  const uploaded = await getUploadedGuardrails(platform)
  return fileRuleCount + uploaded.length
}
