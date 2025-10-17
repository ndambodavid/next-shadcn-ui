import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { UserStore } from "@/server/users"
import { verifyEmailOTP, verifyTOTP, fromBase32 } from "@/lib/otp"
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

    if (!ok) return NextResponse.json({ error: "Invalid code" }, { status: 401 })

    // Set session cookie with MFA verified
    setSessionCookie({ sub: user.id, email: user.email, name: user.name, role: user.role, mfaVerified: true })
    return NextResponse.json({ success: true })
  } catch (err: any) {
    if (err?.issues) return NextResponse.json({ error: "Invalid input", details: err.issues }, { status: 400 })
    return NextResponse.json({ error: "Verification failed" }, { status: 400 })
  }
}
