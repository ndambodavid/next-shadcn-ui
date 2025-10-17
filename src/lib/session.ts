import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { SignJWT, jwtVerify } from "jose"

export type Role = "admin" | "client" | "talent"

// Define the shape of the data you'll store in the session
export interface SessionPayload {
    sub: string // User ID
    email: string
    name?: string
    role: Role
    mfaVerified: boolean
}

const DEFAULT_TTL_SECONDS = 60 * 60 * 8 // 8 hours
const SESSION_COOKIE = "session"

// 1. Get the secret key from environment variables
const secretKey = process.env.AUTH_SECRET
if (!secretKey) {
    throw new Error("AUTH_SECRET environment variable is not set. It's required for signing session tokens.")
}
const encodedKey = new TextEncoder().encode(secretKey)

/**
 * Creates a JWT session token and attaches it to a NextResponse object as a cookie.
 * @param response The NextResponse object to be modified.
 * @param payload The session data to encode in the token.
 * @returns The modified NextResponse object with the 'Set-Cookie' header.
 */
export async function setSessionCookie(response: NextResponse, payload: SessionPayload) {
    const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(`${DEFAULT_TTL_SECONDS}s`)
        .sign(encodedKey)

    response.cookies.set(SESSION_COOKIE, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: DEFAULT_TTL_SECONDS,
    })

    return response
}

/**
 * Verifies the session token from the request cookies.
 * @param token Optional token string. If not provided, it will be read from the request cookies.
 * @returns The decoded session payload or null if the token is invalid or expired.
 */
export async function verifySessionToken(token?: string): Promise<SessionPayload | null> {
    // ✅ THE FIX: The cookies() function is asynchronous and must be awaited.
    const cookieStore = await cookies()
    const tokenValue = token || cookieStore.get(SESSION_COOKIE)?.value

    if (!tokenValue) {
        return null
    }

    try {
        const { payload } = await jwtVerify(tokenValue, encodedKey, {
            algorithms: ["HS256"],
        })
        return payload as SessionPayload
    } catch (error) {
        // This will catch errors like invalid signature, expired token, etc.
        console.error("Session token verification failed:", error)
        return null
    }
}

/**
 * A helper function to easily get the current session from server components or server actions.
 * @returns The session payload or null.
 */
export async function getSession(): Promise<SessionPayload | null> {
    return await verifySessionToken()
}

/**
 * Removes the session cookie from a NextResponse object.
 * @param response The NextResponse object to be modified.
 * @returns The modified NextResponse object.
 */
export function clearSessionCookie(response: NextResponse) {
    response.cookies.set(SESSION_COOKIE, "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: -1, // Expire the cookie immediately
    })

    return response
}