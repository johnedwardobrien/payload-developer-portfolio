'use client'

import React, { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'

export const LenisProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null)
  const isPopStateRef = useRef(false)
  const pathname = usePathname()

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      touchMultiplier: 2,
    })
    lenisRef.current = lenis

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    const onPopState = () => {
      isPopStateRef.current = true
    }
    window.addEventListener('popstate', onPopState)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('popstate', onPopState)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  useEffect(() => {
    // Back/forward navigations keep the browser's restored scroll position
    if (isPopStateRef.current) {
      isPopStateRef.current = false
      return
    }
    lenisRef.current?.scrollTo(0, { immediate: true, force: true })
  }, [pathname])

  return <>{children}</>
}
