'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, PanInfo, useMotionValue, useTransform, animate } from 'framer-motion'

import type { LayeredCards as LayeredCardsType } from '@/payload-types'

import { ImageCard } from '@/components/ImageCard'
import './Component.css'

type Props = {
  disableInnerContainer?: boolean
} & LayeredCardsType

export const LayeredCards: React.FC<Props> = (props) => {
  const { title, buttonText, cards } = props
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(true)
  const [dragConstraints, setDragConstraints] = useState({ left: -200, right: 200 })
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  // Create transform for active card that combines -50% offset with drag x
  const activeCardX = useTransform(x, (val) => `calc(-50% + ${val}px)`)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Reset x position when card changes
    x.set(0)

    // Update drag constraints based on card width
    const updateConstraints = () => {
      if (cardRef.current) {
        const cardWidth = cardRef.current.offsetWidth
        setDragConstraints({
          left: -cardWidth * 0.6,
          right: cardWidth * 0.6,
        })
      }
    }
    updateConstraints()
    window.addEventListener('resize', updateConstraints)
    return () => window.removeEventListener('resize', updateConstraints)
  }, [currentIndex, x])

  if (!cards || !Array.isArray(cards) || cards.length === 0) {
    return null
  }

  const validCards = cards.filter((card) => card.blockType === 'standardCard')

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!cardRef.current) return

    // Get card width to calculate 50% threshold
    const cardWidth = cardRef.current.offsetWidth
    const threshold = cardWidth * 0.5 // 50% of card width

    // Only trigger reorder if dragged at least 50% of card width
    if (Math.abs(info.offset.x) >= threshold) {
      if (info.offset.x > 0) {
        // Swipe right - previous card (infinite scroll)
        setCurrentIndex((prevIndex) => (prevIndex - 1 + validCards.length) % validCards.length)
      } else {
        // Swipe left - next card (infinite scroll)
        setCurrentIndex((prevIndex) => (prevIndex + 1) % validCards.length)
      }
      // Reset x position after reorder
      x.set(0)
    } else {
      // If dragged less than 50%, animate back to starting position (0)
      animate(x, 0, {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      })
    }
  }

  return (
    <div className="layered-cards-container">
      {/* Header with Title and Button */}
      <div className="layered-cards-header">
        {title && <h2 className="layered-cards-title">{title}</h2>}
        {buttonText && <button className="layered-cards-button">{buttonText}</button>}
      </div>

      {/* Cards Container */}
      <div className="layered-cards-wrapper">
        {validCards.map((card, index) => {
          const isActive = index === currentIndex

          // At tablet/desktop, show all cards; at mobile, use stacking logic
          let stackPosition = 0
          let shouldShow = false

          if (isMobile) {
            // Mobile: Calculate stack position for infinite scroll
            // Show cards that come before the current one in the sequence, stacked behind
            if (!isActive) {
              // Calculate the difference considering infinite scroll wrapping
              let diff = index - currentIndex

              // Normalize diff to handle wrapping (e.g., if current is 0 and index is last, diff should be negative)
              if (diff > validCards.length / 2) {
                diff -= validCards.length
              } else if (diff < -validCards.length / 2) {
                diff += validCards.length
              }

              // Cards that come before in the sequence (negative diff) should be visible behind
              // Always show the previous 2 cards behind the current one (wrapping around)
              if (diff < 0) {
                stackPosition = Math.abs(diff)
                shouldShow = stackPosition <= 2
              } else {
                // For cards that come after, check if they should be shown as "previous" cards
                // by wrapping around (e.g., if we're at index 0 and there are 3 cards,
                // card at index 2 should be shown as the first card behind, card 1 as second)
                const wrappedDiff = diff - validCards.length
                if (wrappedDiff < 0) {
                  stackPosition = Math.abs(wrappedDiff)
                  shouldShow = stackPosition <= 2
                } else {
                  shouldShow = false
                }
              }
            }
          } else {
            // Tablet/Desktop: Show all cards
            shouldShow = true
          }

          // Calculate z-index: active card gets highest, others based on stack position
          const zIndex = isActive ? 10 : shouldShow ? Math.max(1, 10 - stackPosition) : 0

          // Calculate transform values for motion (mobile only)
          const offsetX = isMobile && shouldShow ? 12 * stackPosition : 0
          const offsetY = isMobile && shouldShow ? 24 * stackPosition : 0
          // All cards same size - no scaling
          const scale = 1

          // Only apply mobile transforms and animations on mobile
          const mobileStyle = isMobile
            ? {
                x: isActive ? activeCardX : `calc(-50% + ${offsetX}px)`,
              }
            : {}

          const mobileAnimate = isMobile
            ? {
                y: offsetY,
                scale: scale,
                opacity: shouldShow || isActive ? 1 : 0,
              }
            : {
                opacity: 1,
              }

          return (
            <motion.div
              key={card.id || index}
              ref={isActive ? cardRef : null}
              className={`layered-card-item ${isActive ? 'active' : ''}`}
              style={{
                zIndex: zIndex,
                ...mobileStyle,
              }}
              initial={false}
              animate={mobileAnimate}
              drag={isActive && isMobile ? 'x' : false}
              dragConstraints={isActive && isMobile ? dragConstraints : undefined}
              dragElastic={isMobile ? 0.1 : undefined}
              dragMomentum={isMobile ? false : undefined}
              onDrag={
                isActive && isMobile
                  ? (_, info) => {
                      x.set(info.offset.x)
                    }
                  : undefined
              }
              onDragEnd={isActive && isMobile ? handleDragEnd : undefined}
              whileDrag={isActive && isMobile ? { cursor: 'grabbing' } : undefined}
              transition={
                isMobile
                  ? {
                      type: 'spring',
                      stiffness: 300,
                      damping: 30,
                      duration: 0.4,
                    }
                  : undefined
              }
            >
              <ImageCard card={card} />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
