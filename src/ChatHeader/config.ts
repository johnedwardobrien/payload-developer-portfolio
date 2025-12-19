import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateChatHeader } from './hooks/revalidateChatHeader'

export const ChatHeader: GlobalConfig = {
  slug: 'chatHeader',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/ChatHeader/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateChatHeader],
  },
}
