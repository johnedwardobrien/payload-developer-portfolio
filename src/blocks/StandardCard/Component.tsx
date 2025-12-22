import React from 'react'

type Props = {
  disableInnerContainer?: boolean
  [key: string]: unknown
}

export const StandardCard: React.FC<Props> = (props) => {
  console.log('StandardCard data:', props)

  return <></>
}
