export interface NavLeaf {
  label: string
  href: string
  badge?: string
}

export interface NavGroup {
  label: string
  items: NavLeaf[]
}

export interface NavSectionDef {
  label: string
  href?: string
  icon?: string
  items?: NavLeaf[]
  groups?: NavGroup[]
}

// Static IA backbone (spec §5). This is the fallback that must always
// render a complete, correct sidebar with zero content in Sanity — see
// getNavSections() in lib/sanity.ts for the optional badge overlay, and
// the Products section, which is rendered separately since it's a fully
// dynamic list driven by `product` documents rather than static nav data.
export const navigation: NavSectionDef[] = [
  { label: 'Overview', href: '/', icon: 'House' },
  {
    label: 'Brand',
    icon: 'Palette',
    items: [
      { label: 'Logo', href: '/brand/logo' },
      { label: 'Colours', href: '/brand/colours' },
      { label: 'Typography', href: '/brand/typography' },
      { label: 'Voice & Tone', href: '/brand/voice' },
    ],
  },
  {
    label: 'Foundations',
    icon: 'Stack',
    items: [
      { label: 'Design Tokens', href: '/foundations/tokens' },
      { label: 'Spacing & Grid', href: '/foundations/spacing' },
      { label: 'Elevation', href: '/foundations/elevation' },
      { label: 'Border Radius', href: '/foundations/border-radius' },
      { label: 'Iconography', href: '/foundations/iconography' },
      { label: 'Motion', href: '/foundations/motion' },
      { label: 'Accessibility', href: '/foundations/accessibility' },
      { label: 'Data Formatting', href: '/foundations/data-formatting' },
    ],
  },
  {
    label: 'Components',
    icon: 'PuzzlePiece',
    groups: [
      {
        label: 'Actions',
        items: [
          { label: 'Button', href: '/components/button' },
          { label: 'Icon Button', href: '/components/icon-button' },
          { label: 'Link', href: '/components/link' },
        ],
      },
      {
        label: 'Forms',
        items: [
          { label: 'Text Input', href: '/components/text-input' },
          { label: 'Select', href: '/components/select' },
          { label: 'Checkbox', href: '/components/checkbox' },
          { label: 'Toggle', href: '/components/toggle' },
          { label: 'Date Picker', href: '/components/date-picker' },
        ],
      },
      {
        label: 'Navigation',
        items: [
          { label: 'Sidebar Nav', href: '/components/sidebar-nav' },
          { label: 'Tabs', href: '/components/tabs' },
          { label: 'Breadcrumbs', href: '/components/breadcrumbs' },
          { label: 'Pagination', href: '/components/pagination' },
        ],
      },
      {
        label: 'Data Display',
        items: [
          { label: 'Table', href: '/components/table' },
          { label: 'Stat Card', href: '/components/stat-card' },
          { label: 'Badge', href: '/components/badge' },
          { label: 'Avatar', href: '/components/avatar' },
        ],
      },
      {
        label: 'Feedback',
        items: [
          { label: 'Alert', href: '/components/alert' },
          { label: 'Toast', href: '/components/toast' },
          { label: 'Modal', href: '/components/modal' },
          { label: 'Tooltip', href: '/components/tooltip' },
          { label: 'Empty State', href: '/components/empty-state' },
          { label: 'Skeleton', href: '/components/skeleton' },
        ],
      },
      {
        label: 'Layout',
        items: [
          { label: 'Card', href: '/components/card' },
          { label: 'Accordion', href: '/components/accordion' },
          { label: 'Divider', href: '/components/divider' },
        ],
      },
    ],
  },
  {
    label: 'Patterns',
    icon: 'FlowArrow',
    items: [
      { label: 'Authentication', href: '/patterns/auth' },
      { label: 'Dashboard Layout', href: '/patterns/dashboard' },
      { label: 'Data Tables', href: '/patterns/data-tables' },
      { label: 'Forms & Validation', href: '/patterns/forms' },
      { label: 'Empty & Error States', href: '/patterns/empty-error' },
    ],
  },
  {
    label: 'AI Design Guardrails',
    icon: 'ShieldCheck',
    items: [
      { label: 'Websites', href: '/guardrails/websites' },
      { label: 'Dashboards', href: '/guardrails/dashboards' },
      { label: 'Mobile Apps', href: '/guardrails/mobile', badge: 'Coming Soon' },
    ],
  },
  { label: 'Contributing', href: '/contributing', icon: 'GitBranch' },
]

// Overview cards on the homepage — a curated subset of the sections above.
export const overviewSections = [
  {
    label: 'Brand',
    href: '/brand/colours',
    icon: 'Palette',
    description: 'Logo usage, colour, typography and voice & tone.',
    examples: ['Logo', 'Colours', 'Typography', 'Voice & Tone'],
  },
  {
    label: 'Foundations',
    href: '/foundations/tokens',
    icon: 'Stack',
    description: 'The tokens and rules everything else is built on.',
    examples: ['Design Tokens', 'Spacing', 'Elevation', 'Accessibility'],
  },
  {
    label: 'Components',
    href: '/components/button',
    icon: 'PuzzlePiece',
    description: 'The full UI library: variants, states and usage.',
    examples: ['Button', 'Text Input', 'Table', 'Modal'],
  },
  {
    label: 'Patterns',
    href: '/patterns/dashboard',
    icon: 'FlowArrow',
    description: 'Proven, multi-component solutions to the problems that keep coming back.',
    examples: ['Authentication', 'Dashboard Layout', 'Data Tables'],
  },
  {
    label: 'Products',
    href: '/products',
    icon: 'Package',
    description: 'Every product this actually ships into.',
    examples: [],
  },
  {
    label: 'Contributing',
    href: '/contributing',
    icon: 'GitBranch',
    description: 'How to propose, build and ship a change.',
    examples: ['Checklist', 'Figma Naming', 'Changelog'],
  },
]
