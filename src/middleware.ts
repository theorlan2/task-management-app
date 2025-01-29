import { authMiddleware } from "./middlewares/auth.middleware";
//
import { type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authMiddlewareResult = authMiddleware(request);
  if (authMiddlewareResult) return authMiddlewareResult;
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
