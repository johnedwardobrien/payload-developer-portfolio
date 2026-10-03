'use server'

import type { Where } from 'payload'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Essay, Post, Shard } from '@/payload-types'

import { articleCollectionSlugs, toLayoutListDoc } from './normalize'
import type { LayoutListQuery, LayoutListResult } from './types'

const MAX_LIMIT = 50

export async function fetchLayoutListDocs(query: LayoutListQuery): Promise<LayoutListResult> {
  const relationTo = articleCollectionSlugs.includes(query.relationTo) ? query.relationTo : 'posts'
  const limit = Math.min(Math.max(Math.floor(Number(query.limit) || 10), 1), MAX_LIMIT)
  const page = Math.max(Math.floor(Number(query.page) || 1), 1)
  const search = query.search?.trim().slice(0, 100)
  const categories = query.categories?.filter((id) => typeof id === 'string' && id.length > 0)

  const conditions: Where[] = []
  if (categories && categories.length > 0) conditions.push({ categories: { in: categories } })
  if (search) conditions.push({ title: { like: search } })

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: relationTo,
    depth: 1,
    limit,
    page,
    overrideAccess: false,
    sort: query.sort === 'alphabetic' ? 'title' : '-publishedAt',
    select: {
      title: true,
      slug: true,
      publishedAt: true,
      meta: true,
    },
    ...(conditions.length > 0 ? { where: { and: conditions } } : {}),
  })

  return {
    docs: (result.docs as (Post | Essay | Shard)[]).map((doc) => toLayoutListDoc(doc, relationTo)),
    totalDocs: result.totalDocs,
    page: result.page ?? page,
    totalPages: result.totalPages,
  }
}
