import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { PostMeta } from '@/lib/posts'

interface BlogCardProps {
  post: PostMeta
  featured?: boolean
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const formattedDate = format(new Date(post.date), 'MMM d, yyyy')

  if (featured) {
    return (
      <Link
        href={`/${post.slug}`}
        className="group relative block overflow-hidden min-h-[480px] lg:min-h-[560px]"
      >
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="100vw"
          priority
        />
        {/* Gradient overlay — heavier at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-bce-black via-bce-black/50 to-bce-black/10" />
        {/* Left vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-bce-black/30 via-transparent to-transparent" />

        {/* Text block */}
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-14">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[0.6rem] tracking-[0.35em] uppercase text-bce-gold font-sans">
                {post.category}
              </span>
              <span className="w-px h-3 bg-bce-border" aria-hidden="true" />
              <span className="text-xs text-bce-cream/50 font-sans">{post.readingTime}</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl italic font-normal text-bce-cream leading-tight mb-5 group-hover:text-bce-gold transition-colors duration-300">
              {post.title}
            </h2>
            <p className="text-bce-cream/55 text-base leading-relaxed max-w-2xl mb-6 hidden sm:block">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-3 text-sm text-bce-cream/50 font-sans">
              <span>{post.author}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.date}>{formattedDate}</time>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`/${post.slug}`}
      className="group flex flex-col overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bce-black/40 to-transparent" />
      </div>

      {/* Text */}
      <div className="pt-5 pb-8 flex flex-col flex-1">
        <span className="text-[0.6rem] tracking-[0.35em] uppercase text-bce-gold font-sans mb-3 block">
          {post.category}
        </span>
        <h3 className="font-serif text-xl italic font-normal text-bce-cream leading-snug group-hover:text-bce-gold transition-colors duration-200 flex-1 mb-4">
          {post.title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-bce-muted font-sans">
          <time dateTime={post.date}>{formattedDate}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime}</span>
        </div>
      </div>
    </Link>
  )
}

