import { createHash, randomBytes, timingSafeEqual } from "crypto"
import { Role } from "@/lib/session"

export interface User {
  id: string
  email: string
  name: string
  role: Role
  passwordHash: string
  mfaEnabled: boolean
  mfaSecretBase32?: string
}

// naive in-memory user store. Replace with database in production.
const users = new Map<string, User>() // key: email

function hashPassword(password: string, salt?: string): string {
  const s = salt || randomBytes(16).toString("hex")
  const hash = createHash("sha256").update(s + ":" + password).digest("hex")
  return `${s}$${hash}`
}

function verifyPassword(password: string, stored: string): boolean {
  const [s, h] = stored.split("$")
  const candidate = createHash("sha256").update(s + ":" + password).digest("hex")
  return timingSafeEqual(Buffer.from(h), Buffer.from(candidate))
}

export const UserStore = {
  create({ email, name, password, role }: { email: string; name: string; password: string; role: Role }): User {
    const key = email.toLowerCase()
    if (users.has(key)) throw new Error("User already exists")
    const user: User = {
      id: randomBytes(12).toString("hex"),
      email: key,
      name,
      role,
      passwordHash: hashPassword(password),
      mfaEnabled: false,
    }
    users.set(key, user)
    return user
  },
  findByEmail(email: string): User | undefined {
    return users.get(email.toLowerCase())
  },
  verifyCredentials(email: string, password: string): User | null {
    const u = users.get(email.toLowerCase())
    if (!u) return null
    if (!verifyPassword(password, u.passwordHash)) return null
    return u
  },
  enableMfa(email: string, base32: string) {
    const u = users.get(email.toLowerCase())
    if (!u) throw new Error("User not found")
    u.mfaEnabled = true
    u.mfaSecretBase32 = base32
  },
}

// Seed a few demo users
try {
  UserStore.create({ email: "admin@example.com", name: "Admin", password: "Admin123!", role: "admin" })
  UserStore.create({ email: "client@example.com", name: "Client", password: "Client123!", role: "client" })
  UserStore.create({ email: "talent@example.com", name: "Talent", password: "Talent123!", role: "talent" })
} catch {}
