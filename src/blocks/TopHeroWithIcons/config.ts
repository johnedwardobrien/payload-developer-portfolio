import type { Block } from 'payload'

import { Placeholder } from '../Placeholder/config'
import { IconButton } from '../IconButton/config'

export const TopHeroWithIcons: Block = {
  slug: 'topHeroWithIcons',
  interfaceName: 'TopHeroWithIcons',
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
		name: 'featuredImageTitle',
		type: 'text',
		label: 'Featured Image Title',
	},
	{
		name: 'featuredImageSubtitle',
		type: 'text',
		label: 'Featured Image Subtitle',
	},
	{
		name: 'featuredImageButtonText',
		type: 'text',
		label: 'Featured Image Button Text',
	},
    {
      name: 'inputPlaceholders',
      type: 'blocks',
      label: 'Input Placeholders',
      blocks: [Placeholder],
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Image',
    },
    {
      name: 'heroFeatured',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Featured',
    },
    {
      name: 'icons',
      type: 'blocks',
      label: 'Icons',
      blocks: [IconButton],
    },
  ],
}
