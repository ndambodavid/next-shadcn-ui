import { Circle, Clock, AlertCircle, CheckCircle2, Pause } from "lucide-react"

export const statusConfig = {
  Todo: { color: "bg-gray-100 text-gray-800", icon: Circle },
  "In Progress": { color: "bg-blue-100 text-blue-800", icon: Clock },
  "In Review": { color: "bg-yellow-100 text-yellow-800", icon: AlertCircle },
  Completed: { color: "bg-green-100 text-green-800", icon: CheckCircle2 },
  "On Hold": { color: "bg-red-100 text-red-800", icon: Pause },
}

export const priorityConfig = {
  Low: { color: "bg-gray-100 text-gray-600", flag: "text-gray-400" },
  Medium: { color: "bg-yellow-100 text-yellow-700", flag: "text-yellow-500" },
  High: { color: "bg-red-100 text-red-700", flag: "text-red-500" },
}