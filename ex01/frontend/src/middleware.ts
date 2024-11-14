import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const guestPaths = ['/login', '/register']
const authPaths = ['/']
export function middleware(request: NextRequest) {
	const isAuthenticated = request.cookies.get('token')

	if (isAuthenticated && guestPaths.includes(request.nextUrl.pathname)) {
		return NextResponse.redirect(new URL('/', request.url))
	}

	if (!isAuthenticated && authPaths.includes(request.nextUrl.pathname)) {
		return NextResponse.redirect(new URL('/login', request.url))
	}
}

export const config = {
	matcher:
		'/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
}
