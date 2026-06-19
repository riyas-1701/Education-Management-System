// middleware.js  ← root level, not inside app/
import { NextResponse } from 'next/server';

export function middleware(request) {
    console.log("middleware running on:", request.nextUrl.pathname);
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    // If user HAS token and tries to visit login/signup → push to dashboard
    if (token && (pathname === '/login' || pathname === '/signup')) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // If user has NO token and tries to visit dashboard → push to login
    if (!token && pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/login', '/signup', '/dashboard/:path*'],
};