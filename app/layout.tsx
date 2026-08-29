import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'
import { Sidebar } from '@/components/layout/Sidebar'
import { TopBar } from '@/components/layout/TopBar'

export const metadata: Metadata = {
  title: 'Fave Design System',
  description:
    'Brand, foundations, components, patterns, and products — the single source of truth for Fave.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <Sidebar />
          <div className="content-area">
            <TopBar />
            <main className="page-content">{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}
