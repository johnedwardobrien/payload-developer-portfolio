import type { Block } from 'payload'

import { StandardCard } from '../StandardCard/config'

export const VideoSideScroller: Block = {
  slug: 'videoSideScroller',
  interfaceName: 'VideoSideScroller',
  fields: [
    {
      name: 'videoLayout',
      type: 'select',
      label: 'Video Layout',
      options: [
        {
          label: 'Grid',
          value: 'grid',
        },
        {
          label: 'Single Grow/Shrink',
          value: 'singleGrowShrink',
        },
        {
          label: 'Layered Cards',
          value: 'layeredCards',
        },
      ],
    },
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
      name: 'buttonText1',
      type: 'text',
      label: 'Button Text 1',
    },
    {
      name: 'buttonText2',
      type: 'text',
      label: 'Button Text 2',
    },
    {
      name: 'nextWindowText',
      type: 'text',
      label: 'Next Window Text',
    },
    {
      name: 'videos',
      type: 'blocks',
      label: 'Videos',
      blocks: [StandardCard],
    },
  ],
}
