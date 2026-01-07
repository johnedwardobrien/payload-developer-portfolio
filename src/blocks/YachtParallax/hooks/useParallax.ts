'use client'

import { useEffect, useRef, type RefObject } from 'react'

export function useParallax<T extends HTMLElement = HTMLDivElement>(): RefObject<T> {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const calculateScrollProgress = () => {
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY || window.pageYOffset

      // Calculate element's position relative to viewport
      const elementTop = rect.top + scrollTop
      const elementHeight = rect.height
      const elementBottom = elementTop + elementHeight

      // Calculate scroll progress (0 = element enters viewport, 1 = element fully exits)
      const viewportTop = scrollTop
      const viewportBottom = scrollTop + windowHeight

      let progress = 0

      if (elementTop < viewportBottom && elementBottom > viewportTop) {
        // Element is in viewport
        const elementVisibleTop = Math.max(elementTop, viewportTop)
        const elementVisibleBottom = Math.min(elementBottom, viewportBottom)
        const visibleHeight = elementVisibleBottom - elementVisibleTop
        const totalScrollableDistance = elementHeight + windowHeight

        // Progress from 0 (entering) to 1 (exiting)
        if (elementTop < viewportTop) {
          // Element is above viewport or entering from top
          const scrolledPast = viewportTop - elementTop
          progress = Math.min(scrolledPast / totalScrollableDistance, 1)
        } else {
          // Element is entering from bottom
          progress = 0
        }
      } else if (elementTop >= viewportBottom) {
        // Element is below viewport
        progress = 0
      } else {
        // Element is above viewport
        progress = 1
      }

      // Alternative simpler calculation: progress based on element's position in viewport
      const simplerProgress = Math.max(
        0,
        Math.min(1, (windowHeight - rect.top) / (windowHeight + elementHeight)),
      )

      console.log('Parallax scroll progress:', simplerProgress.toFixed(3))

      return simplerProgress
    }

    // Throttle scroll events for better performance
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          calculateScrollProgress()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    // Calculate initial progress
    calculateScrollProgress()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return ref
}
