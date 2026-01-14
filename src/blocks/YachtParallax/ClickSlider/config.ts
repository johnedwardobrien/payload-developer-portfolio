import type { Block } from 'payload'

import { StandardCard } from '../../StandardCard/config'

export const ClickSlider: Block = {
  slug: 'clickSlider',
  interfaceName: 'ClickSlider',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'Button Text',
    },
    {
      name: 'cards',
      type: 'blocks',
      label: 'Cards',
      blocks: [StandardCard],
    },
  ],
}
