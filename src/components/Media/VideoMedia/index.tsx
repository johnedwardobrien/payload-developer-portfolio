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
    },
    [ypData, topHero],
  )

  if (resource && typeof resource === 'object') {
    const { filename, url, thumbnailURL } = resource
    if (isWithinProvider) {
      return (
        <video
          autoPlay
          className={cn(videoClassName)}
          controls={false}
          loop
          muted
          onClick={onClick}
          onCanPlay={() => {
            if (topHero && !ypData?.topHeroLoaded) {
              videoRef.current?.play()
              setYpData((prev: any) => {
                const newData = cloneDeep(prev)
                newData.topHeroLoaded = true
                return newData
              })
            }
          }}
          playsInline
          ref={videoRef}
          preload="none"
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
          playsInline
          ref={videoRef}
          preload="none"
          poster={posterSrc}
        >
          <source src={getMediaUrl(url)} />
        </video>
      )
    }
  }
  return null
}
