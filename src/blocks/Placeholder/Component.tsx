import React from 'react'

type PlaceholderProps = {
  textInput?: string | null
  id?: string | null
  blockName?: string | null
  blockType: 'placeholder'
}

export const Placeholder: React.FC<PlaceholderProps> = (props) => {
  console.log('Placeholder data:', props)

  return <></>
}
