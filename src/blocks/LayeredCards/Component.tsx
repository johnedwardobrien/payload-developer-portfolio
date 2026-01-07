'use client'

import React, { useState, useEffect } from 'react'

import type { YachtParallaxItem } from '@/payload-types'

import { StackedCards } from './StackedCards'
import { LayeredCardsColumn } from './LayeredCardsColumn'
import './Component.css'

type LayeredCardsProps = Pick<YachtParallaxItem, 'title' | 'subtitle' | 'buttonText' | 'cards'>

type Props = {
  disableInnerContainer?: boolean
} & LayeredCardsProps

export const LayeredCards: React.FC<Props> = (props) => {
  const { title, buttonText, cards } = props
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!cards || !Array.isArray(cards) || cards.length === 0) {
    return null
  }

  const validCards = cards.filter((card) => card.blockType === 'standardCard')

  if (validCards.length === 0) {
    return null
  }

  return (
    <div className="layered-cards-container">
      {/* Header with Title and Button */}
      <div className="layered-cards-header">
        {title && <h2 className="layered-cards-title">{title}</h2>}
        {buttonText && <button className="layered-cards-button">{buttonText}</button>}
      </div>

      {/* Mobile: Stacked Swipable Cards */}
      {isMobile ? (
        <StackedCards cards={validCards} />
      ) : (
        /* Tablet/Desktop: Column Layout */
        <LayeredCardsColumn cards={validCards} />
      )}
    </div>
  )
}
