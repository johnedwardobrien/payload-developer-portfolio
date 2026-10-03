'use client'

import Link from 'next/link'
import React from 'react'

import { Media } from '@/components/Media'
import { getArticleHref } from '@/utilities/getArticleHref'
import useClickableCard from '@/utilities/useClickableCard'

import type { LayoutListDoc } from './types'

export const LayoutListCard: React.FC<{ doc: LayoutListDoc }> = ({ doc }) => {
  const { card, link } = useClickableCard<HTMLElement>({})
  const href = doc.href ?? getArticleHref(doc.relationTo, doc)

  return (
    <article
      className="border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer h-full"
      ref={card.ref}
    >
      {doc.image && (
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Media
            fill
            imgClassName="object-cover"
            resource={doc.image}
            size="33vw"
          />
        </div>
      )}
      <div className="p-4">
        <div className="prose">
          <h3>
            {href ? (
              <Link className="not-prose" href={href} ref={link.ref}>
                {doc.title}
              </Link>
            ) : (
              doc.title
            )}
          </h3>
        </div>
        {doc.description && (
          <div className="mt-2">
            <p>{doc.description}</p>
          </div>
        )}
      </div>
    </article>
  )
}
