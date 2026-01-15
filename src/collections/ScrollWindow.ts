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
      filterOptions: {
        _displayTitle: { exists: true },
      },
    },
  ],
  timestamps: true,
}
