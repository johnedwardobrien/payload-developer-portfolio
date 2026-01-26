'use client'
import { cn } from '@/utilities/ui'
import React, { useState, useEffect } from 'react'
import { RxCaretLeft } from 'react-icons/rx'
import { useSpring, animated, easings } from 'react-spring'
import { motion } from 'framer-motion'
import { LiquidGlass } from '@liquidglass/react'
import { FaArrowRight } from 'react-icons/fa6'
import './Component.css'

type TabPanelClientProps = {
  tabButtonIdx: { [key: string]: any }
  tabContentIdToArrIdx: { [key: string]: any }
  defaultTabIdx: string
  children: React.ReactNode
}

export const TabPanelClient: React.FC<TabPanelClientProps> = ({
  tabButtonIdx,
  tabContentIdToArrIdx,
  defaultTabIdx,
  children,
}) => {
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [activeTabId, setActiveTabId] = useState(defaultTabIdx)
  const [caretToggle, setCaretToggle] = useState(true)

  const caretSpring = useSpring({
    transform: caretToggle ? 'rotate(180deg)' : 'rotate(0deg)',
    config: { duration: 400, easing: (t: number) => t },
  })
  const panelLeft = (() => {
    if (isTablet) {
      return caretToggle ? '0' : '-45%'
    }
    if (isDesktop) {
      return caretToggle ? '-16%' : '-38%'
    }
    return caretToggle ? '0' : '-68%'
  })()
  const panelSpring = useSpring({
    left: panelLeft,
    config: { duration: 500, easing: easings.easeInOutQuad },
  })
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setIsDesktop(width >= 1024)
      setIsTablet(width >= 768 && width < 1024)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <animated.div
        style={panelSpring}
        className={`tab-panel-cont w-[30%] h-[85vh] mr-auto fixed top-1/2 -translate-y-1/2 rounded-r-xl z-40`}
      >
        <div className={`buttons-cont py-3 pr-8`}>
          {Object.entries(tabButtonIdx).map((subArr) => {
            const [key, obj] = subArr
            return (
              <div
                key={`${key}-btn`}
                className={cn(`${activeTabId === key ? 'active ' : ''}panel-btn my-1`)}
              >
                <button
                  onClick={() => {
                    setActiveTabId(key)
                    setCaretToggle(false)
                  }}
                  className={``}
                >
                  {obj.text}
                  <FaArrowRight />
                </button>
              </div>
            )
          })}
        </div>
        <animated.button
          style={caretSpring}
          className={`tab-panel-btn absolute p-2 flex right-[-80px] top-0 rounded-full duration-200`}
          onClick={() => {
            setCaretToggle(!caretToggle)
          }}
        >
          <LiquidGlass
            blur={0.5}
            borderRadius={50}
            contrast={0.5}
            brightness={0.25}
            saturation={1}
            displacementScale={0.5}
            className="liquid-glass-cont"
          >
            <RxCaretLeft fontSize={'2rem'} />
          </LiquidGlass>
        </animated.button>
      </animated.div>
      <div
        className={cn(
          `tab-panel content-cont${caretToggle ? ' open' : ' closed'} grid w-full h-auto`,
        )}
      >
        <div className={cn(`inner flex flex-col`)}>
          <div className="title-cont">
            <h2>{tabButtonIdx[activeTabId].text}</h2>
          </div>
          {React.Children.map(children, (child, index) => {
            return (
              <motion.div
                key={`${index}-content`}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25 }}
                viewport={{ once: false, amount: 0.2 }}
                className={cn({
                  hidden: tabContentIdToArrIdx[activeTabId] !== index,
                })}
              >
                {child}
              </motion.div>
            )
          })}
        </div>
      </div>
    </>
  )
}
