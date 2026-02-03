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

  const handleYpVidSrc = useCallback(
    (url?: string | null) => {
      if (!url) return null
      if (topHero) {
        return <source src={getMediaUrl(url)} />
      } else if (ypData?.topHeroLoaded) {
        return <source src={getMediaUrl(url)} />
      }
      return null
    },
    [ypData, topHero],
  )

  if (resource && typeof resource === 'object') {
    const { filename, url, thumbnailURL } = resource
    if (isWithinProvider) {
      return (
        <video
          className={cn(videoClassName)}
          controls={false}
          autoPlay
          loop
          muted
          onClick={onClick}
          onCanPlay={async () => {
            if (topHero && !ypData?.topHeroLoaded) {
              setYpData((prev: any) => {
                const newData = cloneDeep(prev)
                newData.topHeroLoaded = true
                return newData
              })
            }
          }}
          onError={(e) => {
            console.error('Video error:', e.currentTarget.error)
          }}
          playsInline
          ref={videoRef}
          preload="metadata"
          poster={posterSrc}
        >
          {handleYpVidSrc(url)}
        </video>
      )
    } else {
      return (
        <video
          autoPlay
          className={cn(videoClassName)}
          controls={false}
          loop
          muted
          onClick={onClick}
          onError={(e) => {
            console.error('Video error:', e.currentTarget.error)
          }}
          playsInline
          ref={videoRef}
          preload="metadata"
          poster={posterSrc}
        >
          <source src={getMediaUrl(url)} />
        </video>
      )
    }
  }
  return null
}
