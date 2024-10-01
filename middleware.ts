import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/" || path === "/auth/login" || path === "/auth/register";

  const token = request.cookies.get("jwt")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/auth/login",
    "/auth/register",
    "/dashboard/:path*",
    "/profile/:path*",
    // add other protected routes here
  ],
};
