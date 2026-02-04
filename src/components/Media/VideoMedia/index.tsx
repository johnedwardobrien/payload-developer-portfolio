'use client'
import { cn } from '@/utilities/ui'
import React, { useRef, useEffect, useCallback } from 'react'
import type { Props as MediaProps } from '../types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { useYachtParallax } from '@/providers/YachtParallax'
import { cloneDeep } from 'lodash'

export const VideoMedia: React.FC<MediaProps> = (props) => {
  const { onClick, resource, videoClassName, posterSrc = '', topHero } = props
  const { ypData, setYpData, isWithinProvider } = useYachtParallax()
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
        onCanPlay={() => {
          if (isWithinProvider && topHero && !ypData?.topHeroLoaded) {
            setYpData((prev: any) => {
              const newData = cloneDeep(prev)
              newData.topHeroLoaded = true
              return newData
            })
          }
        }}
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
