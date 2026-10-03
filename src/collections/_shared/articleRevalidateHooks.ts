import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

type DocWithPublish = {
  id: string | number
  _status?: string | null
  slug?: string | null
}

export function articleRevalidateHooks(urlSegment: string, sitemapTag: string) {
  const revalidateAfterChange: CollectionAfterChangeHook<DocWithPublish> = ({
    doc,
    previousDoc,
    req: { payload, context },
  }) => {
    if (!context.disableRevalidate) {
      if (doc._status === 'published') {
        const path = `/${urlSegment}/${doc.slug}`

        payload.logger.info(`Revalidating ${urlSegment} at path: ${path}`)

        revalidatePath(path)
        // @ts-expect-error - revalidateTag type mismatch
        revalidateTag(sitemapTag)
      }

      if (previousDoc._status === 'published' && doc._status !== 'published') {
        const oldPath = `/${urlSegment}/${previousDoc.slug}`

        payload.logger.info(`Revalidating old ${urlSegment} at path: ${oldPath}`)

        revalidatePath(oldPath)
        // @ts-expect-error - revalidateTag type mismatch
        revalidateTag(sitemapTag)
      }
    }
    return doc
  }

  const revalidateAfterDelete: CollectionAfterDeleteHook<DocWithPublish> = ({
    doc,
    req: { context },
  }) => {
    if (!context.disableRevalidate) {
      const path = `/${urlSegment}/${doc?.slug}`

      revalidatePath(path)
      // @ts-expect-error - revalidateTag type mismatch
      revalidateTag(sitemapTag)
    }

    return doc
  }

  return { revalidateAfterChange, revalidateAfterDelete }
}
