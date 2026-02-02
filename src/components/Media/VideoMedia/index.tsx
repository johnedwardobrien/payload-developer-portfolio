'use client'

import { cn } from '@/utilities/ui'
import React, { useRef, useEffect } from 'react'

import type { Props as MediaProps } from '../types'

import { getMediaUrl } from '@/utilities/getMediaUrl'

export const VideoMedia: React.FC<MediaProps> = (props) => {
  const { onClick, resource, videoClassName } = props

  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch((error) => {
              console.log('Video play failed:', error)
            })
          } else {
            video.pause()
          }
        })
      },
      {
        rootMargin: '50px 0',
      },
    )

    observer.observe(video)

    return () => {
      observer.disconnect()
    }
  }, [resource])

  if (resource && typeof resource === 'object') {
    const { filename, url, thumbnailURL } = resource

    return (
      <video
        className={cn(videoClassName)}
        controls={false}
        loop
        muted
        onClick={onClick}
        playsInline
        ref={videoRef}
      >
        <source src={getMediaUrl(url)} />
      </video>
    )
  }

  return null
}
