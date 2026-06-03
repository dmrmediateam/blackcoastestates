const trustPoints = [
  'Co-ownership from $100K — own 1/8 of a luxury home',
  'Turnkey properties managed for short-term rental income',
  'Beachside community in one of Costa Rica\'s top surf towns',
  'Dedicated team guides you from inquiry to keys in hand',
]

export default function NewsletterCTA() {
  return (
    <section className="dark border-t border-bce-border py-24 bg-bce-surface">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: copy */}
          <div>
            <span className="text-[0.65rem] tracking-[0.35em] uppercase text-bce-gold mb-4 block">
              Playa Negra · Guanacaste · Costa Rica
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl font-light text-bce-cream tracking-wide mb-6 leading-tight">
              Ready to Own<br />in Paradise?
            </h2>
            <p className="text-bce-muted leading-relaxed mb-8">
              Black Coast Estates offers co-ownership and full ownership in Playa Negra —
              Costa Rica&apos;s most sought-after surf and luxury destination. Our team
              handles everything from legal due diligence to property management.
            </p>
            <ul className="space-y-3 mb-0">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-bce-muted">
                  <span className="text-bce-gold mt-0.5 shrink-0" aria-hidden="true">✓</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: CTAs */}
          <div className="flex flex-col gap-4 lg:pl-8 lg:border-l lg:border-bce-border">
            <p className="text-sm text-bce-muted mb-2">Choose how you want to get started:</p>

            <a
              href="https://blackcoastestates.com/co-ownership"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between px-6 py-5 bg-bce-gold hover:bg-bce-gold-light transition-colors"
            >
              <div>
                <p className="text-[0.7rem] tracking-[0.2em] uppercase text-bce-black/70 mb-1">
                  Most Popular
                </p>
                <p className="text-sm font-medium text-bce-black">
                  Explore Co-Ownership →
                </p>
              </div>
              <span className="font-serif text-2xl text-bce-black/30 font-light group-hover:text-bce-black/50 transition-colors">
                1/8
              </span>
            </a>

            <a
              href="https://blackcoastestates.com/homes"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-6 py-5 border border-bce-border hover:border-bce-gold/60 hover:bg-bce-black transition-colors"
            >
              <div>
                <p className="text-[0.7rem] tracking-[0.2em] uppercase text-bce-muted mb-1">
                  Full Ownership
                </p>
                <p className="text-sm font-medium text-bce-cream">
                  Browse Available Homes →
                </p>
              </div>
            </a>

            <a
              href="https://blackcoastestates.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-6 py-5 border border-bce-border hover:border-bce-gold/60 hover:bg-bce-black transition-colors"
            >
              <div>
                <p className="text-[0.7rem] tracking-[0.2em] uppercase text-bce-muted mb-1">
                  Not sure yet?
                </p>
                <p className="text-sm font-medium text-bce-cream">
                  Speak with Our Team →
                </p>
              </div>
            </a>

            <p className="text-xs text-bce-muted/70 text-center mt-1">
              No obligation · Based in Playa Negra · Reply within 24 hours
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

