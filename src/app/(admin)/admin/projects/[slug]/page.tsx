"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Edit3, Users, Target, MessageSquare, Plus, X, CheckCircle2, Clock, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Project } from "@/types/project"
import React from "react"

// Mock project data - in real app this would come from API
const mockProjectData: Project = {
    id: "1",
    title: "E-commerce Platform Redesign",
    description:
        "Complete overhaul of the existing e-commerce platform with modern UI/UX, improved performance, and mobile-first approach.",
    status: "In Progress",
    priority: "High",
    progress: 65,
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    budget: "$125,000",
    client: "TechCorp Solutions",
    category: "Web Development",
    scope: `This project involves a comprehensive redesign and redevelopment of the existing e-commerce platform. Key objectives include:

• Modernize the user interface with a clean, intuitive design
• Implement responsive design for optimal mobile experience  
• Improve site performance and loading speeds by 40%
• Integrate advanced search and filtering capabilities
• Enhance checkout process to reduce cart abandonment
• Implement comprehensive analytics and reporting
• Ensure WCAG 2.1 AA accessibility compliance
• Integrate with existing inventory management systems`,
    milestones: [
        {
            id: 1,
            title: "Discovery & Research Phase",
            description: "User research, competitor analysis, and technical requirements gathering",
            status: "completed",
            dueDate: "2024-02-15",
            progress: 100,
        },
        {
            id: 2,
            title: "Design System & Wireframes",
            description: "Create design system, wireframes, and high-fidelity mockups",
            status: "completed",
            dueDate: "2024-03-15",
            progress: 100,
        },
        {
            id: 3,
            title: "Frontend Development",
            description: "Implement responsive frontend with React and TypeScript",
            status: "in-progress",
            dueDate: "2024-05-01",
            progress: 75,
        },
        {
            id: 4,
            title: "Backend Integration",
            description: "API development and database optimization",
            status: "in-progress",
            dueDate: "2024-05-15",
            progress: 45,
        },
        {
            id: 5,
            title: "Testing & QA",
            description: "Comprehensive testing, bug fixes, and performance optimization",
            status: "pending",
            dueDate: "2024-06-15",
            progress: 0,
        },
        {
            id: 6,
            title: "Deployment & Launch",
            description: "Production deployment and go-live activities",
            status: "pending",
            dueDate: "2024-06-30",
            progress: 0,
        },
    ],
    team: [
        {
            id: 1,
            name: "Sarah Chen",
            role: "Project Manager",
            avatar: "/professional-woman-diverse.png",
            email: "sarah.chen@company.com",
            allocation: "100%",
        },
        {
            id: 2,
            name: "Marcus Rodriguez",
            role: "Lead Developer",
            avatar: "/professional-man-developer.png",
            email: "marcus.r@company.com",
            allocation: "100%",
        },
        {
            id: 3,
            name: "Emily Watson",
            role: "UX Designer",
            avatar: "/professional-woman-designer.png",
            email: "emily.watson@company.com",
            allocation: "80%",
        },
        {
            id: 4,
            name: "David Kim",
            role: "Backend Developer",
            avatar: "/professional-man-backend.png",
            email: "david.kim@company.com",
            allocation: "100%",
        },
    ],
    comments: [
        {
            id: 1,
            author: "Sarah Chen",
            avatar: "/professional-woman-diverse.png",
            content:
                "Great progress on the frontend development! The new design is looking fantastic. We should schedule a client review for next week.",
            timestamp: "2024-03-20T10:30:00Z",
            type: "update",
        },
        {
            id: 2,
            author: "Marcus Rodriguez",
            avatar: "/professional-man-developer.png",
            content:
                "Completed the shopping cart functionality. Performance tests show 35% improvement in load times compared to the old system.",
            timestamp: "2024-03-19T14:15:00Z",
            type: "milestone",
        },
        {
            id: 3,
            author: "Emily Watson",
            avatar: "/professional-woman-designer.png",
            content:
                "Updated the design system with new color palette. All components are now consistent with the brand guidelines.",
            timestamp: "2024-03-18T09:45:00Z",
            type: "update",
        },
    ],

}

const availableTeamMembers = [
    { id: 5, name: "Alex Thompson", role: "Frontend Developer", avatar: "/professional-developer.png" },
    { id: 6, name: "Lisa Park", role: "QA Engineer", avatar: "/professional-woman-qa.png" },
    { id: 7, name: "James Wilson", role: "DevOps Engineer", avatar: "/professional-man-devops.png" },
]

interface ProjectDetailsProps extends React.HTMLAttributes<HTMLDivElement> { }

export default function ProjectDetailsPage({ className, ...props }: ProjectDetailsProps) {
    const params = useParams()
    const router = useRouter()
    const [project, setProject] = useState<Project>(mockProjectData)
    const [scope, setScope] = useState(project.scope)
    const [loading, setLoading] = useState(true)
    const [editingSection, setEditingSection] = useState<string | null>(null)
    const [newComment, setNewComment] = useState("")

    useEffect(() => {
        // Simulate API call
        const fetchProject = async () => {
            setLoading(true)
            // Simulate network delay
            await new Promise((resolve) => setTimeout(resolve, 1500))

            // const projectData = mockProjectData
            // if (projectData) {
            //     setProject(projectData)
            // }
            setLoading(false)
        }

        fetchProject()
    }, [params.slug])

    const handleAddTeamMember = (member: any) => {
        setProject((prev: any) => ({
            ...prev,
            team: [...prev.team, { ...member, allocation: "50%" }],
        }))
    }

    const handleRemoveTeamMember = (memberId: number) => {
        setProject((prev: any) => ({
            ...prev,
            team: prev.team.filter((member: any) => member.id !== memberId),
        }))
    }

    const handleAddComment = () => {
        if (!newComment.trim()) return

        const comment = {
            id: Date.now(),
            author: "Current User",
            avatar: "/current-user.png",
            content: newComment,
            timestamp: new Date().toISOString(),
            type: "comment",
        }

        setProject((prev: any) => ({
            ...prev,
            comments: [comment, ...prev.comments],
        }))
        setNewComment("")
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "completed":
                return <CheckCircle2 className="h-4 w-4 text-green-500" />
            case "in-progress":
                return <Clock className="h-4 w-4 text-blue-500" />
            case "pending":
                return <AlertCircle className="h-4 w-4 text-gray-400" />
            default:
                return <Clock className="h-4 w-4 text-gray-400" />
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed":
                return "bg-green-100 text-green-800 border-green-200"
            case "in-progress":
                return "bg-blue-100 text-blue-800 border-blue-200"
            case "pending":
                return "bg-gray-100 text-gray-600 border-gray-200"
            default:
                return "bg-gray-100 text-gray-600 border-gray-200"
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    const formatTimestamp = (timestamp: string) => {
        return new Date(timestamp).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto"></div>
                    <p className="text-gray-600">Loading project details...</p>
                </div>
            </div>
        )
    }

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-bold text-gray-900">Project Not Found</h1>
                    <p className="text-gray-600">The project you're looking for doesn't exist.</p>
                    <Button onClick={() => router.push("/")} variant="outline">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Projects
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className={cn("min-h-screen", className)}
            {...params}
        >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => router.push("/")}
                                className="text-gray-600 hover:text-gray-900"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Projects
                            </Button>
                            <Separator orientation="vertical" className="h-6" />
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
                                <p className="text-sm text-gray-600">{project.client}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Badge variant="outline" className={getStatusColor(project.status.toLowerCase().replace(" ", "-"))}>
                                {project.status}
                            </Badge>
                            <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200">
                                {project.priority} Priority
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Project Overview */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <Target className="h-5 w-5 text-rose-500" />
                                        Project Overview
                                    </CardTitle>
                                    <CardDescription>Detailed project scope and objectives</CardDescription>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setEditingSection(editingSection === "overview" ? null : "overview")}
                                >
                                    <Edit3 className="h-4 w-4" />
                                </Button>
                            </CardHeader>
                            <CardContent>
                                {editingSection === "overview" ? (
                                    <div className="space-y-4">
                                        <Textarea
                                            value={scope}
                                            onChange={(e) => setScope(e.target.value)}
                                            className="min-h-[200px]"
                                            placeholder="Enter project scope..."
                                        />
                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                onClick={() => {
                                                    project.scope = scope // ✅ set new scope on Save
                                                    setEditingSection(null)
                                                }}
                                            >
                                                Save
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => {
                                                    setScope(project.scope) // reset changes on cancel
                                                    setEditingSection(null)
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                                        {project.scope}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Milestones & Deliverables */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-rose-500" />
                                        Milestones & Deliverables
                                    </CardTitle>
                                    <CardDescription>Project timeline and key deliverables</CardDescription>
                                </div>
                                <Button variant="ghost" size="sm">
                                    <Edit3 className="h-4 w-4" />
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {project.milestones.map((milestone: any) => (
                                        <div key={milestone.id} className="border rounded-lg p-4 space-y-3">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-start gap-3">
                                                    {getStatusIcon(milestone.status)}
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold text-gray-900">{milestone.title}</h4>
                                                        <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
                                                    </div>
                                                </div>
                                                <Badge variant="outline" className={getStatusColor(milestone.status)}>
                                                    {milestone.status.replace("-", " ")}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-500">Due: {formatDate(milestone.dueDate)}</span>
                                                <div className="flex items-center gap-2">
                                                    <Progress value={milestone.progress} className="w-20 h-2" />
                                                    <span className="text-gray-600 font-medium">{milestone.progress}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Comments & Updates */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MessageSquare className="h-5 w-5 text-rose-500" />
                                    Comments & Updates
                                </CardTitle>
                                <CardDescription>Project discussions and status updates</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {/* Add Comment */}
                                    <div className="flex gap-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src="/current-user.png" />
                                            <AvatarFallback>You</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 space-y-2">
                                            <Textarea
                                                placeholder="Add a comment or update..."
                                                value={newComment}
                                                onChange={(e) => setNewComment(e.target.value)}
                                                className="min-h-[80px]"
                                            />
                                            <Button size="sm" onClick={handleAddComment} disabled={!newComment.trim()}>
                                                Post Comment
                                            </Button>
                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Comments List */}
                                    <div className="space-y-4">
                                        {project.comments.map((comment: any) => (
                                            <div key={comment.id} className="flex gap-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                                                    <AvatarFallback>
                                                        {comment.author
                                                            .split(" ")
                                                            .map((n: string) => n[0])
                                                            .join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="font-semibold text-sm text-gray-900">{comment.author}</span>
                                                        <Badge variant="outline" className="text-xs">
                                                            {comment.type}
                                                        </Badge>
                                                        <span className="text-xs text-gray-500">{formatTimestamp(comment.timestamp)}</span>
                                                    </div>
                                                    <p className="text-gray-700 text-sm leading-relaxed">{comment.content}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Project Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Project Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-500">Start Date</span>
                                        <p className="font-semibold">{formatDate(project.startDate)}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">End Date</span>
                                        <p className="font-semibold">{formatDate(project.endDate)}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Budget</span>
                                        <p className="font-semibold">{project.budget}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Category</span>
                                        <p className="font-semibold">{project.category}</p>
                                    </div>
                                </div>
                                <div>
                                    <span className="text-gray-500 text-sm">Overall Progress</span>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Progress value={project.progress} className="flex-1" />
                                        <span className="text-sm font-semibold">{project.progress}%</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Team Members */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <Users className="h-5 w-5 text-rose-500" />
                                        Team Members
                                    </CardTitle>
                                    <CardDescription>{project.team.length} members assigned</CardDescription>
                                </div>
                                <Button variant="ghost" size="sm">
                                    <Edit3 className="h-4 w-4" />
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {project.team.map((member: any) => (
                                        <div key={member.id} className="flex items-center justify-between p-2 rounded-lg border">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={member.avatar || "/placeholder.svg"} />
                                                    <AvatarFallback>
                                                        {member.name
                                                            .split(" ")
                                                            .map((n: string) => n[0])
                                                            .join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-semibold text-sm">{member.name}</p>
                                                    <p className="text-xs text-gray-500">{member.role}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline">
                                                    {member.allocation}
                                                </Badge>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleRemoveTeamMember(member.id)}
                                                    className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                                                >
                                                    <X className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Add Team Member */}
                                    <div className="pt-2 border-t">
                                        <p className="text-sm font-medium text-gray-700 mb-2">Available Team Members</p>
                                        <div className="space-y-2">
                                            {availableTeamMembers.map((member) => (
                                                <div key={member.id} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                                                    <div className="flex items-center gap-2">
                                                        <Avatar className="h-6 w-6">
                                                            <AvatarImage src={member.avatar || "/placeholder.svg"} />
                                                            <AvatarFallback className="text-xs">
                                                                {member.name
                                                                    .split(" ")
                                                                    .map((n: string) => n[0])
                                                                    .join("")}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p className="text-xs font-medium">{member.name}</p>
                                                            <p className="text-xs text-gray-500">{member.role}</p>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleAddTeamMember(member)}
                                                        className="h-6 w-6 p-0 text-gray-400 hover:text-green-500"
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
