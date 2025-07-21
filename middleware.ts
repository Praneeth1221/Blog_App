import { createMiddleware } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Handle auth middleware
  const res = NextResponse.next();
  
  // Protect admin routes
  if (req.nextUrl.pathname.startsWith('/admin')) {
    // This will be handled by the admin page component
    // which checks for admin role
  }
  
  // Protect dashboard routes
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    // This will be handled by the dashboard page component
    // which checks for authentication
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*']
};