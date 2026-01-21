'use client'
import React, { useState, useEffect } from 'react'
import { useScroll, useMotionValueEvent, motion } from 'framer-motion';
import type { YachtParallax as YachtParallaxType } from '@/payload-types'
import { MdOutlineSailing } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa6";
import { ScrollWindow as ScrollWindowComponent } from '@/blocks/ScrollWindow/Component'
import './Component.css'

type Props = {
  disableInnerContainer?: boolean
} & YachtParallaxType

export const YachtParallax: React.FC<Props> = (props) => {
  const { scrollWindows } = props
  const [showHeader, setShowHeader] = useState(true)
  const [isTablet, setIsTablet] = useState(false)
  const { scrollY } = useScroll()

  React.useEffect(() => {
    const checkTablet = () => {
      setIsTablet(window.innerWidth >= 768)
    }

    checkTablet()
    window.addEventListener('resize', checkTablet)
    return () => {
      window.removeEventListener('resize', checkTablet)
    }
  }, [])

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (!previous) return;
    if (isTablet) {
      if (latest > previous) {
        setShowHeader(false);
      } else if (latest < previous) {
        setShowHeader(true);
      }
    } else {
      setShowHeader(true)
    }
  });

  if (!scrollWindows || !Array.isArray(scrollWindows) || scrollWindows.length === 0) {
    return <></>
  }

  return (
    <div
      className='yacht-parallax-cont'
    >
      <motion.header
        animate={{
          y: showHeader ? 0 : '-100%'
        }}
        transition={{
          type: 'spring',
          bounce: 0,
          duration: 1,
          ease: 'easeInOut'
        }}
      >
        <div
          className='inner'
        >
          <h2>Yacht Bazaar</h2>
          <MdOutlineSailing />
          <a href='/'>
            <FaArrowLeft />
            <span>Back to home</span>
          </a>
        </div>
      </motion.header>
      {scrollWindows.map((scrollWindow, index) => {
        if (typeof scrollWindow === 'string') return null
        return (
          <ScrollWindowComponent
            key={scrollWindow.id}
            {...scrollWindow}
            disableInnerContainer
            index={index + 1}
          />
        )
      })}
    </div>
  )
}
