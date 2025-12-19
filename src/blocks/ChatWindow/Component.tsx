import React from 'react'

type ChatWindowProps = {
  helpText?: string | null
  blocks?: any[] | null
  id?: string | null
  blockName?: string | null
  blockType: 'chatWindow'
}

export const ChatWindow: React.FC<ChatWindowProps> = (props) => {
  console.log('ChatWindow data:', props)

  return <></>
}
