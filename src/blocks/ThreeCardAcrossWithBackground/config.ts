import type { Block } from 'payload'

import { ThreeCard } from '../ThreeCard/config'

export const ThreeCardAcrossWithBackground: Block = {
  slug: 'threeCardAcrossWithBackground',
  interfaceName: 'ThreeCardAcrossWithBackground',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'mainBackground',
      type: 'upload',
      relationTo: 'media',
      label: 'Main Background',
    },
    {
      name: 'cards',
      type: 'blocks',
      label: 'Cards',
      blocks: [ThreeCard],
    },
  ],
}
