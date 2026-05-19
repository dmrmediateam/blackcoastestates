'use client'

import { useState } from 'react'
import Link from 'next/link'

const navLinks = [
  { label: 'Co-Ownership', href: 'https://blackcoastestates.com/co-ownership' },
  { label: 'Full Ownership', href: 'https://blackcoastestates.com/full-ownership' },
  { label: 'Our Homes', href: 'https://blackcoastestates.com/homes' },
  { label: 'Community', href: 'https://blackcoastestates.com/community' },
  { label: 'About', href: 'https://blackcoastestates.com/about-us' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bce-black/95 backdrop-blur-md border-b border-bce-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-4 shrink-0 group">
          <div className="flex flex-col items-start leading-none">
            <span className="font-serif text-base tracking-[0.25em] uppercase text-bce-cream group-hover:text-white transition-colors">
              Black Coast Estates
            </span>
            <span className="text-[0.55rem] tracking-[0.45em] uppercase text-bce-gold font-sans mt-0.5">
              Journal
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.8125rem] text-bce-muted hover:text-bce-cream transition-colors tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="https://blackcoastestates.com"
          className="hidden lg:inline-flex items-center gap-2 text-[0.8125rem] font-medium text-bce-black bg-bce-gold px-5 py-2 hover:bg-bce-gold-light transition-colors tracking-wide shrink-0"
        >
          View Properties <span aria-hidden="true">→</span>
        </a>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-bce-cream p-1"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-bce-border bg-bce-surface">
          <nav className="max-w-7xl mx-auto px-6 py-5 flex flex-col gap-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-bce-muted hover:text-bce-cream transition-colors tracking-wide py-2.5 border-b border-bce-border last:border-0"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://blackcoastestates.com"
              className="mt-4 text-sm font-medium text-bce-black bg-bce-gold px-6 py-3 text-center tracking-wide hover:bg-bce-gold-light transition-colors"
            >
              View Properties →
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
