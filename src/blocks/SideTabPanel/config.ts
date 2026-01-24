import type { Block, Field } from 'payload'

import { link } from '@/fields/link'
import { AnimationBlock } from '@/blocks/AnimationBlock/config'
import { Content } from '@/blocks/Content/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { FormBlock } from '@/blocks/Form/config'

const tabButtons: Field[] = [
  {
    name: 'btn',
    type: 'group',
    label: 'Tab Button',
    fields: [
      {
        name: 'text',
        label: 'Button Text',
        type: 'text',
      },
      {
        type: 'collapsible',
        label: 'Link Settings',
        admin: {
          initCollapsed: true,
        },
        fields: [
          link({
            appearances: false,
          }),
        ],
      },
    ],
  },
  {
    name: 'content',
    type: 'blocks',
    label: 'Tab Content',
    blocks: [AnimationBlock, Content, MediaBlock, FormBlock],
  },
]

export const SideTabPanel: Block = {
  slug: 'sideTabPanel',
  interfaceName: 'SideTabPanel',
  dbName: 'side_tab',
  fields: [
    {
      name: 'tabGroups',
      type: 'array',
      fields: tabButtons,
    },
  ],
}
