import React, { Fragment, useState } from 'react'

import type { YachtParallaxItem } from '@/payload-types'

import { TopHero } from '@/blocks/YachtParallax/TopHero/Component'
import { VideoSideScroller } from '@/blocks/YachtParallax/VideoSideScroller/Component'
import { LayeredCards } from '@/blocks/YachtParallax/LayeredCards/Component'
import { EventSideScroller } from '@/blocks/YachtParallax/EventSideScroller/Component'
import { ThreeCardAcrossWithBackground } from '@/blocks/YachtParallax/ThreeCardAcrossWithBackground/Component'
import { CTAButtons } from '@/blocks/YachtParallax/CTAButtons/Component'
import { ClickSlider } from '@/blocks/YachtParallax/ClickSlider/Component'
import { IconBanner } from '@/blocks/YachtParallax/IconBanner/Component'

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
  windowId?: string
}> = (props) => {
  const { items, passIndex, windowId } = props

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
                  index={index + 1}
                  windowId={windowId}
                />
          }
        }
        return null
      })}
    </Fragment>
  )
}
