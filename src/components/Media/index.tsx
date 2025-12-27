import React, { Fragment } from 'react'

import { cn } from '@/utilities/ui'

import type { Props } from './types'

import { ImageMedia } from './ImageMedia'
import { VideoMedia } from './VideoMedia'

export const Media: React.FC<Props> = (props) => {
  const { className, htmlElement = 'div', resource } = props

  const isVideo = typeof resource === 'object' && resource?.mimeType?.includes('video')
  const Tag = htmlElement || Fragment

  return (
    <Tag
      {...(htmlElement !== null
        ? {
            className: cn('relative', className),
          }
        : {})}
    >
      <div className="relative">
        {isVideo ? <VideoMedia {...props} /> : <ImageMedia {...props} />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none z-[1]" aria-hidden="true" />
      </div>
    </Tag>
  )
}
