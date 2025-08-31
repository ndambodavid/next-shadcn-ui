"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Link } from "lucide-react"
import { email } from "zod"
import { useActionState, useState } from "react"
import { signup } from "@/app/actions/signup"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserRegisterForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [state, action, pending] = useActionState(signup, undefined)

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }

    const handleSocialLogin = (provider: string) => {
        console.log("[v0] Social login with:", provider)
    }

    return (

        <div
            className={cn("min-h-screen flex items-center justify-center p-4 ", className)}
            {...props}
            style={{
                backgroundImage: "url('/images/gradient-background.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div
                className="absolute inset-0 opacity-0"
                style={{
                    background: "rgba(0, 0, 0, 0.15)",
                }}
            ></div>

            {/* Floating glass orbs for visual interest */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full opacity-50 animate-pulse"
                    style={{
                        background: "rgba(255, 255, 255, 0.15)",
                        backdropFilter: "blur(20px) saturate(180%)",
                        border: "2px solid rgba(255, 255, 255, 0.3)",
                        boxShadow: "0 8px 32px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
                    }}
                ></div>
                <div
                    className="absolute top-3/4 right-1/4 w-24 h-24 rounded-full opacity-40 animate-pulse delay-1000"
                    style={{
                        background: "rgba(255, 255, 255, 0.15)",
                        backdropFilter: "blur(20px) saturate(180%)",
                        border: "2px solid rgba(255, 255, 255, 0.3)",
                        boxShadow: "0 8px 32px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
                    }}
                ></div>
                <div
                    className="absolute top-1/2 right-1/3 w-16 h-16 rounded-full opacity-45 animate-pulse delay-500"
                    style={{
                        background: "rgba(255, 255, 255, 0.15)",
                        backdropFilter: "blur(20px) saturate(180%)",
                        border: "2px solid rgba(255, 255, 255, 0.3)",
                        boxShadow: "0 8px 32px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
                    }}
                ></div>
            </div>

            <Card
                className="max-w-md hover-lift shadow-2xl relative z-10 opacity-100 w-full mx-[0] border-transparent"
                style={{
                    background: "transparent",
                    backdropFilter: "blur(40px) saturate(250%)",
                    border: "1px solid rgba(255, 255, 255, 0.4)",
                    boxShadow:
                        "0 32px 80px rgba(0, 0, 0, 0.3), 0 16px 64px rgba(255, 255, 255, 0.2), inset 0 3px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(255, 255, 255, 0.3)",
                }}
            >
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-3xl font-bold font-sans text-card-foreground">Welcome Aboard</CardTitle>
                    <CardDescription className="text-card-foreground/70 font-sans">
                        Create an account to get started with our awesome platform.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* ✅ Display backend message if present */}
                    {state?.message && (
                        <Alert
                            variant={state.success ? "default" : "destructive"}
                            className={`mb-4 ${state.success ? "border-green-500 text-green-700" : ""
                                }`}
                        >
                            <AlertDescription>{state.message}</AlertDescription>
                        </Alert>
                    )}
                    <form
                        action={action}
                        // onSubmit={onSubmit} 
                        className="space-y-4 bg-transparent">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-card-foreground font-sans">
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                placeholder="name@example.com"
                                type="email"
                                // value={email}
                                // onChange={(e) => setEmail(e.target.value)}
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                disabled={isLoading}
                                className={cn(
                                    "bg-transparent placeholder:text-card-foreground/50 text-card-foreground py-3 transition-all duration-200",
                                    state?.errors?.email && "border-red-500 focus:ring-red-500"
                                )}
                            />
                            {state?.errors?.email && (
                                <p className="text-red-500 text-sm">{state.errors.email}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-sm font-medium text-card-foreground font-sans">
                                Phone
                            </Label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="Enter your phone number"
                                // value={password}
                                // onChange={(e) => setPassword(e.target.value)}
                                autoComplete="tel"
                                disabled={isLoading}
                                required
                                className={cn(
                                    "bg-transparent placeholder:text-card-foreground/50 text-card-foreground py-3 transition-all duration-200",
                                    state?.errors?.phone && "border-red-500 focus:ring-red-500"
                                )}
                            />
                            {state?.errors?.phone && (
                                <p className="text-red-500 text-sm">{state.errors.phone}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium text-card-foreground font-sans">
                                Password
                            </Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                // value={password}
                                // onChange={(e) => setPassword(e.target.value)}
                                autoComplete="new-password"
                                disabled={isLoading}
                                required
                                className={cn(
                                    "bg-white/10 placeholder:text-card-foreground/50 text-card-foreground py-3 transition-all duration-200",
                                    state?.errors?.password && "border-red-500 focus:ring-red-500"
                                )}
                            />
                            {state?.errors?.password && (
                                <ul className="text-red-500 text-sm list-disc pl-5">
                                    {state.errors.password.map((err) => (
                                        <li key={err}>{err}</li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-sm font-medium text-card-foreground font-sans">
                                Confirm Password
                            </Label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                // value={password}
                                // onChange={(e) => setPassword(e.target.value)}
                                autoComplete="new-password"
                                disabled={isLoading}
                                required
                                className={cn(
                                    "bg-white/10 placeholder:text-card-foreground/50 text-card-foreground py-3 transition-all duration-200",
                                    state?.errors?.confirmPassword && "border-red-500 focus:ring-red-500"
                                )}
                            />
                            {state?.errors?.confirmPassword && (
                                <p className="text-red-500 text-sm">
                                    {state.errors.confirmPassword}
                                </p>
                            )}
                        </div>

                        <div>
                            <Button
                                type="submit"
                                className="w-full ripple-effect hover-lift font-sans font-bold py-5 transition-all duration-300"
                                disabled={isLoading || pending}>
                                {isLoading && (
                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Create Account
                            </Button>
                        </div>
                    </form>

                    <div className="relative">
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="px-2 text-card-foreground/60 font-sans">Or continue with</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Button
                            variant="outline"
                            onClick={() => handleSocialLogin("Google")}
                            className="w-full glass-effect border-white/30 hover-lift ripple-effect text-card-foreground hover:bg-white/20 font-sans transition-all duration-300"
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 2.43-4.53 6.16-4.53z"
                                />
                            </svg>
                            Continue with Google
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() => handleSocialLogin("Apple")}
                            className="w-full glass-effect border-white/30 hover-lift ripple-effect text-card-foreground hover:bg-white/20 font-sans transition-all duration-300"
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 384 512" fill="currentColor">
                                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                            </svg>
                            Continue with Apple
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() => handleSocialLogin("Meta")}
                            className="w-full glass-effect border-white/30 hover-lift ripple-effect text-card-foreground hover:bg-white/20 font-sans transition-all duration-300"
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="#1877F2">
                                <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
                            </svg>
                            Continue with Meta
                        </Button>
                    </div>

                    <div className="text-center">
                        <a
                            href="#"
                            className="text-sm text-card-foreground/70 hover:text-card-foreground font-sans transition-colors"
                        >
                            Forgot your password?
                        </a>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-card-foreground/70 font-sans">
                            Don't have an account?{" "}
                            <a href="#" className="text-card-foreground font-medium hover:underline">
                                Sign Up
                            </a>
                        </p>
                    </div>

                </CardContent>

                <CardFooter className="flex flex-col items-center">

                    <p className="mt-6 px-8 text-center text-sm text-muted-foreground max-w-md">
                        By clicking continue, you agree to our{" "}
                        <a
                            href="/terms"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a
                            href="/privacy"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Privacy Policy
                        </a>
                        .
                    </p>
                </CardFooter>
            </Card >
        </div >
    )
}