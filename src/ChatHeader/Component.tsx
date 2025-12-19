import { ChatHeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { ChatHeader } from '@/payload-types'

export async function ChatHeader() {
  const chatHeaderData: ChatHeader = await getCachedGlobal('chatHeader', 1)()

  return <ChatHeaderClient data={chatHeaderData} />
}
