import type { Media } from '@/payload-types'
import type { ArticleCollectionSlug } from '@/types/articleCollections'

export type LayoutListSort = 'latest' | 'alphabetic'

export type LayoutListDoc = {
  id: string
  title: string
  slug?: string | null
  href?: string
  publishedAt?: string | null
  description?: string | null
  image?: Media | null
  relationTo: ArticleCollectionSlug
}

export type LayoutListResult = {
  docs: LayoutListDoc[]
  totalDocs: number
  page: number
  totalPages: number
}

export type LayoutListQuery = {
  relationTo: ArticleCollectionSlug
  categories?: string[]
  page?: number
  limit?: number
  search?: string
  sort?: LayoutListSort
}
