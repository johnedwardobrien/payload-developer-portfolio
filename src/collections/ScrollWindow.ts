import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const ScrollWindow: CollectionConfig = {
  slug: 'scroll-window',
  access: {
    read: authenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'items'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'items',
      type: 'relationship',
      relationTo: 'yacht-parallax-item',
      label: 'Yacht Parallax Items',
      hasMany: true,
      admin: {
        description: 'Select Yacht Parallax Items to display in this scroll window',
      },
    },
  ],
  timestamps: true,
}
