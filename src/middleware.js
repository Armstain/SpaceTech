// AUTH MIDDLEWARE DISABLED FOR DEVELOPMENT
// import { NextResponse } from 'next/server';
// import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  // Authentication is currently disabled. All routes are accessible.
  return Response.next ? Response.next() : undefined;
}

export const config = {
  matcher: ['/admin/:path*'],
};
