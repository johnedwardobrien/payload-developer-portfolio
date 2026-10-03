import { cn } from '@/utilities/ui'
import React from 'react'

import { Card, CardPostData } from '@/components/Card'

export type ArticleRelationTo = 'posts' | 'essays' | 'shards'

export type Props = {
  posts: CardPostData[]
  relationTo?: ArticleRelationTo
  relationTos?: ArticleRelationTo[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts, relationTo = 'posts', relationTos } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {posts?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              const rel = relationTos?.[index] ?? relationTo
              return (
                <div className="col-span-4" key={index}>
                  <Card className="h-full" doc={result} relationTo={rel} showCategories />
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
