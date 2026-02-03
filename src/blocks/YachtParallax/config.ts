import type { Block } from 'payload'

export const YachtParallax: Block = {
  slug: 'yachtParallax',
  interfaceName: 'YachtParallax',
  fields: [
    {
      name: 'scrollWindows',
      type: 'relationship',
      relationTo: 'scroll-window',
      label: 'Scroll Windows',
      hasMany: true,
      admin: {
        description: 'Select Scroll Windows to display in this parallax section',
      },
    },
  ],
}
