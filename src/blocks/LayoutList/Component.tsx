import type { Essay, Post, Shard, LayoutListBlock as LayoutListBlockProps } from '@/payload-types'

import React from 'react'
import RichText from '@/components/RichText'
import type { ArticleCollectionSlug } from '@/types/articleCollections'
import { isLocalVersion } from '@/utilities/isLocalVersion'
import './Component.css'

import { fetchLayoutListDocs } from './actions'
import { LayoutListClient } from './Component.client'
import { fetchAllLayoutListDocs } from './fetchAll'
import { toLayoutListDoc } from './normalize'
import type { LayoutListDoc } from './types'

export const LayoutListBlock: React.FC<
  LayoutListBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    categories,
    introContent,
    limit: limitFromProps,
    populateBy,
    relationTo,
    selectedDocs,
    title,
  } = props

  const limit = limitFromProps || 10
  const blockId = `block-${id}`

  const header =
    title || introContent ? (
      <div className="layout-list-header">
        {title && <h2 className="layout-list-title">{title}</h2>}
        {introContent && (
          <RichText className="layout-list-description" data={introContent} enableGutter={false} />
        )}
      </div>
    ) : null

  const slug = (relationTo || 'posts') as ArticleCollectionSlug
  const categoryIds = categories?.map((category) =>
    typeof category === 'object' ? category.id : category,
  )

  if (populateBy === 'selection' || isLocalVersion) {
    const docs: LayoutListDoc[] =
      populateBy === 'selection'
        ? (selectedDocs ?? [])
            .filter((entry) => typeof entry.value === 'object' && entry.value !== null)
            .map((entry) =>
              toLayoutListDoc(
                entry.value as Post | Essay | Shard,
                entry.relationTo as ArticleCollectionSlug,
              ),
            )
        : await fetchAllLayoutListDocs({ relationTo: slug, categories: categoryIds })

    return (
      <div className="layout-list" id={blockId}>
        {header}
        <LayoutListClient blockId={blockId} docs={docs} limit={limit} mode="local" />
      </div>
    )
  }

  const initial = await fetchLayoutListDocs({
    relationTo: slug,
    categories: categoryIds,
    limit,
    page: 1,
    sort: 'latest',
  })

  return (
    <div className="layout-list" id={blockId}>
      {header}
      <LayoutListClient
        blockId={blockId}
        categories={categoryIds}
        initial={initial}
        limit={limit}
        mode="remote"
        relationTo={slug}
      />
    </div>
  )
}
