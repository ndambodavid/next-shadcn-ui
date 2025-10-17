import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { UserStore } from "@/server/users"

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
  password: z.string().min(8),
  role: z.enum(["admin", "client", "talent"]).default("client"),
})

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const parsed = schema.parse(data)
    const user = UserStore.create(parsed)
    return NextResponse.json({ id: user.id, email: user.email, name: user.name, role: user.role })
  } catch (err: any) {
    if (err?.issues) {
      return NextResponse.json({ error: "Invalid input", details: err.issues }, { status: 400 })
    }
    return NextResponse.json({ error: err?.message || "Failed to sign up" }, { status: 400 })
  }
}
