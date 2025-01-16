import { NextRequest, NextResponse } from "next/server";

export function authMiddleware(request: NextRequest) {
  const hasToken = request.cookies.has("accessToken");
  if (hasToken) {
    if (request.nextUrl.pathname.startsWith("/auth/login")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (request.nextUrl.pathname.endsWith("/")) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }
}
