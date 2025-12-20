import type { Block } from 'payload'

import { Placeholder } from '../Placeholder/config'

export const ContentChat: Block = {
  slug: 'contentChat',
  interfaceName: 'ContentChat',
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
          marginBottom: '5rem',
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
          marginBottom: '5rem',
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
