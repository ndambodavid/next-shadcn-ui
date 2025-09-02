"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus, X, Calendar, Users, Target, FileText, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

const teamMembers = [
    {
        id: 1,
        name: "Sarah Chen",
        role: "Project Manager",
        avatar: "/professional-woman-diverse.png",
        email: "sarah@company.com",
    },
    {
        id: 2,
        name: "Mike Rodriguez",
        role: "Lead Developer",
        avatar: "/professional-man-developer.png",
        email: "mike@company.com",
    },
    {
        id: 3,
        name: "Emily Watson",
        role: "UI/UX Designer",
        avatar: "/professional-woman-designer.png",
        email: "emily@company.com",
    },
    {
        id: 4,
        name: "David Kim",
        role: "Backend Developer",
        avatar: "/professional-man-backend.png",
        email: "david@company.com",
    },
    {
        id: 5,
        name: "Lisa Thompson",
        role: "QA Engineer",
        avatar: "/professional-woman-diverse.png",
        email: "lisa@company.com",
    },
    {
        id: 6,
        name: "Alex Johnson",
        role: "DevOps Engineer",
        avatar: "/professional-man-developer.png",
        email: "alex@company.com",
    },
]

export default function CreateProjectPage() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [selectedTeam, setSelectedTeam] = useState<number[]>([])
    const [milestones, setMilestones] = useState([{ id: 1, title: "", description: "", dueDate: "", deliverables: [""] }])

    type FormDataType = {
        title: string
        description: string
        category: string
        priority: string
        status: string
        startDate: string
        endDate: string
        budget: string
        client: string
        objectives: string[]
        scope: string
        requirements: string[]
        risks: string[]
        successCriteria: string[]
    }

    const [formData, setFormData] = useState<FormDataType>({
        title: "",
        description: "",
        category: "",
        priority: "",
        status: "planning",
        startDate: "",
        endDate: "",
        budget: "",
        client: "",
        objectives: [""],
        scope: "",
        requirements: [""],
        risks: [""],
        successCriteria: [""],
    })

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const removeArrayField = (field: keyof FormDataType, index: number) => {
        setFormData((prev) => ({
            ...prev,
            [field]: (prev[field] as string[]).filter((_, i) => i !== index),
        }))
    }

    const handleArrayFieldChange = (field: keyof FormDataType, index: number, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: (prev[field] as string[]).map((item, i) => (i === index ? value : item)),
        }))
    }

    const addArrayField = (field: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: [...prev[field as keyof typeof prev], ""],
        }))
    }


    const toggleTeamMember = (memberId: number) => {
        setSelectedTeam((prev) => (prev.includes(memberId) ? prev.filter((id) => id !== memberId) : [...prev, memberId]))
    }

    const addMilestone = () => {
        setMilestones((prev) => [
            ...prev,
            {
                id: Date.now(),
                title: "",
                description: "",
                dueDate: "",
                deliverables: [""],
            },
        ])
    }

    const updateMilestone = (id: number, field: string, value: string) => {
        setMilestones((prev) =>
            prev.map((milestone) => (milestone.id === id ? { ...milestone, [field]: value } : milestone)),
        )
    }

    const addDeliverable = (milestoneId: number) => {
        setMilestones((prev) =>
            prev.map((milestone) =>
                milestone.id === milestoneId ? { ...milestone, deliverables: [...milestone.deliverables, ""] } : milestone,
            ),
        )
    }

    const updateDeliverable = (milestoneId: number, index: number, value: string) => {
        setMilestones((prev) =>
            prev.map((milestone) =>
                milestone.id === milestoneId
                    ? {
                        ...milestone,
                        deliverables: milestone.deliverables.map((d, i) => (i === index ? value : d)),
                    }
                    : milestone,
            ),
        )
    }

    const removeDeliverable = (milestoneId: number, index: number) => {
        setMilestones((prev) =>
            prev.map((milestone) =>
                milestone.id === milestoneId
                    ? {
                        ...milestone,
                        deliverables: milestone.deliverables.filter((_, i) => i !== index),
                    }
                    : milestone,
            ),
        )
    }

    const removeMilestone = (id: number) => {
        setMilestones((prev) => prev.filter((milestone) => milestone.id !== id))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Navigate to projects list or the new project details
        router.push("/admin/projects")
    }

    return (
        <div className="min-h-screen">
            {/* Sticky Header */}
            <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" onClick={() => router.back()} className="gap-2">
                                <ArrowLeft className="h-4 w-4" />
                                Back to Projects
                            </Button>
                            <Separator orientation="vertical" className="h-6" />
                            <div>
                                <h1 className="text-2xl font-bold text-balance">Create New Project</h1>
                                <p className="text-sm text-muted-foreground">Set up your project with all the necessary details</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button variant="outline" onClick={() => router.back()}>
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                disabled={isSubmitting || !formData.title || !formData.description}
                                className="gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <Plus className="h-4 w-4" />
                                        Create Project
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 py-8">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Form Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Basic Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5" />
                                    Basic Information
                                </CardTitle>
                                <CardDescription>Essential project details and overview</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Project Title *</Label>
                                        <Input
                                            id="title"
                                            placeholder="Enter project title"
                                            value={formData.title}
                                            onChange={(e) => handleInputChange("title", e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="client">Client</Label>
                                        <Input
                                            id="client"
                                            placeholder="Client or department name"
                                            value={formData.client}
                                            onChange={(e) => handleInputChange("client", e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Project Description *</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Provide a detailed description of the project"
                                        value={formData.description}
                                        onChange={(e) => handleInputChange("description", e.target.value)}
                                        rows={4}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="category">Category</Label>
                                        <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="web-development">Web Development</SelectItem>
                                                <SelectItem value="mobile-app">Mobile App</SelectItem>
                                                <SelectItem value="design">Design</SelectItem>
                                                <SelectItem value="marketing">Marketing</SelectItem>
                                                <SelectItem value="research">Research</SelectItem>
                                                <SelectItem value="infrastructure">Infrastructure</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="priority">Priority</Label>
                                        <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select priority" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="low">Low</SelectItem>
                                                <SelectItem value="medium">Medium</SelectItem>
                                                <SelectItem value="high">High</SelectItem>
                                                <SelectItem value="critical">Critical</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="budget">Budget</Label>
                                        <Input
                                            id="budget"
                                            placeholder="$0.00"
                                            value={formData.budget}
                                            onChange={(e) => handleInputChange("budget", e.target.value)}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Timeline */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    Timeline
                                </CardTitle>
                                <CardDescription>Project start and end dates</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="startDate">Start Date</Label>
                                        <Input
                                            id="startDate"
                                            type="date"
                                            value={formData.startDate}
                                            onChange={(e) => handleInputChange("startDate", e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="endDate">End Date</Label>
                                        <Input
                                            id="endDate"
                                            type="date"
                                            value={formData.endDate}
                                            onChange={(e) => handleInputChange("endDate", e.target.value)}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Project Scope */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Target className="h-5 w-5" />
                                    Project Scope & Objectives
                                </CardTitle>
                                <CardDescription>Define what the project will accomplish</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="scope">Project Scope</Label>
                                    <Textarea
                                        id="scope"
                                        placeholder="Define the boundaries and scope of the project"
                                        value={formData.scope}
                                        onChange={(e) => handleInputChange("scope", e.target.value)}
                                        rows={3}
                                    />
                                </div>

                                <div className="space-y-3">
                                    <Label>Objectives</Label>
                                    {formData.objectives.map((objective, index) => (
                                        <div key={index} className="flex gap-2">
                                            <Input
                                                placeholder={`Objective ${index + 1}`}
                                                value={objective}
                                                onChange={(e) => handleArrayFieldChange("objectives", index, e.target.value)}
                                            />
                                            {formData.objectives.length > 1 && (
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => removeArrayField("objectives", index)}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => addArrayField("objectives")}
                                        className="gap-2"
                                    >
                                        <Plus className="h-4 w-4" />
                                        Add Objective
                                    </Button>
                                </div>

                                <div className="space-y-3">
                                    <Label>Requirements</Label>
                                    {formData.requirements.map((requirement, index) => (
                                        <div key={index} className="flex gap-2">
                                            <Input
                                                placeholder={`Requirement ${index + 1}`}
                                                value={requirement}
                                                onChange={(e) => handleArrayFieldChange("requirements", index, e.target.value)}
                                            />
                                            {formData.requirements.length > 1 && (
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => removeArrayField("requirements", index)}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => addArrayField("requirements")}
                                        className="gap-2"
                                    >
                                        <Plus className="h-4 w-4" />
                                        Add Requirement
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Milestones */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Tag className="h-5 w-5" />
                                    Milestones & Deliverables
                                </CardTitle>
                                <CardDescription>Break down the project into key milestones</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {milestones.map((milestone, milestoneIndex) => (
                                    <div key={milestone.id} className="border rounded-lg p-4 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-medium">Milestone {milestoneIndex + 1}</h4>
                                            {milestones.length > 1 && (
                                                <Button type="button" variant="ghost" size="sm" onClick={() => removeMilestone(milestone.id)}>
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Milestone Title</Label>
                                                <Input
                                                    placeholder="Enter milestone title"
                                                    value={milestone.title}
                                                    onChange={(e) => updateMilestone(milestone.id, "title", e.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Due Date</Label>
                                                <Input
                                                    type="date"
                                                    value={milestone.dueDate}
                                                    onChange={(e) => updateMilestone(milestone.id, "dueDate", e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Description</Label>
                                            <Textarea
                                                placeholder="Describe this milestone"
                                                value={milestone.description}
                                                onChange={(e) => updateMilestone(milestone.id, "description", e.target.value)}
                                                rows={2}
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <Label>Deliverables</Label>
                                            {milestone.deliverables.map((deliverable, deliverableIndex) => (
                                                <div key={deliverableIndex} className="flex gap-2">
                                                    <Input
                                                        placeholder={`Deliverable ${deliverableIndex + 1}`}
                                                        value={deliverable}
                                                        onChange={(e) => updateDeliverable(milestone.id, deliverableIndex, e.target.value)}
                                                    />
                                                    {milestone.deliverables.length > 1 && (
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => removeDeliverable(milestone.id, deliverableIndex)}
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                </div>
                                            ))}
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => addDeliverable(milestone.id)}
                                                className="gap-2"
                                            >
                                                <Plus className="h-4 w-4" />
                                                Add Deliverable
                                            </Button>
                                        </div>
                                    </div>
                                ))}

                                <Button type="button" variant="outline" onClick={addMilestone} className="gap-2 bg-transparent">
                                    <Plus className="h-4 w-4" />
                                    Add Milestone
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Risk Assessment */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Risk Assessment & Success Criteria</CardTitle>
                                <CardDescription>Identify potential risks and define success metrics</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-3">
                                    <Label>Potential Risks</Label>
                                    {formData.risks.map((risk, index) => (
                                        <div key={index} className="flex gap-2">
                                            <Input
                                                placeholder={`Risk ${index + 1}`}
                                                value={risk}
                                                onChange={(e) => handleArrayFieldChange("risks", index, e.target.value)}
                                            />
                                            {formData.risks.length > 1 && (
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => removeArrayField("risks", index)}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => addArrayField("risks")}
                                        className="gap-2"
                                    >
                                        <Plus className="h-4 w-4" />
                                        Add Risk
                                    </Button>
                                </div>

                                <div className="space-y-3">
                                    <Label>Success Criteria</Label>
                                    {formData.successCriteria.map((criteria, index) => (
                                        <div key={index} className="flex gap-2">
                                            <Input
                                                placeholder={`Success criteria ${index + 1}`}
                                                value={criteria}
                                                onChange={(e) => handleArrayFieldChange("successCriteria", index, e.target.value)}
                                            />
                                            {formData.successCriteria.length > 1 && (
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => removeArrayField("successCriteria", index)}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => addArrayField("successCriteria")}
                                        className="gap-2"
                                    >
                                        <Plus className="h-4 w-4" />
                                        Add Success Criteria
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Team Assignment */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="h-5 w-5" />
                                    Team Assignment
                                </CardTitle>
                                <CardDescription>Select team members for this project</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-sm text-muted-foreground">
                                    {selectedTeam.length} member{selectedTeam.length !== 1 ? "s" : ""} selected
                                </div>

                                <div className="space-y-3">
                                    {teamMembers.map((member) => (
                                        <div
                                            key={member.id}
                                            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${selectedTeam.includes(member.id)
                                                ? "border-primary bg-primary/5"
                                                : "border-border hover:bg-muted/50"
                                                }`}
                                            onClick={() => toggleTeamMember(member.id)}
                                        >
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                                <AvatarFallback>
                                                    {member.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-medium text-sm">{member.name}</div>
                                                <div className="text-xs text-muted-foreground">{member.role}</div>
                                            </div>
                                            {selectedTeam.includes(member.id) && <div className="h-2 w-2 rounded-full bg-primary" />}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Project Summary */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Project Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Status</span>
                                        <Badge variant="secondary">Planning</Badge>
                                    </div>
                                    {formData.category && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Category</span>
                                            <span className="capitalize">{formData.category.replace("-", " ")}</span>
                                        </div>
                                    )}
                                    {formData.priority && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Priority</span>
                                            <Badge
                                                variant={
                                                    formData.priority === "critical"
                                                        ? "destructive"
                                                        : formData.priority === "high"
                                                            ? "default"
                                                            : "secondary"
                                                }
                                            >
                                                {formData.priority}
                                            </Badge>
                                        </div>
                                    )}
                                    {formData.budget && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Budget</span>
                                            <span>{formData.budget}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Team Size</span>
                                        <span>{selectedTeam.length} members</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Milestones</span>
                                        <span>{milestones.length}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </form>
            </div>
        </div>
    )
}
