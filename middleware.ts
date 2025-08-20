import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  // Public routes that don't require authentication
  const isPublicRoute = ['/signin', '/signup', '/'].includes(nextUrl.pathname)
  const isAuthPage = ['/signin', '/signup'].includes(nextUrl.pathname)

  // If user is not logged in and trying to access a protected route
  if (!isLoggedIn && !isPublicRoute) {
    const signInUrl = new URL('/signin', nextUrl.origin)
    signInUrl.searchParams.set('callbackUrl', nextUrl.href)
    return NextResponse.redirect(signInUrl)
  }

  // If user is logged in and trying to access signin/signup, redirect to /
  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL('/', nextUrl.origin))
  }

  // Allow the request to continue
  return NextResponse.next()
})

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}