'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, PanInfo, useMotionValue, useTransform, animate } from 'framer-motion'

import type { StandardCard } from '@/payload-types'
import { ImageCard } from '@/components/ImageCard'

type Props = {
  cards: StandardCard[]
}

export const StackedCards: React.FC<Props> = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dragConstraints, setDragConstraints] = useState({ left: -10, right: 10 })
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const activeCardX = useTransform(x, (val) => `calc(-50% + ${val}px)`)

  useEffect(() => {
    x.set(0)

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

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!cardRef.current) return

    const cardWidth = cardRef.current.offsetWidth
    const threshold = cardWidth * 0.5

    if (Math.abs(info.offset.x) >= threshold) {
      if (info.offset.x > 0) {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length)
      } else {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length)
      }
      x.set(0)
    } else {
      animate(x, 0, {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      })
    }
  }

  return (
    <div className="stacked-cards-wrapper">
      {cards.map((card, index) => {
        const isActive = index === currentIndex

        let stackPosition = 0
        let shouldShow = false

        if (!isActive) {
          let diff = index - currentIndex

          if (diff > cards.length / 2) {
            diff -= cards.length
          } else if (diff < -cards.length / 2) {
            diff += cards.length
          }

          if (diff < 0) {
            stackPosition = Math.abs(diff)
            shouldShow = stackPosition <= 2
          } else {
            const wrappedDiff = diff - cards.length
            if (wrappedDiff < 0) {
              stackPosition = Math.abs(wrappedDiff)
              shouldShow = stackPosition <= 2
            }
          }
        }

        const zIndex = isActive ? 10 : shouldShow ? Math.max(1, 10 - stackPosition) : 0
        const offsetX = shouldShow ? 12 * stackPosition : 0
        const offsetY = shouldShow ? 24 * stackPosition : 0

        return (
          <motion.div
            key={card.id || index}
            ref={isActive ? cardRef : null}
            className={`stacked-card-item ${isActive ? 'active' : ''}`}
            style={{
              zIndex,
              x: isActive ? activeCardX : `calc(-50% + ${offsetX}px)`,
            }}
            initial={false}
            animate={{
              y: offsetY,
              scale: 1,
              opacity: shouldShow || isActive ? 1 : 0,
            }}
            drag={isActive ? 'x' : false}
            dragConstraints={isActive ? dragConstraints : undefined}
            dragElastic={0.1}
            dragMomentum={false}
            onDrag={
              isActive
                ? (_, info) => {
                    x.set(info.offset.x)
                  }
                : undefined
            }
            onDragEnd={isActive ? handleDragEnd : undefined}
            whileDrag={isActive ? { cursor: 'grabbing' } : undefined}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              duration: 0.4,
            }}
          >
            <ImageCard card={card} />
          </motion.div>
        )
      })}
    </div>
  )
}
