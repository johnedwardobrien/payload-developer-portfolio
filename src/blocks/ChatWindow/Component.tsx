import React from 'react'
import { ChatWindowClient } from './Component.client'

type ChatWindowProps = {
  helpText?: string | null
  placeholders?: unknown[] | null
  id?: string | null
  blockName?: string | null
  blockType: 'chatWindow'
}

export const ChatWindow: React.FC<ChatWindowProps> = (props) => {
  const { helpText, placeholders } = props

  return <ChatWindowClient helpText={helpText} placeholders={placeholders} />
}
