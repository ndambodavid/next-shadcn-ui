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
} from "@tabler/icons-react"
import Link from "next/link"

// --- Workspace-specific main navigation ---
const workspaceNavMain = {
  admin: [
    { title: "Dashboard", url: "/admin/dashboard", icon: IconDashboard },
    { title: "Projects", url: "/admin/projects", icon: IconFolder },
    { title: "Tasks", url: "/admin/tasks", icon: IconListDetails },
    { title: "Time Logs", url: "/admin/time-logs", icon: IconTimeline},
    { title: "Team", url: "/admin/team", icon: IconUsers },
    { title: "Activity", url: "/admin/activity", icon: IconActivity}
  ],
  client: [
    { title: "Dashboard", url: "/client/dashboard", icon: IconDashboard },
    { title: "Reports", url: "/client/reports", icon: IconReport },
    { title: "Analytics", url: "/client/analytics", icon: IconChartBar },
  ],
  talent: [
    { title: "Dashboard", url: "/talent/dashboard", icon: IconDashboard },
    { title: "My Projects", url: "/talent/projects", icon: IconFolder },
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
    <Sidebar collapsible="none" className="h-auto border-r" {...props}>
      <SidebarHeader className="border-b">
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

      <SidebarContent>
        {/* Dynamic per-workspace main navigation */}
        <NavMain items={navMain} />

        {/* Shared sections */}
        <NavDocuments items={commonData.documents} />
        <NavSecondary items={commonData.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={commonData.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
