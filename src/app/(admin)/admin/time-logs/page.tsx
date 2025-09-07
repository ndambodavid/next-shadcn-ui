"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  ArrowLeft,
  Clock,
  Plus,
  Search,
  Filter,
  Calendar,
  Timer,
  Download,
  MoreHorizontal,
  Edit,
  Trash2,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { TimeLog } from "@/types/time-log"
import { Checkbox } from "@radix-ui/react-checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/dashboard/data-table"
import { timeLogs } from "@/types/time-log"


const calculateSummaryStats = (logs: TimeLog[], filters: Record<string, string>) => {
  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.task.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      log.project.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      log.description.toLowerCase().includes(filters.searchTerm.toLowerCase())
    const matchesProject = filters.selectedProject === "all" || log.project === filters.selectedProject
    const matchesUser = filters.selectedUser === "all" || log.user.name === filters.selectedUser
    const matchesStatus = filters.statusFilter === "all" || log.status === filters.statusFilter
    const matchesBillable =
      filters.billableFilter === "all" ||
      (filters.billableFilter === "billable" && log.billable) ||
      (filters.billableFilter === "non-billable" && !log.billable)

    // Date filtering
    const logDate = new Date(log.date)
    const today = new Date()
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

    let matchesDate = true
    if (filters.dateFilter === "today") {
      matchesDate = logDate.toDateString() === today.toDateString()
    } else if (filters.dateFilter === "week") {
      matchesDate = logDate >= weekAgo
    } else if (filters.dateFilter === "month") {
      matchesDate = logDate >= monthAgo
    }

    return matchesSearch && matchesProject && matchesUser && matchesStatus && matchesBillable && matchesDate
  })

  const totalMinutes = filteredLogs.reduce((sum, log) => sum + log.durationMinutes, 0)
  const billableMinutes = filteredLogs.filter((log) => log.billable).reduce((sum, log) => sum + log.durationMinutes, 0)
  const todayLogs = filteredLogs.filter((log) => new Date(log.date).toDateString() === new Date().toDateString())
  const todayMinutes = todayLogs.reduce((sum, log) => sum + log.durationMinutes, 0)
  const weekLogs = filteredLogs.filter((log) => {
    const logDate = new Date(log.date)
    const weekAgo = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
    return logDate >= weekAgo
  })
  const weekMinutes = weekLogs.reduce((sum, log: TimeLog) => sum + log.durationMinutes, 0)

  return {
    totalHours: (totalMinutes / 60).toFixed(1),
    billableHours: (billableMinutes / 60).toFixed(1),
    todayHours: (todayMinutes / 60).toFixed(1),
    weekHours: (weekMinutes / 60).toFixed(1),
    activeProjects: new Set(filteredLogs.map((log: TimeLog) => log.project)).size,
    totalEntries: filteredLogs.length,
  }
}

const statusConfig = {
  approved: { color: "bg-green-100 text-green-800", label: "Approved" },
  pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
  rejected: { color: "bg-red-100 text-red-800", label: "Rejected" },
}

export default function TimeLogsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProject, setSelectedProject] = useState("all")
  const [selectedUser, setSelectedUser] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [billableFilter, setBillableFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")

  const filters = {
    searchTerm,
    selectedProject,
    selectedUser,
    dateFilter,
    statusFilter,
    billableFilter,
  }

  const filteredLogs = timeLogs
    .filter((log: TimeLog) => {
      const matchesSearch =
        log.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesProject = selectedProject === "all" || log.project === selectedProject
      const matchesUser = selectedUser === "all" || log.user.name === selectedUser
      const matchesStatus = statusFilter === "all" || log.status === statusFilter
      const matchesBillable =
        billableFilter === "all" ||
        (billableFilter === "billable" && log.billable) ||
        (billableFilter === "non-billable" && !log.billable)

      // Date filtering
      const logDate = new Date(log.date)
      const today = new Date()
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
      const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

      let matchesDate = true
      if (dateFilter === "today") {
        matchesDate = logDate.toDateString() === today.toDateString()
      } else if (dateFilter === "week") {
        matchesDate = logDate >= weekAgo
      } else if (dateFilter === "month") {
        matchesDate = logDate >= monthAgo
      }

      return matchesSearch && matchesProject && matchesUser && matchesStatus && matchesBillable && matchesDate
    })
    .sort((a: TimeLog, b: TimeLog) => {
      let aValue, bValue

      switch (sortBy) {
        case "date":
          aValue = new Date(a.date + " " + a.startTime)
          bValue = new Date(b.date + " " + b.startTime)
          break
        case "duration":
          aValue = a.durationMinutes
          bValue = b.durationMinutes
          break
        case "project":
          aValue = a.project
          bValue = b.project
          break
        default:
          aValue = a.date
          bValue = b.date
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  const summaryStats = calculateSummaryStats(filteredLogs, filters)

  const handleExport = () => {
    // In a real app, this would generate and download a CSV/Excel file
    console.log("[v0] Exporting time logs:", filteredLogs)
  }

  const timeLogColumns: ColumnDef<TimeLog>[] = [
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
      accessorKey: "date",
      header: "Date & Time",
      cell: ({ row }) => {
        const log = row.original
        return (
          <div className="space-y-1">
            <div className="font-medium">
              {new Date(log.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
            <div className="text-xs text-muted-foreground">
              {log.startTime} - {log.endTime}
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "duration",
      header: "Duration",
      cell: ({ row }) => (
        <Badge variant="secondary" className="font-mono">
          {row.original.duration}
        </Badge>
      ),
    },
    {
      accessorKey: "task",
      header: "Task & Project",
      cell: ({ row }) => {
        const log = row.original
        return (
          <div className="space-y-1">
            <div className="font-medium">{log.task}</div>
            <div className="text-xs text-muted-foreground">{log.milestone}</div>
            <Badge variant="outline" className="text-xs">
              {log.project}
            </Badge>
          </div>
        )
      },
    },
    {
      accessorKey: "user",
      header: "User",
      cell: ({ row }) => {
        const user = row.original.user
        return (
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="text-xs">{user.initials}</AvatarFallback>
            </Avatar>
            <span className="text-sm">{user.name}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const log = row.original
        const cfg = statusConfig[log.status] || { label: log.status, color: "" }
        return (
          <Badge variant="secondary" className={cfg.color}>
            {cfg.label}
          </Badge>
        )
      },
    },
    {
      accessorKey: "billable",
      header: "Billable",
      cell: ({ row }) => (
        <Badge variant={row.original.billable ? "default" : "secondary"}>
          {row.original.billable ? "Billable" : "Non-billable"}
        </Badge>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground truncate max-w-xs" title={row.original.description}>
          {row.original.description}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Link href="/tasks">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Tasks
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-semibold">Time Logs</h1>
              <p className="text-sm text-muted-foreground">Track and manage team time entries</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Log Time
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Enhanced Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryStats.totalHours}h</div>
              <p className="text-xs text-muted-foreground">{summaryStats.totalEntries} entries</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Billable Hours</CardTitle>
              <Timer className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{summaryStats.billableHours}h</div>
              <p className="text-xs text-muted-foreground">
                {(
                  (Number.parseFloat(summaryStats.billableHours) / Number.parseFloat(summaryStats.totalHours)) *
                  100
                ).toFixed(0)}
                % of total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today</CardTitle>
              <Timer className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{summaryStats.todayHours}h</div>
              <p className="text-xs text-muted-foreground">Logged today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <Calendar className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{summaryStats.weekHours}h</div>
              <p className="text-xs text-muted-foreground">Weekly total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <Filter className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryStats.activeProjects}</div>
              <p className="text-xs text-muted-foreground">Projects with time</p>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filters & Search</CardTitle>
            <CardDescription>Filter time logs by project, user, date range, and status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tasks, projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Project</label>
                <Select value={selectedProject} onValueChange={setSelectedProject}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Projects" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Projects</SelectItem>
                    <SelectItem value="E-commerce Platform">E-commerce Platform</SelectItem>
                    <SelectItem value="Marketing Website">Marketing Website</SelectItem>
                    <SelectItem value="Mobile App">Mobile App</SelectItem>
                    <SelectItem value="CRM System">CRM System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Team Member</label>
                <Select value={selectedUser} onValueChange={setSelectedUser}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Members" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Members</SelectItem>
                    <SelectItem value="Sarah Chen">Sarah Chen</SelectItem>
                    <SelectItem value="Mike Johnson">Mike Johnson</SelectItem>
                    <SelectItem value="Alex Rodriguez">Alex Rodriguez</SelectItem>
                    <SelectItem value="Emma Davis">Emma Davis</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Date Range</label>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Billable</label>
                <Select value={billableFilter} onValueChange={setBillableFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="billable">Billable Only</SelectItem>
                    <SelectItem value="non-billable">Non-billable Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-4 pt-4 border-t">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Sort by:</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="duration">Duration</SelectItem>
                    <SelectItem value="project">Project</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Order:</label>
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desc">Newest First</SelectItem>
                    <SelectItem value="asc">Oldest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Time Logs Table */}
        <DataTable<TimeLog> data={filteredLogs} columns={timeLogColumns}/>
      </div>
    </div>
  )
}
