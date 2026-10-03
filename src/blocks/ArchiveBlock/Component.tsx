import type { Essay, Post, Shard, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

import { CollectionArchive } from '@/components/CollectionArchive'

type ArticleCollection = 'posts' | 'essays' | 'shards'

type ArticleDoc = Post | Essay | Shard

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
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
  } = props

  const limit = limitFromProps || 3

  const collection: ArticleCollection = relationTo || 'posts'

  let docs: ArticleDoc[] = []
  let relationTos: ArticleCollection[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetched = await payload.find({
      collection: collection,
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    docs = fetched.docs as ArticleDoc[]
    relationTos = docs.map(() => collection)
  } else {
    if (selectedDocs?.length) {
      for (const row of selectedDocs) {
        if (row && typeof row === 'object' && typeof row.value === 'object' && row.value !== null) {
          docs.push(row.value as ArticleDoc)
          relationTos.push(row.relationTo as ArticleCollection)
        }
      }
    }
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      <CollectionArchive posts={docs} relationTos={relationTos} />
    </div>
  )
}
