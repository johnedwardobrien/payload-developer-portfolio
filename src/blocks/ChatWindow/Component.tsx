import React from 'react'
import { ChatWindowClient } from './Component.client'

type ChatWindowProps = {
  helpText?: string | null
  chatType?: string | null
  placeholders?: unknown[] | null
  id?: string | null
  blockName?: string | null
  blockType: 'chatWindow'
}

export const ChatWindow: React.FC<ChatWindowProps> = (props) => {
  const { helpText, chatType, placeholders } = props

  return <ChatWindowClient helpText={helpText} chatType={chatType} placeholders={placeholders} />
}
