import React from 'react'
import { ChatWindowClient } from './Component.client'

type ChatWindowProps = {
  helpText?: string | null
  pineconeIndex?: string | null
  promptContext?: string | null
  promptInstructions?: string | null
  placeholders?: unknown[] | null
  id?: string | null
  blockName?: string | null
  blockType: 'chatWindow'
}

export const ChatWindow: React.FC<ChatWindowProps> = (props) => {
  const { helpText, pineconeIndex, promptContext, promptInstructions, placeholders } = props

  return (
    <ChatWindowClient
      helpText={helpText}
      pineconeIndex={pineconeIndex}
      promptContext={promptContext}
      promptInstructions={promptInstructions}
      placeholders={placeholders}
    />
  )
}
