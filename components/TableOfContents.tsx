'use client'

import { useState, useEffect, useRef } from 'react'
import { TocItem } from '@/lib/toc'

interface TableOfContentsProps {
  items: TocItem[]
  mobile?: boolean
}

export default function TableOfContents({ items, mobile = false }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (items.length === 0) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the topmost intersecting entry
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-72px 0px -60% 0px', threshold: 0 }
    )

    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observerRef.current?.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [items])

  if (items.length === 0) return null

  const tocList = (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item.id} className={item.level === 3 ? 'pl-3.5' : ''}>
          <a
            href={`#${item.id}`}
            onClick={() => mobile && setMobileOpen(false)}
            className={`block text-[0.8125rem] leading-snug transition-colors duration-150 py-0.5 ${
              item.level === 2
                ? activeId === item.id
                  ? 'text-bce-gold'
                  : 'text-bce-muted hover:text-bce-cream'
                : activeId === item.id
                ? 'text-bce-gold/80'
                : 'text-bce-muted/70 hover:text-bce-muted'
            }`}
          >
            {item.level === 2 && activeId === item.id && (
              <span className="inline-block w-1 h-1 rounded-full bg-bce-gold mr-2 mb-0.5" />
            )}
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  )

  if (mobile) {
    return (
      <div className="xl:hidden border border-bce-border bg-bce-surface mb-10">
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="w-full flex items-center justify-between px-5 py-4 text-left"
          aria-expanded={mobileOpen}
        >
          <span className="text-[0.65rem] tracking-[0.3em] uppercase text-bce-gold">
            On This Page
          </span>
          <svg
            className={`w-4 h-4 text-bce-muted transition-transform ${mobileOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {mobileOpen && <div className="px-5 pb-5">{tocList}</div>}
      </div>
    )
  }

  return (
    <nav aria-label="Table of contents" className="sticky top-28">
      <p className="text-[0.65rem] tracking-[0.3em] uppercase text-bce-gold mb-4">
        On This Page
      </p>
      <div className="border-l border-bce-border pl-4">{tocList}</div>
      <div className="mt-8 pt-6 border-t border-bce-border flex flex-col gap-2.5">
        <a
          href="https://blackcoastestates.com/co-ownership"
          className="text-xs text-bce-gold hover:text-bce-gold-light transition-colors"
        >
          Explore Co-Ownership →
        </a>
        <a
          href="https://blackcoastestates.com/homes"
          className="text-xs text-bce-muted hover:text-bce-cream transition-colors"
        >
          View Our Homes →
        </a>
      </div>
    </nav>
  )
}
