'use client'

import React from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'

type Props = {
  blocks?: unknown[]
  disableInnerContainer?: boolean
  [key: string]: unknown
}

export const ScrollWindow: React.FC<Props> = (props) => {
  const { blocks } = props

  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    return <></>
  }

  return (
    <div>
      <RenderBlocks blocks={blocks as never} />
    </div>
  )
}
