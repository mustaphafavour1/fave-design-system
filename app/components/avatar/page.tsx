import { PageHeader } from '@/components/docs/PageHeader'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { PropsTable } from '@/components/docs/PropsTable'
import { DosDonts } from '@/components/docs/DosDonts'
import { Avatar } from '@/components/ui/Avatar'
import { getComponent } from '@/lib/sanity'

export const revalidate = 60

const STATIC = {
  description: 'Represents a person or account — a photo when there is one, initials when there isn’t, a generic icon when there’s neither.',
  dos: [
    'Fall back to initials before falling back to a generic icon — initials are more identifiable at a glance.',
    'Keep sizing consistent within one context (e.g. every row in a table uses the same size).',
  ],
  donts: [
    'Stretch a non-square source image instead of cropping it.',
    'Use an avatar for a non-person entity (a product, a company) — use a logo container instead.',
  ],
}

const PROPS = [
  { name: 'src', type: 'string', description: 'Image URL. Falls back to initials, then a generic icon, if absent.' },
  { name: 'name', type: 'string', description: 'Full name — used for initials and the image alt text.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Diameter of the avatar.' },
]

export default async function AvatarPage() {
  const sanity = await getComponent('avatar')
  const description = sanity?.description || STATIC.description
  const dos = sanity?.dos?.length ? sanity.dos : STATIC.dos
  const donts = sanity?.donts?.length ? sanity.donts : STATIC.donts

  return (
    <div>
      <PageHeader
        section="Components / Data Display"
        title="Avatar"
        description={description}
        status={sanity?.status || 'stable'}
        figmaUrl={sanity?.figmaUrl}
      />

      <ComponentPreview
        title="Fallback states"
        code={`<Avatar name="Ada Lovelace" />
<Avatar />`}
      >
        <Avatar name="Ada Lovelace" />
        <Avatar />
      </ComponentPreview>

      <ComponentPreview
        title="Sizes"
        code={`<Avatar name="Ada Lovelace" size="sm" />
<Avatar name="Ada Lovelace" size="md" />
<Avatar name="Ada Lovelace" size="lg" />`}
      >
        <Avatar name="Ada Lovelace" size="sm" />
        <Avatar name="Ada Lovelace" size="md" />
        <Avatar name="Ada Lovelace" size="lg" />
      </ComponentPreview>

      <PropsTable rows={PROPS} />

      <div className="stack-block">
        <DosDonts dos={dos} donts={donts} />
      </div>
    </div>
  )
}
