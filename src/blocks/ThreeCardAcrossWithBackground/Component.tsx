import React from 'react'

import type { ThreeCardAcrossWithBackground as ThreeCardAcrossWithBackgroundType } from '@/payload-types'

import { Media } from '@/components/Media'
import './Component.css'

type Props = {
  disableInnerContainer?: boolean
} & ThreeCardAcrossWithBackgroundType

export const ThreeCardAcrossWithBackground: React.FC<Props> = (props) => {
  const { threeCards } = props

  if (!threeCards || threeCards.length === 0) {
    return null
  }

  return (
    <div className="three-card-outer-container md:hidden">
      {threeCards.map((card, cardIndex) => {
        if (card.blockType !== 'threeCard') return null

        const { title, subtitle, backgroundMedia } = card

        return (
          <div
            key={card.id || cardIndex}
            className="three-card relative overflow-hidden rounded-2xl"
          >
            {/* Background Media - Full Height and Width */}
            {backgroundMedia && typeof backgroundMedia === 'object' && (
              <div className="media absolute inset-0 z-0 w-full h-full rounded-2xl overflow-hidden">
                <Media
                  resource={backgroundMedia}
                  fill
                  className="relative w-full h-full"
                  imgClassName="object-cover w-full h-full rounded-2xl"
                  pictureClassName="absolute inset-0 w-full h-full rounded-2xl"
                  videoClassName="absolute inset-0 w-full h-full object-cover rounded-2xl"
                />
              </div>
            )}

            {/* Content Overlay */}
            <div className="content absolute inset-0 z-10 h-full flex flex-col">
              {/* Title and Subtitle - Right Aligned */}
              <div className="flex flex-col items-end mb-auto">
                {title && (
                  <h2 className="text-heading-2 font-semibold text-white mb-2 text-right">
                    {title}
                  </h2>
                )}
                {subtitle && <p className="text-base text-white/90 text-right">{subtitle}</p>}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
