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
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <LoginPage />
    </div>
  )
}