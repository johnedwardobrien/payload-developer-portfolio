'use client'

import React, { createContext, useCallback, use, useState } from 'react'

export interface ContextType {
  ypData?: {
    topHeroLoaded: boolean
  }
  setYpData: (theme: any) => void
  isWithinProvider: boolean
}

const initialContext: ContextType = {
  ypData: {
    topHeroLoaded: false,
  },
  setYpData: () => null,
  isWithinProvider: false,
}

const YachtParallaxContext = createContext(initialContext)

export const YachtParallaxProvider = ({ children }: { children: React.ReactNode }) => {
  const [ypData, setYpData] = useState<ContextType['ypData']>(initialContext.ypData)
  return (
    <YachtParallaxContext value={{ ypData, setYpData, isWithinProvider: true }}>
      {children}
    </YachtParallaxContext>
  )
}

export const useYachtParallax = (): ContextType => use(YachtParallaxContext)
