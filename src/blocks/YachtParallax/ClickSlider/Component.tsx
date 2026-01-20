'use client'

import React, { useMemo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'

import type { YachtParallaxItem } from '@/payload-types'

import { Media } from '@/components/Media'
import { Button } from '@/components/ui/button'
import { formatEventDate } from '@/utilities/formatEventDate'
import 'swiper/css'
import './Component.css'

type ClickSliderProps = Pick<YachtParallaxItem, 'title' | 'buttonText' | 'cards'>

type Props = {
  disableInnerContainer?: boolean
  index?: number
  id?: string
} & ClickSliderProps

export const ClickSlider: React.FC<Props> = (props) => {
  const { title, buttonText, cards, index, id } = props
  const swiperRef = React.useRef<SwiperType | null>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const cursorRef = React.useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [isDesktop, setIsDesktop] = React.useState(false)

  const validCards = useMemo(
    () => cards?.filter((c) => c.blockType === 'standardCard') || [],
    [cards],
  )

  React.useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }

    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => {
      window.removeEventListener('resize', checkDesktop)
    }
  }, [])

  React.useEffect(() => {
    if (!isDesktop || !cursorRef.current) return

    const cursor = cursorRef.current
    const swiperContainer = containerRef.current?.querySelector('.click-slider-swiper-container')
    const slides = swiperContainer?.querySelectorAll('.click-slider-slide')

    let currentX = 0
    let currentY = 0
    let targetX = 0
    let targetY = 0
    let isHovering = false

    const animate = () => {
      if (isHovering) {
        const dx = targetX - currentX
        const dy = targetY - currentY
        currentX += dx * 0.15
        currentY += dy * 0.15

        cursor.style.left = `${currentX}px`
        cursor.style.top = `${currentY}px`
        cursor.style.opacity = '1'
      } else {
        cursor.style.opacity = '0'
      }

      requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (isHovering) {
        targetX = e.clientX
        targetY = e.clientY
      }
    }

    const handleMouseEnter = (e: Event) => {
      const mouseEvent = e as MouseEvent
      isHovering = true
      cursor.classList.add('hover')
      targetX = mouseEvent.clientX
      targetY = mouseEvent.clientY
      currentX = mouseEvent.clientX
      currentY = mouseEvent.clientY
    }

    const handleMouseLeave = () => {
      isHovering = false
      cursor.classList.remove('hover')
    }

    currentX = window.innerWidth / 2
    currentY = window.innerHeight / 2
    targetX = currentX
    targetY = currentY

    animate()
    document.addEventListener('mousemove', handleMouseMove)
    slides?.forEach((slide) => {
      slide.addEventListener('mouseenter', handleMouseEnter as EventListener)
      slide.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      slides?.forEach((slide) => {
        slide.removeEventListener('mouseenter', handleMouseEnter as EventListener)
        slide.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [isDesktop, validCards.length])

  if (!validCards || validCards.length === 0) {
    return null
  }

  return (
    <div
      className={`ClickSlider click-slider-container ${index ? `item-${index}` : ''}`}
    >
      {isDesktop && <div ref={cursorRef} className="click-slider-cursor" />}
      <div ref={containerRef} className="click-slider-grid">
        <div className="click-slider-header">
          {title && <h1 className="click-slider-title text-heading-1">{title}</h1>}
          {buttonText && (
            <button>
              {buttonText}
            </button>
          )}
        </div>

        <div className="click-slider-swiper-container">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.activeIndex)
            }}
            initialSlide={0}
            slidesPerView="auto"
            spaceBetween={16}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 16,
                allowTouchMove: false,
              },
            }}
            allowTouchMove={!isDesktop}
            loop={isDesktop && validCards.length > 2}
            className="click-slider-swiper"
          >
            {validCards.map((card, index) => {
              if (card.blockType !== 'standardCard') return null

              const {
                title: cardTitle,
                subtitle,
                date,
                buttonText: cardButtonText,
                backgroundMedia,
              } = card

              return (
                <SwiperSlide key={card.id || index} className="click-slider-slide">
                  <div
                    className="click-slider-card"
                    onClick={() => {
                      if (isDesktop && swiperRef.current) {
                        swiperRef.current.slideNext()
                      }
                    }}
                    style={{ cursor: isDesktop ? 'none' : 'pointer' }}
                  >
                    {backgroundMedia && typeof backgroundMedia === 'object' && (
                      <div className="click-slider-card-background">
                        <Media
                          resource={backgroundMedia}
                          fill
                          className="relative w-full h-full"
                          imgClassName="object-cover w-full h-full"
                          pictureClassName="absolute inset-0 w-full h-full"
                          videoClassName="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="content">
                      <div className="inner">
                        {(subtitle || date) && (
                          <div className="row-top">
                            {subtitle && (
                              <span className="subtitle">{subtitle}</span>
                            )}
                            {date && (
                              formatEventDate(date)
                            )}
                          </div>
                        )}
                        {cardTitle && (
                          <div className="row-middle">
                            <h2 className="card-title text-heading-2">{cardTitle}</h2>
                          </div>
                        )}
                        {cardButtonText && (
                          <div className="row-bottom">
                            <button>{cardButtonText}</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
          {validCards.length > 1 && (
            <div className="click-slider-marker-container">
              {validCards.map((_, index) => (
                <button
                  key={index}
                  className={`click-slider-marker ${activeIndex === index ? 'active' : ''}`}
                  onClick={() => {
                    if (swiperRef.current) {
                      swiperRef.current.slideTo(index)
                    }
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
