'use client'

import React, { useRef, useEffect, useState, useMemo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'

import type { YachtParallaxItem, ThreeCard, Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'
import 'swiper/css'
import './Component.css'

type ThreeCardAcrossWithBackgroundProps = Pick<YachtParallaxItem, 'threeCards'>

type Props = {
  disableInnerContainer?: boolean
  index?: number
} & ThreeCardAcrossWithBackgroundProps

export const ThreeCardAcrossWithBackground: React.FC<Props> = (props) => {
  const { threeCards, index } = props

  if (!threeCards || threeCards.length === 0) {
    return null
  }

  return (
    <div className={`three-card-outer-container ${index ? `item-${index}` : ''}`}>
      {threeCards.map((card, cardIndex) => {
        if (card.blockType !== 'threeCard') return null

        return <ThreeCardSlider key={card.id || cardIndex} card={card} />
      })}
    </div>
  )
}

const ThreeCardSlider: React.FC<{ card: ThreeCard }> = ({ card }) => {
  const { title, subtitle, backgroundMedia, standardCards } = card
  const cardRef = useRef<HTMLDivElement>(null)
  const swiperRef = useRef<SwiperType | null>(null)
  const [standardCardWidth, setStandardCardWidth] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)

  const validCards = useMemo(
    () => standardCards?.filter((c) => c.blockType === 'standardCard') || [],
    [standardCards],
  )

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024) // lg breakpoint (1024px)
    }
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  useEffect(() => {
    const updateDimensions = () => {
      if (cardRef.current) {
        const cardRect = cardRef.current.getBoundingClientRect()
        // Slider container is 50% of card height
        // Standard cards should be 1:1 aspect ratio (width = height)
        const sliderHeight = cardRect.height / 2
        const calculatedWidth = sliderHeight
        // Apply max-width constraint of 304px
        const stdCardWidth = Math.min(calculatedWidth, 304)
        setStandardCardWidth(stdCardWidth)

        // Update Swiper if it exists
        if (swiperRef.current) {
          swiperRef.current.update()
        }
      }
    }

    const timeoutId = setTimeout(() => {
      updateDimensions()
    }, 0)

    window.addEventListener('resize', updateDimensions)
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', updateDimensions)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className="three-card-across-with-background relative overflow-hidden rounded-2xl"
    >
      {/* Background Media - Full Height and Width */}
      {backgroundMedia && typeof backgroundMedia === 'object' && (
        <div className="media absolute inset-0 z-0 w-full h-full rounded-2xl overflow-hidden">
          <Media
            resource={backgroundMedia}
            fill
            className="relative w-full h-full"
            imgClassName="object-cover w-full h-full rounded-2xl"
            pictureClassName="absolute inset-0 w-full h-full rounded-2xl"
            videoClassName="absolute inset-0 w-full h-full object-cover rounded-2xl"
          />
        </div>
      )}

      {/* Title and Subtitle - Top of Card */}
      <div className="three-card-header absolute top-0 left-0 right-0 z-20">
        <div className="flex flex-col items-end">
          {title && (
            <h2 className="text-heading-2 font-semibold text-white mb-2 text-right">{title}</h2>
          )}
          {subtitle && <p className="text-base text-white/90 text-right">{subtitle}</p>}
        </div>
      </div>

      {/* Standard Cards - Swiper on Mobile/Tablet, Flex on Desktop */}
      {validCards.length > 0 && (
        <div className="three-card-slider-container absolute left-0 right-0 z-10 overflow-hidden">
          {!isDesktop ? (
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper
              }}
              initialSlide={0}
              slidesPerView="auto"
              spaceBetween={28}
              centeredSlides={true}
              centeredSlidesBounds={true}
              slidesOffsetAfter={90}
              breakpoints={{
                768: {
                  // Tablet (768px and up)
                  slidesOffsetAfter: 150,
                  slidesOffsetBefore: 90,
                },
              }}
              className="three-card-swiper"
            >
              {validCards.map((standardCard, index) => {
                const { title: cardTitle, buttonText, backgroundMedia: cardMedia } = standardCard

                return (
                  <SwiperSlide
                    key={standardCard.id || index}
                    className="three-card-slide"
                    style={{
                      width: standardCardWidth > 0 ? `${standardCardWidth}px` : 'auto',
                    }}
                  >
                    <StandardCardContent
                      cardTitle={cardTitle}
                      buttonText={buttonText}
                      cardMedia={cardMedia}
                    />
                  </SwiperSlide>
                )
              })}
            </Swiper>
          ) : (
            <div className="three-card-desktop-flex">
              {validCards.map((standardCard, index) => {
                const { title: cardTitle, buttonText, backgroundMedia: cardMedia } = standardCard

                return (
                  <div key={standardCard.id || index} className="three-card-desktop-card">
                    <StandardCardContent
                      cardTitle={cardTitle}
                      buttonText={buttonText}
                      cardMedia={cardMedia}
                    />
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const StandardCardContent: React.FC<{
  cardTitle?: string | null
  buttonText?: string | null
  cardMedia?: (string | null) | MediaType
}> = ({ cardTitle, buttonText, cardMedia }) => {
  return (
    <div className="three-card-standard-card">
      {/* Background Image */}
      {cardMedia && typeof cardMedia === 'object' && (
        <div className="standard-card-background">
          <Media
            resource={cardMedia}
            fill
            className="relative w-full h-full"
            imgClassName="object-cover w-full h-full"
            pictureClassName="absolute inset-0 w-full h-full"
            videoClassName="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content Overlay - Bottom Aligned */}
      <div className="standard-card-content">
        <div className="standard-card-content-inner">
          {cardTitle && <h3 className="standard-card-title">{cardTitle}</h3>}
          {buttonText && <button className="standard-card-button">{buttonText}</button>}
        </div>
      </div>
    </div>
  )
}
