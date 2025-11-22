'use client'
import { cn } from '@/utilities/ui'
import React, { useState, useEffect } from 'react'
import { RxCaretLeft } from 'react-icons/rx'
import { useSpring, animated, useChain, useSpringRef } from 'react-spring'
import { Disc } from '@/components/Disc'

type Tab = {
  id: string
  button: {
    text: string
    link: unknown
  }
}

type TabPanelClientProps = {
  tabs: Tab[]
  defaultActiveTabId: string | null
  children: React.ReactNode
}

export const TabPanelClient: React.FC<TabPanelClientProps> = ({
  tabs,
  defaultActiveTabId,
  children,
}) => {
  const [activeTabId, setActiveTabId] = useState<string | null>(defaultActiveTabId)
  const [isMounted, setIsMounted] = useState<boolean>(false)

  // Initialize breakpoint states to prevent layout shift
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(min-width: 1090px)').matches
    }
    return false
  })
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(max-width: 767px)').matches
    }
    return false
  })
  const [isTablet, setIsTablet] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(min-width: 768px) and (max-width: 1089px)').matches
    }
    return false
  })

  // Initialize panel state: open on desktop, closed on mobile/tablet
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(min-width: 1090px)').matches
    }
    return false
  })

  // Check if we're on mobile (< 768px)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 767px)').matches)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Check if we're on tablet (768px to 1089px)
  useEffect(() => {
    const checkTablet = () => {
      setIsTablet(window.matchMedia('(min-width: 768px) and (max-width: 1089px)').matches)
    }
    checkTablet()
    window.addEventListener('resize', checkTablet)
    return () => window.removeEventListener('resize', checkTablet)
  }, [])

  // Check if we're on desktop and set panel state accordingly
  useEffect(() => {
    const checkDesktop = () => {
      const desktop = window.matchMedia('(min-width: 1090px)').matches
      setIsDesktop(desktop)
      // Panel open on desktop, closed on mobile/tablet
      setIsPanelOpen(desktop)
    }
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  // ============================================
  // TAB PANEL ANIMATIONS (All breakpoints)
  // ============================================
  const rotationRef = useSpringRef()
  const panelRef = useSpringRef()

  const rotationSpring = useSpring({
    ref: rotationRef,
    transform: isPanelOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    config: { duration: 250, easing: (t: number) => t * (2 - t) }, // ease-in-out
  })

  const panelSpring = useSpring({
    ref: panelRef,
    transform: isPanelOpen ? 'translateX(0%)' : 'translateX(-95%)',
    config: {
      duration: 1000,
      easing: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2), // cubic ease-in-out
    },
  })

  // Chain animations: caret rotates first, then panel moves
  useChain([rotationRef, panelRef], [0, 0.25])

  // ============================================
  // TAB CONTENT ANIMATIONS (Desktop only)
  // ============================================
  const panelWidthPercent = 100 / 6 // ~16.666%
  const panelWidth75Percent = panelWidthPercent * 0.75 // 75% of panel width = ~12.5%
  const panelWidth25Percent = panelWidthPercent * 0.25 // 25% of panel width = ~4.166%

  // Calculate width change and increase by 30% total (15% + 15% more)
  const baseWidthChange = (panelWidth25Percent / (100 - panelWidthPercent)) * 75
  const increasedWidthChange = baseWidthChange * 1.3225 // 15% more, then another 15% more (1.15 * 1.15)

  const contentSpring = useSpring({
    x: isPanelOpen ? 0 : -panelWidth75Percent, // Move left by 75% of panel width
    widthPercent: isPanelOpen ? 75 : 75 + increasedWidthChange, // Width percentage (increased by 30% total)
    config: {
      duration: 1000,
      delay: 250, // Start after caret rotation
      easing: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2), // cubic ease-in-out
    },
    immediate: !isDesktop, // Don't animate on initial render if not desktop (prevents shift)
  })

  // Set mounted state after initial render to show content
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Hide admin bar when component mounts
  useEffect(() => {
    const adminBar = document.querySelector('.admin-bar') as HTMLElement
    const originalAdminBarDisplay = adminBar?.style.display

    // Hide admin bar
    if (adminBar) {
      adminBar.style.display = 'none'
    }

    return () => {
      // Restore admin bar
      if (adminBar) {
        adminBar.style.display = originalAdminBarDisplay || ''
      }
    }
  }, [])

  // Early return if no tabs
  if (tabs.length === 0) {
    return null
  }

  return (
    <>
      {/* Left Panel - Tab Buttons (3/4 on mobile, 1/2 on tablet, 1/6 on desktop) */}
      {/* TAB PANEL ANIMATIONS: Work on all breakpoints - Fixed in place */}
      <animated.div
        className={cn(
          'fixed left-0 w-3/4 md:w-1/2 lg:w-[calc(100%/6)] bg-peach-cream rounded-r-2xl shadow-[4px_0_12px_rgba(232,153,122,0.3)] z-50 flex flex-col',
        )}
        style={{
          ...panelSpring,
          height: '90vh',
          top: '5vh',
        }}
      >
        {/* Toggle button floating next to top right corner */}
        <button
          onClick={() => setIsPanelOpen(!isPanelOpen)}
          className="absolute top-0 -right-[70px] w-[60px] h-[60px] bg-peach-cream rounded-full shadow-[4px_0_12px_rgba(232,153,122,0.3)] flex items-center justify-center hover:opacity-80 transition-opacity z-[60] text-espresso"
          aria-label={isPanelOpen ? 'Close panel' : 'Open panel'}
        >
          <animated.span
            className="text-espresso flex items-center justify-center"
            style={{
              width: '100%',
              ...rotationSpring,
            }}
          >
            <RxCaretLeft size={36} />
          </animated.span>
        </button>
        <div className="h-full w-full overflow-y-auto">
          <div className="p-8 space-y-2 flex flex-col items-end">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTabId(tab.id)
                  // Close the panel when a tab is clicked on all breakpoints
                  setIsPanelOpen(false)
                }}
                className={cn('text-right p-4 rounded transition-colors bg-transparent', {
                  'text-espresso font-semibold': activeTabId === tab.id,
                  'text-espresso/70 hover:text-espresso': activeTabId !== tab.id,
                })}
              >
                {tab.button.text || `Tab ${tab.id}`}
              </button>
            ))}
          </div>
        </div>
      </animated.div>

      {/* Right Panel - Tab Content */}
      {/* TAB CONTENT ANIMATIONS: Desktop has width animations, all breakpoints scroll normally */}
      {isMounted && (
        <>
          {isDesktop ? (
            <>
              <div className="relative ml-[calc(100%/6+(100%-100%/6)*0.125)] flex min-h-screen">
                <animated.div
                  className="relative bg-porcelain [&_*]:!text-espresso flex-shrink-0"
                  style={{
                    transform: contentSpring.x.to((x) => `translateX(${x}vw)`),
                    width: contentSpring.widthPercent.to(
                      (w: number) => `calc((100% - 100% / 6) * ${w / 100})`,
                    ),
                    zIndex: 20,
                  }}
                >
                  {React.Children.map(children, (child, index) => {
                    const tab = tabs[index]
                    if (!tab) return null
                    return (
                      <div
                        key={tab.id}
                        className={cn({
                          hidden: activeTabId !== tab.id,
                        })}
                      >
                        {child}
                      </div>
                    )
                  })}
                </animated.div>
                <div
                  className="flex-1 h-screen relative"
                  style={{ minHeight: '100vh', minWidth: 0 }}
                >
                  <Disc isMounted={isMounted} isPanelOpen={isPanelOpen} />
                </div>
              </div>
            </>
          ) : (
            <div
              className={cn(
                'bg-porcelain [&_*]:!text-espresso',
                isMobile
                  ? 'w-[95%] mx-auto mt-[4vh]'
                  : isTablet
                    ? 'w-[95%] mx-auto mt-[3vh]'
                    : 'w-[90%] mx-auto',
              )}
            >
              {React.Children.map(children, (child, index) => {
                const tab = tabs[index]
                if (!tab) return null
                return (
                  <div
                    key={tab.id}
                    className={cn({
                      hidden: activeTabId !== tab.id,
                    })}
                  >
                    {child}
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}
    </>
  )
}
