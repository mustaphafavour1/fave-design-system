import { PageHeader } from '@/components/docs/PageHeader'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { PropsTable } from '@/components/docs/PropsTable'
import { DosDonts } from '@/components/docs/DosDonts'
import { ToastDemo } from '@/components/docs/ToastDemo'
import { getComponent } from '@/lib/sanity'

export const revalidate = 60

const STATIC = {
  description: 'A brief, transient confirmation that an action succeeded — appears, then disappears on its own or is dismissed.',
  dos: [
    'Use for confirming an action the user just took ("Changes saved").',
    'Keep the message to one short sentence.',
    'Always include a dismiss control even if it also auto-dismisses.',
  ],
  donts: [
    'Use a Toast for anything that requires a decision — that needs a Modal or inline Alert instead.',
    'Show more than one Toast at a time in a way that makes them overlap.',
  ],
}

const PROPS = [
  { name: 'variant', type: "'success' | 'error' | 'info'", default: "'info'", description: 'Colour and icon.' },
  { name: 'message', type: 'string', required: true, description: 'The confirmation text.' },
  { name: 'onDismiss', type: '() => void', description: 'Called when the dismiss button is clicked. Omit to hide the button.' },
]

export default async function ToastPage() {
  const sanity = await getComponent('toast')
  const description = sanity?.description || STATIC.description
  const dos = sanity?.dos?.length ? sanity.dos : STATIC.dos
  const donts = sanity?.donts?.length ? sanity.donts : STATIC.donts

  return (
    <div>
      <PageHeader
        section="Components / Feedback"
        title="Toast"
        description={description}
        status={sanity?.status || 'stable'}
        figmaUrl={sanity?.figmaUrl}
      />

      <ComponentPreview
        title="Try it"
        code={`const [visible, setVisible] = useState(false)

<Button onClick={() => setVisible(true)}>Show toast</Button>
{visible && <Toast variant="success" message="Changes saved." onDismiss={() => setVisible(false)} />}`}
      >
        <ToastDemo variant="success" message="Changes saved." />
      </ComponentPreview>

      <PropsTable rows={PROPS} />

      <div className="stack-block">
        <DosDonts dos={dos} donts={donts} />
      </div>
    </div>
  )
}
