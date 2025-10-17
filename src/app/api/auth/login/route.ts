import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { UserStore } from "@/server/users"
import { issueEmailOTP } from "@/lib/otp"
import { setSessionCookie } from "@/lib/session"

const schema = z.object({ email: z.string().email(), password: z.string().min(1) })

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { email, password } = schema.parse(body)
        const user = UserStore.verifyCredentials(email, password)
        if (!user) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
        }

        // Prepare the JSON response body first
        let sentEmailOtp: string | undefined
        if (user.mfaEnabled) {
            sentEmailOtp = issueEmailOTP(user.email)
        }

        const responseBody = {
            success: true,
            needMfa: user.mfaEnabled,
            methods: { totp: user.mfaEnabled, emailOtp: user.mfaEnabled },
            hint: process.env.NODE_ENV !== "production" && user.mfaEnabled ? { emailOtp: sentEmailOtp } : undefined,
            user: { email: user.email, name: user.name, role: user.role },
        }

        // Create the main response object
        const response = NextResponse.json(responseBody)

        // ✅ **THE FIX**: If no MFA is needed, pass the `response` object to the
        // cookie function to attach the `Set-Cookie` header to it.
        if (!user.mfaEnabled) {
            const sessionPayload = {
                sub: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                mfaVerified: true,
            }
            await setSessionCookie(response, sessionPayload)
        }

        return response

    } catch (err: any) {
        if (err?.issues) {
            return NextResponse.json({ error: "Invalid input", details: err.issues }, { status: 400 })
        }
        console.error("Login API Error:", err); // Log the error for debugging
        return NextResponse.json({ error: "Login failed" }, { status: 400 })
    }
}