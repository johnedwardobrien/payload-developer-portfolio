import type { Block } from 'payload'

import { Placeholder } from '../Placeholder/config'

export const ChatWindow: Block = {
  slug: 'chatWindow',
  interfaceName: 'ChatWindow',
  fields: [
    {
      name: 'helpText',
      type: 'text',
      label: 'Help Text',
    },
    {
      name: 'chatType',
      type: 'select',
      label: 'Chat Type',
      options: [
        {
          label: 'Quixote Chat',
          value: 'quixote-chat',
        },
      ],
    },
    {
      name: 'placeholders',
      type: 'blocks',
      blocks: [Placeholder],
    },
  ],
}
