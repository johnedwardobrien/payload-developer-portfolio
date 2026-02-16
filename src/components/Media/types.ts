import type { StaticImageData } from 'next/image'
import type { ElementType, Ref } from 'react'

import type { Media as MediaType } from '@/payload-types'

export interface Props {
  alt?: string
  className?: string
  fill?: boolean // for NextImage only
  htmlElement?: ElementType | null
  pictureClassName?: string
  imgClassName?: string
  onClick?: () => void
  onLoad?: () => void
  loading?: 'lazy' | 'eager' // for NextImage only
  priority?: boolean // for NextImage only
  ref?: Ref<HTMLImageElement | HTMLVideoElement | null>
  resource?: MediaType | string | number | null | (MediaType | string | number | null)[] // for Payload media
  size?: string // for NextImage only
  src?: StaticImageData | string // for static media
  videoClassName?: string
  placeholderBlur?: string
  posterSrc?: string
  topHero?: boolean
  fetchPriority?: 'auto' | 'high' | 'low' | undefined
  onLoadCb?: () => void
  onCanPlayCb?: () => void
  onCanPlayThroughCb?: () => void
  responsiveSources?: {
    mobile?: string
    tablet?: string
    desktop?: string
  }
}
