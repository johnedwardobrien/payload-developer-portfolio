'use client'

import React, { useState, useEffect, useRef } from 'react'

import type { YachtParallaxItem } from '@/payload-types'

import { VideoCard } from '@/components/VideoCard'
import { VideoLayeredCards } from './VideoLayeredCards'
import './Component.css'
import { motion, useScroll, useTransform } from 'framer-motion'
import { GrowShrinkCard } from './GrowShrinkCard'

type VideoSideScrollerProps = Pick<
  YachtParallaxItem,
  'title' | 'subtitle' | 'videoLayout' | 'videos' | 'buttonText1' | 'buttonText2' | 'nextWindowText'
>

type Props = {
  disableInnerContainer?: boolean
  index?: number
  windowId?: string
} & VideoSideScrollerProps

export const VideoSideScroller: React.FC<Props> = (props) => {
  const { title, subtitle, videoLayout, videos, buttonText1, index, windowId } = props
  const [isMobile, setIsMobile] = useState(true)
  const [isDesktop, setIsDesktop] = useState(false)
  const containerRef2 = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef2,
    offset: ["end -100px", "end end"]
  });
  const titleOpacity = useTransform(scrollYProgress, [0, 0.95, 1], [0, 0, 1])

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
      <div className={`VideoSideScroller${` ${videoLayout}`}${index ? ` item-${index}` : ''}${windowId}`} ref={containerRef2}>
        <div className="outer-cont">
          {!isDesktop && (
            <div className={`top-title-cont`}>
              {title && <h2 className="title">{title}</h2>}
            </div>
          )}
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

  if (index === 2) {
    return (
      <div
        className='VideoSideScrollerWrapper'
        ref={containerRef2}
      >
        <div
          className={`VideoSideScroller${isSingleLayout ? ' grow-shrink' : ''}${index ? ` item-${index}` : ''}${windowId}`}
        >
          <div
            className={`outer-cont${isSingleLayout ? ' grow-shrink-outer' : ''}`}
          >
            <motion.div
              className={`top-title-cont`}
              transition={{ duration: .3 }}
              style={{
                opacity: titleOpacity
              }}
            >
              {title && <h2 className="title">{title}</h2>}
              {isGridLayout && subtitle && <p className="subtitle">{subtitle}</p>}
              {isSingleLayout && buttonText1 && <button className="button">{buttonText1}</button>}
            </motion.div>
            <div
              className={`cards-cont${isGridLayout ? ' grid-layout' : ' grow-shrink-layout'}`}
            >
              {videos.map((videoCard, index) => {
                if (videoCard.blockType === 'standardCard') {
                  return <GrowShrinkCard
                    key={videoCard.id}
                    videoCard={videoCard}
                  />
                }
                return null
              })}
              <div className='card placeholder-card'></div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className={`VideoSideScroller${index ? ` item-${index}` : ''}${windowId}`} ref={containerRef2}>
        <div
          className={`outer-cont${isSingleLayout ? ' grow-shrink-outer' : ''}`}
        >
          <div
            className={`top-title-cont`}
          >
            {title && <h2 className="title">{title}</h2>}
            {isGridLayout && subtitle && <p className="subtitle">{subtitle}</p>}
            {isSingleLayout && buttonText1 && <button className="button">{buttonText1}</button>}
          </div>
          <div
            className={`cards-cont${isGridLayout ? ' grid-layout' : ' grow-shrink-layout'}`}
          >
            <div
              className='cards'
            >
              <div className='first-card'></div>
              {videos.map((videoCard, index) => {
                if (videoCard.blockType === 'standardCard') {
                  return <div
                      key={videoCard.id || index}
                      className='card'
                    >
                      <VideoCard card={videoCard} />
                    </div>
                }
                return null
              })}
            </div>
          </div>
        </div>
        <div className='empty-reveal-cont'></div>
      </div>
    )
  }
}
