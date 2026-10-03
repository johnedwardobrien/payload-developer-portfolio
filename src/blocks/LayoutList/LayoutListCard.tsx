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
    <article className="layout-list-card" ref={card.ref}>
      {doc.image && (
        <div className="layout-list-card-image relative aspect-[4/3] w-full overflow-hidden">
          <Media
            fill
            imgClassName="object-cover"
            resource={doc.image}
            size="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
      )}
      <div className="layout-list-card-content">
        <h3 className="layout-list-card-title">
          {href ? (
            <Link href={href} ref={link.ref}>
              {doc.title}
            </Link>
          ) : (
            doc.title
          )}
        </h3>
        {doc.description && <p className="line-clamp-3">{doc.description}</p>}
      </div>
    </article>
  )
}
