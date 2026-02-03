import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...og,
    images: og?.images ?? undefined,
  }
}
