'use client'

import React from 'react'

import type { VideoSideScroller as VideoSideScrollerType } from '@/payload-types'

import { Media } from '@/components/Media'
import './Component.css'

type Props = {
  disableInnerContainer?: boolean
} & VideoSideScrollerType

export const VideoSideScroller: React.FC<Props> = (props) => {
  const { title, subtitle, videoLayout, videos } = props

  // Only render grid layout for now
  if (videoLayout !== 'grid') {
    return null
  }

  if (!videos || !Array.isArray(videos) || videos.length === 0) {
    return null
  }

  return (
    <div className="container">
      <div className="video-side-scroller-grid-outer">
        {/* Title/Subtitle Container */}
        {(title || subtitle) && (
          <div className="mb-8 md:mb-0">
            {title && <h2 className="text-heading-2 font-semibold mb-2">{title}</h2>}
            {subtitle && <p className="text-lg">{subtitle}</p>}
          </div>
        )}

        {/* Video Grid Container */}
        <div className="video-side-scroller-grid-inner">
          {videos.map((videoCard, index) => {
            if (videoCard.blockType === 'standardCard') {
              const { title: cardTitle, backgroundMedia } = videoCard
              return (
                <div
                  key={videoCard.id || index}
                  className="media-cont relative rounded-2xl overflow-hidden"
                >
                  {backgroundMedia && (
                    <Media
                      htmlElement="div"
                      className="absolute inset-0 w-full h-full"
                      resource={backgroundMedia}
                      videoClassName="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  {cardTitle && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-10 text-white">
                      <h3 className="text-sm font-medium">{cardTitle}</h3>
                    </div>
                  )}
                </div>
              )
            }
            return null
          })}
        </div>
      </div>
    </div>
  )
}
