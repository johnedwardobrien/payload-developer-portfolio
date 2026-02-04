'use client'

import React from 'react'
import { ParallaxProvider } from 'react-scroll-parallax'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { LenisProvider } from './Lenis'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <LenisProvider>
      <ThemeProvider>
        <HeaderThemeProvider>
          <ParallaxProvider>{children}</ParallaxProvider>
        </HeaderThemeProvider>
      </ThemeProvider>
    </LenisProvider>
  )
}
