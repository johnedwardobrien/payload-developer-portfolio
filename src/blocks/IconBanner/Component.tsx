'use client'

import React from 'react'
import { FaSeedling, FaSun, FaLeaf, FaSnowflake } from 'react-icons/fa'

// Icon mapping object for IconButton icon select values
export const seasonIcons = {
  spring: FaSeedling,
  summer: FaSun,
  autumn: FaLeaf,
  winter: FaSnowflake,
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
    <div className="icon-banner">
      {(title || subtitle) && (
        <div className="icon-banner-header">
          {title && <h2 className="icon-banner-title">{title}</h2>}
          {subtitle && <p className="icon-banner-subtitle">{subtitle}</p>}
        </div>
      )}
      {icons.map((iconBlock, index) => {
        if (typeof iconBlock === 'object' && iconBlock.blockType === 'iconButton') {
          const { icon, title } = iconBlock
          const IconComponent =
            icon && icon in seasonIcons ? seasonIcons[icon as keyof typeof seasonIcons] : null

          return (
            <div key={iconBlock.id || index} className="icon-button-item">
              {IconComponent && <IconComponent className="icon" />}
              {title && <span className="icon-title">{title}</span>}
            </div>
          )
        }
        return null
      })}
    </div>
  )
}
