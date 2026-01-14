import type { Block } from 'payload'

import { IconButton } from '../../IconButton/config'

export const CTAButtons: Block = {
  slug: 'ctaButtons',
  interfaceName: 'CTAButtons',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
    },
    {
      name: 'iconButtons',
      type: 'blocks',
      label: 'Icon Buttons',
      blocks: [IconButton],
    },
  ],
}
