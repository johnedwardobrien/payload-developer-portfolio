import type { Metadata } from 'next'

import type { Essay, Media, Page, Post, Shard, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()
  let url = ''

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url
    url = ogUrl ? ogUrl : serverUrl + image.url
  }
  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | Partial<Essay> | Partial<Shard> | null
  path?: string
}): Promise<Metadata> => {
  const { doc, path } = args
  const serverUrl = getServerSideURL()

  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title ?? ''
  const docSlug = typeof doc?.slug === 'string' ? doc.slug : ''
  const slugPath = docSlug && docSlug !== 'home' ? `/${docSlug}` : '/'
  const canonicalPath = path ?? slugPath
  const canonicalUrl = `${serverUrl}${canonicalPath}`

  return {
    description: doc?.meta?.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: canonicalUrl,
    }),
    title,
  }
}
