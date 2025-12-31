import type { CollectionConfig, CollectionBeforeChangeHook } from 'payload'

import { authenticated } from '../access/authenticated'
import { Placeholder } from '../blocks/Placeholder/config'
import { StandardCard } from '../blocks/StandardCard/config'
import { EventCard } from '../blocks/EventCard/config'
import { ThreeCard } from '../blocks/ThreeCard/config'
import { IconButton } from '../blocks/IconButton/config'

const blockTypeLabels: Record<string, string> = {
  topHero: 'Top Hero',
  videoSideScroller: 'Video Side Scroller',
  layeredCards: 'Layered Cards',
  eventSideScroller: 'Event Side Scroller',
  threeCardAcrossWithBackground: 'Three Card Across With Background',
  ctaButtons: 'CTA Buttons',
  clickSlider: 'Click Slider',
  iconBanner: 'Icon Banner',
}

const populateDisplayTitle: CollectionBeforeChangeHook = ({ data }) => {
  if (data) {
    const blockTypeLabel = blockTypeLabels[data.blockType as string] || data.blockType
    if (data.title) {
      // Remove existing prefix if present to avoid duplication
      const cleanTitle = data.title.includes(' - ')
        ? data.title.split(' - ').slice(1).join(' - ')
        : data.title

      // Set title with blockType prefix for relationship field display
      data.title = `${blockTypeLabel} - ${cleanTitle}`
      data._displayTitle = `${blockTypeLabel} - ${cleanTitle}`
    } else {
      data._displayTitle = blockTypeLabel || data.id || 'Untitled'
    }
  }
  return data
}

export const YachtParallaxItem: CollectionConfig = {
  slug: 'yacht-parallax-item',
  access: {
    read: authenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['blockType', 'title'],
  },
  hooks: {
    beforeChange: [populateDisplayTitle],
  },
  fields: [
    {
      name: '_displayTitle',
      type: 'text',
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'blockType',
      type: 'select',
      label: 'Block Type',
      required: true,
      options: [
        {
          label: 'Top Hero',
          value: 'topHero',
        },
        {
          label: 'Video Side Scroller',
          value: 'videoSideScroller',
        },
        {
          label: 'Layered Cards',
          value: 'layeredCards',
        },
        {
          label: 'Event Side Scroller',
          value: 'eventSideScroller',
        },
        {
          label: 'Three Card Across With Background',
          value: 'threeCardAcrossWithBackground',
        },
        {
          label: 'CTA Buttons',
          value: 'ctaButtons',
        },
        {
          label: 'Click Slider',
          value: 'clickSlider',
        },
        {
          label: 'Icon Banner',
          value: 'iconBanner',
        },
      ],
    },
    // Title - used by: topHero, videoSideScroller, layeredCards, eventSideScroller, ctaButtons, clickSlider, iconBanner
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      admin: {
        condition: (_data, siblingData) =>
          [
            'topHero',
            'videoSideScroller',
            'layeredCards',
            'eventSideScroller',
            'ctaButtons',
            'clickSlider',
            'iconBanner',
          ].includes(siblingData?.blockType),
      },
    },
    // Subtitle - used by: topHero, videoSideScroller, layeredCards, iconBanner
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
      admin: {
        condition: (_data, siblingData) =>
          ['topHero', 'videoSideScroller', 'layeredCards', 'iconBanner'].includes(
            siblingData?.blockType,
          ),
      },
    },
    // Button Text - used by: layeredCards, eventSideScroller, clickSlider
    {
      name: 'buttonText',
      type: 'text',
      label: 'Button Text',
      admin: {
        condition: (_data, siblingData) =>
          ['layeredCards', 'eventSideScroller', 'clickSlider'].includes(siblingData?.blockType),
      },
    },
    // Button Text 1 - used by: videoSideScroller
    {
      name: 'buttonText1',
      type: 'text',
      label: 'Button Text 1',
      admin: {
        condition: (_data, siblingData) => siblingData?.blockType === 'videoSideScroller',
      },
    },
    // Button Text 2 - used by: videoSideScroller
    {
      name: 'buttonText2',
      type: 'text',
      label: 'Button Text 2',
      admin: {
        condition: (_data, siblingData) => siblingData?.blockType === 'videoSideScroller',
      },
    },
    // Next Window Text - used by: videoSideScroller
    {
      name: 'nextWindowText',
      type: 'text',
      label: 'Next Window Text',
      admin: {
        condition: (_data, siblingData) => siblingData?.blockType === 'videoSideScroller',
      },
    },
    // Video Layout - used by: videoSideScroller
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
      admin: {
        condition: (_data, siblingData) => siblingData?.blockType === 'videoSideScroller',
      },
    },
    // Featured Image Title - used by: topHero
    {
      name: 'featuredImageTitle',
      type: 'text',
      label: 'Featured Image Title',
      admin: {
        condition: (_data, siblingData) => siblingData?.blockType === 'topHero',
      },
    },
    // Featured Image Subtitle - used by: topHero
    {
      name: 'featuredImageSubtitle',
      type: 'text',
      label: 'Featured Image Subtitle',
      admin: {
        condition: (_data, siblingData) => siblingData?.blockType === 'topHero',
      },
    },
    // Featured Image Button Text - used by: topHero
    {
      name: 'featuredImageButtonText',
      type: 'text',
      label: 'Featured Image Button Text',
      admin: {
        condition: (_data, siblingData) => siblingData?.blockType === 'topHero',
      },
    },
    // Input Placeholders - used by: topHero
    {
      name: 'inputPlaceholders',
      type: 'blocks',
      label: 'Input Placeholders',
      blocks: [Placeholder],
      admin: {
        condition: (_data, siblingData) => siblingData?.blockType === 'topHero',
      },
    },
    // Hero Image - used by: topHero
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Image',
      admin: {
        condition: (_data, siblingData) => siblingData?.blockType === 'topHero',
      },
    },
    // Hero Featured - used by: topHero
    {
      name: 'heroFeatured',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Featured',
      admin: {
        condition: (_data, siblingData) => siblingData?.blockType === 'topHero',
      },
    },
    // Videos - used by: videoSideScroller
    {
      name: 'videos',
      type: 'blocks',
      label: 'Videos',
      blocks: [StandardCard],
      admin: {
        condition: (_data, siblingData) => siblingData?.blockType === 'videoSideScroller',
      },
    },
    // Cards - used by: layeredCards, clickSlider
    {
      name: 'cards',
      type: 'blocks',
      label: 'Cards',
      blocks: [StandardCard],
      admin: {
        condition: (_data, siblingData) =>
          ['layeredCards', 'clickSlider'].includes(siblingData?.blockType),
      },
    },
    // Events - used by: eventSideScroller
    {
      name: 'events',
      type: 'blocks',
      label: 'Events',
      blocks: [EventCard],
      admin: {
        condition: (_data, siblingData) => siblingData?.blockType === 'eventSideScroller',
      },
    },
    // Three Cards - used by: threeCardAcrossWithBackground
    {
      name: 'threeCards',
      type: 'blocks',
      label: 'Cards',
      blocks: [ThreeCard],
      admin: {
        condition: (_data, siblingData) =>
          siblingData?.blockType === 'threeCardAcrossWithBackground',
      },
    },
    // Background Image - used by: ctaButtons
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
      admin: {
        condition: (_data, siblingData) => siblingData?.blockType === 'ctaButtons',
      },
    },
    // Icon Buttons - used by: ctaButtons
    {
      name: 'iconButtons',
      type: 'blocks',
      label: 'Icon Buttons',
      blocks: [IconButton],
      admin: {
        condition: (_data, siblingData) => siblingData?.blockType === 'ctaButtons',
      },
    },
    // Icons - used by: iconBanner
    {
      name: 'icons',
      type: 'blocks',
      label: 'Icons',
      blocks: [IconButton],
      admin: {
        condition: (_data, siblingData) => siblingData?.blockType === 'iconBanner',
      },
    },
  ],
}
