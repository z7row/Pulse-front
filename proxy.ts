import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const authRoutes = ['/auth/login', '/auth/signup', '/auth/verify-email', '/blog/*'];
  const isAuthRoute = authRoutes.includes(pathname);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-hide-navbar', isAuthRoute ? 'true' : 'false');
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
