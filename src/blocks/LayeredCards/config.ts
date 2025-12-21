import type { Block } from 'payload'

import { LayeredCard } from '../LayeredCard/config'

export const LayeredCards: Block = {
  slug: 'layeredCards',
  interfaceName: 'LayeredCards',
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
      name: 'buttonText',
      type: 'text',
      label: 'Button Text',
    },
    {
      name: 'cards',
      type: 'blocks',
      label: 'Cards',
      blocks: [LayeredCard],
    },
  ],
}
