"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Search,
  Filter,
  Plus,
  Calendar,
  Clock,
  Flag,
  CheckCircle2,
  Circle,
  AlertCircle,
  Pause,
} from "lucide-react"
import Link from "next/link"
import mockTasks from "@/data/tasks.json"
import { DataTable } from "@/components/dashboard/data-table"
import tasks from "@/data/tasks.json"
import { Checkbox } from "@radix-ui/react-checkbox"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"
import { IconDotsVertical, IconGripVertical } from "@tabler/icons-react"
import { ColumnDef } from "@tanstack/react-table"
import z from "zod"
import { useSortable } from "@dnd-kit/sortable"
import { DragHandle } from "@/components/table/drag-handle"
import { priorityConfig, statusConfig } from "@/components/table/table-config"
import { TimeLogModal } from "@/components/timer/time-log-modal"
import { DropdownMenuPortal } from "@/components/ui/dropdown-menu"
import { time } from "console"
import { Task } from "@/types/task"


export default function TasksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [projectFilter, setProjectFilter] = useState("all")
  const [timeLogModalOpen, setTimeLogModalOpen] = useState(false)
  const [selectedTaskForTimeLog, setSelectedTaskForTimeLog] = useState<Task>()

  // Calculate summary statistics
  const totalTasks = mockTasks.length
  const completedTasks = mockTasks.filter((task) => task.status === "Completed").length
  const inProgressTasks = mockTasks.filter((task) => task.status === "In Progress").length
  const overdueTasks = mockTasks.filter(
    (task) => new Date(task.dueDate) < new Date() && task.status !== "Completed",
  ).length

  // Filter tasks based on search and filters
  const filteredTasks = mockTasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || task.status === statusFilter
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter
    const matchesProject = projectFilter === "all" || task.project === projectFilter

    return matchesSearch && matchesStatus && matchesPriority && matchesProject
  })

  const handleLogTime = (task: Task) => {
    setSelectedTaskForTimeLog(task)
    setTimeLogModalOpen(true)
  }

  const projects = [...new Set(mockTasks.map((task) => task.project))]

  const columns: ColumnDef<Task>[] = [
    {
      id: "drag",
      header: () => null,
      cell: ({ row }) => <DragHandle id={row.original.id} />,
    },
    {
      id: "select",
      header: ({ table }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: "Task ID",
      cell: ({ row }) => <div className="font-mono text-sm">{row.original.id}</div>
    },
    {
      accessorKey: "title",
      header: "Title & Description",
      cell: ({ row }) => {
        const task = row.original
        return (
          <div className="space-y-1">
            <div className="font-medium">{task.title}</div>
            <div className="text-sm text-muted-foreground line-clamp-2">{task.description}</div>
            <div className="flex gap-1">
              {task.tags?.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const task = row.original
        const StatusIcon = statusConfig[task.status as keyof typeof statusConfig]?.icon || Circle
        return (
          <Badge
            variant="secondary"
            className={`${statusConfig[task.status as keyof typeof statusConfig]?.color} flex items-center gap-1 w-fit`}
          >
            <StatusIcon className="h-3 w-3" />
            {task.status}
          </Badge>
        )
      },
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => {
        const task = row.original
        return (
          <Badge
            variant="secondary"
            className={`${priorityConfig[task.priority as keyof typeof priorityConfig]?.color} flex items-center gap-1 w-fit`}
          >
            <Flag
              className={`h-3 w-3 ${priorityConfig[task.priority as keyof typeof priorityConfig]?.flag}`}
            />
            {task.priority}
          </Badge>
        )
      },
    },
    {
      accessorKey: "assignee",
      header: "Assignee",
      cell: ({ row }) => {
        const assignee = row.original.assignee
        return (
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={assignee?.avatar || "/placeholder.svg"} alt={assignee?.name} />
              <AvatarFallback className="text-xs">{assignee?.initials}</AvatarFallback>
            </Avatar>
            <div className="text-sm">{assignee?.name}</div>
          </div>
        )
      },
    },
    {
      accessorKey: "project",
      header: "Project",
      cell: ({ row }) => <div className="text-sm">{row.original.project}</div>
    },
    {
      accessorKey: "dueDate",
      header: "Due Date",
      cell: ({ row }) => {
        const task = row.original
        const isOverdue = new Date(task.dueDate) < new Date() && task.status !== "Completed"
        return (
          <div className={`text-sm flex items-center gap-1 ${isOverdue ? "text-red-600" : ""}`}>
            <Calendar className="h-3 w-3" />
            {new Date(task.dueDate).toLocaleDateString()}
          </div>
        )
      }
    },
    {
      accessorKey: "progress",
      header: "Progress",
      cell: ({ row }) => {
        const task = row.original
        return (
          <div className="space-y-1">
            <Progress value={task.progress} className="h-2" />
            <div className="text-xs text-muted-foreground">{task.progress}%</div>
          </div>
        )
      }
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                size="icon"
              >
                <IconDotsVertical />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
              <DropdownMenuContent align="end"
                className="z-50 w-40 p-3 rounded-lg border bg-white shadow-md dark:bg-neutral-900">
                <DropdownMenuItem className="p-1.5 cursor-pointer hover:bg-muted focus:bg-muted">Edit</DropdownMenuItem>
                <DropdownMenuItem className="p-1.5 cursor-pointer hover:bg-muted focus:bg-muted">Duplicate</DropdownMenuItem>
                <DropdownMenuItem className="p-1.5 cursor-pointer hover:bg-muted focus:bg-muted" onClick={() => { handleLogTime(row.original) }}>Log Time</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-1.5 cursor-pointer text-red-600 hover:bg-red-50 focus:bg-red-50 dark:hover:bg-red-950">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Sticky Header */}

      <div className="container mx-auto px-6 py-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              <Circle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTasks}</div>
              <p className="text-xs text-muted-foreground">Across all projects</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{inProgressTasks}</div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((completedTasks / totalTasks) * 100)}% completion rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{overdueTasks}</div>
              <p className="text-xs text-muted-foreground">Need attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Todo">Todo</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="In Review">In Review</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="On Hold">On Hold</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="High">High Priority</SelectItem>
                  <SelectItem value="Medium">Medium Priority</SelectItem>
                  <SelectItem value="Low">Low Priority</SelectItem>
                </SelectContent>
              </Select>

              <Select value={projectFilter} onValueChange={setProjectFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  {projects.map((project) => (
                    <SelectItem key={project} value={project}>
                      {project}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tasks Data Table */}
        <DataTable<Task> data={tasks} columns={columns} />
      </div>

      {timeLogModalOpen && selectedTaskForTimeLog && (
        <TimeLogModal
        open={timeLogModalOpen}
        onOpenChange={setTimeLogModalOpen}
        task={selectedTaskForTimeLog}
        // taskId={selectedTaskForTimeLog?.id}
        // taskName={selectedTaskForTimeLog?.title}
        // projectName={selectedTaskForTimeLog?.project}
        // milestoneName={selectedTaskForTimeLog?.milestone}
      />
      )}
      
    </div>
  )
}
