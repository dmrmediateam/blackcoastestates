import { permanentRedirect } from 'next/navigation'
import { getAllSlugs } from '@/lib/posts'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export default function LegacyPostRedirect({ params }: PageProps) {
  permanentRedirect(`/blog/${params.slug}`)
}
