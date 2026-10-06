import type { Essay, Post, Shard, LayoutListBlock as LayoutListBlockProps } from '@/payload-types'

import React from 'react'
import RichText from '@/components/RichText'
import type { ArticleCollectionSlug } from '@/types/articleCollections'
import { isLocalVersion } from '@/utilities/isLocalVersion'

import { fetchLayoutListDocs } from './actions'
import { LayoutListClient } from './Component.client'
import { fetchAllLayoutListDocs } from './fetchAll'
import { toLayoutListDoc } from './normalize'
import type { LayoutListDoc, LayoutListTemplate } from './types'

export const LayoutListBlock: React.FC<
  LayoutListBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    categories,
    introContent,
    layoutTemplate,
    limit: limitFromProps,
    populateBy,
    relationTo,
    selectedDocs,
    title,
  } = props

  const limit = limitFromProps || 10
  const blockId = `block-${id}`
  const template: LayoutListTemplate = layoutTemplate || 'fourAcross'

  const header =
    title || introContent ? (
      <div className="mb-8">
        {title && (
          <div className="prose max-w-none">
            <h2>{title}</h2>
          </div>
        )}
        {introContent && (
          <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        )}
      </div>
    ) : null

  const panel = (list: React.ReactNode) => (
    <div className="mb-16 mt-8 scroll-mt-24" id={blockId}>
      <div className="layout-list-panel mx-auto w-[95%] min-w-0 max-w-[1200px] rounded-xl bg-white p-6 text-black md:w-[90%] md:p-8 lg:w-[80%] lg:p-10">
        {header}
        {list}
      </div>
    </div>
  )

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

    return panel(
      <LayoutListClient
        blockId={blockId}
        docs={docs}
        limit={limit}
        mode="local"
        template={template}
      />,
    )
  }

  const initial = await fetchLayoutListDocs({
    relationTo: slug,
    categories: categoryIds,
    limit,
    page: 1,
    sort: 'latest',
  })

  return panel(
    <LayoutListClient
      blockId={blockId}
      categories={categoryIds}
      initial={initial}
      limit={limit}
      mode="remote"
      relationTo={slug}
      template={template}
    />,
  )
}
