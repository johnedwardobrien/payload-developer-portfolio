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

// Icon mapping object for IconButton icon select values
export const seasonIcons = {
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

type Props = {
  disableInnerContainer?: boolean
  title?: string
  subtitle?: string
  icons?: Array<{
    blockType?: string
    icon?: string
    title?: string
    id?: string
  }>
}

export const IconBanner: React.FC<Props> = (props) => {
  const { title, subtitle, icons } = props

  if (!icons || !Array.isArray(icons) || icons.length === 0) {
    return null
  }

  return (
    <div className="icon-banner flex h-[50vh] flex-col items-center justify-center">
      {(title || subtitle) && (
        <div className="flex flex-col items-center">
          {title && <h2 className="text-heading-2 font-semibold">{title}</h2>}
          {subtitle && <p className="icon-banner-subtitle mt-[1.4rem]">{subtitle}</p>}
        </div>
      )}
      <div
        className={`flex flex-row flex-wrap items-center justify-center gap-4 px-4 ${title || subtitle ? 'mt-[1.4rem]' : ''}`}
      >
        {icons.map((iconBlock, index) => {
          if (typeof iconBlock === 'object' && iconBlock.blockType === 'iconButton') {
            const { icon, title } = iconBlock
            const IconComponent =
              icon && icon in seasonIcons ? seasonIcons[icon as keyof typeof seasonIcons] : null

            return (
              <div
                key={iconBlock.id || index}
                className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-4 sm:p-6 shadow-sm shrink-0 min-w-0"
              >
                {IconComponent && (
                  <IconComponent className="mb-4 h-6 w-6 sm:h-8 sm:w-8 text-foreground shrink-0" />
                )}
                {title && (
                  <span className="text-center text-xs sm:text-sm font-medium text-foreground">
                    {title}
                  </span>
                )}
              </div>
            )
          }
          return null
        })}
      </div>
    </div>
  )
}
