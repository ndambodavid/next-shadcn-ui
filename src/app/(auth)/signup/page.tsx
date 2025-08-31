import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserRegisterForm } from "@/components/auth/signup-form"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Create an account to get started.",
}

export default function AuthenticationPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <UserRegisterForm />
    </div>
  )
}