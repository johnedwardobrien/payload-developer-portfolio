import React from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'

import type { Page } from '@/payload-types'

type TabContentProps = {
  blocks: Page['layout'][0][]
}

export const TabContent: React.FC<TabContentProps> = ({ blocks }) => {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    // Return empty div instead of null to maintain index alignment in TabPanelClient
    return <div className="p-8" />
  }

  return (
    <div className="p-8">
      <RenderBlocks blocks={blocks} />
    </div>
  )
}
