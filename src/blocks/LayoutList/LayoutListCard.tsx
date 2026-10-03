'use client'

import Link from 'next/link'
import React from 'react'

import { Media } from '@/components/Media'
import { formatLongDate } from '@/utilities/formatDateTime'
import { getArticleHref } from '@/utilities/getArticleHref'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'

import type { LayoutListDoc, LayoutListTemplate } from './types'

export const LayoutListCard: React.FC<{ doc: LayoutListDoc; template: LayoutListTemplate }> = ({
  doc,
  template,
}) => {
  const { card, link } = useClickableCard<HTMLElement>({})
  const href = doc.href ?? getArticleHref(doc.relationTo, doc)
  const isTwoAcross = template === 'twoAcross'

  return (
    <article
      className={cn(
        'group text-black hover:cursor-pointer h-full flex flex-col',
        isTwoAcross
          ? 'gap-4'
          : 'border border-border rounded-lg overflow-hidden bg-white shadow-sm',
      )}
      ref={card.ref}
    >
      {doc.image && (
        <div
          className={cn(
            'relative w-full overflow-hidden',
            isTwoAcross ? 'aspect-[17/10] rounded-lg shadow-md' : 'aspect-[4/3]',
          )}
        >
          <Media
            fill
            imgClassName={cn(
              'object-cover',
              isTwoAcross && 'transition-transform duration-300 group-hover:scale-105',
            )}
            resource={doc.image}
            size={isTwoAcross ? '(min-width: 768px) 50vw, 100vw' : '33vw'}
          />
        </div>
      )}
      <div className={cn('flex flex-col flex-1', !isTwoAcross && 'p-4')}>
        <div className={cn('prose', isTwoAcross && 'max-w-none')}>
          <h3
            className={cn(
              '[font-family:var(--gsc-font-header)]',
              isTwoAcross && 'm-0 text-2xl leading-snug lg:text-[1.75rem]',
            )}
          >
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
            <p
              className={cn(
                '[font-family:var(--zs-font-body)]',
                isTwoAcross && 'line-clamp-2 text-neutral-700',
              )}
            >
              {doc.description}
            </p>
          </div>
        )}
        {doc.publishedAt && (
          <time
            className={cn(
              'text-sm [font-family:var(--gsc-font-header)]',
              isTwoAcross ? 'pt-3 text-neutral-600' : 'mt-auto pt-4 italic',
            )}
            dateTime={doc.publishedAt}
          >
            {formatLongDate(doc.publishedAt)}
          </time>
        )}
      </div>
    </article>
  )
}
