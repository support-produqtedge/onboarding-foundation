import { NextRequest, NextResponse } from 'next/server'
import { decrypt, deleteSession } from './lib/session';

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard', '/home'];
const publicRoutes = ["/admin/login"];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = req.cookies.get('session')?.value;
  if (cookie) {
    const session = await decrypt(cookie);

    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
    if (session?.exp < Date.now() / 1000) {
      await deleteSession()
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
    if (isProtectedRoute && !session?.id) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }

    if (isPublicRoute && session?.id && !path.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  //matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
  matcher: [
    '/dashboard',
    "/home",
    "/admin/:path*",
  ]
}
