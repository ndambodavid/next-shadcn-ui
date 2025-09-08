"use client"

import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

type HeaderConfig = {
  title: string
  description?: string
  action?: React.ReactNode
}

type WorkspaceConfig = Record<string, HeaderConfig>

const workspaceConfigs: Record<"admin" | "client" | "talent", WorkspaceConfig> = {
  admin: {
    "/projects": {
      title: "Projects",
      description: "Manage and track your project portfolio",
      action: (
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => window.location.assign("/admin/projects/create")}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      ),
    },
    "/tasks": {
      title: "Tasks",
      description: "View, assign, and track tasks across projects",
    },
    "/milestones": {
      title: "Milestones",
      description: "Track milestones and project progress",
    },
  },
  client: {
    "/dashboard": {
      title: "Client Dashboard",
      description: "Overview of your active projects and progress",
    },
    "/reports": {
      title: "Reports",
      description: "Track project performance and billing",
    },
  },
  talent: {
    "/dashboard": {
      title: "Talent Dashboard",
      description: "Your assigned projects and tasks",
    },
    "/profile": {
      title: "Profile",
      description: "Update your skills, bio, and availability",
    },
  },
}

export function SiteHeader() {
  const router = useRouter()
  const pathname = usePathname()

  // Determine workspace base route (first path segment)
  const [, workspace, ...rest] = pathname.split("/")
  const baseRoute = "/" + rest.join("/") // e.g. "/projects", "/dashboard"

  const workspaceConfig = workspaceConfigs[workspace as keyof typeof workspaceConfigs]

  // Match specific header config or fallback
  const config =
    Object.entries(workspaceConfig || {}).find(([path]) =>
      baseRoute.startsWith(path)
    )?.[1] || {
      title: "Dashboard",
      description: "Overview of your workspace",
    }

  return (
    <header className="sticky top-0 z-10 bg-background border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {config.title}
            </h1>
            {config.description && (
              <p className="text-muted-foreground mt-1">
                {config.description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            {config.action}
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
