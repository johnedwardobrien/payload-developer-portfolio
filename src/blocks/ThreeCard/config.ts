import type { Block } from 'payload'

export const ThreeCard: Block = {
  slug: 'threeCard',
  interfaceName: 'ThreeCard',
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
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
    },
  ],
}
