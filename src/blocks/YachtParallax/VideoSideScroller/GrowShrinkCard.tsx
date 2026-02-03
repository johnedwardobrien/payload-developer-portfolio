'use client'

import { useRef, useEffect } from 'react'
import { useScroll, useTransform, motion, useMotionValueEvent, useInView } from 'framer-motion'
import { StandardCard } from '@/payload-types'
import { VideoCard } from '@/components/VideoCard'

export const GrowShrinkCard = ({
  videoCard,
  isDesktop,
}: {
  videoCard: StandardCard
  isDesktop: boolean
}) => {
  const cardRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  })
  let scale

  if (isDesktop) {
    scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1, 0.7])
  } else {
    scale = useTransform(scrollYProgress, [0, 0.3, 1], [0.7, 0.75, 1])
  }

  return (
    <motion.div
      ref={cardRef}
      className="card"
      style={{
        marginBottom: '5%',
        scale,
      }}
    >
      <VideoCard card={videoCard} posterSrc="/video-poster-yacht-bazaar.png" />
    </motion.div>
  )
}
