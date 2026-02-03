import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Set the pathname as a custom header so layout can access it
  response.headers.set('x-pathname', request.nextUrl.pathname)

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
