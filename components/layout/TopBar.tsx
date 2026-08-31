'use client'

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr'
import type { SearchItem } from '@/lib/search-index'

function toTitleCase(segment: string) {
  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function formatDateTime(date: Date) {
  const datePart = date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })
  const timePart = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  return `${datePart} · ${timePart}`
}

export function TopBar({ searchIndex }: { searchIndex: SearchItem[] }) {
  const pathname = usePathname()
  const router = useRouter()
  const segments = pathname.split('/').filter(Boolean)
  const crumbs = segments.length > 0 ? segments.map(toTitleCase) : ['Overview']

  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(id)
  }, [])

  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const searchRef = useRef<HTMLDivElement>(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return searchIndex.filter((item) => item.title.toLowerCase().includes(q)).slice(0, 8)
  }, [query, searchIndex])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  // Route changed (a result was picked, or the user navigated some other
  // way) — the dropdown shouldn't still be showing the old query after.
  useEffect(() => {
    setIsOpen(false)
    setQuery('')
  }, [pathname])

  useEffect(() => {
    // Listen on 'click', not 'mousedown' — mousedown fires before a click
    // on a result link finishes, so closing here first would unmount the
    // link out from under its own click and silently swallow navigation.
    function handleOutsideClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [])

  function goTo(href: string) {
    setIsOpen(false)
    router.push(href)
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') {
      setIsOpen(false)
      e.currentTarget.blur()
      return
    }
    if (results.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => (i + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => (i - 1 + results.length) % results.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const result = results[activeIndex]
      if (result) goTo(result.href)
    }
  }

  return (
    <div className="topbar">
      <div className="breadcrumb">
        {crumbs.map((crumb, index) => (
          <span key={crumb + index} className={index === crumbs.length - 1 ? 'breadcrumb-current' : undefined}>
            {index > 0 ? ' / ' : ''}
            {crumb}
          </span>
        ))}
      </div>

      <div className="topbar-search" ref={searchRef}>
        <label className="topbar-search-field">
          <MagnifyingGlass size={15} />
          <input
            type="search"
            placeholder="Search the design system"
            aria-label="Search the design system"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setIsOpen(true)
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
          />
        </label>

        {isOpen && query.trim() ? (
          <div className="topbar-search-results">
            {results.length === 0 ? (
              <div className="topbar-search-empty">No matches for &quot;{query.trim()}&quot;</div>
            ) : (
              results.map((result, index) => (
                <Link
                  key={result.href}
                  href={result.href}
                  className={`topbar-search-result${index === activeIndex ? ' is-active' : ''}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="topbar-search-result-title">{result.title}</span>
                  <span className="topbar-search-result-section">{result.section}</span>
                </Link>
              ))
            )}
          </div>
        ) : null}
      </div>

      <span className="topbar-datetime">{now ? formatDateTime(now) : ' '}</span>
    </div>
  )
}
