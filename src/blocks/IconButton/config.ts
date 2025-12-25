import type { Block } from 'payload'

export const IconButton: Block = {
  slug: 'iconButton',
  interfaceName: 'IconButton',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'icon',
      type: 'select',
      label: 'Icon',
      options: [
        {
          label: 'Spring',
          value: 'spring',
        },
        {
          label: 'Summer',
          value: 'summer',
        },
        {
          label: 'Autumn',
          value: 'autumn',
        },
        {
          label: 'Winter',
          value: 'winter',
        },
        {
          label: 'Anchor',
          value: 'anchor',
        },
        {
          label: 'Ship',
          value: 'ship',
        },
        {
          label: 'Compass',
          value: 'compass',
        },
        {
          label: 'Life Ring',
          value: 'lifeRing',
        },
        {
          label: 'Water Waves',
          value: 'waterWaves',
        },
        {
          label: 'Binoculars',
          value: 'binoculars',
        },
      ],
    },
  ],
}
