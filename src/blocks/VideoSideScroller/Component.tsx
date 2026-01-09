'use client'

import React, { useState, useEffect } from 'react'

import type { YachtParallaxItem } from '@/payload-types'

import { VideoCard } from '@/components/VideoCard'
import { VideoLayeredCards } from './VideoLayeredCards'
import './Component.css'

type VideoSideScrollerProps = Pick<
  YachtParallaxItem,
  'title' | 'subtitle' | 'videoLayout' | 'videos' | 'buttonText1' | 'buttonText2' | 'nextWindowText'
>

type Props = {
  disableInnerContainer?: boolean
} & VideoSideScrollerProps

export const VideoSideScroller: React.FC<Props> = (props) => {
  const { title, subtitle, videoLayout, videos, buttonText1 } = props
  const [isMobile, setIsMobile] = useState(true)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkViewport = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsDesktop(width >= 1024)
    }
    checkViewport()
    window.addEventListener('resize', checkViewport)
    return () => window.removeEventListener('resize', checkViewport)
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
      <div className={`video-side-scroller ${videoLayout} my-5`}>
        <div className="video-side-scroller-layered-outer">
          {/* Mobile/Tablet: Template Title at Top */}
          {!isDesktop && (
            <div className="video-side-scroller-layered-header">
              {title && <h2 className="text-heading-2 font-semibold mb-2">{title}</h2>}
            </div>
          )}

          {/* Mobile/Tablet: Layered Cards Layout with swipe */}
          {/* Desktop: Two-column layout */}
          <VideoLayeredCards
            cards={validVideos}
            buttonText={buttonText1}
            title={title}
            isMobile={isMobile}
            isDesktop={isDesktop}
          />
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
