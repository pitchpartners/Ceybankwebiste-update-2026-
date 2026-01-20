import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAMES = ['better-auth.session_token', '__Secure-better-auth.session_token'];

function getSessionCookie(request: NextRequest) {
  for (const name of COOKIE_NAMES) {
    const value = request.cookies.get(name)?.value;
    if (value) return value;
  }
  return null;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public/static bypass
  if (
    pathname.startsWith('/public') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/api/auth') ||
    pathname.match(/\\.(css|js|png|jpg|jpeg|svg|ico|webp|woff2?)$/)
  ) {
    return NextResponse.next();
  }

  // Auth pages — redirect away if already logged in
  if (pathname.startsWith('/auth')) {
    const sessionCookie = getSessionCookie(request);
    if (sessionCookie) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // Everything else is protected
  const sessionCookie = getSessionCookie(request);
  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
