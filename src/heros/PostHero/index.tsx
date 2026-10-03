import { formatDateTime } from 'src/utilities/formatDateTime'
import Link from 'next/link'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa6'

import type { Essay, Post, Shard } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'

export const PostHero: React.FC<{
  post: Post | Essay | Shard
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
    <div className="relative isolate flex min-h-[80vh] items-end">
      <div className="absolute inset-0 select-none">
        {heroImage && typeof heroImage !== 'string' && (
          <>
            <Media
              fill
              priority
              className="absolute inset-0"
              pictureClassName="absolute inset-0"
              imgClassName="object-cover"
              resource={heroImage}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent" />
          </>
        )}
      </div>
      <Link
        className="absolute left-4 top-4 z-20 inline-flex items-center gap-3 bg-transparent px-6 py-4 text-left text-[1.2rem] text-white [font-family:var(--gsc-font-header)] [text-shadow:0_1px_3px_rgba(0,0,0,0.5)] md:text-[1.5rem] lg:text-[1.7rem]"
        href="/blog"
      >
        <FaArrowLeft />
        Go back
      </Link>
      <div className="relative z-10 mx-auto w-[95%] pb-8 text-white md:w-[70%] lg:w-[60%] lg:max-w-[43rem]">
        <div>
          <div className="mb-6 text-sm uppercase [font-family:var(--zs-font-body)]">
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { title: categoryTitle } = category

                const titleToUse = categoryTitle || 'Untitled category'

                const isLast = index === categories.length - 1

                return (
                  <React.Fragment key={index}>
                    {titleToUse}
                    {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                  </React.Fragment>
                )
              }
              return null
            })}
          </div>

          <div className="">
            <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl [font-family:var(--gsc-font-header)]">
              {title}
            </h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-16">
            {hasAuthors && (
              <div className="flex flex-col gap-4 [font-family:var(--zs-font-body)]">
                <div className="flex flex-col gap-1">
                  <p className="text-sm">Author</p>

                  <p>{formatAuthors(populatedAuthors)}</p>
                </div>
              </div>
            )}
            {publishedAt && (
              <div className="flex flex-col gap-1">
                <p className="text-sm">Date Published</p>

                <time
                  className="italic [font-family:var(--gsc-font-header)]"
                  dateTime={publishedAt}
                >
                  {formatDateTime(publishedAt)}
                </time>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
