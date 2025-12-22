import type { Block } from 'payload'

import { StandardCard } from '../StandardCard/config'

export const ThreeCard: Block = {
  slug: 'threeCard',
  interfaceName: 'ThreeCard',
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
      name: 'backgroundMedia',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Media',
    },
    {
      name: 'cards',
      type: 'blocks',
      label: 'Cards',
      blocks: [StandardCard],
    },
  ],
}
