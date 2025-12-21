import type { Block } from 'payload'

export const EventCard: Block = {
  slug: 'eventCard',
  interfaceName: 'EventCard',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'fromDate',
      type: 'date',
      label: 'From Date',
    },
    {
      name: 'toDate',
      type: 'date',
      label: 'To Date',
    },
    {
      name: 'linkText',
      type: 'text',
      label: 'Link Text',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
    },
  ],
}
