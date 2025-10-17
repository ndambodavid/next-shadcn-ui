import { NextResponse } from "next/server"
import { getSession } from "@/lib/session"

export async function GET() {
    // getSession() automatically reads the session cookie from the request
    const session = await getSession()

    // If no valid session is found, return a 401 Unauthorized status
    if (!session) {
        return NextResponse.json({ authenticated: false, user: null }, { status: 401 })
    }

    // If a session exists, return the user data
    return NextResponse.json({ authenticated: true, user: session })
}