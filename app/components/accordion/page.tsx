import { PageHeader } from '@/components/docs/PageHeader'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { PropsTable } from '@/components/docs/PropsTable'
import { DosDonts } from '@/components/docs/DosDonts'
import { Accordion } from '@/components/ui/Accordion'
import { getComponent } from '@/lib/sanity'

export const revalidate = 60

const STATIC = {
  description: 'Collapses long, categorised content — used for FAQs, and to group AI Design Guardrail checklists by category.',
  dos: [
    'Open the first section by default so the pattern is discoverable.',
    'Keep each section title short enough to scan without opening it.',
  ],
  donts: [
    'Nest an accordion inside another accordion.',
    'Hide content inside an accordion that a user needs to complete a required task — that belongs inline.',
  ],
}

const PROPS = [
  { name: 'items', type: '{ title: string; content: ReactNode }[]', required: true, description: 'Sections, in order.' },
  { name: 'defaultOpen', type: 'number[]', default: '[0]', description: 'Indexes open on first render.' },
]

export default async function AccordionPage() {
  const sanity = await getComponent('accordion')
  const description = sanity?.description || STATIC.description
  const dos = sanity?.dos?.length ? sanity.dos : STATIC.dos
  const donts = sanity?.donts?.length ? sanity.donts : STATIC.donts

  return (
    <div>
      <PageHeader
        section="Components / Layout"
        title="Accordion"
        description={description}
        status={sanity?.status || 'stable'}
        figmaUrl={sanity?.figmaUrl}
      />

      <ComponentPreview
        title="Default"
        code={`<Accordion
  items={[
    { title: 'Typography', content: 'Headings never exceed weight 600.' },
    { title: 'Colour', content: 'Every pair meets WCAG AA contrast.' },
    { title: 'Spacing', content: 'Every value is a multiple of 4px.' },
  ]}
/>`}
      >
        <Accordion
          items={[
            { title: 'Typography', content: 'Headings never exceed weight 600.' },
            { title: 'Colour', content: 'Every pair meets WCAG AA contrast.' },
            { title: 'Spacing', content: 'Every value is a multiple of 4px.' },
          ]}
        />
      </ComponentPreview>

      <PropsTable rows={PROPS} />

      <div className="stack-block">
        <DosDonts dos={dos} donts={donts} />
      </div>
    </div>
  )
}
