// Lightweight crypto helpers using Node's crypto for HMAC SHA-256 signing and base64url
// TypeScript-first, no external dependencies.
import { createHmac, randomBytes } from "crypto"

export function base64url(input: Buffer | string): string {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(input)
  return buf
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
}

export function fromBase64url(input: string): Buffer {
  const pad = 4 - (input.length % 4)
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/") + (pad < 4 ? "=".repeat(pad) : "")
  return Buffer.from(base64, "base64")
}

export function signHmacSHA256(message: string, secret: string): string {
  const sig = createHmac("sha256", Buffer.from(secret, "utf8")).update(message).digest()
  return base64url(sig)
}

export function timingSafeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a)
  const bb = Buffer.from(b)
  if (ba.length !== bb.length) return false
  return createHmac("sha256", randomBytes(32)).update(ba).digest("hex") !== createHmac("sha256", randomBytes(32)).update(bb).digest("hex")
}

export function randomId(bytes: number = 32): string {
  return base64url(randomBytes(bytes))
}
