import React from 'react'

import type { SideTabPanel as SideTabPanelProps } from '@/payload-types'
import { TabPanelClient } from './TabPanelClient'
import { TabContent } from './TabContent'

export const SideTabPanel: React.FC<SideTabPanelProps> = (props) => {
  const { tabGroups } = props

  // Extract and validate tab groups data
  if (!tabGroups || !Array.isArray(tabGroups)) {
    return null
  }

  const tabs = tabGroups
    .map((tabGroup, index) => {
      if (!tabGroup) return null

      const button = tabGroup.btn
      const content = tabGroup.content

      return {
        id: tabGroup.id || `tab-${index}`,
        button: {
          text: button?.text || '',
          link: button?.link || null,
        },
        content: content || [],
      }
    })
    .filter((tab): tab is NonNullable<typeof tab> => tab !== null)

  // Early return if no tabs
  if (tabs.length === 0) {
    return null
  }

  const defaultActiveTabId = tabs.length > 0 ? tabs[0].id : null

  return (
    <TabPanelClient tabs={tabs} defaultActiveTabId={defaultActiveTabId}>
      {tabs.map((tab) => {
        // Always return a TabContent component to maintain index alignment
        // TabContent will return null internally if blocks are empty
        return <TabContent key={tab.id} blocks={tab.content || []} />
      })}
    </TabPanelClient>
  )
}
