import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const pathname = request.nextUrl.pathname;

  // Define public routes
  const publicRoutes = ["/"]; // Add any other public routes

  // Check if the current route is public
  const isPublicRoute = publicRoutes.includes(pathname);

  // If it's a public route, allow access
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // If no token for a private route, redirect to login
  if (!token) {
    const loginUrl = new URL("/", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If token exists, allow access to private route
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - Static files (e.g., /_next/*, /static/*)
     * - Image optimization (/image)
     * - Favicon (/favicon.ico)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};