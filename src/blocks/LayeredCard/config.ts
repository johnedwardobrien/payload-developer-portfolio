import type { Block } from 'payload'

export const LayeredCard: Block = {
  slug: 'layeredCard',
  interfaceName: 'LayeredCard',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'Button Text',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
    },
  ],
}
