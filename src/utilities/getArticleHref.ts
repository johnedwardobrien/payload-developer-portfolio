import type { ArticleCollectionSlug } from '@/types/articleCollections'

export const articlePathPrefixMap: Record<ArticleCollectionSlug, string> = {
  posts: '/posts',
  essays: '/essays',
  shards: '/shards',
}

export const getArticleHref = (
  relationTo: ArticleCollectionSlug,
  doc: { slug?: string | null },
): string | undefined => {
  if (!doc.slug) return undefined
  return `${articlePathPrefixMap[relationTo]}/${doc.slug}`
}
