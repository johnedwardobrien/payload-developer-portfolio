'use client'

import React from 'react'

import { RenderParallaxBlocks } from '@/blocks/RenderParallaxBlocks'

type Props = {
  blocks?: unknown[]
  disableInnerContainer?: boolean
  [key: string]: unknown
}

export const YachtParallax: React.FC<Props> = (props) => {
  console.log('YachtParallax data:', props)

  const { blocks } = props

  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    return <></>
  }

  return <RenderParallaxBlocks blocks={blocks as never} />
}
