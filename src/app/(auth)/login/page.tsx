import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import LoginPage from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Login to your account.",
}

export default function AuthenticationPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{
        backgroundImage: "url('/cyber2.jpg')", // ✅ make sure it's inside /public
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Optional semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        <LoginPage />
      </div>
    </div>
  )
}