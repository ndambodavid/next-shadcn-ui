"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { NavDocuments } from "./nav-documents"
import { NavMain } from "./nav-main"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"

import {
  IconDashboard,
  IconFolder,
  IconUsers,
  IconListDetails,
  IconChartBar,
  IconReport,
  IconDatabase,
  IconFileWord,
  IconSettings,
  IconHelp,
  IconSearch,
  IconTimeline,
  IconActivity,
  IconWallet,
} from "@tabler/icons-react"
import Link from "next/link"

// --- Workspace-specific main navigation ---
const workspaceNavMain = {
  admin: [
    { title: "Dashboard", url: "/admin/dashboard", icon: IconDashboard },
    { title: "Projects", url: "/admin/projects", icon: IconFolder },
    { title: "Tasks", url: "/admin/tasks", icon: IconListDetails },
    { title: "Time Logs", url: "/admin/time-logs", icon: IconTimeline },
    { title: "Team", url: "/admin/team", icon: IconUsers },
    { title: "Payments", url: "/admin/payments", icon: IconWallet },
    { title: "Activity", url: "/admin/activity", icon: IconActivity }
  ],
  client: [
    { title: "Dashboard", url: "/client/dashboard", icon: IconDashboard },
    { title: "Projects", url: "/client/projects", icon: IconFolder },
    { title: "Tasks", url: "/client/tasks", icon: IconListDetails },
    { title: "Time Logs", url: "/client/time-logs", icon: IconTimeline },
    { title: "Team", url: "/client/team", icon: IconUsers },
    { title: "Payments", url: "/client/payments", icon: IconWallet },
    { title: "Activity", url: "/client/activity", icon: IconActivity },
    { title: "Reports", url: "/client/reports", icon: IconReport },
    { title: "Analytics", url: "/client/analytics", icon: IconChartBar },
  ],
  talent: [
    { title: "Dashboard", url: "/talent/dashboard", icon: IconDashboard },
    { title: "Projects", url: "/talent/projects", icon: IconFolder },
    { title: "Tasks", url: "/talent/tasks", icon: IconListDetails },
    { title: "Time Logs", url: "/talent/time-logs", icon: IconTimeline },
    { title: "Team", url: "/talent/team", icon: IconUsers },
    { title: "Payments", url: "/talent/payments", icon: IconWallet },
    { title: "Activity", url: "/talent/activity", icon: IconActivity },
    { title: "Profile", url: "/talent/profile", icon: IconUsers },
  ],
}

const commonData = {
  user: {
    name: "ndambodavid",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navSecondary: [
    { title: "Settings", url: "#", icon: IconSettings },
    { title: "Get Help", url: "#", icon: IconHelp },
    { title: "Search", url: "#", icon: IconSearch },
  ],
  documents: [
    { name: "Data Library", url: "#", icon: IconDatabase },
    { name: "Reports", url: "#", icon: IconReport },
    { name: "Word Assistant", url: "#", icon: IconFileWord },
  ],
}

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const [, workspace] = pathname.split("/") // "admin" | "client" | "talent"

  const navMain = workspaceNavMain[workspace as keyof typeof workspaceNavMain] || []

  return (
    <Sidebar
      collapsible="none"
      className="h-screen border-r sticky top-0 flex flex-col"
      {...props}
    >
      {/* Header (logo) */}
      <SidebarHeader className="border-b sticky top-0 bg-background z-10">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <Image
                  src="/dhanalogo.png"
                  width={150}
                  height={40}
                  alt="Logo"
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Content (sticky, fills available space) */}
      <SidebarContent className="flex-1 flex flex-col overflow-hidden">
        {/* Dynamic per-workspace main navigation */}
        <div className="flex-1 overflow-y-auto">
          <NavMain items={navMain} />
          <NavDocuments items={commonData.documents} />
        </div>

        {/* Footer always sticks to bottom */}
        <SidebarFooter className="border-tsticky bottom-0 bg-background z-10">
          <NavUser user={commonData.user} />
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  )

}
