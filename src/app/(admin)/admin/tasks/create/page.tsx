"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus, X, Calendar, Clock, User, Flag, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import CreateTaskLoading from "./loading "

// Mock data for dropdowns
const projects = [
  { id: "1", name: "E-commerce Platform", status: "active" },
  { id: "2", name: "Mobile App Redesign", status: "active" },
  { id: "3", name: "Data Analytics Dashboard", status: "active" },
  { id: "4", name: "Customer Portal", status: "planning" },
]

const milestones = {
  "1": [
    { id: "1", name: "User Authentication System", project: "E-commerce Platform" },
    { id: "2", name: "Product Catalog", project: "E-commerce Platform" },
    { id: "3", name: "Payment Integration", project: "E-commerce Platform" },
  ],
  "2": [
    { id: "4", name: "UI/UX Research", project: "Mobile App Redesign" },
    { id: "5", name: "Design System", project: "Mobile App Redesign" },
    { id: "6", name: "Prototype Development", project: "Mobile App Redesign" },
  ],
  "3": [
    { id: "7", name: "Data Collection Setup", project: "Data Analytics Dashboard" },
    { id: "8", name: "Dashboard Interface", project: "Data Analytics Dashboard" },
  ],
}

const teamMembers = [
  { id: "1", name: "Sarah Chen", role: "Frontend Developer", avatar: "/professional-woman-diverse.png" },
  { id: "2", name: "Mike Johnson", role: "Backend Developer", avatar: "/professional-man-developer.png" },
  { id: "3", name: "Emily Rodriguez", role: "UI/UX Designer", avatar: "/professional-woman-designer.png" },
  { id: "4", name: "David Kim", role: "Full Stack Developer", avatar: "/professional-man-backend.png" },
]

export default function CreateTaskPage() {
  const router = useRouter()
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    projectId: "",
    milestoneId: "",
    assigneeId: "",
    priority: "",
    status: "todo",
    startDate: "",
    dueDate: "",
    estimatedHours: "",
    tags: [] as string[],
    dependencies: [] as string[],
  })

  const [newTag, setNewTag] = useState("")
  const [newDependency, setNewDependency] = useState("")

  const selectedProject = projects.find((p) => p.id === formData.projectId)
  const availableMilestones = formData.projectId ? milestones[formData.projectId as keyof typeof milestones] || [] : []
  const selectedMilestone = availableMilestones.find((m) => m.id === formData.milestoneId)
  const selectedAssignee = teamMembers.find((m) => m.id === formData.assigneeId)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Creating task:", formData)
    setIsLoading(false)
    router.push("/tasks")
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const addDependency = () => {
    if (newDependency.trim() && !formData.dependencies.includes(newDependency.trim())) {
      setFormData((prev) => ({
        ...prev,
        dependencies: [...prev.dependencies, newDependency.trim()],
      }))
      setNewDependency("")
    }
  }

  const removeDependency = (depToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      dependencies: prev.dependencies.filter((dep) => dep !== depToRemove),
    }))
  }

  const calculateDuration = () => {
    if (!formData.startDate || !formData.dueDate) return null

    const start = new Date(formData.startDate)
    const end = new Date(formData.dueDate)

    if (end <= start) return null

    const diffInMs = end.getTime() - start.getTime()
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60))

    return { days, hours, minutes }
  }

  const duration = calculateDuration()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false)
    }, 2000) // 2 second delay

    return () => clearTimeout(timer)
  }, [])

  if (isPageLoading) {
    return <CreateTaskLoading />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div>
              <h1 className="text-lg font-semibold">Create New Task</h1>
              <p className="text-sm text-muted-foreground">Add a new task to your project</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!formData.title || !formData.projectId || isLoading}
              className="gap-2"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Create Task
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-6 p-6">
        {/* Main Form */}
        <div className="flex-1 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Basic Information
              </CardTitle>
              <CardDescription>Define the core details of your task</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Task Title *</label>
                <Input
                  placeholder="Enter task title..."
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea
                  placeholder="Describe the task requirements and objectives..."
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Project *</label>
                  <Select
                    value={formData.projectId}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        projectId: value,
                        milestoneId: "", // Reset milestone when project changes
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                          <div className="flex items-center gap-2">
                            <Badge variant={project.status === "active" ? "default" : "secondary"}>
                              {project.status}
                            </Badge>
                            {project.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Milestone</label>
                  <Select
                    value={formData.milestoneId}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, milestoneId: value }))}
                    disabled={!formData.projectId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select milestone" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableMilestones.map((milestone) => (
                        <SelectItem key={milestone.id} value={milestone.id}>
                          {milestone.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Assignment & Priority */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Assignment & Priority
              </CardTitle>
              <CardDescription>Assign the task and set priority level</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Assignee</label>
                  <Select
                    value={formData.assigneeId}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, assigneeId: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select assignee" />
                    </SelectTrigger>
                    <SelectContent>
                      {teamMembers.map((member) => (
                        <SelectItem key={member.id} value={member.id}>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={member.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{member.name}</div>
                              <div className="text-xs text-muted-foreground">{member.role}</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Priority</label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, priority: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">
                        <div className="flex items-center gap-2">
                          <Flag className="h-4 w-4 text-green-500" />
                          Low
                        </div>
                      </SelectItem>
                      <SelectItem value="medium">
                        <div className="flex items-center gap-2">
                          <Flag className="h-4 w-4 text-yellow-500" />
                          Medium
                        </div>
                      </SelectItem>
                      <SelectItem value="high">
                        <div className="flex items-center gap-2">
                          <Flag className="h-4 w-4 text-red-500" />
                          High
                        </div>
                      </SelectItem>
                      <SelectItem value="urgent">
                        <div className="flex items-center gap-2">
                          <Flag className="h-4 w-4 text-purple-500" />
                          Urgent
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Status</label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todo">To Do</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="review">In Review</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline & Estimation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Timeline & Estimation
              </CardTitle>
              <CardDescription>Set deadlines and time estimates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Start Date</label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Due Date</label>
                  <Input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData((prev) => ({ ...prev, dueDate: e.target.value }))}
                    min={formData.startDate || undefined}
                  />
                </div>
              </div>

              {duration && (
                <div className="p-3 bg-muted/50 rounded-lg border">
                  <div className="text-sm font-medium mb-1">Calculated Duration</div>
                  <div className="text-sm text-muted-foreground">
                    {duration.days > 0 && `${duration.days} day${duration.days !== 1 ? "s" : ""}`}
                    {duration.days > 0 && (duration.hours > 0 || duration.minutes > 0) && ", "}
                    {duration.hours > 0 && `${duration.hours} hour${duration.hours !== 1 ? "s" : ""}`}
                    {duration.hours > 0 && duration.minutes > 0 && ", "}
                    {duration.minutes > 0 && `${duration.minutes} minute${duration.minutes !== 1 ? "s" : ""}`}
                  </div>
                </div>
              )}

              <div>
                <label className="text-sm font-medium mb-2 block">Estimated Hours</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    placeholder="0"
                    value={formData.estimatedHours}
                    onChange={(e) => setFormData((prev) => ({ ...prev, estimatedHours: e.target.value }))}
                    className="pl-10"
                    min="0"
                    step="0.5"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Details */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Details</CardTitle>
              <CardDescription>Add tags and dependencies to organize your task</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Tags */}
              <div>
                <label className="text-sm font-medium mb-2 block">Tags</label>
                <div className="flex gap-2 mb-2">
                  <Input
                    placeholder="Add a tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} size="sm">
                    Add
                  </Button>
                </div>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="gap-1">
                        {tag}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Dependencies */}
              <div>
                <label className="text-sm font-medium mb-2 block">Dependencies</label>
                <div className="flex gap-2 mb-2">
                  <Input
                    placeholder="Add a dependency..."
                    value={newDependency}
                    onChange={(e) => setNewDependency(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addDependency())}
                  />
                  <Button type="button" onClick={addDependency} size="sm">
                    Add
                  </Button>
                </div>
                {formData.dependencies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.dependencies.map((dep) => (
                      <Badge key={dep} variant="outline" className="gap-1">
                        {dep}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeDependency(dep)} />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="w-80 space-y-6">
          {/* Task Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Task Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">Title</div>
                <div className="text-sm">{formData.title || "Untitled Task"}</div>
              </div>

              {selectedProject && (
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Project</div>
                  <div className="flex items-center gap-2">
                    <Badge variant={selectedProject.status === "active" ? "default" : "secondary"}>
                      {selectedProject.status}
                    </Badge>
                    <span className="text-sm">{selectedProject.name}</span>
                  </div>
                </div>
              )}

              {selectedMilestone && (
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Milestone</div>
                  <div className="text-sm">{selectedMilestone.name}</div>
                </div>
              )}

              {selectedAssignee && (
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Assignee</div>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={selectedAssignee.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {selectedAssignee.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium">{selectedAssignee.name}</div>
                      <div className="text-xs text-muted-foreground">{selectedAssignee.role}</div>
                    </div>
                  </div>
                </div>
              )}

              {formData.priority && (
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Priority</div>
                  <Badge
                    variant={
                      formData.priority === "urgent"
                        ? "destructive"
                        : formData.priority === "high"
                          ? "destructive"
                          : formData.priority === "medium"
                            ? "default"
                            : "secondary"
                    }
                  >
                    {formData.priority}
                  </Badge>
                </div>
              )}

              {formData.startDate && (
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Start Date</div>
                  <div className="text-sm">{new Date(formData.startDate).toLocaleDateString()}</div>
                </div>
              )}

              {formData.dueDate && (
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Due Date</div>
                  <div className="text-sm">{new Date(formData.dueDate).toLocaleDateString()}</div>
                </div>
              )}

              {duration && (
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Duration</div>
                  <div className="text-sm">
                    {duration.days > 0 && `${duration.days}d `}
                    {duration.hours > 0 && `${duration.hours}h `}
                    {duration.minutes > 0 && `${duration.minutes}m`}
                  </div>
                </div>
              )}

              {formData.estimatedHours && (
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Estimated Hours</div>
                  <div className="text-sm">{formData.estimatedHours}h</div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Choose a clear, descriptive title for your task</p>
              <p>• Select the appropriate project and milestone</p>
              <p>• Set realistic time estimates</p>
              <p>• Use tags to categorize and organize tasks</p>
              <p>• Add dependencies to track task relationships</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
