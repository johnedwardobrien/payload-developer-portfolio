import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { TopHeroWithIcons } from '@/blocks/TopHeroWithIcons/Component'
import { VideoSideScroller } from '@/blocks/VideoSideScroller/Component'
import { LayeredCards } from '@/blocks/LayeredCards/Component'
import { EventSideScroller } from '@/blocks/EventSideScroller/Component'
import { ThreeCardAcrossWithBackground } from '@/blocks/ThreeCardAcrossWithBackground/Component'
import { CTAButtons } from '@/blocks/CTAButtons/Component'
import { ClickSlider } from '@/blocks/ClickSlider/Component'

const blockComponents = {
  topHeroWithIcons: TopHeroWithIcons,
  videoSideScroller: VideoSideScroller,
  layeredCards: LayeredCards,
  eventSideScroller: EventSideScroller,
  threeCardAcrossWithBackground: ThreeCardAcrossWithBackground,
  ctaButtons: CTAButtons,
  clickSlider: ClickSlider,
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
              return (
                <div className="my-16" key={`${index}-block`}>
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
