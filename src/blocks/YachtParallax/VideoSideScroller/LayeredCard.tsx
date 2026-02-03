'use client'

import React from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'

import type { StandardCard } from '@/payload-types'
import { Media } from '@/components/Media'

type Props = {
  card: StandardCard
  index: number
  containerRef: React.RefObject<HTMLDivElement>
  containerWaypoints: number[]
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
}

export const LayeredCard: React.FC<Props> = ({
  card,
  index,
  containerRef,
  containerWaypoints,
  setCurrentIndex,
}) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const clipPathPercent = useTransform(
    scrollYProgress,
    [containerWaypoints[index], containerWaypoints[index + 1] ? containerWaypoints[index + 1] : 1],
    [100, 0],
  )
  const clipPath = useTransform(
    clipPathPercent,
    (value) => `inset(${value}% 0% 0% 0% round 32px 0px 0px 32px)`,
  )

  useMotionValueEvent(clipPathPercent, 'change', (ev) => {
    if (ev < 68) {
      setCurrentIndex(index)
    }
  })

  return (
    <motion.div
      key={card.id || index}
      className={`video-layered-card-image-item`}
      style={{
        clipPath: index === 0 ? 'inset(0% 0% 0% 0% round 32px 0px 0px 32px)' : clipPath,
      }}
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
          posterSrc="/video-poster-yacht-bazaar.png"
          placeholderBlur="/video-poster-yacht-bazaar.png"
        />
      )}
    </motion.div>
  )
}
