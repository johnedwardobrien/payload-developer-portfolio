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
    <div className="video-card">
      {backgroundMedia && (
        <Media htmlElement="div" className="video-cont" resource={backgroundMedia} />
      )}
      {title && <h3 className="title">{title}</h3>}
    </div>
  )
}
