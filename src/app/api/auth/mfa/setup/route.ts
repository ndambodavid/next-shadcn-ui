import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/session"
import { generateTOTPSecret } from "@/lib/otp"

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const secret = generateTOTPSecret()
  const issuer = encodeURIComponent("UI-RND")
  const label = encodeURIComponent(session.email)
  const otpauth = `otpauth://totp/${issuer}:${label}?secret=${secret.base32}&issuer=${issuer}&algorithm=SHA1&digits=6&period=30`
  return NextResponse.json({ secret: secret.base32, otpauth })
}
