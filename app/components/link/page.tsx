import { PageHeader } from '@/components/docs/PageHeader'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { PropsTable } from '@/components/docs/PropsTable'
import { DosDonts } from '@/components/docs/DosDonts'
import { Link } from '@/components/ui/Link'
import { getComponent } from '@/lib/sanity'

export const revalidate = 60

const STATIC = {
  description: 'Navigational text — to another page in the product, or out to an external URL.',
  dos: [
    'Use inline within a sentence when the link is part of prose.',
    'Let external links show the outbound-arrow icon automatically — never hide it.',
    'Write link text that describes the destination ("View invoice"), not "click here."',
  ],
  donts: [
    'Use a Link where a Button belongs (an action, not a navigation).',
    'Rely on colour alone — the underline on hover is part of the affordance, not decoration.',
    'Open an internal link in a new tab.',
  ],
}

const PROPS = [
  { name: 'href', type: 'string', required: true, description: 'Destination — internal path or external URL.' },
  { name: 'variant', type: "'standalone' | 'inline'", default: "'standalone'", description: 'standalone has no underline until hover; inline is always underlined.' },
  { name: 'muted', type: 'boolean', default: 'false', description: 'Uses secondary text colour instead of primary.' },
  { name: 'external', type: 'boolean', default: 'false', description: 'Forces the external-link treatment even for a relative href.' },
]

export default async function LinkPage() {
  const sanity = await getComponent('link')
  const description = sanity?.description || STATIC.description
  const dos = sanity?.dos?.length ? sanity.dos : STATIC.dos
  const donts = sanity?.donts?.length ? sanity.donts : STATIC.donts

  return (
    <div>
      <PageHeader
        section="Components / Actions"
        title="Link"
        description={description}
        status={sanity?.status || 'stable'}
        figmaUrl={sanity?.figmaUrl}
      />

      <ComponentPreview
        title="Variants"
        code={`<Link href="/components/button">Standalone link</Link>
<Link href="/components/button" variant="inline">Inline link</Link>
<Link href="/components/button" muted>Muted link</Link>`}
      >
        <Link href="/components/button">Standalone link</Link>
        <Link href="/components/button" variant="inline">
          Inline link
        </Link>
        <Link href="/components/button" muted>
          Muted link
        </Link>
      </ComponentPreview>

      <ComponentPreview title="External" code={`<Link href="https://www.sanity.io">Sanity</Link>`}>
        <Link href="https://www.sanity.io">Sanity</Link>
      </ComponentPreview>

      <ComponentPreview title="In context" code={`<p>Read the <Link href="/foundations/tokens" variant="inline">design tokens</Link> before building a new screen.</p>`}>
        <p style={{ fontSize: 14, color: 'var(--color-text)' }}>
          Read the{' '}
          <Link href="/foundations/tokens" variant="inline">
            design tokens
          </Link>{' '}
          before building a new screen.
        </p>
      </ComponentPreview>

      <PropsTable rows={PROPS} />

      <div className="stack-block">
        <DosDonts dos={dos} donts={donts} />
      </div>
    </div>
  )
}
