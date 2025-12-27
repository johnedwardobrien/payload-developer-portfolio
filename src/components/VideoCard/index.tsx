'use client'

import React from 'react'

import type { StandardCard } from '@/payload-types'

import { Media } from '@/components/Media'
import './VideoCard.css'

type Props = {
  card: StandardCard
}

export const VideoCard: React.FC<Props> = ({ card }) => {
  const { title, backgroundMedia } = card

  return (
    <div className="video-card media-cont relative rounded-2xl overflow-hidden">
      {backgroundMedia && (
        <Media
          htmlElement="div"
          className="absolute inset-0 w-full h-full"
          resource={backgroundMedia}
          videoClassName="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {title && (
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10 text-white">
          <h3 className="text-sm font-medium">{title}</h3>
        </div>
      )}
    </div>
  )
}
