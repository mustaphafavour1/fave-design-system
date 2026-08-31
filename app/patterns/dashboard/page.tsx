import { Wallet, Users, ChartBar } from '@phosphor-icons/react/dist/ssr'
import { PageHeader } from '@/components/docs/PageHeader'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { DosDonts } from '@/components/docs/DosDonts'
import { SidebarNav } from '@/components/ui/SidebarNav'
import { StatCard } from '@/components/ui/StatCard'
import { getPattern } from '@/lib/sanity'

export const revalidate = 60

const STATIC = {
  description:
    'Fixed sidebar + sticky top bar + scrollable content area. The content background is subtly tinted, distinct from both the sidebar and pure-white cards — that tint is what creates depth without extra borders everywhere.',
  dos: [
    'Show a greeting ("Good Morning, [Name]") on the main dashboard; a page description on sub-pages.',
    'Keep the top bar sticky so page-level actions stay reachable while scrolling.',
    'Tint the content background distinctly from both the sidebar and card surfaces.',
  ],
  donts: [
    'Use pure white for both the page background and cards — nothing will read as elevated.',
    'Let the sidebar scroll with the page — it stays fixed.',
  ],
}

export default async function DashboardPatternPage() {
  const sanity = await getPattern('dashboard')
  const description = sanity?.description || STATIC.description
  const dos = sanity?.dos?.length ? sanity.dos : STATIC.dos
  const donts = sanity?.donts?.length ? sanity.donts : STATIC.donts

  return (
    <div>
      <PageHeader section="Patterns" title="Dashboard Layout" description={description} />

      <ComponentPreview
        title="Anatomy"
        description="The logo sits top-left, on the same line as the top bar — not buried inside the sidebar below it."
      >
        <div className="pattern-dashboard-demo">
          <div className="pattern-dashboard-sidebar">
            <div className="pattern-dashboard-logo">
              <span className="pattern-dashboard-logo-mark">F</span>
              Brand
            </div>
            <SidebarNav
              defaultActive="Overview"
              items={[{ label: 'Overview' }, { label: 'Transactions', badge: '3' }, { label: 'Customers' }, { label: 'Settings' }]}
            />
          </div>
          <div className="pattern-dashboard-main">
            <div className="pattern-dashboard-topbar">Good Morning, Ada</div>
            <div className="pattern-dashboard-content">
              <div className="pattern-dashboard-stats">
                <StatCard label="Revenue" value="$84,920" icon={<Wallet size={16} />} />
                <StatCard label="Customers" value="1,204" icon={<Users size={16} />} />
                <StatCard label="Conversion" value="3.2%" icon={<ChartBar size={16} />} />
              </div>
            </div>
          </div>
        </div>
      </ComponentPreview>

      <div className="stack-block">
        <DosDonts dos={dos} donts={donts} />
      </div>
    </div>
  )
}
