import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateChatHeader: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating chatHeader`)

    // @ts-ignore - revalidateTag type mismatch
    revalidateTag('global_chatHeader')
  }

  return doc
}
