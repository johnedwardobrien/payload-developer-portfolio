import React from 'react'

type Props = {
  disableInnerContainer?: boolean
  [key: string]: unknown
}

export const ThreeCard: React.FC<Props> = (props) => {
  console.log('ThreeCard data:', props)

  return <></>
}
