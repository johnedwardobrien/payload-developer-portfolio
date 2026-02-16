'use client'
import { cn } from '@/utilities/ui'
import React, { useRef } from 'react'
import type { Props as MediaProps } from '../types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { Media as MediaType } from '@/payload-types'
import { useInView } from 'framer-motion'

export const VideoMedia: React.FC<MediaProps> = (props) => {
  const {
    onClick,
    resource,
    videoClassName,
    posterSrc = '',
    topHero,
    onCanPlayCb,
    onCanPlayThroughCb,
  } = props
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoContRef = useRef<HTMLDivElement>(null)
  // once: true means it stays mounted after first view
  const isInView = useInView(videoContRef, { once: true, margin: '500px' })
  let resourceArr = []
  if (Array.isArray(resource)) {
    resourceArr = [...resource]
  } else {
    resourceArr.push(resource)
  }
  if (resource && typeof resource === 'object') {
    return (
      <div className="video-media-cont" ref={videoContRef}>
        {(isInView || topHero) && (
          <video
            className={cn(videoClassName)}
            controls={false}
            autoPlay
            loop
            muted
            onClick={onClick}
            playsInline
            ref={videoRef}
            preload={'auto'}
            poster={posterSrc}
            onCanPlay={() => {
              if (onCanPlayCb) {
                onCanPlayCb()
              }
            }}
            onCanPlayThrough={() => {
              if (onCanPlayThroughCb) {
                onCanPlayThroughCb()
              }
            }}
          >
            {resourceArr.map((item, index) => {
              if (typeof item === 'object' && item !== null && 'url' in item) {
                return <source key={index} src={getMediaUrl(item.url)} />
              }
              return null
            })}
          </video>
        )}
      </div>
    )
  }
  return null
}
