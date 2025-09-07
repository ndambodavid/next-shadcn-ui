import { SectionCards } from "@/components/dashboard/section-cards"
import { ChartAreaInteractive } from "@/components/dashboard/chart-area-interactive"
import { DataTable, schema } from "@/components/dashboard/data-table"
import data from "@/data/tasks.json"
import { DragHandle } from "@/components/table/drag-handle"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { Checkbox } from "@radix-ui/react-checkbox"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"
import { Progress } from "@radix-ui/react-progress"
import { IconDotsVertical } from "@tabler/icons-react"
import { ColumnDef } from "@tanstack/react-table"
import { Badge, Circle, Flag, Calendar } from "lucide-react"
import z from "zod"
import { priorityConfig, statusConfig } from "@/components/table/table-config"
import { useState } from "react"
import { TimeLogModal } from "@/components/timer/time-log-modal"
import { Task } from "@/types/task"

export default function DashboardPage() {

  const [timeLogModalOpen, setTimeLogModalOpen] = useState(false)
    const [selectedTaskForTimeLog, setSelectedTaskForTimeLog] = useState<Task>()

  const handleLogTime = (task: Task) => {
      setSelectedTaskForTimeLog(task)
      setTimeLogModalOpen(true)
    }

  const columns: ColumnDef<z.infer<typeof schema>>[] = [
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
                  <Badge key={tag} className="text-xs">
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
              // variant="secondary"
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
              <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuItem onClick={() => { handleLogTime(row.original) }}>Log Time</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem >Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    ]
  return (
    <>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <DataTable data={data} columns={columns}/>

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
    </>
  )
}
