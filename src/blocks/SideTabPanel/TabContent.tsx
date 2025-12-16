import React from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'

import type { Page } from '@/payload-types'

type TabContentProps = {
	blocks: Page['layout'][0][]
}

export const TabContent: React.FC<TabContentProps> = ({
	blocks 
}) => {
	return (
		<>
			<RenderBlocks blocks={blocks} />
		</>
	)
}
