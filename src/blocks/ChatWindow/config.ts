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
      name: 'pineconeIndex',
      type: 'text',
      label: 'Pinecone Index',
      required: true,
    },
    {
      name: 'promptContext',
      type: 'textarea',
      label: 'Prompt Context',
      required: true,
      admin: {
        rows: 15,
        style: {
          height: '300px',
          marginBottom: '30px',
        },
      },
    },
    {
      name: 'promptInstructions',
      type: 'textarea',
      label: 'Prompt Instructions',
      required: true,
      admin: {
        rows: 15,
        style: {
          height: '300px',
        },
      },
    },
    {
      name: 'placeholders',
      type: 'blocks',
      blocks: [Placeholder],
    },
  ],
}
