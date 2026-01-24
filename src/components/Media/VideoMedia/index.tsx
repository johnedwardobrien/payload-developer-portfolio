'use client'

import { cn } from '@/utilities/ui'
import React, { useEffect, useRef, useState } from 'react'

import type { Props as MediaProps } from '../types'

import { getMediaUrl } from '@/utilities/getMediaUrl'

export const VideoMedia: React.FC<MediaProps> = (props) => {
  const { onClick, resource, videoClassName, autoPlay = false } = props
  const [autoPlayBool, setAutoPlayBool] = useState(autoPlay)

  const videoRef = useRef<HTMLVideoElement>(null)
  const hasEnabledAutoPlayRef = useRef(false)
  // const [showFallback] = useState<boolean>()

  useEffect(() => {
    const { current: video } = videoRef
    if (video) {
      video.addEventListener('suspend', () => {
        // setShowFallback(true);
        // console.warn('Video was suspended, rendering fallback image.')
      })
    }
  }, [])

  useEffect(() => {
    if (autoPlayBool || hasEnabledAutoPlayRef.current) return

    const video = videoRef.current
    if (!video || typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      setAutoPlayBool(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasEnabledAutoPlayRef.current) {
            hasEnabledAutoPlayRef.current = true
            // setAutoPlayBool(true)
            if (video.paused) {
              void video.play().catch(() => {
                // Autoplay might be blocked; ignore.
              })
            }
            observer.disconnect()
          }
        })
      },
      {
        root: null,
        rootMargin: '250px 0px',
        threshold: 0,
      },
    )
    observer.observe(video)
    return () => {
      observer.disconnect()
    }
  }, [])

  if (resource && typeof resource === 'object') {
    const { filename, url, thumbnailURL } = resource

    return (
      <video
        autoPlay={autoPlay}
        className={cn(videoClassName)}
        controls={false}
        loop
        muted
        onClick={onClick}
        playsInline
        ref={videoRef}
        preload='metadata'
      >
        <source src={getMediaUrl(url)} />
      </video>
    )
  }

  return null
}
