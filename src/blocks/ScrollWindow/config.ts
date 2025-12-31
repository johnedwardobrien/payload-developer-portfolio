import type { Block } from 'payload'

import { AnimationBlock } from '../AnimationBlock/config'
import { Archive } from '../ArchiveBlock/config'
import { CallToAction } from '../CallToAction/config'
import { Content } from '../Content/config'
import { FormBlock } from '../Form/config'
import { SideTabPanel } from '../SideTabPanel/config'
import { MediaBlock } from '../MediaBlock/config'
import { ChatWindow } from '../ChatWindow/config'
import { ContentChat } from '../ContentChat/config'

export const ScrollWindow: Block = {
  slug: 'scrollWindow',
  interfaceName: 'ScrollWindow',
  fields: [
    {
      name: 'blocks',
      type: 'blocks',
      label: 'Scroll Window Blocks',
      blocks: [
        AnimationBlock,
        CallToAction,
        Content,
        MediaBlock,
        Archive,
        FormBlock,
        SideTabPanel,
        ChatWindow,
        ContentChat,
      ],
      admin: {
        initCollapsed: true,
      },
    },
  ],
}
