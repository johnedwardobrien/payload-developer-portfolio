import type { Block } from 'payload'

import { TopHeroWithIcons } from '../TopHeroWithIcons/config'
import { VideoSideScroller } from '../VideoSideScroller/config'
import { LayeredCards } from '../LayeredCards/config'
import { EventSideScroller } from '../EventSideScroller/config'
import { ThreeCardAcrossWithBackground } from '../ThreeCardAcrossWithBackground/config'
import { CTAButtons } from '../CTAButtons/config'
import { ClickSlider } from '../ClickSlider/config'

export const YachtParallax: Block = {
  slug: 'yachtParallax',
  interfaceName: 'YachtParallax',
  fields: [
    {
      name: 'blocks',
      type: 'blocks',
      label: 'Parallax Blocks',
      blocks: [
        TopHeroWithIcons,
        VideoSideScroller,
        LayeredCards,
        EventSideScroller,
        ThreeCardAcrossWithBackground,
        CTAButtons,
        ClickSlider,
      ],
      admin: {
        initCollapsed: true,
      },
    },
  ],
}
