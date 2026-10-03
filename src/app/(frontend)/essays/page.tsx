import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const essays = await payload.find({
    collection: 'essays',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Essays</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="essays"
          currentPage={essays.page}
          limit={12}
          totalDocs={essays.totalDocs}
        />
      </div>

      <CollectionArchive posts={essays.docs} relationTo="essays" />

      <div className="container">
        {essays.totalPages > 1 && essays.page && (
          <Pagination basePath="/essays" page={essays.page} totalPages={essays.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {}
}
