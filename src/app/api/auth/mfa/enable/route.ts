import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { getSession } from "@/lib/session"
import { UserStore } from "@/server/users"
import { fromBase32, verifyTOTP } from "@/lib/otp"

const schema = z.object({ secret: z.string().min(16), code: z.string().min(6).max(10) })

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const { secret, code } = schema.parse(await req.json())
    const user = UserStore.findByEmail(session?.email)
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })
    const ok = verifyTOTP(code, fromBase32(secret))
    if (!ok) return NextResponse.json({ error: "Invalid code" }, { status: 400 })
    UserStore.enableMfa(user.email, secret)
    return NextResponse.json({ success: true })
  } catch (err: any) {
    if (err?.issues) return NextResponse.json({ error: "Invalid input", details: err.issues }, { status: 400 })
    return NextResponse.json({ error: "Failed to enable MFA" }, { status: 400 })
  }
}
