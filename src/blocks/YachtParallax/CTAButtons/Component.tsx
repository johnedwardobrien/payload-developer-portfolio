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
  index?: number
  id?: string
} & CTAButtonsProps

export const CTAButtons: React.FC<Props> = ({ title, iconButtons, index, id }) => {
  if (!iconButtons || !Array.isArray(iconButtons) || iconButtons.length === 0) {
    return null
  }

  return (
    <div
      className={`CTAButtons cta-buttons ${index ? `item-${index}` : ''}`}
    >
      <div className='curtain'></div>
      <div
        className='inner'
      >
        {title && (
          <h2
            className={cn(
              // Mobile: 48px, center aligned
              'text-[48px] text-left',
              // Tablet: 48px, left aligned
              'md:text-[48px]',
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
            'md:grid md:grid-cols-3 md:gap-6 md:mt-16 md:max-w-[1088px] md:mx-auto',
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
                    'cta-icon-card flex items-center gap-4 w-full',
                    // Mobile: padding 21px 20px, font-size 18px, height 48px
                    'py-[21px] px-5 text-[18px] h-12',
                    // Card styling with background and border
                    'bg-card border border-border rounded',
                  )}
                >
                  {iconTitle && <span className="text-foreground font-medium">{iconTitle}</span>}
                  {IconComponent && <IconComponent className="w-6 h-6 text-foreground shrink-0" />}
                </div>
              )
            }
            return null
          })}
        </div>
      </div>
    </div>
  )
}
