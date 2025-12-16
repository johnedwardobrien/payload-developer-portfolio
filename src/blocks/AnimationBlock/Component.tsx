'use client'
import React from 'react'
import { cn } from '@/utilities/ui'

import SpinningCube from '@/components/Cube'

type AnimationBlockProps = {
  animation?: 'cube' | null
  alignment?: 'left' | 'center' | 'right' | null
  id?: string | null
  blockName?: string | null
  blockType: 'animationBlock'
}

type Props = AnimationBlockProps & {
  disableInnerContainer?: boolean
}

export const AnimationBlock: React.FC<Props> = (props) => {
  const { animation, alignment } = props

  const alignmentClasses: Record<'left' | 'center' | 'right', string> = {
    left: 'flex justify-start',
    center: 'flex justify-center',
    right: 'flex justify-end',
  }

  const animationComponents: Record<'cube', React.ReactElement> = {
    cube: <SpinningCube />,
  }

  const alignmentValue = (alignment || 'center') as 'left' | 'center' | 'right'
  const animationComponent = animation ? animationComponents[animation] : null

  return <div className={cn('w-full', alignmentClasses[alignmentValue])}>{animationComponent}</div>
}
