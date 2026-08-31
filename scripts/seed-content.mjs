#!/usr/bin/env node
// Seeds `foundation`, `pattern`, `component`, and `brandPage` documents with
// the copy that's currently hardcoded as a STATIC fallback in each page's
// app/**/page.tsx file. Every one of those pages already prefers Sanity data
// over STATIC when a matching document exists (by slug) — this script just
// creates that document, seeded with the same words already live on the
// site, so it becomes editable from Studio without changing what visitors
// see. Safe to re-run: createOrReplace against a fixed _id per document.
//
// This does NOT touch `product` documents — see scripts/seed.mjs for those.
//
// Usage:
//   SANITY_API_TOKEN=your_token node scripts/seed-content.mjs
// (or: npm run seed:content)
// Generate a token with Editor permission at:
//   https://www.sanity.io/manage/project/<projectId> -> API -> Tokens

import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'm7vu676k'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!token) {
  console.error(
    [
      'Missing SANITY_API_TOKEN.',
      '',
      `Generate an Editor token at https://www.sanity.io/manage/project/${projectId} -> API -> Tokens,`,
      'then run:',
      '',
      '  SANITY_API_TOKEN=your_token node scripts/seed-content.mjs',
    ].join('\n')
  )
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', token, useCdn: false })

const slug = (current) => ({ _type: 'slug', current })

// Minimal valid Portable Text block — Studio's rich text editor wants a
// stable _key on the block and every child span, which the API doesn't
// auto-generate for `block` the way it does for plain object arrays.
let keyCounter = 0
function nextKey() {
  keyCounter += 1
  return `seed${keyCounter.toString(36)}`
}
function block(text) {
  return {
    _type: 'block',
    _key: nextKey(),
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: nextKey(), text, marks: [] }],
  }
}

const foundations = [
  {
    _id: 'foundation-tokens',
    _type: 'foundation',
    title: 'Design Tokens',
    slug: slug('tokens'),
    order: 1,
    description:
      'Every colour, space, radius, shadow, and duration in this system is a CSS custom property defined once in app/globals.css. Components reference the token, never a raw value.',
    rules: [
      { term: 'Semantic aliases', description: 'Components reference --color-primary, never a raw scale value or hex code directly.' },
      { term: 'Colour scale', description: 'Runs 25 (near-white tint) to 900 (near-black shade); semantic aliases point at one specific stop.' },
      { term: 'Contrast', description: 'Every text/background token pair meets WCAG AA — 4.5:1 for normal text, 3:1 for large text.' },
      { term: 'Spacing unit', description: '4px base unit. Every gap, padding, and margin used anywhere is a multiple of 4.' },
      { term: 'New tokens', description: 'Proposed in the same PR as their first real usage — never added speculatively.' },
    ],
  },
  {
    _id: 'foundation-spacing',
    _type: 'foundation',
    title: 'Spacing & Grid',
    slug: slug('spacing'),
    order: 2,
    description:
      'A strict 4px base unit. Every gap, padding, and margin in the system is a multiple of 4 — there is no "just this once" 5px or 18px.',
    rules: [
      { term: 'Base unit', description: '4px. Every spacing token is a multiple of it.' },
      { term: 'Component padding', description: 'Small controls (chips, badges) use --space-2/--space-3; buttons and inputs use --space-3/--space-4.' },
      { term: 'Section spacing', description: 'Related content groups use --space-6; distinct page sections use --space-8 or --space-10.' },
      { term: 'No raw values', description: 'A gap, padding, or margin that isn’t one of the tokens on this page is a bug, not a design decision.' },
    ],
  },
  {
    _id: 'foundation-elevation',
    _type: 'foundation',
    title: 'Elevation',
    slug: slug('elevation'),
    order: 3,
    description:
      'Six levels, flat (0) to highest overlay (5). Elevation communicates stacking order and interactivity — it is not decoration.',
    rules: [
      { term: 'One highest layer', description: 'Only one element on screen uses --shadow-5 at a time — if two things compete for it, one is wrong.' },
      { term: 'Elevation implies interactivity', description: 'Raising a shadow on hover signals "this is clickable." Don’t apply it to static content.' },
      { term: 'Pair with motion', description: 'Elevation changes transition using --duration-fast, never instantly.' },
    ],
  },
  {
    _id: 'foundation-border-radius',
    _type: 'foundation',
    title: 'Border Radius',
    slug: slug('border-radius'),
    order: 4,
    description: 'A small, consistent scale referenced everywhere a corner is rounded.',
    rules: [
      { term: 'No arbitrary radii', description: 'Every rounded corner uses one of the five tokens on this page.' },
      { term: 'Nesting', description: 'A nested element’s radius is never larger than its parent’s.' },
      { term: 'Consistency over cleverness', description: 'The same component always uses the same radius token across the whole product.' },
    ],
  },
  {
    _id: 'foundation-iconography',
    _type: 'foundation',
    title: 'Iconography',
    slug: slug('iconography'),
    order: 5,
    description:
      'One icon library for the whole product: Phosphor. 1,200+ icons across six consistent weights — never mix in an icon from another set, and never ship emoji as icons.',
    rules: [
      { term: 'Single source', description: 'Every icon comes from @phosphor-icons/react. No mixed libraries, no emoji in shipped product.' },
      { term: 'Server components', description: 'Import from the /dist/ssr subpath in any file that might render on the server — the default export breaks server-side page-data collection.' },
      { term: 'Size', description: 'Icons default to 20px inline with text, 24px in isolation (buttons, nav).' },
    ],
  },
  {
    _id: 'foundation-motion',
    _type: 'foundation',
    title: 'Motion',
    slug: slug('motion'),
    order: 6,
    description:
      'Motion is restrained and functional — it confirms an action happened, it never performs for its own sake. Every animated property respects prefers-reduced-motion.',
    rules: [
      { term: '--duration-fast (120ms)', description: 'Micro-interactions: hover, focus, small state toggles.' },
      { term: '--duration-base (200ms)', description: 'Everything else: elevation changes, expand/collapse, page transitions.' },
      { term: '--easing', description: 'cubic-bezier(0.4, 0, 0.2, 1) on every animated property — no linear or bounce easing.' },
      { term: 'Reduced motion', description: 'All durations collapse to ~0 automatically under prefers-reduced-motion — never bypass this per-component.' },
    ],
  },
  {
    _id: 'foundation-accessibility',
    _type: 'foundation',
    title: 'Accessibility',
    slug: slug('accessibility'),
    order: 7,
    description:
      'Accessibility is a requirement checked before ship, not a follow-up pass. Every token pair below is measured against the WCAG AA thresholds — 4.5:1 for normal text, 3:1 for large text (18pt+/24px+ regular, or 14pt+/18.7px+ bold).',
    rules: [
      { term: 'Keyboard', description: 'Every interactive element is reachable and operable with Tab, Shift+Tab, Enter, and Space alone — no mouse-only interactions.' },
      { term: 'Focus visibility', description: 'A visible focus ring on every focusable element — never removed with outline: none without an equally visible replacement.' },
      { term: 'Labels', description: 'Every form control and icon-only button has an accessible name (a <label>, aria-label, or equivalent).' },
      { term: 'Colour is never the only signal', description: 'Status is shown with an icon or label in addition to colour — never colour alone (e.g. red text with no icon).' },
      { term: 'Motion', description: 'Every animation respects prefers-reduced-motion (see Foundations → Motion).' },
    ],
  },
  {
    _id: 'foundation-data-formatting',
    _type: 'foundation',
    title: 'Data Formatting',
    slug: slug('data-formatting'),
    order: 8,
    description:
      'Numbers, currency, and dates render the same way everywhere in the product — a user should never see two different date formats on the same screen.',
    rules: [
      { term: 'Currency', description: 'Always 2 decimal places, right-aligned in tables, thousands separator, no currency symbol ambiguity.' },
      { term: 'Dates', description: 'DD MMM YYYY (e.g. 5 Jan 2026) — never DD/MM/YYYY or MM/DD/YYYY, which are ambiguous across locales.' },
      { term: 'Numbers', description: 'Thousands separators on every number over 999, right-aligned in tables.' },
      { term: 'Reference IDs', description: 'Monospace font, never formatted or truncated in a way that loses characters silently.' },
    ],
  },
]

const patterns = [
  {
    _id: 'pattern-auth',
    _type: 'pattern',
    title: 'Authentication',
    slug: slug('auth'),
    order: 1,
    description:
      'Two accepted layouts: split screen (contextual image + form card) and a simple modal, centred on a plain background. Both share the same field and button rules.',
    dos: [
      'Keep the submit button visually muted/disabled until every required field validates.',
      'Put "Remember me" and "Forgot Password?" on the same row.',
      'Use UPPERCASE/small-caps field labels — this is a deliberate auth-only convention, not used elsewhere.',
    ],
    donts: [
      'Enable the submit button before validation, relying on a click-time alert instead.',
      'Use a fullscreen background image without checking overlay contrast against both its darkest and lightest regions.',
    ],
  },
  {
    _id: 'pattern-dashboard',
    _type: 'pattern',
    title: 'Dashboard Layout',
    slug: slug('dashboard'),
    order: 2,
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
  },
  {
    _id: 'pattern-data-tables',
    _type: 'pattern',
    title: 'Data Tables',
    slug: slug('data-tables'),
    order: 3,
    description:
      'The single most-used pattern in any product dashboard. Strict top-to-bottom anatomy: breadcrumb → stat cards → toolbar → table → pagination.',
    dos: [
      'Keep S/N as the first column and ACTIONS as the last, always.',
      'Design and build both the empty and filled state — the state most often skipped and most often shipped broken.',
      'Right-align amounts to 2 decimals; show status as a Badge, never plain text.',
    ],
    donts: [
      'Reorder the anatomy — a reader’s eyes expect stats above the toolbar, the toolbar above the table.',
      'Show table rows and an empty state at the same time — the state is binary.',
    ],
  },
  {
    _id: 'pattern-forms',
    _type: 'pattern',
    title: 'Forms & Validation',
    slug: slug('forms'),
    order: 4,
    description:
      'Max two columns, and only once the form is long enough to need it — a 3-field form is never split into columns just because two-column "looks more designed."',
    dos: [
      'Validate on blur, not on every keystroke.',
      'Show a red border plus a specific caption stating the problem and, where possible, how to fix it.',
      'Keep the primary submit button visually muted/disabled until every required field validates.',
    ],
    donts: [
      'Split a short form into two columns purely for visual balance.',
      'Show a generic "Invalid input" error message.',
      'Rely on a click-time alert instead of inline, per-field validation.',
    ],
  },
  {
    _id: 'pattern-empty-error',
    _type: 'pattern',
    title: 'Empty & Error States',
    slug: slug('empty-error'),
    order: 5,
    description:
      'Empty-state copy follows one formula: "No [Items] Yet" + "When there are [items], they will show here." Two distinct error patterns — field validation and the error modal — are never conflated.',
    dos: [
      'Use the empty-state copy formula everywhere, so it becomes recognisable rather than reinvented per screen.',
      'Reserve the error modal for system/API-level failures, not form validation.',
    ],
    donts: ['Use a warning triangle for an ordinary error modal.', 'Show a field error and a success state on the same field at once.'],
  },
]

const components = [
  // Actions
  {
    _id: 'component-button',
    name: 'Button',
    slug: slug('button'),
    category: 'actions',
    order: 1,
    description: 'The primary way a user takes action. Four variants, three sizes, and a loading state.',
    dos: [
      'Use exactly one primary button per view for the main action.',
      'Keep labels short and verb-first — "Save changes", not "Changes will be saved."',
      'Use the loading state for any action that takes longer than ~300ms.',
    ],
    donts: [
      'Use more than one primary button in the same view.',
      'Disable a button without explaining why nearby.',
      'Use danger styling for anything that isn’t destructive.',
    ],
  },
  {
    _id: 'component-icon-button',
    name: 'Icon Button',
    slug: slug('icon-button'),
    category: 'actions',
    order: 2,
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
  },
  {
    _id: 'component-link',
    name: 'Link',
    slug: slug('link'),
    category: 'actions',
    order: 3,
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
  },
  // Forms
  {
    _id: 'component-text-input',
    name: 'Text Input',
    slug: slug('text-input'),
    category: 'forms',
    order: 1,
    description: 'A single-line text field with a label, optional hint, and error state.',
    dos: [
      'Validate on blur, not on every keystroke.',
      'Write a specific error message and, where possible, how to fix it.',
      'Show the hint by default; replace it with the error only once validation fails.',
    ],
    donts: [
      'Use a generic "Invalid input" error message.',
      'Rely on placeholder text as a substitute for a real label.',
      'Validate before the user has had a chance to finish typing.',
    ],
  },
  {
    _id: 'component-select',
    name: 'Select',
    slug: slug('select'),
    category: 'forms',
    order: 2,
    description: 'A single-choice dropdown, built on the native <select> for full keyboard and screen-reader support.',
    dos: [
      'Order options logically — alphabetical, or by expected frequency of use.',
      'Include a neutral first option ("Select a status") when there is no sensible default.',
      'Keep option labels short enough to read without truncation.',
    ],
    donts: ['Use a Select for fewer than 3 options — Toggle or a radio group reads faster.', 'Pre-select an option the user is likely to miss changing.'],
  },
  {
    _id: 'component-checkbox',
    name: 'Checkbox',
    slug: slug('checkbox'),
    category: 'forms',
    order: 3,
    description: 'A binary or multi-select choice — click the box or the label, both toggle it.',
    dos: [
      'Use for independent choices — several can be selected at once.',
      'Use the indeterminate state for a "select all" checkbox when some but not all rows are selected.',
      'Keep the label clickable — it’s part of the hit target.',
    ],
    donts: ['Use a Checkbox for a single, mutually-exclusive choice — that’s a Toggle or radio group.', 'Leave a checkbox unlabelled.'],
  },
  {
    _id: 'component-toggle',
    name: 'Toggle',
    slug: slug('toggle'),
    category: 'forms',
    order: 4,
    description: 'An on/off switch for a setting that takes effect immediately — no separate save step.',
    dos: [
      'Use for a setting that applies the instant it’s toggled.',
      'Label it with the state it enables, not the action ("Email notifications", not "Toggle emails").',
    ],
    donts: [
      'Use a Toggle when the change needs a separate "Save" action — use Checkbox in a form instead.',
      'Rely on colour alone to communicate on/off — the thumb position already does.',
    ],
  },
  {
    _id: 'component-date-picker',
    name: 'Date Picker',
    slug: slug('date-picker'),
    category: 'forms',
    order: 5,
    description: 'A single date field, built on the native date input so every platform gets its own accessible, localised picker UI for free.',
    dos: [
      'Constrain min/max when a date range is actually invalid (e.g. a birth date can’t be in the future).',
      'Display the chosen date as DD MMM YYYY everywhere else in the product (see Foundations → Data Formatting).',
    ],
    donts: [
      'Build a custom calendar widget unless the native picker genuinely can’t express the interaction (e.g. a date range).',
      'Accept free-text date entry without a picker — format ambiguity causes real data errors.',
    ],
  },
  // Navigation
  {
    _id: 'component-sidebar-nav',
    name: 'Sidebar Nav',
    slug: slug('sidebar-nav'),
    category: 'navigation',
    order: 1,
    description:
      'A vertical navigation list for a product dashboard — light sidebar on a tinted content background (the pattern documented here; this site itself uses the dark-sidebar mode, see Foundations for both).',
    dos: [
      'Give the active item a filled background plus a coloured left border and text — never colour alone.',
      'Keep badge counts to items with genuinely pending work, not decoration.',
      'Group related items under a section label rather than one long flat list.',
    ],
    donts: [
      'Use more than two levels of nesting — if the IA needs a third level, it needs restructuring instead.',
      'Change the active-item treatment between pages of the same product.',
    ],
  },
  {
    _id: 'component-tabs',
    name: 'Tabs',
    slug: slug('tabs'),
    category: 'navigation',
    order: 2,
    description: 'Switches between views that live at the same level of the hierarchy — never a substitute for real navigation.',
    dos: [
      'Use for filtering or switching between different views of the same data (e.g. this very Preview/Code control).',
      'Keep labels to one or two words.',
      'Default to the tab a user is most likely to want first.',
    ],
    donts: [
      'Use tabs to hide a required step in a form — every field should be reachable without hunting.',
      'Put more than 5–6 tabs in one row before it needs an overflow pattern instead.',
    ],
  },
  {
    _id: 'component-breadcrumbs',
    name: 'Breadcrumbs',
    slug: slug('breadcrumbs'),
    category: 'navigation',
    order: 3,
    description: 'Shows where the current page sits in the hierarchy, and lets a user jump back up a level.',
    dos: [
      'Make every item except the last one a real link.',
      'Match the labels to the actual page titles they point to.',
      'Mark the current page with aria-current="page" (built in).',
    ],
    donts: [
      'Use breadcrumbs as the only way to navigate up — pair with the sidebar, don’t replace it.',
      'Show more than 4–5 levels — collapse the middle if the hierarchy runs deeper.',
    ],
  },
  {
    _id: 'component-pagination',
    name: 'Pagination',
    slug: slug('pagination'),
    category: 'navigation',
    order: 4,
    description: 'Sits at the bottom of every data table — the item-count summary on the left, page controls on the right.',
    dos: [
      'Always show the "Showing X–Y of Z items" summary, even when there’s only one page.',
      'Disable Previous on page 1 and Next on the last page, rather than hiding them.',
    ],
    donts: [
      'Use infinite scroll and page numbers in the same table — pick one.',
      'Reset to page 1 silently after a filter change without telling the user why the list moved.',
    ],
  },
  // Data Display
  {
    _id: 'component-table',
    name: 'Table',
    slug: slug('table'),
    category: 'data-display',
    order: 1,
    description:
      'The single most-used pattern in any product dashboard. Reference IDs in monospace, amounts right-aligned with 2 decimals, status as a coloured badge, rows or empty state — never both.',
    dos: [
      'Right-align every numeric/currency column, and give it a monospace or tabular-numeral treatment.',
      'Always design and build the empty state alongside the filled state — never ship one without the other.',
      'Truncate long text with an ellipsis rather than wrapping and breaking row height.',
    ],
    donts: [
      'Render an empty <tbody> with headers still showing — swap to a dedicated empty state instead.',
      'Show status as plain coloured text — use the Badge component.',
      'Left-align currency or numeric columns.',
    ],
  },
  {
    _id: 'component-stat-card',
    name: 'Stat Card',
    slug: slug('stat-card'),
    category: 'data-display',
    order: 2,
    description: 'A single summary metric — used in rows of 3–5 at the top of a dashboard or data table.',
    dos: [
      'Pair each stat with a semantic icon that reinforces what it measures.',
      'Show a trend only when the comparison period is unambiguous (e.g. "vs last 30 days" is stated somewhere nearby).',
    ],
    donts: [
      'Show more than 5 stat cards in one row — group into a second row or a details page instead.',
      'Use a trend arrow without a value next to it.',
    ],
  },
  {
    _id: 'component-badge',
    name: 'Badge',
    slug: slug('badge'),
    category: 'data-display',
    order: 3,
    description: 'A small status label — status is always shown as a coloured badge, never as plain text.',
    dos: [
      'Use the semantic variant that matches the actual status (success for "Active", error for "Failed").',
      'Keep the label to one or two words.',
    ],
    donts: [
      'Invent a sixth colour for a status — map it onto success/warning/error/info/neutral.',
      'Use a badge for something that isn’t a status (that’s a Chip or plain text).',
    ],
  },
  {
    _id: 'component-avatar',
    name: 'Avatar',
    slug: slug('avatar'),
    category: 'data-display',
    order: 4,
    description: 'Represents a person or account — a photo when there is one, initials when there isn’t, a generic icon when there’s neither.',
    dos: [
      'Fall back to initials before falling back to a generic icon — initials are more identifiable at a glance.',
      'Keep sizing consistent within one context (e.g. every row in a table uses the same size).',
    ],
    donts: [
      'Stretch a non-square source image instead of cropping it.',
      'Use an avatar for a non-person entity (a product, a company) — use a logo container instead.',
    ],
  },
  // Feedback
  {
    _id: 'component-alert',
    name: 'Alert',
    slug: slug('alert'),
    category: 'feedback',
    order: 1,
    description: 'An inline, page- or section-level message — stays on the page until dismissed or the condition changes, unlike a Toast.',
    dos: [
      'Use the variant that matches severity, not the one that "looks nicest" for the layout.',
      'Keep the title a short summary; put detail and next steps in the body.',
    ],
    donts: [
      'Use an Alert for a transient confirmation ("Saved!") — that’s a Toast.',
      'Stack more than one Alert in the same view unless each is about a genuinely different thing.',
    ],
  },
  {
    _id: 'component-toast',
    name: 'Toast',
    slug: slug('toast'),
    category: 'feedback',
    order: 2,
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
  },
  {
    _id: 'component-modal',
    name: 'Modal',
    slug: slug('modal'),
    category: 'feedback',
    order: 3,
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
  },
  {
    _id: 'component-tooltip',
    name: 'Tooltip',
    slug: slug('tooltip'),
    category: 'feedback',
    order: 4,
    description: 'A short label revealed on hover or keyboard focus — supplementary context, never the only way to learn what a control does.',
    dos: [
      'Use to clarify an icon-only control (though IconButton’s label already covers the accessible name — Tooltip adds the visual hint).',
      'Keep the label to a few words.',
    ],
    donts: [
      'Put essential instructions only in a tooltip — mouse users on a touch device may never see it.',
      'Use a tooltip on a disabled element without also making it focusable, or the explanation is unreachable by keyboard.',
    ],
  },
  {
    _id: 'component-empty-state',
    name: 'Empty State',
    slug: slug('empty-state'),
    category: 'feedback',
    order: 5,
    description: 'What renders instead of a table, list, or grid when there is nothing to show yet. Every list-shaped component in this system has one.',
    dos: [
      'Use the standard copy formula: "No [Items] Yet" + "When there are [items], they will show here."',
      'Include an action when there’s an obvious next step (e.g. "Add your first product").',
      'Design this state at the same time as the filled state, not after.',
    ],
    donts: [
      'Show a blank white box with no explanation.',
      'Use alarming iconography — an empty state is a normal, expected condition, not an error.',
    ],
  },
  {
    _id: 'component-skeleton',
    name: 'Skeleton',
    slug: slug('skeleton'),
    category: 'feedback',
    order: 6,
    description: 'A loading placeholder shaped like the content that’s about to appear — reduces layout shift and signals progress.',
    dos: [
      'Match the skeleton’s shape and size to the real content it’s standing in for.',
      'Replace it the instant real data arrives — never leave it showing after load.',
    ],
    donts: [
      'Use a spinner and a skeleton for the same loading state — pick one per component.',
      'Use skeletons for anything that loads in under ~200ms — it reads as a flicker, not a signal.',
    ],
  },
  // Layout
  {
    _id: 'component-card',
    name: 'Card',
    slug: slug('card'),
    category: 'layout',
    order: 1,
    description: 'The base surface for grouping related content — every stat card, product card, and settings panel is built on this.',
    dos: [
      'Use the tinted page background around cards to create depth — never a border-only card on a pure white page.',
      'Keep one clear purpose per card.',
    ],
    donts: [
      'Nest a card inside another card — flatten the hierarchy or use a Divider instead.',
      'Add a drop shadow beyond --shadow-1 for a resting card — reserve heavier shadows for elevated/interactive states.',
    ],
  },
  {
    _id: 'component-accordion',
    name: 'Accordion',
    slug: slug('accordion'),
    category: 'layout',
    order: 2,
    description: 'Collapses long, categorised content — used for FAQs, and to group AI Design Guardrail checklists by category.',
    dos: [
      'Open the first section by default so the pattern is discoverable.',
      'Keep each section title short enough to scan without opening it.',
    ],
    donts: [
      'Nest an accordion inside another accordion.',
      'Hide content inside an accordion that a user needs to complete a required task — that belongs inline.',
    ],
  },
  {
    _id: 'component-divider',
    name: 'Divider',
    slug: slug('divider'),
    category: 'layout',
    order: 3,
    description: 'A thin rule separating unrelated content within the same surface.',
    dos: ['Use to separate distinct groups within one Card or section.', 'Use the labelled form for "or" splits, like between two sign-in methods.'],
    donts: ['Use a Divider where spacing alone would already read as a separation.', 'Stack two dividers with nothing between them.'],
  },
].map((doc) => ({
  _id: doc._id,
  _type: 'component',
  status: 'stable',
  ...doc,
}))

const brandPages = [
  {
    _id: 'brandPage-logo',
    _type: 'brandPage',
    title: 'Logo',
    slug: slug('logo'),
    description:
      'The HeadFavour mark is the primary signature of the brand. Use the files provided in Sanity — never recreate, redraw, or approximate the mark.',
    dos: [
      'Maintain clear space around the mark equal to at least the height of the mark itself.',
      'Use the light-background version on white or light surfaces, and the dark-background version on dark surfaces.',
      'Scale the mark proportionally from the provided file.',
    ],
    donts: [
      'Stretch, skew, or otherwise distort the proportions of the mark.',
      'Recolour the mark outside of the approved light/dark pair.',
      'Rotate the mark or place it at an angle.',
      'Add drop shadows, outlines, or other effects.',
    ],
  },
  {
    _id: 'brandPage-colours',
    _type: 'brandPage',
    title: 'Colours',
    slug: slug('colours'),
    description:
      'The colour system is a semantic layer over numeric scales. Product teams reach for the semantic alias below, never a raw scale value.',
    colors: [
      { name: 'Background', hex: '#0A0A0F' },
      { name: 'Primary', hex: '#F7C948' },
      { name: 'Primary Dark', hex: '#E6B830' },
      { name: 'Text', hex: '#F0F0F5' },
      { name: 'Text Secondary', hex: '#9494AC' },
      { name: 'Border', hex: '#1E1E2E' },
      { name: 'Success', hex: '#4ADE80' },
      { name: 'Warning', hex: '#FB923C' },
      { name: 'Error', hex: '#F87171' },
      { name: 'Info', hex: '#9494F5' },
    ],
  },
  {
    _id: 'brandPage-typography',
    _type: 'brandPage',
    title: 'Typography',
    slug: slug('typography'),
    description:
      'A two-font system: a display face for headings, stat values, and the logo wordmark, and a body face for everything else. A monospace face is reserved for reference IDs, hex codes, and code.',
  },
  {
    _id: 'brandPage-voice',
    _type: 'brandPage',
    title: 'Voice & Tone',
    slug: slug('voice'),
    description: 'How I want HeadFavour to sound, whether that’s product copy, an error message or a receipt email.',
    body: [
      block(
        "HeadFavour sounds clear, confident and human. We say what happened and what to do next; we don't hide behind vague copy or over-apologise for a routine state. I strongly believe a product should talk to people the way a good colleague would, not a legal disclaimer."
      ),
      block(
        "Tone still moves with context. A dashboard empty state stays calm and practical. A destructive action's confirmation is direct, no softening. And a success message is brief, not celebratory; the work speaks for itself."
      ),
    ],
    dos: [
      'Say the specific thing that happened, and the specific next step — "Your card was declined" not "Something went wrong."',
      'Write like a knowledgeable, friendly colleague, not a legal disclaimer.',
      'Use active voice and short sentences, especially in errors and empty states.',
      'Match the formality of the moment — a confirmation can be warm, a security warning should be direct.',
    ],
    donts: [
      'Use jargon, internal team names, or acronyms a user has no way of knowing.',
      'Blame the user ("You entered an invalid value") — describe the problem neutrally instead.',
      'Use exclamation marks to manufacture enthusiasm.',
      'Write a generic "Something went wrong" when the real cause is knowable.',
    ],
  },
]

async function seedAll() {
  const groups = [
    ['foundation', foundations],
    ['pattern', patterns],
    ['component', components],
    ['brandPage', brandPages],
  ]
  const total = groups.reduce((sum, [, docs]) => sum + docs.length, 0)
  console.log(`Seeding ${total} documents into ${projectId}/${dataset}...\n`)

  for (const [label, docs] of groups) {
    console.log(`${label}:`)
    for (const doc of docs) {
      await client.createOrReplace(doc)
      console.log(`  ✓ ${doc.title || doc.name}`)
    }
    console.log('')
  }

  console.log('Done. Every field seeded here is editable in Studio — edits there')
  console.log('take effect on the site within 60s (ISR), no redeploy needed.')
}

seedAll().catch((err) => {
  console.error('\nSeed failed:', err.message || err)
  process.exit(1)
})
