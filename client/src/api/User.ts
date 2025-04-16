import { z } from "zod";

export const UserSchema = z.object({
  avatarUrl: z.string(),
  description: z.string(),
  email: z.string(),
  fullName: z.string(),
  id: z.number(),
  tasksCount: z.number(),
  teamId: z.number(),
  teamName: z.string(),
});

export const AssigneeSchema = UserSchema.pick({
  avatarUrl: true,
  email: true,
  fullName: true,
  id: true,
});

export type User = z.infer<typeof UserSchema>;

export type Assignee = z.infer<typeof AssigneeSchema>;