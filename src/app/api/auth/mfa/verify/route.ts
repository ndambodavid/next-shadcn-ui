import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { UserStore } from "@/server/users"
import {verifyEmailOTP, verifyTOTP, fromBase32, issueEmailOTP} from "@/lib/otp"
import { setSessionCookie } from "@/lib/session"

const schema = z.object({
  email: z.string().email(),
  method: z.enum(["totp", "email"]),
  code: z.string().min(4).max(10),
})

export async function POST(req: NextRequest) {
  try {
    const { email, method, code } = schema.parse(await req.json())
    const user = UserStore.findByEmail(email)
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

    let ok = false
    if (method === "email") {
      ok = verifyEmailOTP(email, code)
    } else {
      if (!user.mfaSecretBase32) return NextResponse.json({ error: "TOTP not set up" }, { status: 400 })
      // decode base32
      const secret = Buffer.from(user.mfaSecretBase32, "base32")
      ok = verifyTOTP(code, secret)
    }

    if (!ok) {return NextResponse.json({ error: "Invalid code" }, { status: 401 })}

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

    // Set session cookie with MFA verified
    await setSessionCookie(response ,{ sub: user.id, email: user.email, name: user.name, role: user.role, mfaVerified: true })
    return NextResponse.json({ success: true })
  } catch (err: any) {
    if (err?.issues) return NextResponse.json({ error: "Invalid input", details: err.issues }, { status: 400 })
    return NextResponse.json({ error: "Verification failed" }, { status: 400 })
  }
}
