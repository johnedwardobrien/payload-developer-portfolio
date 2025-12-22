import type { Block } from 'payload'

import { StandardCard } from '../StandardCard/config'

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
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
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
      blocks: [StandardCard],
    },
  ],
}
