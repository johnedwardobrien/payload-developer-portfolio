'use client'

import React, { useState, useRef } from 'react'
import { motion, PanInfo, useMotionValue, animate, AnimatePresence } from 'framer-motion'

import type { StandardCard } from '@/payload-types'
import { Media } from '@/components/Media'

type Props = {
  cards: StandardCard[]
  buttonText?: string | null
  title?: string | null
  isMobile?: boolean
  isDesktop?: boolean
}

export const VideoLayeredCards: React.FC<Props> = ({ cards, buttonText, title, isMobile = true, isDesktop = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPreviousSlidingIn, setIsPreviousSlidingIn] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const prevCardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const prevX = useMotionValue(-1000) // Previous card starts off-screen left

  const isLastCard = currentIndex === cards.length - 1
  const isFirstCard = currentIndex === 0
  const canSwipeLeft = !isLastCard
  const canSwipeRight = !isFirstCard

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!cardRef.current) return

    const cardWidth = cardRef.current.offsetWidth
    const threshold = cardWidth * 0.25 // 1/4 of card width

    // If dragged left past threshold, swipe to next card
    if (info.offset.x < -threshold && canSwipeLeft) {
      // Animate card off screen to the left - mechanical motion
      animate(x, -1000, {
        type: 'tween',
        ease: 'linear',
        duration: 0.3,
        onComplete: () => {
          // Change to next card and reset position
          setCurrentIndex((prev) => prev + 1)
          x.set(0)
        },
      })
    }
    // If dragged right past threshold, swipe to previous card
    else if (info.offset.x > threshold && canSwipeRight) {
      // Mark that previous card is sliding in
      setIsPreviousSlidingIn(true)
      // Animate previous card sliding in from left - mechanical motion
      animate(prevX, 0, {
        type: 'tween',
        ease: 'linear',
        duration: 0.3,
        onComplete: () => {
          // Change to previous card and reset positions
          setCurrentIndex((prev) => prev - 1)
          x.set(0)
          prevX.set(-1000)
          setIsPreviousSlidingIn(false)
        },
      })
    } else {
      // Snap back if not dragged far enough - mechanical motion
      animate(x, 0, {
        type: 'tween',
        ease: 'easeOut',
        duration: 0.2,
      })
    }
  }

  const currentCard = cards[currentIndex]

  return (
    <div className={`video-layered-cards-wrapper ${isDesktop ? 'desktop-layout' : ''}`}>
      {/* Desktop: Left Column - Text Content */}
      {isDesktop && (
        <div className="video-layered-cards-left-column">
          {/* Template Title */}
          {title && (
            <div className="video-layered-cards-template-title">
              <h2 className="text-heading-2 font-semibold mb-2">{title}</h2>
            </div>
          )}

          {/* Card Title and Description */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="video-layered-cards-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {currentCard?.title && <h3 className="video-layered-cards-title">{currentCard.title}</h3>}
              {currentCard?.description && (
                <p className="video-layered-cards-description">{currentCard.description}</p>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Button Text */}
          {buttonText && (
            <div className="video-layered-cards-button-wrapper">
              <p className="text-lg">{buttonText}</p>
            </div>
          )}
        </div>
      )}

      {/* Mobile/Tablet: Card Title and Description - between template title and button */}
      {!isDesktop && (
        <>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="video-layered-cards-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {currentCard?.title && <h3 className="video-layered-cards-title">{currentCard.title}</h3>}
              {currentCard?.description && (
                <p className="video-layered-cards-description">{currentCard.description}</p>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Button Text below card content */}
          {buttonText && (
            <div className="video-layered-cards-button-wrapper">
              <p className="text-lg">{buttonText}</p>
            </div>
          )}
        </>
      )}

      {/* Desktop: Right Column - Layered Images Container */}
      {/* Mobile/Tablet: Layered Images Container */}
      <div className={`video-layered-cards-images-container ${isDesktop ? 'desktop-column' : ''}`}>
        {/* White divs to hide sliding animations at edges */}
        <div className="video-layered-cards-edge-left" />
        <div className="video-layered-cards-edge-right" />
        {cards.map((card, index) => {
          const isActive = index === currentIndex
          const isNextCard = index === currentIndex + 1
          const isPreviousCard = index === currentIndex - 1
          
          // Z-index: when previous card is sliding in, it should be on top
          // Otherwise, active card is always on top
          const zIndex =
            isPreviousCard && isPreviousSlidingIn
              ? cards.length + 2 // Previous card on top when sliding in
              : isActive
                ? cards.length + 1 // Active card on top normally
                : isNextCard || isPreviousCard
                  ? cards.length // Next/previous cards below
                  : 0

          return (
            <motion.div
              key={card.id || index}
              ref={isActive ? cardRef : isPreviousCard ? prevCardRef : null}
              className={`video-layered-card-image-item ${isActive ? 'active' : ''}`}
              style={{
                zIndex,
                opacity: isActive || isNextCard || (isPreviousCard && isPreviousSlidingIn) ? 1 : 0,
                x: isDesktop ? 0 : isActive ? x : isPreviousCard ? prevX : 0,
                pointerEvents: isActive && !isDesktop ? 'auto' : 'none',
                cursor: isActive && !isDesktop && (canSwipeLeft || canSwipeRight) ? 'grab' : 'default',
              }}
              drag={isDesktop ? false : isActive && (canSwipeLeft || canSwipeRight) ? 'x' : false}
              dragConstraints={
                isActive && (canSwipeLeft || canSwipeRight)
                  ? {
                      left: canSwipeLeft ? -1000 : 0,
                      right: canSwipeRight ? 1000 : 0,
                    }
                  : undefined
              }
              dragElastic={0}
              dragMomentum={false}
              onDrag={(_, info) => {
                if (isActive) {
                  // Only move card when dragging left (negative offset)
                  // Right drag doesn't move the card
                  if (info.offset.x < 0 && canSwipeLeft) {
                    x.set(info.offset.x)
                  } else {
                    // Keep card at 0 when dragging right
                    x.set(0)
                  }
                }
              }}
              onDragEnd={isActive ? handleDragEnd : undefined}
              whileDrag={{ cursor: 'grabbing' }}
              initial={false}
            >
              {card.backgroundMedia && (
                <Media
                  htmlElement="div"
                  className="video-layered-card-image-media"
                  fill
                  resource={card.backgroundMedia}
                  pictureClassName="video-layered-card-image-picture"
                  imgClassName="video-layered-card-image-img"
                  videoClassName="video-layered-card-image-video"
                />
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
