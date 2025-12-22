import type { Block } from 'payload'

export const StandardCard: Block = {
  slug: 'standardCard',
  interfaceName: 'StandardCard',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
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
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
    },
    {
      name: 'videos',
      type: 'upload',
      relationTo: 'media',
      label: 'Videos',
    },
  ],
}
