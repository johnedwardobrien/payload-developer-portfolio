import React from 'react'

type Props = {
  disableInnerContainer?: boolean
  [key: string]: unknown
}

export const EventCard: React.FC<Props> = (props) => {
  console.log('EventCard data:', props)

  return <></>
}
