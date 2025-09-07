"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, DollarSign, FileText, MessageSquare, TrendingUp, Users, BarChart3 } from "lucide-react"

// Mock client data
const clientData = {
  name: "John Doe",
  company: "Acme Corporation",
  activeProjects: 3,
  totalSpent: 45000,
  pendingInvoices: 2,
  nextMeeting: "Tomorrow at 2:00 PM",
}

const activeProjects = [
  {
    id: 1,
    name: "E-commerce Platform",
    status: "in-progress",
    progress: 75,
    dueDate: "Mar 15, 2024",
    budget: 25000,
    spent: 18750,
    team: 4,
  },
  {
    id: 2,
    name: "Mobile App Development",
    status: "review",
    progress: 90,
    dueDate: "Feb 28, 2024",
    budget: 15000,
    spent: 13500,
    team: 3,
  },
  {
    id: 3,
    name: "Brand Identity Refresh",
    status: "planning",
    progress: 25,
    dueDate: "Apr 10, 2024",
    budget: 8000,
    spent: 2000,
    team: 2,
  },
]

const recentUpdates = [
  {
    id: 1,
    project: "E-commerce Platform",
    message: "Payment gateway integration completed",
    time: "2 hours ago",
    type: "milestone",
  },
  {
    id: 2,
    project: "Mobile App Development",
    message: "App submitted for client review",
    time: "1 day ago",
    type: "review",
  },
  {
    id: 3,
    project: "Brand Identity Refresh",
    message: "Initial concepts ready for feedback",
    time: "2 days ago",
    type: "feedback",
  },
]

export default function ClientHomePage() {
  const [isLoading, setIsLoading] = useState(true)

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
    <div className="container mx-auto py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {clientData.name}</h1>
        <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your projects at {clientData.company}</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
                <p className="text-2xl font-bold text-foreground">{clientData.activeProjects}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Investment</p>
                <p className="text-2xl font-bold text-foreground">${clientData.totalSpent.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Invoices</p>
                <p className="text-2xl font-bold text-foreground">{clientData.pendingInvoices}</p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Next Meeting</p>
                <p className="text-sm font-bold text-foreground">{clientData.nextMeeting}</p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Projects */}
        <div className="lg:col-span-2">
          <Card className=" border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Active Projects
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {activeProjects.map((project) => (
                <div
                  key={project.id}
                  className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground">{project.name}</h3>
                      <div className="flex items-center gap-4 mt-1">
                        <Badge
                          variant="outline"
                          className={
                            project.status === "in-progress"
                              ? "border-primary/20 text-primary bg-primary/10"
                              : project.status === "review"
                                ? "border-orange-200 text-orange-700 bg-orange-50"
                                : "border-border text-muted-foreground bg-muted/50"
                          }
                        >
                          {project.status.replace("-", " ")}
                        </Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {project.team} team members
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{project.progress}% Complete</p>
                      <p className="text-xs text-muted-foreground">Due {project.dueDate}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Progress value={project.progress} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Budget: ${project.budget.toLocaleString()}</span>
                      <span>Spent: ${project.spent.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}

              <Button className="w-full hover:bg-blue-700">View All Projects</Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Updates & Quick Actions */}
        <div className="space-y-6">
          {/* Recent Updates */}
          <Card className=" border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Recent Updates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentUpdates.map((update) => (
                <div key={update.id} className="flex gap-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      update.type === "milestone"
                        ? "bg-green-500"
                        : update.type === "review"
                          ? "bg-orange-500"
                          : "bg-primary"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{update.project}</p>
                    <p className="text-sm text-muted-foreground">{update.message}</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">{update.time}</p>
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
              >
                View All Updates
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-transparent border-blue-500">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start hover:bg-blue-700 ">
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Message
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
              >
                <FileText className="w-4 h-4 mr-2" />
                View Invoices
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Meeting
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
              >
                <Clock className="w-4 h-4 mr-2" />
                Request Update
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
