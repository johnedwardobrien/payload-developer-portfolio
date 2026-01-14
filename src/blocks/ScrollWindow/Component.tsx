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

  return <RenderYachtParallaxItems items={items} passIndex windowId={` window-${index}`} />
}
