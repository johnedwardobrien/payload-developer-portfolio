'use client'

import React, { useState, useRef, useEffect } from 'react'
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
  const [titleCards, setTitleCards] = useState(cards.map((card, index) => {
    return {
      cardId: card.id,
      title: card.title,
      index
    }
  }));

  const cardRef = useRef<HTMLDivElement>(null)
  const prevCardRef = useRef<HTMLDivElement>(null)
  const titleCardContRef = useRef<HTMLDivElement>(null)
  const titleCardRefs = useRef<(HTMLSpanElement | null)[]>([])
  const isInitialMount = useRef(true)
  const x = useMotionValue(0)
  const prevX = useMotionValue(-1000)
  const isLastCard = currentIndex === cards.length - 1
  const isFirstCard = currentIndex === 0
  const canSwipeLeft = !isLastCard
  const canSwipeRight = !isFirstCard

  // Scroll active title card into view when index changes (skip on initial mount)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    if (titleCardRefs.current[currentIndex]) {
      titleCardRefs.current[currentIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      })
    }
  }, [currentIndex])

  // Drag scrolling for title card container
  useEffect(() => {
    const titleCardCont = titleCardContRef.current
    if (!titleCardCont) return

    let isDragging = false
    let startX = 0
    let scrollLeft = 0

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true
      startX = e.pageX - titleCardCont.offsetLeft
      scrollLeft = titleCardCont.scrollLeft
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      e.preventDefault()
      const x = e.pageX - titleCardCont.offsetLeft
      const walk = (x - startX) * 2
      titleCardCont.scrollLeft = scrollLeft - walk
    }

    const handleMouseUp = () => {
      isDragging = false
    }

    const handleMouseLeave = () => {
      isDragging = false
    }

    titleCardCont.addEventListener('mousedown', handleMouseDown)
    titleCardCont.addEventListener('mousemove', handleMouseMove)
    titleCardCont.addEventListener('mouseup', handleMouseUp)
    titleCardCont.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      titleCardCont.removeEventListener('mousedown', handleMouseDown)
      titleCardCont.removeEventListener('mousemove', handleMouseMove)
      titleCardCont.removeEventListener('mouseup', handleMouseUp)
      titleCardCont.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!cardRef.current) return
    const cardWidth = cardRef.current.offsetWidth
    const threshold = cardWidth * 0.25
    if (info.offset.x < -threshold && canSwipeLeft) {
      animate(x, -1000, {
        type: 'tween',
        ease: 'linear',
        duration: 0.3,
        onComplete: () => {
          setCurrentIndex((prev) => prev + 1)
          x.set(0)
        },
      })
    }
    else if (info.offset.x > threshold && canSwipeRight) {
      setIsPreviousSlidingIn(true)
      animate(prevX, 0, {
        type: 'tween',
        ease: 'linear',
        duration: 0.3,
        onComplete: () => {
          setCurrentIndex((prev) => prev - 1)
          x.set(0)
          prevX.set(-1000)
          setIsPreviousSlidingIn(false)
        },
      })
    } else {
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
          {buttonText && (
            <button>{buttonText}</button>
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
          {buttonText && (
            <button>{buttonText}</button>
          )}
        </>
      )}

      <div className={`video-layered-cards-images-container ${isDesktop ? 'desktop-column' : ''}`}>
        <div className="video-layered-cards-edge-left" />
        <div className="video-layered-cards-edge-right" />
        {cards.map((card, index) => {
          const isActive = index === currentIndex
          const isNextCard = index === currentIndex + 1
          const isPreviousCard = index === currentIndex - 1
          const zIndex =
            isPreviousCard && isPreviousSlidingIn
              ? cards.length + 2
              : isActive
                ? cards.length + 1
                : isNextCard || isPreviousCard
                  ? cards.length
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
                  if (info.offset.x < 0 && canSwipeLeft) {
                    x.set(info.offset.x)
                  } else {
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
      <div
        className='title-card-cont'
        ref={titleCardContRef}
      >
        {titleCards.map(card => {
          return <span
            key={card.cardId || card.index}
            ref={(el) => { titleCardRefs.current[card.index] = el }}
            className={`title-card${card.index === currentIndex ? ' active' : ''}`}
          >
            {`${card.index + 1}. ${card.title}`}
          </span>
        })}
      </div>
    </div>
  )
}
