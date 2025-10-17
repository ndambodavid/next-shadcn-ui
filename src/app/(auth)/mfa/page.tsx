"use client"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function MFAVerifyPage() {
  const router = useRouter()
  const params = useSearchParams()
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [method, setMethod] = useState<"email" | "totp">("email")
  const [loading, setLoading] = useState(false)
  const next = params.get("next") || "/"

  useEffect(() => {
    const pending = sessionStorage.getItem("pendingEmail")
    if (pending) setEmail(pending)
  }, [])

  const onVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/auth/mfa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, method, code }),
      })
      if (!res.ok) throw new Error("Invalid code")
      sessionStorage.removeItem("pendingEmail")

      // Safely decode/validate next and compute destination
      const getSafeNext = (raw: string | null): string => {
        if (!raw) return "/"
        let v = raw
        try { v = decodeURIComponent(v) } catch {}
        if (typeof window !== "undefined" && /^(https?:)\/\//i.test(v)) {
          try {
            const u = new URL(v, window.location.origin)
            if (u.origin === window.location.origin) v = u.pathname + (u.search || "")
            else return "/"
          } catch { return "/" }
        }
        return typeof v === "string" && v.startsWith("/") ? v : "/"
      }
      const normalizePortalRoot = (path: string): string => {
        const portals = ["admin","client","talent"] as const
        for (const p of portals) {
          if (path === `/${p}` || path === `/${p}/`) return `/${p}/dashboard`
        }
        return path
      }
      const safeNext = getSafeNext(next)

      // Fetch role from session to know default dashboard (cookie is now set)
      let role: "admin" | "client" | "talent" | undefined
      try {
        const me = await fetch("/api/auth/me", { cache: "no-store" })
        const data = await me.json().catch(() => null)
        role = data?.user?.role
      } catch {}

      const dest = (!safeNext || safeNext === "/")
        ? (role ? `/${role}/dashboard` : "/")
        : normalizePortalRoot(safeNext)

      // Ensure app sees updated cookie before navigating
      router.refresh()
      router.push(dest)
    } catch (e) {
      alert("Verification failed. Check your code and try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={onVerify} className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-semibold">Two-Factor Verification</h1>
        <p className="text-sm text-muted-foreground">Enter the 6-digit code from your authenticator app or email.</p>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="code">Code</Label>
          <Input id="code" value={code} onChange={(e) => setCode(e.target.value)} placeholder="123456" required />
        </div>
        <div className="flex gap-2 text-sm">
          <label className="flex items-center gap-1"><input type="radio" checked={method==="email"} onChange={() => setMethod("email")} /> Email OTP</label>
          <label className="flex items-center gap-1"><input type="radio" checked={method==="totp"} onChange={() => setMethod("totp")} /> Authenticator app</label>
        </div>
        <div className="flex gap-3">
          <Button type="submit" disabled={loading}>{loading ? "Verifying..." : "Verify"}</Button>
          <Button type="button" variant="outline" onClick={() => router.push("/mfa/setup")}>Set up Authenticator</Button>
        </div>
      </form>
    </div>
  )
}
