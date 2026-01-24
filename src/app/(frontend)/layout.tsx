import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Figtree, Plus_Jakarta_Sans, Zalando_Sans, Google_Sans_Code } from 'next/font/google'
import React, { cache } from 'react'

// import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { ChatHeader } from '@/ChatHeader/Component'
import { ChatFooter } from '@/ChatFooter/Component'
import { Providers } from '@/providers'
import type { PageHeaderType, PageFooterType } from '@/collections/Pages/types'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode, headers } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

const FigtreeFont = Figtree({
  variable: '--yb-font-body',
  subsets: ['latin'],
  display: 'swap',
})

const PlusJakartaSansFont = Plus_Jakarta_Sans({
  variable: '--yb-font-header',
  subsets: ['latin'],
  display: 'swap',
})

const ZalandoSans = Zalando_Sans({
  variable: '--zs-font-body',
  subsets: ['latin'],
  display: 'swap',
  fallback: ['--yb-font-header'],
})

const GoogleSansCode = Google_Sans_Code({
  variable: '--gsc-font-header',
  subsets: ['latin'],
  display: 'swap',
  fallback: ['--yb-font-header'],
})

const queryPageByPathname = cache(async (pathname: string) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  // Extract slug from pathname (remove leading slash)
  const slug = pathname === '/' ? 'home' : pathname.replace(/^\//, '')

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const headersList = await headers()

  // Try to get pathname from custom header (set by middleware) or from referer
  let pathname = headersList.get('x-pathname')
  if (!pathname) {
    const referer = headersList.get('referer')
    if (referer) {
      try {
        const url = new URL(referer)
        pathname = url.pathname
      } catch {
        pathname = '/'
      }
    } else {
      pathname = '/'
    }
  }

  // Try to get page data to check header and footer settings
  let headerType: PageHeaderType | undefined
  let footerType: PageFooterType | undefined
  let theme: string | undefined
  try {
    const page = await queryPageByPathname(pathname)
    if (page?.header) {
      headerType = page?.header
    }

    if (page?.footer) {
      footerType = page?.footer
    }

    if (page?.theme) {
      theme = page.theme
    }
  } catch {
    // If page doesn't exist or error, default to showing header/footer with main versions
    // This is expected for non-page routes (like /posts, /search, etc.)
  }

  return (
    <html
      className={cn(
        GeistSans.variable,
        GeistMono.variable,
        FigtreeFont.variable,
        PlusJakartaSansFont.variable,
        ZalandoSans.variable,
        GoogleSansCode.variable,
      )}
      lang="en"
      suppressHydrationWarning
      data-custom-theme={theme || undefined}
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          {/* <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          /> */}

          {(() => {
            switch (headerType) {
              case 'chat':
                return <ChatHeader />
              case 'empty':
                return null
              case 'main':
                return <Header />
              default:
                return null
            }
          })()}
          {children}
          {(() => {
            switch (footerType) {
              case 'chat':
                return <ChatFooter />
              case 'empty':
                return null
              case 'main':
                return <Footer />
              default:
                return null
            }
          })()}
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
