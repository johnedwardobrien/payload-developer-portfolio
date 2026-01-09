import React, { Fragment } from 'react'

import type { YachtParallaxItem } from '@/payload-types'

import { TopHero } from '@/blocks/TopHero/Component'
import { VideoSideScroller } from '@/blocks/VideoSideScroller/Component'
import { LayeredCards } from '@/blocks/LayeredCards/Component'
import { EventSideScroller } from '@/blocks/EventSideScroller/Component'
import { ThreeCardAcrossWithBackground } from '@/blocks/ThreeCardAcrossWithBackground/Component'
import { CTAButtons } from '@/blocks/CTAButtons/Component'
import { ClickSlider } from '@/blocks/ClickSlider/Component'
import { IconBanner } from '@/blocks/IconBanner/Component'

const yachtParallaxItemComponents = {
  topHero: TopHero,
  videoSideScroller: VideoSideScroller,
  layeredCards: LayeredCards,
  eventSideScroller: EventSideScroller,
  threeCardAcrossWithBackground: ThreeCardAcrossWithBackground,
  ctaButtons: CTAButtons,
  clickSlider: ClickSlider,
  iconBanner: IconBanner,
}

export const RenderYachtParallaxItems: React.FC<{
  items: (string | YachtParallaxItem)[]
  passIndex?: boolean
}> = (props) => {
  const { items, passIndex } = props

  if (!items || !Array.isArray(items) || items.length === 0) {
    return null
  }

  // Filter out string IDs (unpopulated relationships)
  const validItems = items.filter(
    (item): item is YachtParallaxItem => typeof item === 'object' && item !== null,
  )

  if (validItems.length === 0) {
    return null
  }

  return (
    <Fragment>
      {validItems.map((item, index) => {
        const { blockType, id } = item

        if (blockType && blockType in yachtParallaxItemComponents) {
          const Component =
            yachtParallaxItemComponents[blockType as keyof typeof yachtParallaxItemComponents]

          if (Component) {
            //@ts-expect-error
            return <Component
                  key={id}
                  {...item}
                  disableInnerContainer
                  {...(passIndex && { index: index + 1 })}
                />
          }
        }
        return null
      })}
    </Fragment>
  )
}
