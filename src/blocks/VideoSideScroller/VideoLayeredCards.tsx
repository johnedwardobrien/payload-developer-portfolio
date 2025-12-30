'use client'

import React, { useState, useRef } from 'react'
import { motion, PanInfo, useMotionValue, animate, AnimatePresence } from 'framer-motion'

import type { StandardCard } from '@/payload-types'
import { Media } from '@/components/Media'

type Props = {
  cards: StandardCard[]
  buttonText?: string | null
}

export const VideoLayeredCards: React.FC<Props> = ({ cards, buttonText }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)

  const isLastCard = currentIndex === cards.length - 1
  const canSwipeLeft = !isLastCard

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!cardRef.current) return

    const cardWidth = cardRef.current.offsetWidth
    const threshold = cardWidth * 0.25 // 1/4 of card width

    // If dragged left past threshold, swipe to next card
    if (info.offset.x < -threshold && canSwipeLeft) {
      // Animate card off screen to the left
      animate(x, -1000, {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        onComplete: () => {
          // Change to next card and reset position
          setCurrentIndex((prev) => prev + 1)
          x.set(0)
        },
      })
    } else {
      // Snap back if not dragged far enough
      animate(x, 0, {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      })
    }
  }

  const currentCard = cards[currentIndex]

  return (
    <div className="video-layered-cards-wrapper">
      {/* Card Title and Description - between template title and button */}
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

      {/* Layered Images Container */}
      <div className="video-layered-cards-images-container">
        {cards.map((card, index) => {
          const isActive = index === currentIndex
          const isNextCard = index === currentIndex + 1
          // Z-index: active card on top, next card below, others hidden
          const zIndex = isActive ? cards.length + 1 : isNextCard ? cards.length : 0

          return (
            <motion.div
              key={card.id || index}
              ref={isActive ? cardRef : null}
              className={`video-layered-card-image-item ${isActive ? 'active' : ''}`}
              style={{
                zIndex,
                opacity: isActive || isNextCard ? 1 : 0,
                x: isActive ? x : 0,
                pointerEvents: isActive ? 'auto' : 'none',
                cursor: isActive && canSwipeLeft ? 'grab' : 'default',
              }}
              drag={isActive && canSwipeLeft ? 'x' : false}
              dragConstraints={
                isActive && canSwipeLeft
                  ? {
                      left: -1000,
                      right: 0,
                    }
                  : undefined
              }
              dragElastic={0.1}
              dragMomentum={false}
              onDrag={(_, info) => {
                if (isActive) {
                  x.set(info.offset.x)
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
