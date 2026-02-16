import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { GiAbstract069 } from 'react-icons/gi'
import { FaArrowRight } from 'react-icons/fa6'
import './Component.css'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

const iconMap = {
  GiAbstract069,
} as const

import { CMSLink } from '../../components/Link'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className="container my-16">
      <div className="w-100">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, icon, link, richText, size } = col
            const Icon = icon && icon !== 'none' ? iconMap[icon as keyof typeof iconMap] : null
            const parityClass = index % 2 === 0 ? 'even' : 'odd'
            return (
              <div key={index} className={`content-col`}>
                {Icon && <Icon className={`icon ${parityClass}`} />}
                {richText && <RichText data={richText} enableGutter={false} />}
                {enableLink && (
                  <CMSLink {...link} prefetch={false}>
                    <FaArrowRight />
                  </CMSLink>
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}
