'use client'

import React, { useState, useRef, useEffect } from 'react'

import type { LayeredCards as LayeredCardsType } from '@/payload-types'

import { ImageCard } from '@/components/ImageCard'
import './Component.css'

type Props = {
  disableInnerContainer?: boolean
} & LayeredCardsType

export const LayeredCards: React.FC<Props> = (props) => {
  const { title, buttonText, cards } = props
  const [currentIndex, setCurrentIndex] = useState(0)
  const [startX, setStartX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  if (!cards || !Array.isArray(cards) || cards.length === 0) {
    return null
  }

  const validCards = cards.filter((card) => card.blockType === 'standardCard')

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX)
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const currentX = e.touches[0].clientX
    const diffX = startX - currentX

    // Prevent default scrolling if swiping horizontally
    if (Math.abs(diffX) > 10) {
      e.preventDefault()
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return
    const endX = e.changedTouches[0].clientX
    const diffX = startX - endX
    const threshold = 50

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0 && currentIndex < validCards.length - 1) {
        // Swipe left - next card
        setCurrentIndex(currentIndex + 1)
      } else if (diffX < 0 && currentIndex > 0) {
        // Swipe right - previous card
        setCurrentIndex(currentIndex - 1)
      }
    }

    setIsDragging(false)
  }

  // Reset swipe classes after animation
  useEffect(() => {
    const timer = setTimeout(() => {
      // Animation completes, classes will be managed by currentIndex
    }, 400)
    return () => clearTimeout(timer)
  }, [currentIndex])

  return (
    <div className="layered-cards-container">
      {/* Header with Title and Button */}
      <div className="layered-cards-header">
        {title && <h2 className="layered-cards-title">{title}</h2>}
        {buttonText && (
          <button className="layered-cards-button">{buttonText}</button>
        )}
      </div>

      {/* Cards Container */}
      <div
        ref={containerRef}
        className="layered-cards-wrapper"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {validCards.map((card, index) => {
          const isActive = index === currentIndex
          const distanceFromActive = Math.abs(index - currentIndex)
          
          // Calculate z-index: active card gets highest, others based on distance
          const zIndex = isActive ? 10 : Math.max(1, 4 - distanceFromActive)
          
          // Calculate transform: active card is on top, others offset based on position
          let transform = ''
          if (isActive) {
            transform = 'translate(0, 0) scale(1)'
          } else {
            const offsetX = -12 * (distanceFromActive)
            const offsetY = -24 * (distanceFromActive)
            const scale = 1 - (0.04 * distanceFromActive)
            transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`
          }
          
          return (
            <div
              key={card.id || index}
              className={`layered-card-item ${isActive ? 'active' : ''}`}
              style={{
                '--card-index': index + 1,
                '--current-index': currentIndex,
                '--z-index': zIndex,
                '--transform': transform,
                zIndex: zIndex,
                transform: transform,
              } as React.CSSProperties}
            >
              <ImageCard card={card} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
