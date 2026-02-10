import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { updateAndDeleteAccess } from '../../access/updateAndDelete'

export const ScrollWindow: CollectionConfig = {
  slug: 'scroll-window',
  access: {
    read: updateAndDeleteAccess,
    create: updateAndDeleteAccess,
    update: updateAndDeleteAccess,
    delete: updateAndDeleteAccess,
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
      name: 'type',
      type: 'select',
      label: 'Type',
      options: [
        {
          label: 'Scrollover',
          value: 'scrollover',
        },
        {
          label: 'Fixed Card w/ Inner Scroll Series',
          value: 'fixed-card-inner-scroll-series',
        },
        {
          label: 'Fixed Single Card Lag',
          value: 'fixed-single-card-lag',
        },
      ],
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
