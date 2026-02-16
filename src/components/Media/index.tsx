import React, { Fragment } from 'react'

import { cn } from '@/utilities/ui'

import type { Props } from './types'

import { ImageMedia } from './ImageMedia'
import { VideoMedia } from './VideoMedia'
import type { Media as MediaType } from '@/payload-types'

export const Media: React.FC<Props> = (props) => {
  const { className, htmlElement = 'div', resource } = props
  let isVideo: any
  if (Array.isArray(resource)) {
    isVideo = (resource as MediaType[]).find((obj: MediaType) => !!obj?.mimeType?.includes('video'))
  } else {
    isVideo = (resource as MediaType)?.mimeType?.includes('video')
  }
  const Tag = htmlElement || Fragment
  return (
    <Tag
      {...(htmlElement !== null
        ? {
            className: className,
          }
        : {})}
    >
      {!!isVideo ? <VideoMedia {...props} /> : <ImageMedia {...props} />}
      <div className="bg-mask"></div>
    </Tag>
  )
}
