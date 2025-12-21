import React from 'react'

type Props = {
  disableInnerContainer?: boolean
  [key: string]: unknown
}

export const IconButton: React.FC<Props> = (props) => {
  console.log('IconButton data:', props)

  return <></>
}
