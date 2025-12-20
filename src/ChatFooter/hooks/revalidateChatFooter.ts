import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateChatFooter: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating chatFooter`)

    // @ts-ignore - revalidateTag type mismatch
    revalidateTag('global_chatFooter')
  }

  return doc
}
