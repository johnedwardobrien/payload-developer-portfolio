'use client'

import React from 'react'
import {
  FaSeedling,
  FaSun,
  FaLeaf,
  FaSnowflake,
  FaAnchor,
  FaShip,
  FaCompass,
  FaLifeRing,
  FaSwimmingPool,
  FaBinoculars,
} from 'react-icons/fa'
import { cn } from '@/utilities/ui'
import type { YachtParallaxItem } from '@/payload-types'

// Icon mapping object for IconButton icon select values
const iconMap = {
  spring: FaSeedling,
  summer: FaSun,
  autumn: FaLeaf,
  winter: FaSnowflake,
  anchor: FaAnchor,
  ship: FaShip,
  compass: FaCompass,
  lifeRing: FaLifeRing,
  waterWaves: FaSwimmingPool,
  binoculars: FaBinoculars,
} as const

type CTAButtonsProps = Pick<YachtParallaxItem, 'title' | 'iconButtons'>

type Props = {
  disableInnerContainer?: boolean
} & CTAButtonsProps

export const CTAButtons: React.FC<Props> = ({ title, iconButtons }) => {
  if (!iconButtons || !Array.isArray(iconButtons) || iconButtons.length === 0) {
    return null
  }

  return (
    <div className="cta-buttons container my-8 md:my-12">
      {title && (
        <h2
          className={cn(
            // Mobile: 48px, center aligned
            'text-[48px] text-center',
            // Tablet: 48px, left aligned
            'md:text-[48px] md:text-left',
            // Desktop: 88px, center aligned
            'lg:text-[88px] lg:text-center',
          )}
        >
          {title}
        </h2>
      )}
      <div
        className={cn(
          'flex flex-col gap-4 mt-6 md:mt-8',
          // Desktop: grid with 3 columns, gap 24px, margin-top 64px, max-width 1088px, centered
          'lg:grid lg:grid-cols-3 lg:gap-6 lg:mt-16 lg:max-w-[1088px] lg:mx-auto',
        )}
      >
        {iconButtons.map((iconButton, index) => {
          if (typeof iconButton === 'object' && iconButton.blockType === 'iconButton') {
            const { icon, title: iconTitle } = iconButton
            const IconComponent =
              icon && icon in iconMap ? iconMap[icon as keyof typeof iconMap] : null

            return (
              <div
                key={iconButton.id || index}
                className={cn(
                  'flex items-center gap-4 w-full',
                  // Mobile: padding 21px 20px, font-size 18px, height 48px
                  'py-[21px] px-5 text-[18px] h-12',
                  // Card styling with background and border
                  'bg-card border border-border rounded',
                )}
              >
                {IconComponent && <IconComponent className="w-6 h-6 text-foreground shrink-0" />}
                {iconTitle && <span className="text-foreground font-medium">{iconTitle}</span>}
              </div>
            )
          }
          return null
        })}
      </div>
    </div>
  )
}
