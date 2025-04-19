import { z } from "zod";
import { api, validateResponse } from "./api";

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

export const UsersResponseSchema = z.object({
  data: z.array(UserSchema)
});

export type User = z.infer<typeof UserSchema>;

export type Assignee = z.infer<typeof AssigneeSchema>;

export const fetchUsers = async (): Promise<User[]> => {
  const response = await api.get('/users');
  validateResponse(response);
  const result = UsersResponseSchema.safeParse(response.data);
  if (!result.data) {
    console.error(result.error);
    throw result.error;
  }
  return result.data.data;
}