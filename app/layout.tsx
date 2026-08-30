import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Parkinsans } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/layout/Sidebar'
import { TopBar } from '@/components/layout/TopBar'

const parkinsans = Parkinsans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-parkinsans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'HeadFavour',
  description:
    'Brand, foundations, components, patterns, and products — the single source of truth for HeadFavour.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={parkinsans.variable}>
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
