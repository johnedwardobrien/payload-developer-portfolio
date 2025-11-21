'use client'
import React, { useEffect } from 'react'

export const LayoutStyles: React.FC<{ isEmptyLayout: boolean }> = ({ isEmptyLayout }) => {
  useEffect(() => {
    if (isEmptyLayout) {
      const style = document.createElement('style')
      style.id = 'empty-layout-styles'
      style.textContent = `
        header,
        footer {
          display: none !important;
        }
      `
      document.head.appendChild(style)

      return () => {
        const existingStyle = document.getElementById('empty-layout-styles')
        if (existingStyle) {
          document.head.removeChild(existingStyle)
        }
      }
    }
  }, [isEmptyLayout])

  return null
}
