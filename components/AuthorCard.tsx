import Link from 'next/link'
import { Author } from '@/lib/authors'
import AuthorAvatar from '@/components/AuthorAvatar'

interface AuthorCardProps {
  author: Author
  compact?: boolean
}

export default function AuthorCard({ author, compact = false }: AuthorCardProps) {
  if (compact) {
    return (
      <Link
        href={`/author/${author.slug}`}
        className="group flex items-center gap-3 hover:opacity-80 transition-opacity"
      >
        <AuthorAvatar src={author.image} name={author.name} size={36} />
        <div>
          <p className="text-xs text-bce-cream/80 font-sans group-hover:text-bce-gold transition-colors">
            {author.name}
          </p>
          <p className="text-[0.6rem] text-bce-muted tracking-[0.15em] uppercase font-sans">
            {author.title}
          </p>
        </div>
      </Link>
    )
  }

  return (
    <div className="border border-bce-border p-8 mt-12">
      <p className="text-[0.6rem] tracking-[0.3em] uppercase text-bce-gold font-sans mb-6">
        About the Author
      </p>

      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <Link href={`/author/${author.slug}`} className="flex-shrink-0">
          <AuthorAvatar src={author.image} name={author.name} size={80} />
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
            <Link
              href={`/author/${author.slug}`}
              className="font-serif text-xl text-bce-cream hover:text-bce-gold transition-colors"
            >
              {author.name}
            </Link>
            <span className="text-[0.6rem] tracking-[0.2em] uppercase text-bce-muted font-sans">
              {author.title}
            </span>
          </div>

          <p className="text-sm text-bce-cream/60 leading-relaxed mb-4 font-sans">
            {author.bio}
          </p>

          {/* Expertise tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {author.expertise.map((tag) => (
              <span
                key={tag}
                className="text-[0.55rem] px-2.5 py-1 border border-bce-border text-bce-muted tracking-[0.15em] uppercase font-sans"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Contact + social */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {author.email && (
              <a
                href={`mailto:${author.email}`}
                className="text-xs text-bce-muted hover:text-bce-gold transition-colors font-sans"
              >
                {author.email}
              </a>
            )}
            {author.phone && (
              <a
                href={`tel:${author.phone}`}
                className="text-xs text-bce-muted hover:text-bce-gold transition-colors font-sans"
              >
                {author.phone.replace(/(\+1)(\d{3})(\d{3})(\d{4})/, '$1 $2 $3-$4')}
              </a>
            )}
            {author.social?.instagram && (
              <a
                href={author.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-bce-muted hover:text-bce-gold transition-colors font-sans"
                aria-label="Instagram"
              >
                Instagram
              </a>
            )}
            {author.social?.twitter && (
              <a
                href={author.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-bce-muted hover:text-bce-gold transition-colors font-sans"
                aria-label="Twitter / X"
              >
                Twitter / X
              </a>
            )}
            <Link
              href={`/author/${author.slug}`}
              className="text-xs text-bce-gold hover:text-bce-gold-light transition-colors font-sans ml-auto"
            >
              All articles →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
