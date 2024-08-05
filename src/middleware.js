// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const adminToken = request.cookies.get('adminToken');
  const subAdminToken = request.cookies.get('subAdminToken')?.value || ''
  const url = request.nextUrl;

  // If no adminToken and trying to access the dashboard, redirect to loginAdmin
  if (!adminToken && url.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/user/me/admin/login-admin', request.url));
  }

  // If adminToken is present and trying to access createAdmin or loginAdmin, redirect to dashboard
  if (adminToken && (url.pathname.startsWith('/user/me/admin/create-admin') || url.pathname.startsWith('/user/me/admin/login-admin') || url.pathname.startsWith('/user/login_subAdmin'))) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Allow the request to continue
  return NextResponse.next();
}

// Specify the paths to apply the middleware
export const config = {
  matcher: [
    '/dashboard/:path*', // Protect dashboard path
    '/user/me/admin/create-admin', // Protect createAdmin path
    '/user/me/admin/login-admin', // Protect loginAdmin path
    '/user/login_subAdmin', // Protect subAdmin login path
  ],
};
