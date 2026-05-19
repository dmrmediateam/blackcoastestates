export interface TocItem {
  id: string
  text: string
  level: 2 | 3
}

/**
 * Replicates github-slugger (used by rehype-slug) for ASCII headings.
 * Keeps letters, numbers, hyphens and underscores; replaces spaces with hyphens.
 */
function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\-_ ]/g, '')
    .replace(/\s/g, '-')
}

export function extractToc(content: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const seen = new Map<string, number>()
  const items: TocItem[] = []
  let match: RegExpExecArray | null

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length as 2 | 3
    // Strip any inline markdown (bold, code, links)
    const rawText = match[2].replace(/\*\*|__|\*|_|`|\[([^\]]+)\]\([^)]+\)/g, '$1').trim()
    let id = slugify(rawText)

    // Handle duplicate headings (same as github-slugger)
    const count = seen.get(id) ?? 0
    seen.set(id, count + 1)
    if (count > 0) id = `${id}-${count}`

    items.push({ id, text: rawText, level })
  }

  return items
}

export function extractFaqs(content: string): Array<{ question: string; answer: string }> {
  const lines = content.split('\n')
  const faqs: Array<{ question: string; answer: string }> = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    // Match ### or #### headings that are questions
    const match = line.match(/^#{3,4}\s+(.+\?)\s*$/)
    if (match) {
      const question = match[1].trim()
      const answerLines: string[] = []
      i++
      while (i < lines.length && !lines[i].match(/^#{1,6}\s/)) {
        const clean = lines[i].trim().replace(/^[-*]\s+/, '').replace(/\*\*/g, '')
        if (clean) answerLines.push(clean)
        i++
      }
      if (answerLines.length > 0) {
        faqs.push({ question, answer: answerLines.join(' ') })
      }
    } else {
      i++
    }
  }

  return faqs
}
