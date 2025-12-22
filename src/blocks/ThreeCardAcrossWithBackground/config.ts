import type { Block } from 'payload'

import { ThreeCard } from '../ThreeCard/config'

export const ThreeCardAcrossWithBackground: Block = {
  slug: 'threeCardAcrossWithBackground',
  interfaceName: 'ThreeCardAcrossWithBackground',
  fields: [
    {
      name: 'cards',
      type: 'blocks',
      label: 'Cards',
      blocks: [ThreeCard],
    },
  ],
}
