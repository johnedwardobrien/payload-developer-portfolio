'use client'
import { cn } from '@/utilities/ui'
import React, { useState, useMemo } from 'react'

type Tab = {
  id: string
  button: {
    text: string
    link: any
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

  // Early return if no tabs
  if (tabs.length === 0) {
    return null
  }

  return (
    <div className="sticky top-0 w-full h-screen flex">
      {/* Left Panel - Tab Buttons (1/3 width) */}
      <div className="w-1/3 border-r border-border bg-card overflow-y-auto">
        <div className="p-8 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={cn('w-full text-left p-4 rounded transition-colors', {
                'bg-primary text-primary-foreground': activeTabId === tab.id,
                'bg-muted hover:bg-muted/80': activeTabId !== tab.id,
              })}
            >
              {tab.button.text || `Tab ${tab.id}`}
            </button>
          ))}
        </div>
      </div>

      {/* Right Panel - Tab Content (2/3 width) */}
      <div className="w-2/3 bg-background overflow-y-auto">
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
    </div>
  )
}
