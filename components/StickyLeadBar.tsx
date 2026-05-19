'use client'

import { useState, useEffect } from 'react'

const categoryConfig: Record<string, { cta: string; href: string; sub: string }> = {
  'Co-Ownership': {
    cta: 'Explore Co-Ownership',
    href: 'https://blackcoastestates.com/co-ownership',
    sub: 'From $100K · fractional ownership in Playa Negra',
  },
  'Investment': {
    cta: 'View Investment Properties',
    href: 'https://blackcoastestates.com/homes',
    sub: 'Turnkey vacation homes with managed rental income',
  },
  'Market': {
    cta: 'View Available Properties',
    href: 'https://blackcoastestates.com/homes',
    sub: 'Homes starting at $100K in Guanacaste',
  },
  'Buying Guide': {
    cta: 'Speak with an Advisor',
    href: 'https://blackcoastestates.com/contact',
    sub: 'We guide you through the entire process',
  },
  'Location': {
    cta: 'See Our Homes in Playa Negra',
    href: 'https://blackcoastestates.com/homes',
    sub: 'Luxury properties steps from the surf',
  },
}

const defaultConfig = {
  cta: 'View Our Properties',
  href: 'https://blackcoastestates.com/homes',
  sub: 'Co-ownership & full ownership in Playa Negra',
}

interface StickyLeadBarProps {
  category?: string
}

export default function StickyLeadBar({ category }: StickyLeadBarProps) {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight)
      if (scrolled > 0.35) setVisible(true)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible || dismissed) return null

  const config = (category && categoryConfig[category]) || defaultConfig

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-bce-surface/98 backdrop-blur-md border-t border-bce-border shadow-[0_-8px_32px_rgba(0,0,0,0.5)] transition-all duration-300"
      role="complementary"
      aria-label="Property inquiry"
    >
      <div className="max-w-7xl mx-auto px-5 py-3.5 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm text-bce-cream font-medium leading-tight truncate">
            Interested in owning in Playa Negra?
          </p>
          <p className="text-xs text-bce-muted mt-0.5 hidden sm:block truncate">
            {config.sub}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={config.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.75rem] font-medium text-bce-black bg-bce-gold px-5 py-2.5 hover:bg-bce-gold-light transition-colors whitespace-nowrap tracking-wide"
          >
            {config.cta} →
          </a>
          <button
            onClick={() => setDismissed(true)}
            className="p-2 text-bce-muted hover:text-bce-cream transition-colors"
            aria-label="Dismiss"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
