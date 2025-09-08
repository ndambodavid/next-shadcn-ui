"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Eye, Edit, Trash2, Plus, Search, Filter } from "lucide-react"
import { useRouter } from "next/navigation"

// Mock project data
const mockProjects = [
  {
    id: 1,
    title: "E-commerce Platform Redesign",
    description: "Complete overhaul of the existing e-commerce platform with modern UI/UX and improved performance.",
    status: "in-progress",
    category: "Web Development",
    priority: "High",
    dueDate: "2024-03-15",
    team: ["Alice", "Bob", "Charlie"],
    progress: 65,
  },
  {
    id: 2,
    title: "Marketing Website Refresh",
    description: "Updated marketing website with new branding and improved conversion optimization.",
    status: "completed",
    category: "Web Development",
    priority: "Low",
    dueDate: "2024-01-31",
    team: ["Mia", "Noah"],
    progress: 100,
  },
  {
    id: 3,
    title: "Mobile App Development",
    description: "Native iOS and Android app for customer engagement and loyalty program management.",
    status: "completed",
    category: "Mobile Development",
    priority: "Medium",
    dueDate: "2024-02-28",
    team: ["Diana", "Eve"],
    progress: 100,
  },
  {
    id: 4,
    title: "Data Analytics Dashboard",
    description: "Real-time analytics dashboard for business intelligence and reporting capabilities.",
    status: "planning",
    category: "Data Science",
    priority: "High",
    dueDate: "2024-04-20",
    team: ["Frank", "Grace", "Henry"],
    progress: 15,
  },
  {
    id: 5,
    title: "API Integration Project",
    description: "Integration with third-party APIs for payment processing and inventory management.",
    status: "in-progress",
    category: "Backend Development",
    priority: "Medium",
    dueDate: "2024-03-30",
    team: ["Ivy", "Jack"],
    progress: 40,
  },
  {
    id: 6,
    title: "Security Audit & Enhancement",
    description: "Comprehensive security review and implementation of enhanced security measures.",
    status: "overdue",
    category: "Security",
    priority: "Critical",
    dueDate: "2024-02-15",
    team: ["Kate", "Liam"],
    progress: 80,
  },
  {
    id: 7,
    title: "E-commerce Platform Redesign",
    description: "Complete overhaul of the existing e-commerce platform with modern UI/UX and improved performance.",
    status: "in-progress",
    category: "Web Development",
    priority: "High",
    dueDate: "2024-03-15",
    team: ["Alice", "Bob", "Charlie"],
    progress: 65,
  },
  {
    id: 8,
    title: "Marketing Website Refresh",
    description: "Updated marketing website with new branding and improved conversion optimization.",
    status: "completed",
    category: "Web Development",
    priority: "Low",
    dueDate: "2024-01-31",
    team: ["Mia", "Noah"],
    progress: 100,
  },
]

const statusColors = {
  completed: "bg-green-100 text-green-800 border-green-200",
  "in-progress": "bg-blue-100 text-blue-800 border-blue-200",
  planning: "bg-yellow-100 text-yellow-800 border-yellow-200",
  overdue: "bg-red-100 text-red-800 border-red-200",
}

const priorityColors = {
  Critical: "bg-red-100 text-red-800 border-red-200",
  High: "bg-orange-100 text-orange-800 border-orange-200",
  Medium: "bg-blue-100 text-blue-800 border-blue-200",
  Low: "bg-gray-100 text-gray-800 border-gray-200",
}

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const router = useRouter()

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    const matchesCategory = categoryFilter === "all" || project.category === categoryFilter
    const matchesPriority = priorityFilter === "all" || project.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesCategory && matchesPriority
  })

  const handleProjectClick = (projectId: number) => {
    // Navigate to project details page
    console.log(`Navigating to project ${projectId}`)
    router.push(`/admin/projects/1`) //${projectId}
  }

  return (
    <div className="h-screen flex flex-col">

      {/* Filters */}
      {/* Filters Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>

            {/* Category Filter */}
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Web Development">Web Development</SelectItem>
                <SelectItem value="Mobile Development">Mobile Development</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Backend Development">Backend Development</SelectItem>
                <SelectItem value="Security">Security</SelectItem>
              </SelectContent>
            </Select>

            {/* Priority Filter */}
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>


      {/* Projects Grid - Scrollable Content */}
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-primary/20 bg-card border-border"
                onClick={() => handleProjectClick(project.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-semibold text-card-foreground text-balance leading-tight">
                      {project.title}
                    </CardTitle>
                    <div className="flex gap-1 flex-shrink-0 ml-2">
                      <Badge className={statusColors[project.status as keyof typeof statusColors]}>
                        {project.status.replace("-", " ")}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground text-pretty leading-relaxed">{project.description}</p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium text-card-foreground">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Badge
                        variant="outline"
                        className={priorityColors[project.priority as keyof typeof priorityColors]}
                      >
                        {project.priority}
                      </Badge>
                      <p className="text-xs text-muted-foreground">Due: {project.dueDate}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {project.team.length} team member{project.team.length !== 1 ? "s" : ""}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-xs text-muted-foreground">{project.category}</span>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-accent hover:text-accent-foreground"
                        onClick={(e) => {
                          e.stopPropagation()
                          console.log(`View project ${project.id}`)
                        }}
                      >
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-accent hover:text-accent-foreground"
                        onClick={(e) => {
                          e.stopPropagation()
                          console.log(`Edit project ${project.id}`)
                        }}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
                        onClick={(e) => {
                          e.stopPropagation()
                          console.log(`Delete project ${project.id}`)
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No projects found matching your criteria.</p>
              <Button className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Create New Project
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
