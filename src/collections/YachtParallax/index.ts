import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { TopHeroWithIcons } from '../../blocks/TopHeroWithIcons/config'
import { VideoSideScroller } from '../../blocks/VideoSideScroller/config'
import { LayeredCards } from '../../blocks/LayeredCards/config'
import { EventSideScroller } from '../../blocks/EventSideScroller/config'
import { ThreeCardAcrossWithBackground } from '../../blocks/ThreeCardAcrossWithBackground/config'
import { CTAButtons } from '../../blocks/CTAButtons/config'
import { slugField } from 'payload'

export const YachtParallax: CollectionConfig = {
  slug: 'yachtParallax',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'blocks',
              type: 'blocks',
              blocks: [
                TopHeroWithIcons,
                VideoSideScroller,
                LayeredCards,
                EventSideScroller,
                ThreeCardAcrossWithBackground,
                CTAButtons,
              ],
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
      ],
    },
    slugField(),
  ],
}
