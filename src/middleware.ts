import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host')
  const path = request.nextUrl.pathname
  const searchParams = request.nextUrl.searchParams
  const isPreview = searchParams.get('preview') === 'true'
  const isLocalDomain = hostname?.includes('localhost')

  // Set the pathname as a custom header so layout can access it
  const response = NextResponse.next()
  response.headers.set('x-pathname', path)
  console.log(hostname)
  if (path) {
    try {
      // Query pages to get the page with tenant
      const pageResponse = await fetch(
        `${request.nextUrl.origin}/api/pages?where[slug][equals]=${path}&limit=1`,
        { headers: request.headers },
      )

      if (pageResponse.ok) {
        const pageData = await pageResponse.json()
        const page = pageData.docs?.[0]
        const tenantDomain = page.tenant.domain

        if (page?.tenant?.domain) {
          if (isPreview) {
            if (hostname !== tenantDomain) {
              const newUrl = new URL(request.url)
              newUrl.hostname = tenantDomain
              return NextResponse.redirect(newUrl)
            }
          }
          if (isLocalDomain) {
            const domainName = page.tenant.domain.split('.')[0]
            const newHostname = `${domainName}.localhost`
            if (hostname !== newHostname) {
              const newUrl = new URL(request.url)
              newUrl.hostname = newHostname
              return NextResponse.redirect(newUrl)
            }
          }
          if (!isLocalDomain && !isPreview) {
            if (hostname !== tenantDomain) {
              return NextResponse.json({ error: 'Not Found' }, { status: 404 })
            }
          }
        }
      }
    } catch (error) {
      console.error('Failed to validate page tenant:', error)
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - *.ico, *.png, *.jpg, *.jpeg, *.gif, *.svg, *.webp (image files)
     */
    '/((?!api|_next/static|_next/image|.*\\.ico).*)',
  ],
}
