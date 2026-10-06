import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa6'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { cn } from '@/utilities/ui'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await paramsPromise
  const url = '/' + slug
  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    slug: slug ?? '/',
  })

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout, theme } = page

  return (
    <div
      className={cn(
        'root-page',
      )}
      data-custom-theme={theme || undefined}
    >
      <PageClient />
      {slug === 'blog' && (
        <Link
          className="ml-4 mt-4 flex w-fit items-center gap-3 bg-transparent px-6 py-4 text-left text-[1.2rem] text-white [font-family:var(--gsc-font-header)] [text-shadow:0_1px_3px_rgba(0,0,0,0.5)] md:text-[1.5rem] lg:text-[1.7rem]"
          href="/"
        >
          <FaArrowLeft />
          Back To Home
        </Link>
      )}
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '/' } = await paramsPromise
  const page = await queryPageBySlug({
    slug,
  })

  return generateMeta({
    doc: page,
    path: slug === '/' || !slug || slug === 'home' ? '/' : `/${slug}`,
  })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    depth: 10,
    // ???
    // overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
