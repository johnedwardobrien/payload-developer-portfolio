import type { Block } from 'payload'

import { TopHero } from '../TopHero/config'
import { VideoSideScroller } from '../VideoSideScroller/config'
import { LayeredCards } from '../LayeredCards/config'
import { EventSideScroller } from '../EventSideScroller/config'
import { ThreeCardAcrossWithBackground } from '../ThreeCardAcrossWithBackground/config'
import { CTAButtons } from '../CTAButtons/config'
import { ClickSlider } from '../ClickSlider/config'
import { IconBanner } from '../IconBanner/config'

export const ScrollWindow: Block = {
  slug: 'scrollWindow',
  interfaceName: 'ScrollWindow',
  fields: [
    {
      name: 'items',
      type: 'relationship',
      relationTo: 'yacht-parallax-item',
      label: 'Yacht Parallax Items',
      hasMany: true,
      admin: {
        description: 'Select Yacht Parallax Items to display in this scroll window',
      },
    },
    {
      name: 'blocks',
      type: 'blocks',
      label: 'Scroll Window Blocks',
      blocks: [
        TopHero,
        VideoSideScroller,
        LayeredCards,
        EventSideScroller,
        ThreeCardAcrossWithBackground,
        CTAButtons,
        ClickSlider,
        IconBanner,
      ],
      admin: {
        initCollapsed: true,
      },
    },
  ],
}
