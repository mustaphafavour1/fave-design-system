import { Trash, Gear, Bell } from '@phosphor-icons/react/dist/ssr'
import { PageHeader } from '@/components/docs/PageHeader'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { PropsTable } from '@/components/docs/PropsTable'
import { DosDonts } from '@/components/docs/DosDonts'
import { IconButton } from '@/components/ui/IconButton'
import { getComponent } from '@/lib/sanity'

export const revalidate = 60

const STATIC = {
  description: 'A button whose only content is an icon — used in toolbars, table rows, and cards.',
  dos: [
    'Always pass a label — it becomes the accessible name and the tooltip.',
    'Use ghost for low-emphasis actions in a toolbar, solid to draw more attention.',
    'Keep the hit area at least 36×36px, even if the icon is smaller.',
  ],
  donts: [
    'Ship an icon button without a label prop.',
    'Use an icon whose meaning isn’t already established elsewhere in the product.',
    'Pair more than 3–4 icon buttons together without a divider or grouping.',
  ],
}

const PROPS = [
  { name: 'icon', type: 'ReactNode', required: true, description: 'The icon to render.' },
  { name: 'label', type: 'string', required: true, description: 'Accessible name — also shown as a title tooltip.' },
  { name: 'variant', type: "'ghost' | 'solid'", default: "'ghost'", description: 'Visual style.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Hit area size.' },
]

export default async function IconButtonPage() {
  const sanity = await getComponent('icon-button')
  const description = sanity?.description || STATIC.description
  const dos = sanity?.dos?.length ? sanity.dos : STATIC.dos
  const donts = sanity?.donts?.length ? sanity.donts : STATIC.donts

  return (
    <div>
      <PageHeader
        section="Components / Actions"
        title="Icon Button"
        description={description}
        status={sanity?.status || 'stable'}
        figmaUrl={sanity?.figmaUrl}
      />

      <ComponentPreview
        title="Variants"
        code={`<IconButton icon={<Gear />} label="Settings" variant="ghost" />
<IconButton icon={<Gear />} label="Settings" variant="solid" />`}
      >
        <IconButton icon={<Gear size={18} />} label="Settings" variant="ghost" />
        <IconButton icon={<Gear size={18} />} label="Settings" variant="solid" />
      </ComponentPreview>

      <ComponentPreview
        title="Sizes"
        code={`<IconButton icon={<Bell />} label="Notifications" size="sm" />
<IconButton icon={<Bell />} label="Notifications" size="md" />
<IconButton icon={<Bell />} label="Notifications" size="lg" />`}
      >
        <IconButton icon={<Bell size={16} />} label="Notifications" size="sm" />
        <IconButton icon={<Bell size={18} />} label="Notifications" size="md" />
        <IconButton icon={<Bell size={20} />} label="Notifications" size="lg" />
      </ComponentPreview>

      <ComponentPreview
        title="In context — table row actions"
        code={`<IconButton icon={<Gear />} label="Edit" variant="ghost" />
<IconButton icon={<Trash />} label="Delete" variant="ghost" />`}
      >
        <IconButton icon={<Gear size={18} />} label="Edit" variant="ghost" />
        <IconButton icon={<Trash size={18} />} label="Delete" variant="ghost" />
        <IconButton icon={<Gear size={18} />} label="Settings (disabled)" variant="ghost" disabled />
      </ComponentPreview>

      <PropsTable rows={PROPS} />

      <div className="stack-block">
        <DosDonts dos={dos} donts={donts} />
      </div>
    </div>
  )
}
