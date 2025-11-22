import type { Block, Field } from 'payload'

import { link } from '@/fields/link'
import { Content } from '@/blocks/Content/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'

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
    blocks: [Content, MediaBlock],
  },
]

export const SideTabPanel: Block = {
  slug: 'sideTabPanel',
  interfaceName: 'SideTabPanel',
  dbName: 'side_tab',
  fields: [
    {
      name: 'backgroundMedia',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Media',
    },
    {
      name: 'tabGroups',
      type: 'array',
      fields: tabButtons,
    },
  ],
}
