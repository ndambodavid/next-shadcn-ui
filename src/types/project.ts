// A single milestone within a project
export interface Milestone {
  id: string
  title: string
  description: string
  status: string
  dueDate: string
  progress: number
}

// A comment within a project
export interface Comment {
  id: string
  author: string
  avatar: string
  content: string
  timestamp: string
  type: "update" | "issue" | "note" | string  // restrict if you know the exact types
}


// The main Project type
export interface Project {
  id: string
  title: string
  description: string
  status: "planning" | "in-progress" | "completed" | "on-hold" | string
  priority: "low" | "medium" | "high" | string
  progress: number
  startDate: string
  endDate: string
  budget: string
  client: string
  category: string
  scope: string
  milestones: Milestone[]
  team: TeamMember[]
  comments: Comment[]
}


export interface TeamMember {
  id: string
  name: string
  role: string
  allocation?: string
  avatar: string,
  email: string
}

