import { createHmac, randomBytes } from "crypto"
import { base64url } from "./crypto"

export interface TOTPSecret {
  ascii: string // raw secret in ascii
  base32: string // RFC4648 base32 (no padding)
}

// Base32 alphabet (RFC4648)
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"

function toBase32(buffer: Buffer): string {
  let bits = 0
  let value = 0
  let output = ""
  for (const byte of buffer) {
    value = (value << 8) | byte
    bits += 8
    while (bits >= 5) {
      output += ALPHABET[(value >>> (bits - 5)) & 31]
      bits -= 5
    }
  }
  if (bits > 0) {
    output += ALPHABET[(value << (5 - bits)) & 31]
  }
  return output
}

export function generateTOTPSecret(bytes = 20): TOTPSecret {
  const secret = randomBytes(bytes)
  return { ascii: secret.toString("ascii"), base32: toBase32(secret) }
}

export function fromBase32(input: string): Buffer {
  let bits = 0
  let value = 0
  const output: number[] = []
  for (const char of input.replace(/=+$/g, "").toUpperCase()) {
    const idx = ALPHABET.indexOf(char)
    if (idx === -1) continue
    value = (value << 5) | idx
    bits += 5
    if (bits >= 8) {
      output.push((value >>> (bits - 8)) & 0xff)
      bits -= 8
    }
  }
  return Buffer.from(output)
}

function hotp(secret: Buffer, counter: number): number {
  const buf = Buffer.alloc(8)
  for (let i = 7; i >= 0; i--) {
    buf[i] = counter & 0xff
    counter = counter >>> 8
  }
  const hmac = createHmac("sha1", secret).update(buf).digest()
  const offset = hmac[hmac.length - 1] & 0xf
  const code = ((hmac[offset] & 0x7f) << 24) | ((hmac[offset + 1] & 0xff) << 16) | ((hmac[offset + 2] & 0xff) << 8) | (hmac[offset + 3] & 0xff)
  return code % 1_000_000
}

export function totp(secret: Buffer, step = 30, t = Date.now()): number {
  const counter = Math.floor(t / 1000 / step)
  return hotp(secret, counter)
}

export function verifyTOTP(token: string, secret: Buffer, window = 1, step = 30): boolean {
  const int = parseInt(token, 10)
  if (!Number.isFinite(int)) return false
  const now = Date.now()
  for (let errorWindow = -window; errorWindow <= window; errorWindow++) {
    const code = totp(secret, step, now + errorWindow * step * 1000)
    if (code === int) return true
  }
  return false
}

// Simple one-time email OTP store (in-memory). In prod, use a persistent & expiring store like Redis.
interface EmailOTPEntry { code: string; expiresAt: number; attempts: number }
const emailOtpStore = new Map<string, EmailOTPEntry>()

export function issueEmailOTP(email: string): string {
  const code = (Math.floor(100000 + Math.random() * 900000)).toString()
  const expiresAt = Date.now() + 5 * 60 * 1000
  emailOtpStore.set(email.toLowerCase(), { code, expiresAt, attempts: 0 })
  return code // In prod, send via email/SMS provider; here, return for demo/testing
}

export function verifyEmailOTP(email: string, code: string): boolean {
  const entry = emailOtpStore.get(email.toLowerCase())
  if (!entry) return false
  if (Date.now() > entry.expiresAt) {
    emailOtpStore.delete(email.toLowerCase())
    return false
  }
  if (entry.attempts >= 5) return false
  entry.attempts++
  if (entry.code === code) {
    emailOtpStore.delete(email.toLowerCase())
    return true
  }
  return false
}
