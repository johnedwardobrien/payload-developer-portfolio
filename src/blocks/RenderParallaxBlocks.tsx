import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { TopHero } from '@/blocks/TopHero/Component'
import { VideoSideScroller } from '@/blocks/VideoSideScroller/Component'
import { LayeredCards } from '@/blocks/LayeredCards/Component'
import { EventSideScroller } from '@/blocks/EventSideScroller/Component'
import { ThreeCardAcrossWithBackground } from '@/blocks/ThreeCardAcrossWithBackground/Component'
import { CTAButtons } from '@/blocks/CTAButtons/Component'
import { ClickSlider } from '@/blocks/ClickSlider/Component'
import { IconBanner } from '@/blocks/IconBanner/Component'
import { ScrollWindow } from '@/blocks/ScrollWindow/Component'

const blockComponents = {
  topHero: TopHero,
  videoSideScroller: VideoSideScroller,
  layeredCards: LayeredCards,
  eventSideScroller: EventSideScroller,
  threeCardAcrossWithBackground: ThreeCardAcrossWithBackground,
  ctaButtons: CTAButtons,
  clickSlider: ClickSlider,
  iconBanner: IconBanner,
  scrollWindow: ScrollWindow,
}

export const RenderParallaxBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType as keyof typeof blockComponents]

            if (Block) {
              //@ts-expect-error
              return <Block key={block.id} {...block} disableInnerContainer />
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
