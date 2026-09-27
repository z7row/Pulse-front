import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthRoute = 
    pathname.includes('/auth/login') || 
    pathname.includes('/auth/signup') || 
    pathname.includes('/auth/verify-email') || 
    pathname.includes('/blog');

  const response = intlMiddleware(request);

  response.headers.set(
    'x-middleware-request-x-hide-navbar', 
    isAuthRoute ? 'true' : 'false'
  );

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',],
};