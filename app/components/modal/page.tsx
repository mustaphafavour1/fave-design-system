import { PageHeader } from '@/components/docs/PageHeader'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { PropsTable } from '@/components/docs/PropsTable'
import { DosDonts } from '@/components/docs/DosDonts'
import { ModalDemo } from '@/components/docs/ModalDemo'
import { getComponent } from '@/lib/sanity'

export const revalidate = 60

const STATIC = {
  description:
    'A focused dialog that blocks the rest of the page. Two distinct patterns: a confirmation with Cancel/primary actions, and an error modal for system-level failures.',
  dos: [
    'Close on Escape, on backdrop click, and via the explicit close button — all three, every time.',
    'Lock body scroll while open.',
    'For an error modal specifically: use an info icon in a coloured circle, not a warning triangle, with a single full-width primary "OK" button.',
  ],
  donts: [
    'Use a Modal for a simple confirmation that a Toast could handle.',
    'Stack a second modal on top of an open one.',
    'Use a warning triangle for an ordinary error — reserve alarming iconography for genuinely urgent, rare situations.',
  ],
}

const PROPS = [
  { name: 'open', type: 'boolean', required: true, description: 'Controls visibility.' },
  { name: 'onClose', type: '() => void', required: true, description: 'Called on Escape, backdrop click, or the close button.' },
  { name: 'title', type: 'string', required: true, description: 'Dialog title, also used for aria-labelledby.' },
  { name: 'children', type: 'ReactNode', required: true, description: 'Body content.' },
  { name: 'footer', type: 'ReactNode', description: 'Optional action row, right-aligned.' },
]

export default async function ModalPage() {
  const sanity = await getComponent('modal')
  const description = sanity?.description || STATIC.description
  const dos = sanity?.dos?.length ? sanity.dos : STATIC.dos
  const donts = sanity?.donts?.length ? sanity.donts : STATIC.donts

  return (
    <div>
      <PageHeader
        section="Components / Feedback"
        title="Modal"
        description={description}
        status={sanity?.status || 'stable'}
        figmaUrl={sanity?.figmaUrl}
      />

      <ComponentPreview
        title="Confirmation"
        code={`<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Delete this item?"
  footer={<>
    <Button variant="secondary" onClick={close}>Cancel</Button>
    <Button variant="danger" onClick={confirmDelete}>Delete</Button>
  </>}
>
  This can't be undone.
</Modal>`}
      >
        <ModalDemo variant="confirm" />
      </ComponentPreview>

      <ComponentPreview
        title="Error modal"
        description="Info icon in a coloured circle — never a warning triangle for an ordinary error."
        code={`<Modal open={open} onClose={close} title="Payment failed">
  <InfoCircleIcon />
  <p>We couldn't process your card...</p>
  <Button style={{ width: '100%' }} onClick={close}>OK</Button>
</Modal>`}
      >
        <ModalDemo variant="error" />
      </ComponentPreview>

      <PropsTable rows={PROPS} />

      <div className="stack-block">
        <DosDonts dos={dos} donts={donts} />
      </div>
    </div>
  )
}
