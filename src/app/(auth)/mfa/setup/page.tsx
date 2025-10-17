"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function MFASetupPage() {
  const [secret, setSecret] = useState<string>("")
  const [otpauth, setOtpauth] = useState<string>("")
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch("/api/auth/mfa/setup", { method: "POST" })
        const data = await res.json()
        setSecret(data.secret)
        setOtpauth(data.otpauth)
      } catch {}
    })()
  }, [])

  const onEnable = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/auth/mfa/enable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret, code }),
      })
      if (!res.ok) throw new Error("Enable failed")
      alert("MFA enabled. Next login will require OTP.")
    } catch (e) {
      alert("Failed to enable MFA. Check code and try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={onEnable} className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-semibold">Set up Authenticator</h1>
        <p className="text-sm text-muted-foreground">Add a new TOTP in Google Authenticator or Authy using the secret below.</p>
        <div className="space-y-2">
          <Label>Secret</Label>
          <Input value={secret} readOnly />
        </div>
        <div className="space-y-2">
          <Label>otpauth URL</Label>
          <Input value={otpauth} readOnly />
        </div>
        <div className="space-y-2">
          <Label>Enter current 6-digit code</Label>
          <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="123456" required />
        </div>
        <Button type="submit" disabled={loading}>{loading ? "Enabling..." : "Enable"}</Button>
      </form>
    </div>
  )
}
