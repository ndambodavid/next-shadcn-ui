import { NextResponse } from "next/server"
import { clearSessionCookie } from "@/lib/session"

export async function POST() {
    // 1. Create the response object first.
    const response = NextResponse.json({ success: true })

    // 2. Pass the response to the function to add the cookie-clearing header.
    clearSessionCookie(response)

    // 3. Return the modified response.
    return response
}