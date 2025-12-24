'use client'

import React from 'react'
import { Parallax } from 'react-scroll-parallax'

import { Media } from '@/components/Media'

type Props = {
  disableInnerContainer?: boolean
  title?: string
  subtitle?: string
  heroImage?: any
  [key: string]: unknown
} & React.ComponentProps<typeof Parallax>

export const TopHero: React.FC<Props> = (props) => {
  const {
    title,
    subtitle,
    heroImage,
    disableInnerContainer: _disableInnerContainer,
    ...parallaxProps
  } = props
  console.log(heroImage && typeof heroImage === 'object')
  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      {heroImage && typeof heroImage === 'object' && (
        <div className="absolute inset-0 -z-10">
          <Media fill imgClassName="object-cover" priority resource={heroImage} />
        </div>
      )}

      {/* Content - Mobile: left aligned at bottom */}
      <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 z-10">
        <Parallax {...(parallaxProps as React.ComponentProps<typeof Parallax>)}>
          <div className="text-left text-white">
            {title && <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">{title}</h1>}
            {subtitle && <p className="text-lg md:text-xl lg:text-2xl">{subtitle}</p>}
          </div>
        </Parallax>
      </div>
    </div>
  )
}
