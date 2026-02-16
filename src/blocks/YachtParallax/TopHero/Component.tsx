'use client'
import { useState, useEffect } from 'react'
import type { Parallax } from '@react-spring/parallax'

import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import { motion } from 'framer-motion'
import './Component.css'

type Props = {
  disableInnerContainer?: boolean
  title?: string
  subtitle?: string
  heroImage?: any
  heroFeatured?: (string | null) | MediaType
  featuredImageTitle?: string | null
  featuredImageSubtitle?: string | null
  featuredImageButtonText?: string | null
  index?: number
  windowId?: string
  [key: string]: unknown
} & React.ComponentProps<typeof Parallax>

const StandardCardContent: React.FC<{
  cardTitle?: string | null
  buttonText?: string | null
  cardMedia?: (string | null) | MediaType
}> = ({ cardTitle, buttonText, cardMedia }) => {
  return (
    <div className="featured-standard-card">
      {cardMedia && typeof cardMedia === 'object' && (
        <div className="standard-card-background">
          <Media
            resource={cardMedia}
            fill
            className="standard-card-media"
            imgClassName="standard-card-img"
            pictureClassName="standard-card-picture"
            videoClassName="standard-card-video"
            posterSrc="/video-poster-yacht-bazaar.png"
            placeholderBlur="/video-poster-yacht-bazaar.png"
          />
        </div>
      )}

      <div className="standard-card-content">
        <div className="standard-card-content-inner">
          {cardTitle && <h3 className="standard-card-title">{cardTitle}</h3>}
          {buttonText && <button className="standard-card-button">{buttonText}</button>}
        </div>
      </div>
    </div>
  )
}

export const TopHero: React.FC<Props> = (props) => {
  const {
    title,
    subtitle,
    heroImage,
    heroFeatured,
    featuredImageTitle,
    featuredImageSubtitle,
    featuredImageButtonText,
    disableInnerContainer: _disableInnerContainer,
    index,
    windowId,
  } = props

  return (
    <div className={`TopHero${index ? ` item-${index}` : ''}${windowId}`}>
      {heroImage && typeof heroImage === 'object' && (
        <div className="media-cont">
          <Media
            className="media"
            htmlElement="div"
            resource={heroImage}
            posterSrc="/video-poster-yacht-bazaar.png"
            placeholderBlur="/video-poster-yacht-bazaar.png"
            topHero
          />
        </div>
      )}
      <div className="inner">
        <div className="content">
          <div className="content-left">
            {title && <h1 className="title">{title}</h1>}
            {subtitle && <p className="subtitle">{subtitle}</p>}
          </div>
        </div>
        <motion.div
          className="featured-media-cont"
          initial={{ y: '5vh', opacity: 0 }}
          animate={{ y: '0vh', opacity: 1 }}
          transition={{ duration: 0.2, delay: 2.5 }}
        >
          {heroFeatured && typeof heroFeatured === 'object' && (
            <div className="featured-media-bg">
              <Media
                resource={(heroFeatured.sizes?.thumbnail as MediaType) ?? null}
                fill
                className="relative w-full h-full"
                imgClassName="object-cover w-full h-full"
                pictureClassName="absolute inset-0 w-full h-full"
                videoClassName="absolute inset-0 w-full h-full object-cover"
                posterSrc="/video-poster-yacht-bazaar.png"
                placeholderBlur="/video-poster-yacht-bazaar.png"
                priority
                fetchPriority="high"
              />
            </div>
          )}
          <div className="content">
            <div className="inner">
              {featuredImageSubtitle && (
                <div className="row-top">
                  {featuredImageSubtitle && (
                    <span className="subtitle">{featuredImageSubtitle}</span>
                  )}
                </div>
              )}
              {featuredImageTitle && (
                <div className="row-middle">
                  <h2 className="card-title text-heading-2">{featuredImageTitle}</h2>
                </div>
              )}
              {featuredImageButtonText && (
                <div className="row-bottom">
                  <button>{featuredImageButtonText}</button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
      <div className="bg-mask"></div>
    </div>
  )
}
