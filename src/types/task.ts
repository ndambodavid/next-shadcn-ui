import { z } from "zod"

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  status: z.string(),
  priority: z.string(),
  project: z.string(),
  dueDate: z.string(),
  progress: z.number(),
  createdAt: z.string(),
  assignee: z
    .object({
      name: z.string(),
      initials: z.string(),
      avatar: z.string().optional(),
    })
    .optional(),
  milestone: z.string().optional(),
  tags: z.array(z.string()).optional(),
})

export type Task = z.infer<typeof taskSchema>
