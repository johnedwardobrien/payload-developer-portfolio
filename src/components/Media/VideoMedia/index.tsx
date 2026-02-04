'use client'
import { cn } from '@/utilities/ui'
import React, { useRef, useEffect, useCallback } from 'react'
import type { Props as MediaProps } from '../types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export const VideoMedia: React.FC<MediaProps> = (props) => {
  const { onClick, resource, videoClassName, posterSrc = '', topHero } = props
  const videoRef = useRef<HTMLVideoElement>(null)

  if (resource && typeof resource === 'object') {
    const { filename, url, thumbnailURL } = resource
    return (
      <video
        className={cn(videoClassName)}
        controls={false}
        autoPlay
        loop
        muted
        onClick={onClick}
        playsInline
        ref={videoRef}
        preload={topHero ? 'auto' : 'metadata'}
        poster={posterSrc}
      >
        <source src={getMediaUrl(url)} />
      </video>
    )
  }
  return null
}
