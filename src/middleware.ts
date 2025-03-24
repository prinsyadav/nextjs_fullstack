import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/signup";
  const token = request.cookies.get("token")?.value || "";

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
  }

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl.origin));
  }
}

export const config = {
  matcher: ["/", "/profile", "/login", "/signup"],
};
