'use client'
import React from 'react'
import type { ScrollWindow as ScrollWindowType } from '@/payload-types'
import { RenderYachtParallaxItems } from '@/components/yacht-bazaar'
import './Component.css'

type Props = {
  disableInnerContainer?: boolean
  index?: number
} & ScrollWindowType

export const ScrollWindow: React.FC<Props> = (props) => {
  const { id, items, index, type } = props

  if (!items || !Array.isArray(items) || items.length === 0) {
    return <></>
  }

  return (
    <div
      data-parallax-window-id={id || ''}
      className={`scroll-window ${type || ''} ${index ? `window-${index}` : ''}`.trim()}
    >
      <RenderYachtParallaxItems items={items} passIndex />
    </div>
  )
}
