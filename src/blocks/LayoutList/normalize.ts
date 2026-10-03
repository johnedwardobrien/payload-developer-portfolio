import type { Essay, Post, Shard } from '@/payload-types'
import type { ArticleCollectionSlug } from '@/types/articleCollections'
import { getArticleHref } from '@/utilities/getArticleHref'

import type { LayoutListDoc } from './types'

type ArticleDoc = Pick<Post | Essay | Shard, 'id' | 'title' | 'slug' | 'publishedAt' | 'meta'>

export const articleCollectionSlugs: ArticleCollectionSlug[] = ['posts', 'essays', 'shards']

export const toLayoutListDoc = (
  doc: ArticleDoc,
  relationTo: ArticleCollectionSlug,
): LayoutListDoc => {
  const image = doc.meta?.image

  return {
    id: doc.id,
    title: doc.title,
    slug: doc.slug,
    href: getArticleHref(relationTo, doc),
    publishedAt: doc.publishedAt ?? null,
    description: doc.meta?.description?.replace(/\s/g, ' ') ?? null,
    image: image && typeof image === 'object' ? image : null,
    relationTo,
  }
}
