import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

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
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { doc } = args

  const ogImage = getImageURL(doc?.meta?.image)
  const title = doc?.meta?.title ?? ''

  // Build canonical URL based on tenant domain
  let canonicalUrl: string | undefined
  if (doc?.tenant && typeof doc.tenant === 'object' && 'domain' in doc.tenant) {
    const domain = (doc.tenant as any).domain
    const slug = Array.isArray(doc?.slug) ? doc.slug.join('/') : doc?.slug || ''
    canonicalUrl = `https://${domain}/${slug}`
  }

  return {
    description: doc?.meta?.description,
    alternates: canonicalUrl ? { canonical: canonicalUrl } : undefined,
    //I dont care right now I can implement this better with tenants
    //@ts-expect-error
    icons: doc?.favicon,
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
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
  }
}
