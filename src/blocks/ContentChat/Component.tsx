import React from 'react'
import { ContentChatClient } from './Component.client'

type ContentChatProps = {
  helpText?: string | null
  pineconeIndex?: string | null
  promptContext?: string | null
  promptInstructions?: string | null
  placeholders?: unknown[] | null
  id?: string | null
  blockName?: string | null
  blockType: 'contentChat'
}

export const ContentChat: React.FC<ContentChatProps> = (props) => {
  const { helpText, pineconeIndex, promptContext, promptInstructions, placeholders } = props

  return (
    <ContentChatClient
      helpText={helpText}
      pineconeIndex={pineconeIndex}
      promptContext={promptContext}
      promptInstructions={promptInstructions}
      placeholders={placeholders}
    />
  )
}
