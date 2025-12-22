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
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
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
      name: 'date',
      type: 'date',
      label: 'Date',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Media',
    },
    {
      name: 'videos',
      type: 'upload',
      relationTo: 'media',
      label: 'Video',
    },
  ],
}
