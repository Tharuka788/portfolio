import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Only protect /admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {

        // Allow access to login page
        if (request.nextUrl.pathname === '/admin/login') {
            return NextResponse.next();
        }

        // Check for "auth" cookie
        // In a real app, use a secure session token (JWT, NextAuth, etc.)
        // For this simple portfolio, a simple cookie check is sufficient for demonstration.
        const authCookie = request.cookies.get('admin_session');

        if (authCookie?.value !== process.env.ADMIN_PASSWORD) {
            // Redirect to login if not authenticated
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};
