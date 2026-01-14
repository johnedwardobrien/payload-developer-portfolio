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
import './Component.css'

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
  index?: number
  icons?: Array<{
    blockType?: string
    icon?: string
    title?: string
    id?: string
  }>
  windowId?: string
}

export const IconBanner: React.FC<Props> = (props) => {
  const { title, subtitle, icons, index, windowId } = props

  if (!icons || !Array.isArray(icons) || icons.length === 0) {
    return null
  }

  return (
    <div className={`IconBanner${index ? ` item-${index}` : ''}${windowId}`}>
      <div
        className='inner-cont'
      >
        {(title || subtitle) && (
          <div className="title-cont">
            {title && <h2 className="title">{title}</h2>}
            {subtitle && <p className="subtitle">{subtitle}</p>}
          </div>
        )}
        <div
          className={`icon-cont-outer`}
        >
          {icons.map((iconBlock, index) => {
            if (typeof iconBlock === 'object' && iconBlock.blockType === 'iconButton') {
              const { icon, title } = iconBlock
              const IconComponent =
                icon && icon in seasonIcons ? seasonIcons[icon as keyof typeof seasonIcons] : null

              return (
                <div
                  key={iconBlock.id || index}
                  className="icon"
                >
                  {IconComponent && (
                  <IconComponent className="icon" />
                  )}
                  {title && (
                    <span className="icon-title">
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
    </div>
  )
}
