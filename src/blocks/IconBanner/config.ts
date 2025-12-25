import type { Block } from 'payload'

import { IconButton } from '../IconButton/config'

export const IconBanner: Block = {
  slug: 'iconBanner',
  interfaceName: 'IconBanner',
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
      name: 'icons',
      type: 'blocks',
      label: 'Icons',
      blocks: [IconButton],
    },
  ],
}
