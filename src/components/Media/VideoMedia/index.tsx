'use client'

import { cn } from '@/utilities/ui'
import React, { useRef, useEffect } from 'react'

import type { Props as MediaProps } from '../types'

import { getMediaUrl } from '@/utilities/getMediaUrl'

export const VideoMedia: React.FC<MediaProps> = (props) => {
  const { onClick, resource, videoClassName, posterSrc = '' } = props

  const videoRef = useRef<HTMLVideoElement>(null)

  if (resource && typeof resource === 'object') {
    const { filename, url, thumbnailURL } = resource

    return (
      <video
        autoPlay
        className={cn(videoClassName)}
        controls={false}
        loop
        muted
        onClick={onClick}
        playsInline
        ref={videoRef}
        preload="none"
        poster={posterSrc}
      >
        <source src={getMediaUrl(url)} />
      </video>
    )
  }

  return null
}
