import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Define the workspaces
  const workspaces = ["admin", "client", "talent"]

  for (const workspace of workspaces) {
    // Match exactly `/admin`, `/admin/`, or `/admin?query=...`
    if (
      pathname === `/${workspace}` ||
      pathname === `/${workspace}/`
    ) {
      const url = request.nextUrl.clone()
      url.pathname = `/${workspace}/dashboard`
      return NextResponse.redirect(url)
    }
  }

  // Default: continue
  return NextResponse.next()
}

// Limit middleware to only run on these paths
export const config = {
  matcher: ["/admin/:path*", "/client/:path*", "/talent/:path*"],
}
