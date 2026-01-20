import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;
  const { pathname } = request.nextUrl;

  // Protected routes - require authentication
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      // No token, redirect to login
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // Has token, allow access
    return NextResponse.next();
  }

  // Auth routes - redirect if already authenticated
  if (pathname === "/login" || pathname === "/signup") {
    if (token) {
      // Already logged in, redirect to dashboard
      return NextResponse.redirect(new URL("/dashboard/home", request.url));
    }
    // Not logged in, allow access to auth pages
    return NextResponse.next();
  }

  // All other routes - allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
