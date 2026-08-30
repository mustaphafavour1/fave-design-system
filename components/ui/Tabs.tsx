'use client'

import { useState, type ReactNode } from 'react'
import clsx from 'clsx'

export interface TabItem {
  label: string
  content: ReactNode
}

export function Tabs({ tabs, defaultTab }: { tabs: TabItem[]; defaultTab?: string }) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.label)
  const activeTab = tabs.find((t) => t.label === active) ?? tabs[0]

  return (
    <div className="ui-tabs">
      <div className="ui-tabs-list" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            type="button"
            role="tab"
            aria-selected={active === tab.label}
            className={clsx('ui-tabs-tab', active === tab.label && 'active')}
            onClick={() => setActive(tab.label)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="ui-tabs-panel" role="tabpanel">
        {activeTab?.content}
      </div>
    </div>
  )
}
