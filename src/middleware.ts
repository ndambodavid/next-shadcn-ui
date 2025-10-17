
import { NextRequest, NextResponse } from "next/server"
import { verifySessionToken } from "@/lib/session"
import type { SessionPayload } from "@/lib/session"

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl
    const token = req.cookies.get("session")?.value

    // 1. Define route types
    const protectedRoutes = ["/admin", "/client", "/talent"]
    const authRoutes = ["/login", "/signup"]
    const mfaRoute = "/mfa"

    // 2. Attempt to verify the session token early
    let session: SessionPayload | null = null
    if (token) {
        session = await verifySessionToken(token)
    }

    const isProtectedRoute = protectedRoutes.some((p) => pathname.startsWith(p))
    const isAuthRoute = authRoutes.some((p) => pathname.startsWith(p))
    const isMfaRoute = pathname.startsWith(mfaRoute)

    // 3. Logic for users WITHOUT a valid session
    if (!session) {
        if (isProtectedRoute || isMfaRoute) {
            const url = new URL("/login", req.url)
            url.searchParams.set("next", pathname)
            return NextResponse.redirect(url)
        }
        return NextResponse.next()
    }

    // 4. Logic for users WITH a valid session
    const { role, mfaVerified } = session

    if (isAuthRoute) {
        const dashboardUrl = role ? `/${role}/dashboard` : "/"
        return NextResponse.redirect(new URL(dashboardUrl, req.url))
    }

    // Handle MFA verification
    if (!mfaVerified) {
        if (!isMfaRoute) {
            const url = new URL(mfaRoute, req.url)
            url.searchParams.set("next", pathname)
            return NextResponse.redirect(url)
        }
    } else if (isMfaRoute) {
        const nextPath = req.nextUrl.searchParams.get("next") || `/${role}/dashboard`
        return NextResponse.redirect(new URL(nextPath, req.url))
    }

    // Handle role-based access for protected routes
    if (isProtectedRoute) {
        if (pathname.startsWith("/admin") && role !== "admin") {
            return NextResponse.redirect(new URL("/", req.url))
        }
        if (pathname.startsWith("/client") && role !== "client") {
            return NextResponse.redirect(new URL("/", req.url))
        }
        if (pathname.startsWith("/talent") && role !== "talent") {
            return NextResponse.redirect(new URL("/", req.url))
        }

        // ✅ **THE FIX**: Redirect from root portal paths to their dashboards.
        if (pathname === "/admin" || pathname === "/client" || pathname === "/talent") {
            const dashboardUrl = new URL(`${pathname}/dashboard`, req.url)
            return NextResponse.redirect(dashboardUrl)
        }
    }

    // 5. If all checks pass, allow the request
    return NextResponse.next()
}

// No changes needed here, the matcher is correct.
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
}