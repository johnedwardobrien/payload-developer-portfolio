import type { Block } from 'payload'

export const IconButton: Block = {
  slug: 'iconButton',
  interfaceName: 'IconButton',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'icon',
      type: 'select',
      label: 'Icon',
      options: [],
    },
  ],
}
