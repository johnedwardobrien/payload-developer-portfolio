'use client'

import { Analytics } from '@vercel/analytics/next'

const ignoredPathSegments = ['/admin', '/next/preview']

export function FrontendAnalytics() {
  return (
    <Analytics
      beforeSend={(event) => {
        const url = new URL(event.url)

        if (
          ignoredPathSegments.some((pathSegment) => url.pathname.includes(pathSegment)) ||
          url.searchParams.has('preview')
        ) {
          return null
        }

        return event
      }}
    />
  )
}
