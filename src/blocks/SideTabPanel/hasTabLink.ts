type TabLink = {
  type?: 'reference' | 'custom' | null
  reference?: {
    relationTo?: string | null
    value?: { slug?: string | null } | string | number | null
  } | null
  url?: string | null
} | null | undefined

export function tabButtonHasDestination(link: TabLink): boolean {
  if (!link) return false
  if (link.type === 'custom') return Boolean(link.url)
  if (link.type === 'reference') {
    const value = link.reference?.value
    return typeof value === 'object' && value !== null && Boolean(value.slug)
  }
  return false
}
