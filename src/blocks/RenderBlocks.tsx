import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { AnimationBlock } from '@/blocks/AnimationBlock/Component'
import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { SideTabPanel } from '@/blocks/SideTabPanel/Component'

const blockComponents = {
  animationBlock: AnimationBlock,
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  sideTabPanel: SideTabPanel,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              // SideTabPanel should not have margin as it fills the viewport
              const isSideTabPanel = blockType === 'sideTabPanel'
              return (
                <div className={isSideTabPanel ? '' : 'my-16'} key={`${index}-block`}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
