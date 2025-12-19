import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateChatFooter } from './hooks/revalidateChatFooter'

export const ChatFooter: GlobalConfig = {
  slug: 'chatFooter',
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
          RowLabel: '@/ChatFooter/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateChatFooter],
  },
}
