'use client'

import React, { useCallback } from 'react'

import type { StandardCard } from '@/payload-types'

import { Media } from '@/components/Media'
import './VideoCard.css'
import { useYachtParallax } from '@/providers/YachtParallax'

type Props = {
  card: StandardCard
  posterSrc?: string
}

export const VideoCard: React.FC<Props> = ({ card, posterSrc }) => {
  const { title, backgroundMedia } = card
  const { ypData, isWithinProvider } = useYachtParallax()

  const handleRenderVideo = useCallback(() => {
    if ((backgroundMedia && ypData?.topHeroLoaded) || !isWithinProvider) {
      return (
        <Media
          htmlElement="div"
          className="video-cont"
          resource={backgroundMedia}
          posterSrc={posterSrc}
        />
      )
    }
    return null
  }, [ypData])

  return (
    <div className="video-card">
      {handleRenderVideo()}
      {title && <h3 className="title">{title}</h3>}
    </div>
  )
}
