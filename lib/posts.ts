import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

export interface PostMeta {
  slug: string
  title: string
  excerpt: string
  date: string
  lastModified?: string
  category: string
  tags: string[]
  author: string
  authorSlug?: string
  coverImage: string
  readingTime: string
}

export interface Post extends PostMeta {
  content: string
}

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 220
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(POSTS_DIR)

  return files
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => {
      const slug = filename.replace('.mdx', '')
      const fullPath = path.join(POSTS_DIR, filename)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title as string,
        excerpt: data.excerpt as string,
        date: data.date as string,
        category: data.category as string,
        tags: (data.tags as string[]) || [],
        author: (data.author as string) || 'Black Coast Estates',
        authorSlug: (data.authorSlug as string) || undefined,
        lastModified: (data.lastModified as string) || undefined,
        coverImage: (data.coverImage as string) || '/images/default-cover.jpg',
        readingTime: calculateReadingTime(content),
      } satisfies PostMeta
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(POSTS_DIR, `${slug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title as string,
    excerpt: data.excerpt as string,
    date: data.date as string,
    category: data.category as string,
    tags: (data.tags as string[]) || [],
    author: (data.author as string) || 'Black Coast Estates',
    authorSlug: (data.authorSlug as string) || undefined,
    lastModified: (data.lastModified as string) || undefined,
    coverImage: (data.coverImage as string) || '/images/default-cover.jpg',
    readingTime: calculateReadingTime(content),
    content,
  }
}

export function getAllCategories(): string[] {
  const posts = getAllPosts()
  return Array.from(new Set(posts.map((p) => p.category)))
}

export function getRelatedPosts(currentSlug: string, category: string): PostMeta[] {
  return getAllPosts()
    .filter((p) => p.slug !== currentSlug && p.category === category)
    .slice(0, 3)
}

export function getAllSlugs(): string[] {
  const files = fs.readdirSync(POSTS_DIR)
  return files.filter((f) => f.endsWith('.mdx')).map((f) => f.replace('.mdx', ''))
}
