'use client'

import React from 'react'
import { ParallaxProvider } from 'react-scroll-parallax'

import { RenderParallaxBlocks } from '@/blocks/RenderParallaxBlocks'

type Props = {
  blocks?: unknown[]
  disableInnerContainer?: boolean
  [key: string]: unknown
}

export const YachtParallax: React.FC<Props> = (props) => {
  const { blocks } = props

  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    return <></>
  }

  return (
    <ParallaxProvider>
      <RenderParallaxBlocks blocks={blocks as never} />
    </ParallaxProvider>
  )
}
