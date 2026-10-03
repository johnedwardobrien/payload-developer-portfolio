import type { Where } from 'payload'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Essay, Post, Shard } from '@/payload-types'

import { articleCollectionSlugs, toLayoutListDoc } from './normalize'
import type { LayoutListDoc, LayoutListQuery } from './types'

export async function fetchAllLayoutListDocs(
  query: Pick<LayoutListQuery, 'relationTo' | 'categories'>,
): Promise<LayoutListDoc[]> {
  const relationTo = articleCollectionSlugs.includes(query.relationTo) ? query.relationTo : 'posts'
  const categories = query.categories?.filter((id) => typeof id === 'string' && id.length > 0)

  const where: Where | undefined =
    categories && categories.length > 0 ? { categories: { in: categories } } : undefined

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: relationTo,
    depth: 1,
    pagination: false,
    overrideAccess: false,
    sort: '-publishedAt',
    select: {
      title: true,
      slug: true,
      publishedAt: true,
      meta: true,
    },
    ...(where ? { where } : {}),
  })

  return (result.docs as (Post | Essay | Shard)[]).map((doc) => toLayoutListDoc(doc, relationTo))
}
