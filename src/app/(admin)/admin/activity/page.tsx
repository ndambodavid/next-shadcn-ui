"use client"

import * as React from "react"
import { DataTable } from "@/components/dashboard/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import { mockLogs } from "@/data/activity-logs"

// Columns
const columns: ColumnDef<LogEvent>[] = [
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    cell: ({ getValue }) => <TimeCell value={getValue<string>()} />,
  },
  {
    accessorKey: "user",
    header: "User",
  },
  {
    accessorKey: "action",
    header: "Action/Event",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue<"success" | "warning" | "error">()
      const colors: Record<typeof status, string> = {
        success: "text-green-600",
        warning: "text-yellow-600",
        error: "text-red-600",
      }
      return <span className={colors[status]}>{status.toUpperCase()}</span>
    },
  },
  {
    accessorKey: "ip",
    header: "IP Address",
  },
]

function TimeCell({ value }: { value: string }) {
  const [time, setTime] = React.useState<string>("")

  React.useEffect(() => {
    setTime(format(new Date(value), "yyyy-MM-dd HH:mm:ss"))
  }, [value])

  return <>{time}</>
}


// Main Page
export default function SystemLogsPage() {
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState<string>("all")

  // Filter logs
  const filteredData = React.useMemo(() => {
    return mockLogs.filter((log) => {
      const matchesSearch =
        log.user.toLowerCase().includes(search.toLowerCase()) ||
        log.action.toLowerCase().includes(search.toLowerCase()) ||
        log.details.toLowerCase().includes(search.toLowerCase())
      const matchesStatus =
        statusFilter === "all" ? true : log.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [search, statusFilter])

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-3 mt-3 md:mt-0">
            {/* Search */}
            <Input
              placeholder="Search logs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-48"
            />
            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
            <Button>Export CSV</Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable data={filteredData} columns={columns} />
        </CardContent>
      </Card>
    </div>
  )
}
