import { Metadata } from 'next'
import { getAllPosts, getAllCategories } from '@/lib/posts'
import { generateOrganizationSchema, generateBlogSchema } from '@/lib/schema'
import BlogCard from '@/components/BlogCard'
import CategoryFilter from '@/components/CategoryFilter'
import NewsletterCTA from '@/components/NewsletterCTA'

export const metadata: Metadata = {
  title: 'Journal — Insights on Luxury Real Estate in Costa Rica',
  description:
    'Expert guides on buying property in Costa Rica, co-ownership strategies, investment returns, and the lifestyle of Playa Negra.',
  alternates: {
    canonical: 'https://blog.blackcoastestates.com',
  },
}

interface PageProps {
  searchParams: { category?: string }
}

export default function HomePage({ searchParams }: PageProps) {
  const allPosts = getAllPosts()
  const categories = getAllCategories()
  const activeCategory = searchParams.category

  const filtered = activeCategory
    ? allPosts.filter((p) => p.category === activeCategory)
    : allPosts

  const [featured, ...rest] = filtered
  const schemas = [generateOrganizationSchema(), generateBlogSchema()]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      {/* ── HERO ── */}
      {!activeCategory && (
        <section className="relative min-h-[90vh] flex flex-col justify-end overflow-hidden">
          {/* Background video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-bce-black via-bce-black/45 to-bce-black/25" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-r from-bce-black/50 via-transparent to-transparent" aria-hidden="true" />

          {/* Hero content */}
          <div className="relative max-w-7xl mx-auto px-6 w-full pb-20 lg:pb-28 pt-40">
            <p className="text-[0.65rem] tracking-[0.5em] uppercase text-bce-gold mb-8 font-sans">
              Playa Negra · Guanacaste · Costa Rica
            </p>
            <h1 className="font-serif text-[5rem] sm:text-[7rem] lg:text-[10rem] italic font-normal text-bce-cream leading-[0.88] tracking-tight mb-10 max-w-4xl">
              The<br />Journal
            </h1>
            <p className="text-bce-cream/60 text-lg max-w-md leading-relaxed mb-12 font-sans">
              Insights on luxury real estate, co-ownership, and life in Playa Negra —
              written for buyers who want real information.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#articles"
                className="inline-flex items-center gap-2 text-sm font-sans font-medium tracking-widest uppercase text-bce-black bg-bce-gold px-8 py-4 hover:bg-bce-gold-light transition-colors"
              >
                Browse Articles
              </a>
              <a
                href="https://blackcoastestates.com"
                className="inline-flex items-center gap-2 text-sm font-sans font-medium tracking-wide text-bce-cream/80 border border-bce-cream/25 hover:border-bce-cream/60 hover:text-bce-cream px-8 py-4 transition-colors"
              >
                View Properties →
              </a>
            </div>
          </div>

          {/* Scroll line */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30" aria-hidden="true">
            <div className="w-px h-14 bg-gradient-to-b from-transparent to-bce-cream" />
          </div>
        </section>
      )}

      {/* ── CATEGORY HEADER (when filtering) ── */}
      {activeCategory && (
        <section className="pt-40 pb-14 border-b border-bce-border">
          <div className="max-w-7xl mx-auto px-6">
            <span className="text-[0.65rem] tracking-[0.5em] uppercase text-bce-gold mb-5 block font-sans">
              Topic
            </span>
            <h1 className="font-serif text-6xl lg:text-8xl italic font-normal text-bce-cream leading-none mb-4">
              {activeCategory}
            </h1>
            <p className="text-bce-muted mt-4 font-sans">
              {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
            </p>
          </div>
        </section>
      )}

      {/* ── STICKY FILTER BAR ── */}
      <div id="articles">
        <section className="py-5 border-b border-bce-border sticky top-16 z-40 bg-bce-black/98 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
            <CategoryFilter categories={categories} activeCategory={activeCategory} />
            <span className="text-[0.65rem] tracking-[0.2em] text-bce-muted shrink-0 hidden sm:block uppercase font-sans">
              {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
            </span>
          </div>
        </section>
      </div>

      {/* ── FEATURED POST ── */}
      {featured && (
        <section className="pt-16 pb-6">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-[0.6rem] tracking-[0.4em] uppercase text-bce-muted mb-6 font-sans">
              {activeCategory ? 'Top Story' : 'Latest'}
            </p>
            <BlogCard post={featured} featured />
          </div>
        </section>
      )}

      {/* ── POST GRID ── */}
      {rest.length > 0 && (
        <section className="pt-6 pb-20">
          <div className="max-w-7xl mx-auto px-6">
            {/* Divider with label */}
            <div className="flex items-center gap-6 mb-10 pt-4 border-t border-bce-border">
              <span className="text-[0.6rem] tracking-[0.4em] uppercase text-bce-muted font-sans shrink-0">
                More Articles
              </span>
              <div className="flex-1 h-px bg-bce-border" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
              {rest.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── EMPTY STATE ── */}
      {filtered.length === 0 && (
        <div className="max-w-7xl mx-auto px-6 py-32 text-center">
          <p className="font-serif text-3xl italic text-bce-muted">
            No posts in this category yet.
          </p>
          <a href="/" className="mt-8 inline-block text-sm text-bce-gold hover:underline font-sans">
            View all posts →
          </a>
        </div>
      )}

      <NewsletterCTA />
    </>
  )
}

