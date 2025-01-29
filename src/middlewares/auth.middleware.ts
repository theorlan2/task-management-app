import { NextRequest, NextResponse } from "next/server";

export function authMiddleware(request: NextRequest) {
  const hasToken = request.cookies.has("accessToken");
  if (hasToken) {
    if (request.nextUrl.pathname.startsWith("/auth/signin")) {
      return NextResponse.redirect(new URL("/tasks", request.url));
    }
  } else {
    if (request.nextUrl.pathname.endsWith("/tasks")) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  }
}
