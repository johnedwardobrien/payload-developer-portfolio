import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

const tabButtons: Field[] = [
  {
    name: 'btn',
    type: 'group',
    label: 'Tab Button',
    fields: [
      {
        name: 'text',
        label: 'Button Text',
        type: 'text'
      },
      {
        type: 'collapsible',
        label: 'Link Settings',
        admin: {
          initCollapsed: true,
        },
        fields: [
          link({
            appearances: false
          }),
        ]
      },
    ]
  },
  {
    name: 'content',
    type: 'group',
    label: 'Tab Content',
    fields: [
      {
        name: 'body',
        label: 'Tab Body Content',
        type: 'richText',
        editor: lexicalEditor({
          features: ({ rootFeatures }) => {
            return [
              ...rootFeatures,
              HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ]
          },
        }),
      },
    ]
  }
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
