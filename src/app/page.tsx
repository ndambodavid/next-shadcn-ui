"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, User, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

interface RouteSelectorProps {
  onSelect: (route: "client" | "talent") => void
}

export default function SelectPortalPage() {
  const router = useRouter()

  const handlePortalSelect = (portal: "client" | "talent") => {
    router.push(`/${portal}`)
  }

  return <RouteSelector onSelect={handlePortalSelect} />
}

export function RouteSelector({ onSelect }: RouteSelectorProps) {
  const [selectedRoute, setSelectedRoute] = useState<"client" | "talent" | null>(null)

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Welcome to Project Hub</h1>
          <p className="text-xl text-muted-foreground">Choose your portal to get started</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Client Portal */}
          <Card
            className={`cursor-pointer transition-all duration-300 hover:shadow-xl border-2 ${
              selectedRoute === "client"
                ? "border-primary shadow-lg scale-105"
                : "border-border hover:border-primary/50"
            }`}
            onClick={() => setSelectedRoute("client")}
          >
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-10 h-10 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl text-card-foreground">Client Portal</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Track your projects, view progress updates, manage invoices, and communicate with your development team.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>Project Dashboard</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>Invoice Management</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>Progress Tracking</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>Team Communication</span>
                </div>
              </div>
              {selectedRoute === "client" && (
                <Button
                  onClick={() => onSelect("client")}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-6"
                >
                  Enter Client Portal
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Talent Portal */}
          <Card
            className={`cursor-pointer transition-all duration-300 hover:shadow-xl border-2 ${
              selectedRoute === "talent"
                ? "border-secondary shadow-lg scale-105"
                : "border-border hover:border-secondary/50"
            }`}
            onClick={() => setSelectedRoute("talent")}
          >
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-10 h-10 text-secondary-foreground" />
              </div>
              <CardTitle className="text-2xl text-card-foreground">Talent Hub</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Manage your tasks, track time, collaborate with team members, and monitor project progress.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-secondary rounded-full" />
                  <span>Task Management</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-secondary rounded-full" />
                  <span>Time Tracking</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-secondary rounded-full" />
                  <span>Team Collaboration</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-secondary rounded-full" />
                  <span>Project Overview</span>
                </div>
              </div>
              {selectedRoute === "talent" && (
                <Button
                  onClick={() => onSelect("talent")}
                  className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground mt-6"
                >
                  Enter Talent Hub
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground text-sm">
            Need help choosing? Contact support for assistance with your account setup.
          </p>
        </div>
      </div>
    </div>
  )
}
