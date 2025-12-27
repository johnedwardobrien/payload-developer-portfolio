'use client'

import React from 'react'

import type { VideoSideScroller as VideoSideScrollerType } from '@/payload-types'

import { VideoCard } from '@/components/VideoCard'
import './Component.css'

type Props = {
  disableInnerContainer?: boolean
} & VideoSideScrollerType

export const VideoSideScroller: React.FC<Props> = (props) => {
  const { title, subtitle, videoLayout, videos, buttonText1 } = props

  if (!videos || !Array.isArray(videos) || videos.length === 0) {
    return null
  }

  const isGridLayout = videoLayout === 'grid'
  const isSingleLayout = videoLayout === 'singleGrowShrink'

  if (!isGridLayout && !isSingleLayout) {
    return null
  }

  return (
    <div className="container my-5">
      <div
        className={`video-side-scroller-grid-outer ${isSingleLayout ? 'grow-shrink-outer' : ''}`}
      >
        {/* Header Container */}
        <div className={isGridLayout ? 'mb-8 md:mb-0' : ''}>
          {title && <h2 className="text-heading-2 font-semibold mb-2">{title}</h2>}
          {isGridLayout && subtitle && <p className="text-lg">{subtitle}</p>}
          {isSingleLayout && buttonText1 && <p className="text-lg">{buttonText1}</p>}
        </div>

        {/* Video Container */}
        <div
          className={`video-side-scroller-grid-inner ${isGridLayout ? 'grid-layout' : 'grow-shrink-layout'}`}
        >
          {videos.map((videoCard, index) => {
            if (videoCard.blockType === 'standardCard') {
              return <VideoCard key={videoCard.id || index} card={videoCard} />
            }
            return null
          })}
        </div>
      </div>
    </div>
  )
}
