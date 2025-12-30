'use client'

import React, { useState, useEffect } from 'react'

import type { VideoSideScroller as VideoSideScrollerType } from '@/payload-types'

import { VideoCard } from '@/components/VideoCard'
import { VideoLayeredCards } from './VideoLayeredCards'
import './Component.css'

type Props = {
  disableInnerContainer?: boolean
} & VideoSideScrollerType

export const VideoSideScroller: React.FC<Props> = (props) => {
  const { title, subtitle, videoLayout, videos, buttonText1 } = props
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!videos || !Array.isArray(videos) || videos.length === 0) {
    return null
  }

  const validVideos = videos.filter((video) => video.blockType === 'standardCard')

  if (validVideos.length === 0) {
    return null
  }

  const isGridLayout = videoLayout === 'grid'
  const isSingleLayout = videoLayout === 'singleGrowShrink'
  const isLayeredCardsLayout = videoLayout === 'layeredCards'

  // Layered Cards Layout
  if (isLayeredCardsLayout) {
    return (
      <div className="container my-5">
        <div className="video-side-scroller-layered-outer">
          {/* Template Title at Top */}
          <div className="video-side-scroller-layered-header">
            {title && <h2 className="text-heading-2 font-semibold mb-2">{title}</h2>}
          </div>

          {/* Mobile: Layered Cards Layout */}
          {isMobile ? (
            <VideoLayeredCards cards={validVideos} buttonText={buttonText1} />
          ) : (
            /* Tablet/Desktop: Will be implemented later */
            <div>Tablet/Desktop layout coming soon</div>
          )}
        </div>
      </div>
    )
  }

  // Grid and Single Grow/Shrink Layouts
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
