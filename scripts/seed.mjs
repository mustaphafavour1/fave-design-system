#!/usr/bin/env node
// Seeds the `product` documents for the case studies this design system
// showcases — MonieMatch, Stampdx, Idea OS, and Kronikl. Safe to re-run:
// uses createOrReplace against a fixed _id per product, so running this
// again after editing the data below just updates the existing documents
// rather than duplicating them.
//
// Logos and screenshots are intentionally left out — those are real image
// files, not something a script can synthesize from a text spec. Add them
// by hand in Sanity Studio after seeding; every other field can be edited
// there too once it exists.
//
// Usage:
//   SANITY_API_TOKEN=your_token node scripts/seed.mjs
// (or: npm run seed)
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
      '  SANITY_API_TOKEN=your_token node scripts/seed.mjs',
    ].join('\n')
  )
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', token, useCdn: false })

const products = [
  {
    _id: 'product-moniematch',
    _type: 'product',
    name: 'MonieMatch',
    slug: { _type: 'slug', current: 'moniematch' },
    tagline: 'Back the shop on your street.',
    category: 'Fintech / Investment Platform',
    type: 'Consumer Mobile',
    status: 'Live',
    liveUrl: 'https://www.moniematch.com',
    description:
      'MonieMatch connects mini-investors with local businesses and provides the infrastructure to make those investments work.',
    positioning:
      'Two user types: mini-investors — everyday people with idle funds, not institutional — and business owners — small Nigerian businesses (bakeries, fashion designers, barbers, photographers) raising structured investment.',
    techStack: [
      { layer: 'Framework', technology: 'Next.js 14 (App Router)' },
      { layer: 'Language', technology: 'TypeScript' },
      { layer: 'Styling', technology: 'Tailwind + CSS custom properties' },
      { layer: 'Auth + DB', technology: 'Supabase (Postgres + RLS + Auth + Realtime)' },
      { layer: 'Storage', technology: 'Supabase Storage (4 buckets)' },
      { layer: 'Icons', technology: 'lucide-react' },
      { layer: 'Animation', technology: 'Framer Motion (landing)' },
      { layer: 'Deployment', technology: 'Vercel' },
    ],
    typography: [
      { role: 'Landing — Body/UI', font: 'Host Grotesk', notes: 'Weights 400–700' },
      {
        role: 'App — Display',
        font: 'Fraunces',
        notes: 'Weights 400–700, italic support — headlines, match scores, Naira amounts',
      },
      { role: 'App — Body', font: 'Nunito', notes: 'Weights 400–900 — body copy, labels, buttons' },
    ],
    highlights: [
      "Dual brand token system — distinct landing-page and in-app palettes/fonts that never appear on the same screen",
      'Fraunces italic used purposefully for emotional emphasis — match taglines, hero copy, Naira amounts',
      "Match score displayed 0–99, never 100 — a deliberate acknowledgment that a perfect match doesn't exist",
      'Star trust-level system (Starter→Elite / Explorer→Elite) gating investment limits from ₦250k to ₦15M+',
      'Desktop phone frame — the app renders inside a 390×844px frame on desktop rather than stretching full width',
      'Forest (investor) vs Clay (business) as consistent role-colour signals across buttons, tabs, and progress rings',
    ],
    colors: [
      { name: 'Gold', hex: '#948661', role: 'Landing primary' },
      { name: 'Amber', hex: '#E5A04A', role: 'Landing CTA accent' },
      { name: 'Terracotta / Clay', hex: '#B45A3C', role: 'Shared accent — landing tertiary, app-wide' },
      { name: 'Forest', hex: '#2D5D3F', role: 'App investor-side primary' },
      { name: 'Cream', hex: '#F7F1E8', role: 'Background' },
      { name: 'Ink', hex: '#1c1813', role: 'Primary text / dark surface' },
      { name: 'Bone', hex: '#F4EDE3', role: 'App card & input surface' },
      { name: 'Snow', hex: '#fafaf8', role: 'Landing elevated surface' },
    ],
    features: [
      {
        icon: 'ChartBar',
        title: 'Match Score & Compatibility',
        description: 'A 0–99 compatibility gauge (MatchDial) pairs investors with businesses — never 100, by design.',
      },
      {
        icon: 'ShieldCheck',
        title: 'Star Trust Levels',
        description:
          'A five-tier trust system for both investors and businesses, gating investment limits from ₦250k to ₦15M+.',
      },
      {
        icon: 'Wallet',
        title: 'Portfolio Tracking',
        description: 'Deployed totals, position cards, and an updates feed for every active investment.',
      },
      {
        icon: 'ChatCircle',
        title: 'Realtime Chat',
        description: 'Per-match messaging over Supabase Realtime between investors and business owners.',
      },
      {
        icon: 'DeviceMobile',
        title: 'Voice-to-Text Reporting',
        description: 'A four-stage flow lets business owners file monthly revenue reports by voice.',
      },
    ],
    showOnSite: true,
    order: 1,
  },
  {
    _id: 'product-stampdx',
    _type: 'product',
    name: 'Stampdx',
    slug: { _type: 'slug', current: 'stampdx' },
    tagline: 'Branded Moments for Every Event',
    category: 'Event Tech / B2B2C',
    type: 'B2B2C Platform',
    status: 'Live',
    liveUrl: 'https://events.headfavour.com',
    description:
      'Stampdx lets event organizers create branded photo templates that every attendee can personalize and share in seconds.',
    positioning:
      'B2B2C — organizers (the paying customer) design once; attendees (the free, anonymous end user) are the ones who actually use and distribute the output. "One becomes many": a single master design multiplies into a cluster of unique, personalized, shareable outputs.',
    techStack: [
      { layer: 'Framework', technology: 'Next.js 14 (App Router), React 18, TypeScript' },
      { layer: 'Styling', technology: 'Tailwind CSS' },
      { layer: 'Backend', technology: 'Supabase (Postgres + Auth + Storage)' },
      { layer: 'Motion', technology: 'Framer Motion' },
      {
        layer: 'Canvas / export',
        technology: 'Fabric.js + html2canvas (client-side photos), Shotstack API (server-rendered video)',
      },
      { layer: 'Icons', technology: 'lucide-react' },
      { layer: 'Payments', technology: 'Paystack (NGN) + Freemius (USD)' },
    ],
    typography: [
      { role: 'Display', font: 'Bricolage Grotesque', notes: 'Weights 500–800 — headings, wordmark' },
      { role: 'Body', font: 'Plus Jakarta Sans', notes: 'Weights 300–800 — UI text, paragraphs' },
      {
        role: 'Video export',
        font: 'Montserrat',
        notes: "Matches Shotstack's renderer default so the editor preview matches the exported video exactly",
      },
    ],
    highlights: [
      'StampWord — a single keyword per headline gets "stamped" into a rotated gold badge with an overshoot animation, used consistently across every section',
      '"One becomes many" hero — a central master design connects to six satellite cards via self-drawing SVG lines, a literal animated diagram of the product\'s thesis',
      'Auto-cycling phone mockup — cycles through Photo/Video/Remix modes every ~2.6s with an Instagram-Stories-style progress-dot indicator',
      "Giant near-invisible watermark wordmark bleeding off the footer's bottom edge, at 3% opacity",
      'Film grain + ambient gold/blue glows instead of dot-grid patterns — deliberately avoided in favour of softer atmospheric texture',
    ],
    colors: [
      { name: 'Navy', hex: '#0A0E1B', role: 'Primary background' },
      { name: 'Navy Deep', hex: '#05070E', role: 'Recessed panels' },
      { name: 'Navy Mid', hex: '#111830', role: 'Cards, modals, inputs' },
      { name: 'Navy Light', hex: '#1B2547', role: 'Borders, dividers' },
      { name: 'Navy Bright', hex: '#3B5FE0', role: 'Secondary accent, used sparingly' },
      { name: 'Cream', hex: '#F0EBD8', role: 'Primary text' },
      { name: 'Olive', hex: '#9AA6C4', role: 'Secondary text' },
      { name: 'Danfo', hex: '#F5C518', role: 'Primary brand accent — every CTA, active state, highlight' },
    ],
    features: [
      {
        icon: 'Lightning',
        title: 'No Account Needed',
        description: 'Attendees personalize and export a branded photo or video with one link — no signup, no app install.',
      },
      {
        icon: 'DeviceMobile',
        title: 'In-Browser Export',
        description: 'Photo exports are composited entirely client-side with Fabric.js and html2canvas — no server upload required.',
      },
      {
        icon: 'Sparkle',
        title: 'Branded Video Templates',
        description: 'Organizers can offer video as well as photo templates, rendered server-side via the Shotstack API.',
      },
      {
        icon: 'ChartBar',
        title: 'Organizer Dashboard',
        description: 'Campaign management, analytics, billing, and a template editor for the paying customer.',
      },
      {
        icon: 'Globe',
        title: 'Live Public Demo',
        description: 'An /explore route showcases real, live public events without requiring a login.',
      },
    ],
    showOnSite: true,
    order: 2,
  },
  {
    _id: 'product-idea-os',
    _type: 'product',
    name: 'Idea OS',
    slug: { _type: 'slug', current: 'idea-os' },
    tagline: 'Turn your AI conversation history into a graded, trackable idea pipeline.',
    category: 'Productivity / AI Analytics',
    type: 'SaaS Dashboard',
    status: 'Live',
    description:
      'A personal idea-intelligence dashboard for AI-native builders. Exports of Claude/ChatGPT conversation history are synced in; an LLM reads the raw transcripts and extracts distinct ideas, grading, classifying, and surfacing what to do next.',
    positioning:
      'Nigerian/Lagos builder-culture inspired — dashboards over marketing fluff, dense data-forward UI over big soft illustrations. Freemium: a public no-signup demo, a free bring-your-own-API-key tier, and two paid tiers across NGN and USD gateways.',
    techStack: [
      { layer: 'Framework', technology: 'Next.js (App Router, TypeScript)' },
      { layer: 'Styling', technology: 'Tailwind CSS v4' },
      { layer: 'Motion', technology: 'Framer Motion' },
      { layer: 'Backend', technology: 'Supabase (Postgres + Auth)' },
      { layer: 'AI', technology: 'Claude API (Haiku for frequent calls, Sonnet for extraction)' },
      { layer: 'Charts', technology: 'Recharts' },
      { layer: 'Icons', technology: 'Phosphor Icons' },
      { layer: 'Deployment', technology: 'Vercel' },
    ],
    typography: [
      { role: 'Sans (body/UI)', font: 'Geist Sans', notes: '' },
      { role: 'Mono (data/labels)', font: 'Geist Mono', notes: 'JetBrains Mono available as an alternate' },
      {
        role: 'Display (optional, user-selectable)',
        font: 'Rancho / Edu SA Beginner',
        notes: 'Applied only to headings via a class on <html>',
      },
    ],
    highlights: [
      'User-owned theming — accent colour and font are runtime-swappable CSS custom properties written to localStorage, not a hardcoded brand lock',
      "Grounded AI, not generic AI — General Insights and the AI Personality features are engineered to only state things derivable from the user's real numbers, enforced at the system-prompt level",
      'AI Personality/Temperament archetypes (Builder/Researcher/Explorer/Founder/Creator × Strategos/Kairos/Poietes/Sophron) scored from real usage, returning "Unknown" rather than a fake result when there isn\'t enough data',
      'Live public demo mirrors the entire authenticated product 1:1 with seeded data and every mutating action safely disabled',
      'Uppercase mono micro-labels with wide tracking on every section/field label — the one recurring rule that makes the UI read as a system',
    ],
    colors: [
      { name: 'Background', hex: '#0A0A0F', role: 'Page background' },
      { name: 'Surface', hex: '#111118', role: 'Cards, panels' },
      { name: 'Border', hex: '#1E1E2E', role: 'Card / panel borders' },
      { name: 'Accent', hex: '#F7C948', role: 'Danfo yellow — CTAs, active states, highlights' },
      { name: 'Text Primary', hex: '#F0F0F5', role: 'Headings, primary content' },
      { name: 'Text Secondary', hex: '#8888A0', role: 'Body / secondary text' },
      { name: 'Success', hex: '#4ADE80', role: 'Positive states, high grades' },
      { name: 'Secondary Accent', hex: '#7A7AF0', role: 'Violet — used sparingly as a second brand colour' },
    ],
    features: [
      {
        icon: 'Lightning',
        title: 'AI-Powered Idea Extraction',
        description: 'Sync a Claude/ChatGPT export and an LLM extracts distinct ideas, grades them on 5 axes, and suggests next steps.',
      },
      {
        icon: 'ChartLine',
        title: 'Portfolio Analytics',
        description: 'Time-range-filterable charts across ideas, grades, sectors, and conversation volume, with auto-generated text insights.',
      },
      {
        icon: 'Sparkle',
        title: 'General Insights',
        description: 'AI-synthesized narrative observations across the whole portfolio, grounded only in real computed stats.',
      },
      {
        icon: 'Users',
        title: 'Connected Ideas',
        description: 'Pairwise similarity scoring surfaces related ideas as a browsable graph with a recommendations modal.',
      },
      {
        icon: 'ChartBar',
        title: 'AI Builder Profile',
        description:
          'A downloadable, shareable profile — productivity score, an AI Personality archetype, and an AI Temperament archetype, computed entirely from the user\'s own data.',
      },
    ],
    showOnSite: true,
    order: 3,
  },
  {
    _id: 'product-kronikl',
    _type: 'product',
    name: 'Kronikl',
    slug: { _type: 'slug', current: 'kronikl' },
    tagline: 'Turn your photos into beautiful magazines',
    category: 'Creative Tools / Publishing',
    type: 'Consumer Web',
    status: 'Beta',
    description:
      'A premium, editorial-grade magazine maker. Pick a professionally art-directed template (or generate one with AI), drop in photos, and export a high-resolution, print-ready PDF in minutes.',
    positioning:
      "A premium, editorial-grade magazine maker built around the metaphor of a photo composing itself into a finished magazine cover. UI-complete; auth and backend wiring are still in progress.",
    techStack: [
      { layer: 'Framework', technology: 'Next.js 14 (App Router)' },
      { layer: 'Language', technology: 'TypeScript' },
      { layer: 'Styling', technology: 'Tailwind CSS 3' },
      { layer: 'Motion', technology: 'Framer Motion' },
      { layer: 'Icons', technology: 'lucide-react' },
      { layer: 'Fonts', technology: 'next/font/google' },
    ],
    typography: [
      {
        role: 'Display / headings / UI labels',
        font: 'Syne',
        notes: 'Weights 400–800, custom numeric weight scale (font-600/700/800) added to Tailwind',
      },
      { role: 'Body', font: 'Inter', notes: 'Weights 400–600' },
    ],
    highlights: [
      'MagazineCover — a reusable component rendering a realistic cover (masthead, cover line, category tab, barcode) from data, reused across hero, catalogue, generator, and studio; scales via CSS container query units (cqw) with zero breakpoints',
      'The "marker" headline accent — one accent word per heading rendered in yellow with a scroll-triggered animated underline sweep, used consistently everywhere',
      'Deliberately reduced 12px root font size for a denser, more "printed editorial" feel than a typical web app',
      'Grain / paper texture overlay — a fixed SVG turbulence filter at 3.5% opacity, mix-blend-overlay, for a printed rather than flat-digital feel',
      'AI template generation — a prompt + style-selector flow produces a chosen cover plus 4 AI-drafted cover-line options',
    ],
    colors: [
      { name: 'Navy', hex: '#080B16', role: 'Page base / body background' },
      { name: 'Navy 2', hex: '#0E1323', role: 'Raised surface' },
      { name: 'Navy 3', hex: '#141B30', role: 'Lifted / hover surface' },
      { name: 'Ink', hex: '#F5F0E6', role: 'Primary text — warm cream' },
      { name: 'Muted', hex: '#969EB2', role: 'Secondary text' },
      { name: 'Yellow', hex: '#F7B500', role: 'Primary brand colour — danfo yellow' },
      { name: 'Yellow Bright', hex: '#FFC933', role: 'Hover / highlight state' },
    ],
    features: [
      {
        icon: 'Sparkle',
        title: 'Generate with AI',
        description: 'A prompt and style-selector flow drafts a cover layout plus four AI-written cover-line options.',
      },
      {
        icon: 'DeviceMobile',
        title: '30+ Curated Templates',
        description: 'Professionally art-directed templates across Fashion, Culture, Food, Travel, Beauty, and more.',
      },
      {
        icon: 'Rocket',
        title: 'Print-Ready in Minutes',
        description: 'Export a high-resolution, 300 DPI, print-ready PDF straight from the browser.',
      },
      {
        icon: 'ChartBar',
        title: 'Bulk Photo & Text Editing',
        description: 'Upload and edit photos and cover text across an entire issue at once.',
      },
    ],
    showOnSite: true,
    order: 4,
  },
]

async function seed() {
  console.log(`Seeding ${products.length} products into ${projectId}/${dataset}...\n`)
  for (const doc of products) {
    await client.createOrReplace(doc)
    console.log(`  ✓ ${doc.name}`)
  }
  console.log(`\nDone. Logos and screenshots weren't included — add those in Studio for each product.`)
}

seed().catch((err) => {
  console.error('\nSeed failed:', err.message || err)
  process.exit(1)
})
