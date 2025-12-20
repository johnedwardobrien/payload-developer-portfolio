import React from 'react'

import type { SideTabPanel as SideTabPanelProps } from '@/payload-types'
import { TabPanelClient } from './TabPanelClient'
import { TabContent } from './TabContent'

export const SideTabPanel: React.FC<SideTabPanelProps> = (props) => {
  const { tabGroups } = props
  if (!tabGroups || !tabGroups.length) return <></>
  const tabButtonIdx: { [key: string]: any } = {}
  const tabContentIdToArrIdx: { [key: string]: any } = {}
  const tabContentArr: any[] = []
  let defaultTabIdx: string = ''
  let tab: { [key: string]: any }
  for (let i = 0; i < tabGroups?.length; i++) {
    tab = tabGroups[i]
    if (i === 0) defaultTabIdx = tab.id
    tabButtonIdx[tab.id] = tab.btn
    tabContentArr.push(tab.content)
    tabContentIdToArrIdx[tab.id] = i
  }
  return (
    <TabPanelClient
      tabButtonIdx={tabButtonIdx}
      tabContentIdToArrIdx={tabContentIdToArrIdx}
      defaultTabIdx={defaultTabIdx}
    >
      {tabContentArr.map((content, idx) => {
        return <TabContent key={`content-parent-${idx}`} blocks={content} />
      })}
    </TabPanelClient>
  )
}
