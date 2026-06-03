import Link from 'next/link'
import Image from 'next/image'

const footerLinks = [
  { label: 'Co-Ownership', href: 'https://blackcoastestates.com/co-ownership' },
  { label: 'Full Ownership', href: 'https://blackcoastestates.com/full-ownership' },
  { label: 'Our Homes', href: 'https://blackcoastestates.com/homes' },
  { label: 'Community', href: 'https://blackcoastestates.com/community' },
  { label: 'About Us', href: 'https://blackcoastestates.com/about-us' },
  { label: 'Journal', href: '/' },
]

export default function Footer() {
  return (
    <footer className="dark border-t border-bce-border bg-bce-surface mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link
              href="https://blackcoastestates.com"
              className="inline-block mb-5 opacity-80 hover:opacity-100 transition-opacity"
            >
              <Image
                src="/logo.svg"
                alt="Black Coast Estates"
                width={180}
                height={45}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm text-bce-muted leading-relaxed max-w-xs">
              Luxury vacation homes in Playa Negra, Guanacaste, Costa Rica. Co-ownership
              and full ownership with full management.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-[0.65rem] tracking-[0.35em] uppercase text-bce-gold mb-5">
              Navigate
            </h3>
            <nav className="flex flex-col gap-3" aria-label="Footer navigation">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-bce-muted hover:text-bce-cream transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[0.65rem] tracking-[0.35em] uppercase text-bce-gold mb-5">
              Contact
            </h3>
            <address className="not-italic flex flex-col gap-2.5 text-sm text-bce-muted">
              <p>Playa Negra, Guanacaste</p>
              <p>Costa Rica</p>
              <a
                href="tel:+14355130074"
                className="hover:text-bce-cream transition-colors"
              >
                +1 435 513 0074
              </a>
              <a
                href="mailto:info@blackcoastestates.com"
                className="hover:text-bce-cream transition-colors"
              >
                info@blackcoastestates.com
              </a>
              <a
                href="https://wa.me/13852513802?text=Hi!%20I%E2%80%99d%20love%20to%20learn%20more%20about%20your%20properties."
                target="_blank"
                rel="noopener noreferrer"
                className="text-bce-gold hover:text-bce-gold-light transition-colors mt-1"
              >
                WhatsApp Us →
              </a>
            </address>
          </div>
        </div>

        <div className="border-t border-bce-border pt-7 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-bce-muted">
            © 2026 Black Coast Estates. All Rights Reserved.
          </p>
          <a
            href="https://blackcoastestates.com/legal/terms-and-conditions"
            className="text-xs text-bce-muted hover:text-bce-cream transition-colors"
          >
            Terms &amp; Conditions
          </a>
        </div>
      </div>
    </footer>
  )
}
