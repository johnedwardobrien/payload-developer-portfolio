'use client'

import React from 'react'
import { ParallaxProvider } from 'react-scroll-parallax'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { LenisProvider } from './Lenis'
import { YachtParallaxProvider } from './YachtParallax'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <LenisProvider>
      <ThemeProvider>
        <HeaderThemeProvider>
          <YachtParallaxProvider>
            <ParallaxProvider>{children}</ParallaxProvider>
          </YachtParallaxProvider>
        </HeaderThemeProvider>
      </ThemeProvider>
    </LenisProvider>
  )
}
