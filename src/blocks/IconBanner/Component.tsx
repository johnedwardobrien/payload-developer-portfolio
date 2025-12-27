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
    <div className="flex h-[50vh] flex-col items-center justify-center">
      {(title || subtitle) && (
        <div className="flex flex-col items-center">
          {title && <h2 className="text-heading-2 font-semibold">{title}</h2>}
          {subtitle && <p className="icon-banner-subtitle mt-[1.4rem]">{subtitle}</p>}
        </div>
      )}
      <div className={`flex flex-row items-center gap-4 ${title || subtitle ? 'mt-[1.4rem]' : ''}`}>
        {icons.map((iconBlock, index) => {
          if (typeof iconBlock === 'object' && iconBlock.blockType === 'iconButton') {
            const { icon, title } = iconBlock
            const IconComponent =
              icon && icon in seasonIcons ? seasonIcons[icon as keyof typeof seasonIcons] : null

            return (
              <div
                key={iconBlock.id || index}
                className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-6 shadow-sm"
              >
                {IconComponent && <IconComponent className="mb-4 h-8 w-8 text-foreground" />}
                {title && (
                  <span className="text-center text-sm font-medium text-foreground">{title}</span>
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
