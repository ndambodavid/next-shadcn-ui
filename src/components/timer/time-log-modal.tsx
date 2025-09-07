"use client"

import { useEffect, useRef, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Clock, Play, Square, Timer } from "lucide-react"
import { Task } from "@/types/task"

interface TimeLogModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  task?: Task
}

export function TimeLogModal({ open, onOpenChange, task }: TimeLogModalProps) {
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [timerSeconds, setTimerSeconds] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [startTime, setStartTime] = useState("")
  const [timerStart, setTimerStart] = useState<string | null>(null)
  const [endTime, setEndTime] = useState("")
  const [timeSpentHours, setTimeSpentHours] = useState(0)
  const [timeSpentMinutes, setTimeSpentMinutes] = useState(0)
  const [description, setDescription] = useState("")
  const [logType, setLogType] = useState<"manual" | "timer">("manual")

  // 🔹 Auto-calc endTime
  useEffect(() => {
    if (startTime && (timeSpentHours > 0 || timeSpentMinutes > 0)) {
      const [h, m] = startTime.split(":").map(Number)
      const startDate = new Date()
      startDate.setHours(h, m, 0, 0)
      const endDate = new Date(startDate.getTime() + (timeSpentHours * 60 + timeSpentMinutes) * 60000)
      setEndTime(endDate.toTimeString().slice(0, 5))
    }
  }, [startTime, timeSpentHours, timeSpentMinutes])

  // 🔹 Timer loop
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => setTimerSeconds((prev) => prev + 1), 1000)
    } else if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isTimerRunning])

  // 🔹 Update timer time spent
  useEffect(() => {
    if (logType === "timer" && startTime) {
      const hours = Math.floor(timerSeconds / 3600)
      const mins = Math.floor((timerSeconds % 3600) / 60)
      setTimeSpentHours(hours)
      setTimeSpentMinutes(mins)

      const [h, m] = startTime.split(":").map(Number)
      const startDate = new Date()
      startDate.setHours(h, m, 0, 0)
      const endDate = new Date(startDate.getTime() + timerSeconds * 1000)
      setEndTime(endDate.toTimeString().slice(0, 5))
    }
  }, [timerSeconds, logType, startTime])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleStartTimer = () => {
    const now = new Date()
    const startStr = now.toTimeString().slice(0, 5)
    setStartTime(startStr)
    setTimerStart(now.toISOString())
    setIsTimerRunning(true)
    setLogType("timer")
  }

  const handleStopTimer = () => setIsTimerRunning(false)

  const handleSubmit = () => {
    let finalStartTime = startTime
    let finalEndTime = endTime

    if (logType === "manual" && startTime) {
      const totalMins = timeSpentHours * 60 + timeSpentMinutes
      const startDateTime = new Date(`${date}T${startTime}`)
      const endDateTime = new Date(startDateTime.getTime() + totalMins * 60000)
      finalEndTime = endDateTime.toTimeString().slice(0, 5)
    }

    if (logType === "timer" && timerStart) {
      const startDateTime = new Date(timerStart)
      const endDateTime = new Date(startDateTime.getTime() + timerSeconds * 1000)
      finalStartTime = startDateTime.toTimeString().slice(0, 5)
      finalEndTime = endDateTime.toTimeString().slice(0, 5)
    }

    const timeLogEntry = {
      taskId: task?.id,
      taskTitle: task?.title,
      taskDescription: task?.description,
      project: task?.project,
      milestone: task?.milestone,
      date,
      startTime: finalStartTime,
      endTime: finalEndTime,
      timeSpent: logType === "timer" ? formatTime(timerSeconds) : `${timeSpentHours}h ${timeSpentMinutes}m`,
      description,
      logType,
    }

    console.log("✅ Time log submitted:", timeLogEntry)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Timer className="h-5 w-5" />
            Log Time Entry
          </DialogTitle>
        </DialogHeader>

        {/* Task Summary */}
        {task && (
          <div className="p-4 border rounded-md space-y-2 bg-muted/30">
            <p><strong>ID:</strong> {task.id}</p>
            <p><strong>Title:</strong> {task.title}</p>
            <p><strong>Description:</strong> {task.description || "No description"}</p>
            <p><strong>Project:</strong> {task.project || "—"}</p>
            <p><strong>Milestone:</strong> {task.milestone || "—"}</p>
          </div>
        )}

        {/* Timer Section */}
        <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-mono font-bold">{formatTime(timerSeconds)}</div>
            {isTimerRunning && (
              <Badge variant="default" className="animate-pulse">
                <Clock className="h-3 w-3 mr-1" />
                Running
              </Badge>
            )}
          </div>
          <div className="flex gap-2">
            {!isTimerRunning ? (
              <Button onClick={handleStartTimer} size="sm">
                <Play className="h-4 w-4 mr-2" />
                Start Timer
              </Button>
            ) : (
              <Button onClick={handleStopTimer} variant="destructive" size="sm">
                <Square className="h-4 w-4 mr-2" />
                Stop Timer
              </Button>
            )}
          </div>
        </div>

        {/* Manual Time Entry */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startTime">Start Time</Label>
            <Input
              id="startTime"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              disabled={logType === "timer"}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hours">Hours</Label>
            <Input
              id="hours"
              type="number"
              min={0}
              value={timeSpentHours}
              onChange={(e) => setTimeSpentHours(Number(e.target.value))}
              disabled={logType === "timer"}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="minutes">Minutes</Label>
            <Input
              id="minutes"
              type="number"
              min={0}
              max={59}
              value={timeSpentMinutes}
              onChange={(e) => setTimeSpentMinutes(Number(e.target.value))}
              disabled={logType === "timer"}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endTime">End Time</Label>
            <Input id="endTime" type="time" value={endTime} readOnly />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>Log Time</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
