import type { Block } from 'payload'

export const VideoCards: Block = {
  slug: 'videoCards',
  interfaceName: 'VideoCards',
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
      name: 'videos',
      type: 'upload',
      relationTo: 'media',
      label: 'Videos',
    },
  ],
}
