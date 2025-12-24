import type { Block } from 'payload'

import { IconButton } from '../IconButton/config'

export const IconBanner: Block = {
  slug: 'iconBanner',
  interfaceName: 'IconBanner',
  fields: [
    {
      name: 'icons',
      type: 'blocks',
      label: 'Icons',
      blocks: [IconButton],
    },
  ],
}
