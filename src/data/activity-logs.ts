export const mockLogs: LogEvent[] = Array.from({ length: 25 }, (_, i) => ({
  id: `${i + 1}`,
  timestamp: new Date(Date.now() - i * 60000).toISOString(), // generates once at import time
  user: ["admin", "clientA", "talentX", "system"][i % 4],
  action: ["Login", "Project Updated", "Task Assigned", "Error: DB Timeout"][i % 4],
  status: (["success", "warning", "error"] as const)[i % 3],
  ip: `192.168.1.${i + 10}`,
  details: `Event ${i + 1} triggered by user action or system process.`,
}))
