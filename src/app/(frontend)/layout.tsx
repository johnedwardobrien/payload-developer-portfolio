import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import {
  Figtree,
  Plus_Jakarta_Sans,
  Zalando_Sans,
  Google_Sans_Code,
  MedievalSharp,
} from 'next/font/google'
import React, { cache } from 'react'

import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { Analytics } from '@vercel/analytics/next'

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

const MedievalSharpFont = MedievalSharp({
  variable: '--medieval-font-header',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
  fallback: ['--yb-font-header'],
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      className={cn(
        GeistSans.variable,
        GeistMono.variable,
        FigtreeFont.variable,
        PlusJakartaSansFont.variable,
        ZalandoSans.variable,
        GoogleSansCode.variable,
        MedievalSharpFont.variable,
      )}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
      </head>
      <body>
        <Providers>
          {/* <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          /> */}
          {/* {(() => {
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
          })()} */}
          {children}
          <Analytics />
          {/* {(() => {
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
          })()} */}
        </Providers>
      </body>
    </html>
  )
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
