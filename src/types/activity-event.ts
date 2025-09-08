type LogEvent = {
  id: string
  timestamp: string
  user: string
  action: string
  status: "success" | "warning" | "error"
  ip: string
  details: string
}