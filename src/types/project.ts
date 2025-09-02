// types/project.ts

export type Project = {
  id: string
  title: string
  description: string
  status: string
  priority: string
  progress: number
  startDate: string
  endDate: string
  budget: string
  client: string
  category: string
  scope: string
  milestones: {
    id: number
    title: string
    description: string
    status: string
    dueDate: string
    progress: number
  }[]
  team: {
    id: number
    name: string
    role: string
    avatar: string
    email: string
    allocation: string
  }[]
  comments: {
    id: number
    author: string
    avatar: string
    content: string
    timestamp: string
    type: string
  }[]
}
