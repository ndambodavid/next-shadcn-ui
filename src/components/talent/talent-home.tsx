"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  Calendar,
  Target,
  TrendingUp,
  Users,
  Timer,
  PlayCircle,
  PauseCircle,
} from "lucide-react"

// Mock talent data
const talentData = {
  name: "Alex Smith",
  role: "Senior Full Stack Developer",
  tasksToday: 5,
  hoursLogged: 6.5,
  targetHours: 8,
  completedTasks: 23,
  activeProjects: 3,
}

const todayTasks = [
  {
    id: 1,
    title: "Implement user authentication",
    project: "E-commerce Platform",
    priority: "high",
    status: "in-progress",
    estimatedTime: "4h",
    timeSpent: "2.5h",
    dueTime: "5:00 PM",
  },
  {
    id: 2,
    title: "Code review for payment module",
    project: "Mobile App",
    priority: "medium",
    status: "pending",
    estimatedTime: "1h",
    timeSpent: "0h",
    dueTime: "3:00 PM",
  },
  {
    id: 3,
    title: "Update API documentation",
    project: "API Integration",
    priority: "low",
    status: "completed",
    estimatedTime: "2h",
    timeSpent: "1.5h",
    dueTime: "2:00 PM",
  },
]

const activeProjects = [
  {
    id: 1,
    name: "E-commerce Platform",
    role: "Lead Developer",
    progress: 75,
    tasksRemaining: 8,
    deadline: "Mar 15",
    team: ["Alice", "Bob", "Charlie"],
  },
  {
    id: 2,
    name: "Mobile App Development",
    role: "Frontend Developer",
    progress: 90,
    tasksRemaining: 3,
    deadline: "Feb 28",
    team: ["Diana", "Eve"],
  },
  {
    id: 3,
    name: "API Integration",
    role: "Backend Developer",
    progress: 45,
    tasksRemaining: 12,
    deadline: "Apr 10",
    team: ["Frank", "Grace"],
  },
]

const recentActivity = [
  {
    id: 1,
    action: "Completed task",
    task: "Database schema optimization",
    project: "E-commerce Platform",
    time: "30 minutes ago",
  },
  {
    id: 2,
    action: "Started task",
    task: "Implement user authentication",
    project: "E-commerce Platform",
    time: "2 hours ago",
  },
  {
    id: 3,
    action: "Logged time",
    task: "Code review session",
    project: "Mobile App",
    time: "3 hours ago",
  },
]

export default function TalentHomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [currentTask, setCurrentTask] = useState("Implement user authentication")

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Header Skeleton */}
          <div className="space-y-4">
            <div className="h-8 bg-muted rounded-lg w-64 animate-pulse" />
            <div className="h-4 bg-muted/50 rounded w-96 animate-pulse" />
          </div>

          {/* Stats Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-card rounded-xl border p-6">
                <div className="h-4 bg-muted/50 rounded w-20 mb-4 animate-pulse" />
                <div className="h-8 bg-muted rounded w-16 animate-pulse" />
              </div>
            ))}
          </div>

          {/* Content Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card rounded-xl border p-6">
                <div className="h-6 bg-muted rounded w-32 mb-6 animate-pulse" />
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-20 bg-muted/50 rounded-lg animate-pulse" />
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-card rounded-xl border p-6">
                <div className="h-6 bg-muted rounded w-28 mb-6 animate-pulse" />
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-16 bg-muted/50 rounded-lg animate-pulse" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Good morning, {talentData.name}</h1>
        <p className="text-muted-foreground">
          Ready to tackle today&apos;s challenges? You have {todayTasks.filter((t) => t.status !== "completed").length} tasks
          pending.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Today&apos;s Tasks</p>
                <p className="text-2xl font-bold text-foreground">{talentData.tasksToday}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Hours Today</p>
                <p className="text-2xl font-bold text-foreground">{talentData.hoursLogged}h</p>
                <p className="text-xs text-muted-foreground">of {talentData.targetHours}h target</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Timer className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed Tasks</p>
                <p className="text-2xl font-bold text-foreground">{talentData.completedTasks}</p>
                <p className="text-xs text-green-600">This month</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
                <p className="text-2xl font-bold text-foreground">{talentData.activeProjects}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today&apos;s Tasks & Time Tracker */}
        <div className="lg:col-span-2 space-y-6">
          {/* Time Tracker */}
          <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Current Task</h3>
                  <p className="text-primary-foreground/80">{currentTask}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">2h 30m elapsed</span>
                  </div>
                </div>
                <Button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="bg-white/20 hover:bg-white/30 text-primary-foreground border-white/30"
                >
                  {isTimerRunning ? (
                    <>
                      <PauseCircle className="w-4 h-4 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Start
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Toda&apos;s Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Today&apos;s Tasks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {todayTasks.map((task) => (
                <div
                  key={task.id}
                  className={`border rounded-lg p-4 transition-colors ${
                    task.status === "completed"
                      ? "border-green-200 bg-green-50"
                      : task.priority === "high"
                        ? "border-red-200 bg-red-50"
                        : "border-border hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3
                        className={`font-semibold ${task.status === "completed" ? "line-through text-muted-foreground" : "text-foreground"}`}
                      >
                        {task.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{task.project}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <Badge
                          variant="outline"
                          className={
                            task.priority === "high"
                              ? "border-red-200 text-red-700 bg-red-50"
                              : task.priority === "medium"
                                ? "border-orange-200 text-orange-700 bg-orange-50"
                                : "border-border text-muted-foreground bg-muted/50"
                          }
                        >
                          {task.priority}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Due {task.dueTime}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">
                        {task.timeSpent} / {task.estimatedTime}
                      </p>
                      {task.status === "completed" ? (
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                      ) : task.status === "in-progress" ? (
                        <div className="w-5 h-5 bg-primary rounded-full mt-1 animate-pulse" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-orange-500 mt-1" />
                      )}
                    </div>
                  </div>

                  {task.status !== "completed" && (
                    <div className="flex gap-2">
                      <Button size="sm">{task.status === "in-progress" ? "Continue" : "Start Task"}</Button>
                      <Button size="sm" variant="outline">
                        Log Time
                      </Button>
                    </div>
                  )}
                </div>
              ))}

              <Button className="w-full">View All Tasks</Button>
            </CardContent>
          </Card>
        </div>

        {/* Projects & Activity */}
        <div className="space-y-6">
          {/* Active Projects */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Active Projects
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeProjects.map((project) => (
                <div key={project.id} className="border rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">{project.name}</h3>
                      <p className="text-xs text-muted-foreground">{project.role}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">Due {project.deadline}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">{project.progress}% Complete</span>
                      <span className="text-muted-foreground">{project.tasksRemaining} tasks left</span>
                    </div>
                    <Progress value={project.progress} className="h-1.5" />
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex -space-x-1">
                      {project.team.slice(0, 3).map((member, idx) => (
                        <Avatar key={idx} className="w-6 h-6 border-2 border-background">
                          <AvatarFallback className="text-xs bg-primary/10 text-primary">
                            {member.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {project.team.length > 3 && (
                        <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">+{project.team.length - 3}</span>
                        </div>
                      )}
                    </div>
                    <Button size="sm" variant="ghost" className="h-6 px-2 text-xs text-primary hover:bg-primary/10">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium text-foreground">{activity.action}</span>
                      <span className="text-muted-foreground"> {activity.task}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.project} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}

              <Button variant="outline" className="w-full bg-transparent">
                View All Activity
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start">
                <Target className="w-4 h-4 mr-2" />
                Create New Task
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Timer className="w-4 h-4 mr-2" />
                View Time Logs
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Calendar className="w-4 h-4 mr-2" />
                Check Schedule
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
