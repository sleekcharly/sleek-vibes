import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Middleware to check if user has a token or is
// heading to the login page.
export async function middleware(req: NextRequest) {
  // Token will exist if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  // get the pathname
  const { pathname } = req.nextUrl;

  // Allow the requests if the followig is true...
  // 1) Its a request for next-auth session & provider fetching
  // 2) the token exists
  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next();
  }

  // Redirect them to the login page if they don't have
  // token AND are requesting a protected route

  if (!token && pathname !== '/login') {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
}

// Adding this piece of code clears the bug associated with the
// middleware configuration above.
export const config = {
  matcher: '/',
};
