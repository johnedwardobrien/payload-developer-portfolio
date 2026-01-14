'use client'
import React from 'react'
import type { YachtParallax as YachtParallaxType } from '@/payload-types'
import { ScrollWindow as ScrollWindowComponent } from '@/blocks/ScrollWindow/Component'
import './Component.css'

type Props = {
  disableInnerContainer?: boolean
} & YachtParallaxType

export const YachtParallax: React.FC<Props> = (props) => {
  const { scrollWindows } = props

  if (!scrollWindows || !Array.isArray(scrollWindows) || scrollWindows.length === 0) {
    return <></>
  }

  return (
    <div
      className='yacht-parallax-cont'
    >
      {scrollWindows.map((scrollWindow, index) => {
        if (typeof scrollWindow === 'string') return null
        return (
          <ScrollWindowComponent
            key={scrollWindow.id}
            {...scrollWindow}
            disableInnerContainer
            index={index + 1}
          />
        )
      })}
    </div>
  )
}
