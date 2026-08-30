import { PageHeader } from '@/components/docs/PageHeader'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { PropsTable } from '@/components/docs/PropsTable'
import { DosDonts } from '@/components/docs/DosDonts'
import { Alert } from '@/components/ui/Alert'
import { getComponent } from '@/lib/sanity'

export const revalidate = 60

const STATIC = {
  description: 'An inline, page- or section-level message — stays on the page until dismissed or the condition changes, unlike a Toast.',
  dos: [
    'Use the variant that matches severity, not the one that "looks nicest" for the layout.',
    'Keep the title a short summary; put detail and next steps in the body.',
  ],
  donts: [
    'Use an Alert for a transient confirmation ("Saved!") — that’s a Toast.',
    'Stack more than one Alert in the same view unless each is about a genuinely different thing.',
  ],
}

const PROPS = [
  { name: 'variant', type: "'success' | 'warning' | 'error' | 'info'", default: "'info'", description: 'Colour and icon.' },
  { name: 'title', type: 'string', required: true, description: 'Short summary line.' },
  { name: 'children', type: 'ReactNode', description: 'Optional supporting detail.' },
]

export default async function AlertPage() {
  const sanity = await getComponent('alert')
  const description = sanity?.description || STATIC.description
  const dos = sanity?.dos?.length ? sanity.dos : STATIC.dos
  const donts = sanity?.donts?.length ? sanity.donts : STATIC.donts

  return (
    <div>
      <PageHeader
        section="Components / Feedback"
        title="Alert"
        description={description}
        status={sanity?.status || 'stable'}
        figmaUrl={sanity?.figmaUrl}
      />

      <ComponentPreview
        title="Variants"
        code={`<Alert variant="success" title="Payment received">Invoice #4821 is now marked paid.</Alert>
<Alert variant="warning" title="Trial ends in 3 days">Add a payment method to avoid interruption.</Alert>
<Alert variant="error" title="Sync failed">Retry, or check your connection settings.</Alert>
<Alert variant="info" title="New feature available">Bulk export is now live in Settings.</Alert>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', width: '100%' }}>
          <Alert variant="success" title="Payment received">
            Invoice #4821 is now marked paid.
          </Alert>
          <Alert variant="warning" title="Trial ends in 3 days">
            Add a payment method to avoid interruption.
          </Alert>
          <Alert variant="error" title="Sync failed">
            Retry, or check your connection settings.
          </Alert>
          <Alert variant="info" title="New feature available">
            Bulk export is now live in Settings.
          </Alert>
        </div>
      </ComponentPreview>

      <PropsTable rows={PROPS} />

      <div className="stack-block">
        <DosDonts dos={dos} donts={donts} />
      </div>
    </div>
  )
}
