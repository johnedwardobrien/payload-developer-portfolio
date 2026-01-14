'use client'

import React from 'react'
import type { Parallax } from '@react-spring/parallax'

import { Media } from '@/components/Media'

type Props = {
  disableInnerContainer?: boolean
  title?: string
  subtitle?: string
  heroImage?: any
  index?: number
  windowId?: string
  [key: string]: unknown
} & React.ComponentProps<typeof Parallax>

export const TopHero: React.FC<Props> = (props) => {
const { title, subtitle, heroImage, disableInnerContainer: _disableInnerContainer, index, windowId } = props
  return (
    <div
      className={`TopHero${index ? ` item-${index}` : ''}${windowId}`}
    >
      {heroImage && typeof heroImage === 'object' && (
        <div className="media-cont">
          <Media
            className="media"
            htmlElement="div"
            resource={heroImage}
          />
        </div>
      )}
      <div className="content">
        <div className="content-left">
          {title && <h1 className="title">{title}</h1>}
          {subtitle && <p className="subtitle">{subtitle}</p>}
        </div>
      </div>
      <div className='bg-mask'></div>
    </div>
  )
}
