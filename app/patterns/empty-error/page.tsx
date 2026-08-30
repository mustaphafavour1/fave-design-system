import { Package } from '@phosphor-icons/react/dist/ssr'
import { PageHeader } from '@/components/docs/PageHeader'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { DosDonts } from '@/components/docs/DosDonts'
import { EmptyState } from '@/components/ui/EmptyState'
import { TextInput } from '@/components/ui/TextInput'
import { ModalDemo } from '@/components/docs/ModalDemo'
import { getPattern } from '@/lib/sanity'

export const revalidate = 60

const STATIC = {
  description:
    'Empty-state copy follows one formula: "No [Items] Yet" + "When there are [items], they will show here." Two distinct error patterns — field validation and the error modal — are never conflated.',
  dos: [
    'Use the empty-state copy formula everywhere, so it becomes recognisable rather than reinvented per screen.',
    'Reserve the error modal for system/API-level failures, not form validation.',
  ],
  donts: [
    'Use a warning triangle for an ordinary error modal.',
    'Show a field error and a success state on the same field at once.',
  ],
}

export default async function EmptyErrorPatternPage() {
  const sanity = await getPattern('empty-error')
  const description = sanity?.description || STATIC.description
  const dos = sanity?.dos?.length ? sanity.dos : STATIC.dos
  const donts = sanity?.donts?.length ? sanity.donts : STATIC.donts

  return (
    <div>
      <PageHeader section="Patterns" title="Empty & Error States" description={description} />

      <ComponentPreview title="Empty state">
        <EmptyState
          icon={<Package size={22} />}
          title="No Products Yet"
          description="When there are products, they will show here."
        />
      </ComponentPreview>

      <ComponentPreview title="Field validation error">
        <TextInput label="Email" defaultValue="not-an-email" error="Enter a valid email address." />
      </ComponentPreview>

      <ComponentPreview
        title="Error modal — system/API failure"
        description="Info icon in a coloured circle, not a warning triangle. Single full-width primary action."
      >
        <ModalDemo variant="error" />
      </ComponentPreview>

      <div className="stack-block">
        <DosDonts dos={dos} donts={donts} />
      </div>
    </div>
  )
}
