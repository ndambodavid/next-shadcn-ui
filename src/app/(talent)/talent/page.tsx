'use client'

import { SectionCards } from "@/components/dashboard/section-cards"
import { ChartAreaInteractive } from "@/components/dashboard/chart-area-interactive"
import { DataTable } from "@/components/dashboard/data-table"
import data from "@/data/tasks.json"
import { DragHandle } from "@/components/table/drag-handle"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { Checkbox } from "@radix-ui/react-checkbox"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuPortal } from "@radix-ui/react-dropdown-menu"
import { Progress } from "@radix-ui/react-progress"
import { IconDotsVertical } from "@tabler/icons-react"
import { ColumnDef } from "@tanstack/react-table"
import { Badge, Circle, Flag, Calendar } from "lucide-react"
import { priorityConfig, statusConfig } from "@/components/table/table-config"
import { useState } from "react"
import { TimeLogModal } from "@/components/timer/time-log-modal"
import { Task } from "@/types/task"
import TalentHomePage from "@/components/talent/talent-home"

export default function DashboardPage() {

  const [timeLogModalOpen, setTimeLogModalOpen] = useState(false)
  const [selectedTaskForTimeLog, setSelectedTaskForTimeLog] = useState<Task>()

  const handleLogTime = (task: Task) => {
    setSelectedTaskForTimeLog(task)
    setTimeLogModalOpen(true)
  }


  return (
    <>
      <SectionCards />
      {/* <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div> */}

      <TalentHomePage />

    </>
  )
}
