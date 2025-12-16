'use client'
import { cn } from '@/utilities/ui'
import React, { useState, useEffect } from 'react'
import { RxCaretLeft } from 'react-icons/rx'
import { useSpring, animated, useChain, useSpringRef, easings } from 'react-spring'

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
  // console.log(tabButtonIdx, tabContentIdx)
  const [desktop, setDesktop] = useState(false)
  const [activeTabId, setActiveTabId] = useState(defaultTabIdx)
  const [caretToggle, setCaretToggle] = useState(true)

  const caretSpring = useSpring({
    transform: caretToggle ? 'rotate(180deg)' : 'rotate(0deg)',
    config: { duration: 400, easing: (t: number) => t },
  })
  const panelSpring = useSpring({
    left: caretToggle ? '0' : '-28%',
    config: { duration: 500, easing: easings.easeInOutQuad },
  })
  const contentSpring = useSpring({
    gridTemplateColumns: caretToggle ? '1fr 58% 100px' : '1fr 75% 100px',
    config: { duration: 500, easing: easings.easeInOutCubic },
  })

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 980) {
        setDesktop(true)
      } else {
        setDesktop(false)
      }
    })
  }, [])

  return (
    <>
      <animated.div
        style={panelSpring}
        className={`bg-peach-cream w-[30%] h-[85vh] mr-auto fixed top-1/2 -translate-y-1/2 rounded-r-xl z-40`}
      >
        <div className={`flex flex-col items-end py-3 pr-8`}>
          {Object.entries(tabButtonIdx).map((subArr) => {
            const [key, obj] = subArr
            return (
              <div key={`${key}-btn`} className={cn(`w-fit my-1`)}>
                <button
                  onClick={() => {
                    setActiveTabId(key)
                  }}
                  className={`text-xl hover:text-deep-umber transition-colors duration-200`}
                >
                  {obj.text}
                </button>
              </div>
            )
          })}
        </div>
        <animated.button
          style={caretSpring}
          className={`absolute bg-peach-cream p-2 flex right-[-75px] top-0 rounded-full hover:bg-warm-sand transition-colors duration-200`}
          onClick={() => {
            setCaretToggle(!caretToggle)
          }}
        >
          <RxCaretLeft fontSize={'2rem'} />
        </animated.button>
      </animated.div>
      <animated.div
        style={contentSpring}
        className={cn(`grid w-screen h-screen bg-porcelain text-espresso`)}
      >
        <div className={`flex flex-col h-full w-full bg-porcelain`}></div>
        <div className={cn(`flex flex-col bg-porcelain`)}>
          {React.Children.map(children, (child, index) => {
            return (
              <div
                key={`${index}-content`}
                className={cn({
                  hidden: tabContentIdToArrIdx[activeTabId] !== index,
                })}
              >
                {child}
              </div>
            )
          })}
        </div>
        {/* <div>
					
				</div> */}
      </animated.div>
    </>
  )
}
