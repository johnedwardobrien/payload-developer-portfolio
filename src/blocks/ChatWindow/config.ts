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
      name: 'placeholders',
      type: 'blocks',
      blocks: [Placeholder],
    },
  ],
}
