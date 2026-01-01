import type { Block } from 'payload'

export const ScrollWindow: Block = {
  slug: 'scrollWindow',
  interfaceName: 'ScrollWindow',
  fields: [
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
}
