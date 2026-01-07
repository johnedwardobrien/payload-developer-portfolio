'use client'
import React from 'react'
import type { ScrollWindow as ScrollWindowType } from '@/payload-types'
import { RenderYachtParallaxItems } from '@/components/yacht-bazaar'

type Props = {
  disableInnerContainer?: boolean
} & ScrollWindowType

export const ScrollWindow: React.FC<Props> = (props) => {
  const { id, items } = props

  if (!items || !Array.isArray(items) || items.length === 0) {
    return <></>
  }

  // items can be (string | YachtParallaxItem)[], RenderYachtParallaxItems handles this
  return (
    <div data-parallax-window-id={id || ''}>
      <RenderYachtParallaxItems items={items} />
    </div>
  )
}
