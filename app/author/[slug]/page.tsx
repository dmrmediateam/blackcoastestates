import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import { getAllAuthors, getAuthor } from '@/lib/authors'
import { getAllPosts } from '@/lib/posts'
import AuthorAvatar from '@/components/AuthorAvatar'
import BlogCard from '@/components/BlogCard'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getAllAuthors().map((author) => ({ slug: author.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const author = getAuthor(params.slug)
  if (!author) return {}

  const title = `${author.name} — ${author.title} | Black Coast Estates`
  const description = author.bio

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
      images: [{ url: author.image, width: 400, height: 400, alt: author.name }],
    },
    alternates: {
      canonical: `https://blog.blackcoastestates.com/author/${author.slug}`,
    },
  }
}

export default function AuthorPage({ params }: PageProps) {
  const author = getAuthor(params.slug)
  if (!author) notFound()

  const allPosts = getAllPosts()
  const authorPosts = allPosts.filter((p) => p.authorSlug === author!.slug)

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    jobTitle: author.title,
    description: author.bio,
    image: `https://blog.blackcoastestates.com${author.image}`,
    url: `https://blog.blackcoastestates.com/author/${author.slug}`,
    worksFor: {
      '@type': 'Organization',
      name: 'Black Coast Estates',
      url: 'https://blackcoastestates.com',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Playa Negra',
      addressRegion: 'Guanacaste',
      addressCountry: 'CR',
    },
    ...(author.email ? { email: author.email } : {}),
    ...(author.phone ? { telephone: author.phone } : {}),
    ...(author.social && Object.values(author.social).filter(Boolean).length > 0
      ? { sameAs: Object.values(author.social).filter(Boolean) }
      : {}),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      {/* Hero */}
      <section className="pt-36 pb-16 border-b border-bce-border">
        <div className="max-w-4xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-bce-muted mb-10 font-sans" aria-label="Breadcrumb">
            <a href="https://blackcoastestates.com" className="hover:text-bce-cream transition-colors">
              Black Coast Estates
            </a>
            <span aria-hidden="true">/</span>
            <Link href="/" className="hover:text-bce-cream transition-colors">
              Journal
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-bce-cream/50">{author.name}</span>
          </nav>

          <div className="flex flex-col sm:flex-row items-start gap-8">
            <AuthorAvatar src={author.image} name={author.name} size={120} className="flex-shrink-0" />

            <div className="flex-1">
              <p className="text-[0.6rem] tracking-[0.3em] uppercase text-bce-gold font-sans mb-3">
                {author.title}
              </p>
              <h1 className="font-serif text-4xl md:text-5xl font-light text-bce-cream tracking-wide mb-4">
                {author.name}
              </h1>
              <p className="text-xs text-bce-muted font-sans tracking-widest uppercase mb-6">
                {author.location}
              </p>
              <p className="text-base text-bce-cream/65 leading-relaxed max-w-2xl font-sans mb-6">
                {author.bio}
              </p>

              {/* Expertise */}
              <div className="flex flex-wrap gap-2 mb-6">
                {author.expertise.map((tag) => (
                  <span
                    key={tag}
                    className="text-[0.55rem] px-3 py-1 border border-bce-border text-bce-muted tracking-[0.2em] uppercase font-sans"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Contact + social */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                {author.email && (
                  <a
                    href={`mailto:${author.email}`}
                    className="text-sm text-bce-muted hover:text-bce-gold transition-colors font-sans"
                  >
                    {author.email}
                  </a>
                )}
                {author.phone && (
                  <a
                    href={`tel:${author.phone}`}
                    className="text-sm text-bce-muted hover:text-bce-gold transition-colors font-sans"
                  >
                    {author.phone.replace(/(\+1)(\d{3})(\d{3})(\d{4})/, '$1 $2 $3-$4')}
                  </a>
                )}
                {author.social?.instagram && (
                  <a
                    href={author.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${author.name} on Instagram`}
                    className="text-sm text-bce-muted hover:text-bce-gold transition-colors font-sans"
                  >
                    Instagram
                  </a>
                )}
                {author.social?.twitter && (
                  <a
                    href={author.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${author.name} on Twitter / X`}
                    className="text-sm text-bce-muted hover:text-bce-gold transition-colors font-sans"
                  >
                    Twitter / X
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts by author */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-2xl font-light text-bce-cream tracking-wide mb-10">
            Articles by {author.name}
          </h2>

          {authorPosts.length === 0 ? (
            <p className="text-bce-muted font-sans text-sm">No articles yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {authorPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
