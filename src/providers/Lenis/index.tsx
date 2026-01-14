'use client'

import React, { useEffect } from 'react'
import Lenis from 'lenis'

export const LenisProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: .9,
      easing: (t) => .8,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}

