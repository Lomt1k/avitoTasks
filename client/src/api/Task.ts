import { z } from "zod";
import { AssigneeSchema } from "./User";
import { api, validateResponse } from "./api";

export enum TaskStatus {
  Done = 'Done',
  InProgress = 'InProgress',
  Backlog = 'Backlog',
};

export const TaskSchema = z.object({
  assignee: AssigneeSchema,
  boardId: z.number().optional(),
  boardName: z.string().optional(),
  description: z.string(),
  id: z.number(),
  priority: z.string(),
  status: z.enum(Object.values(TaskStatus) as [string, ...string[]]),
  title: z.string(),
});

export const TasksResponseSchema = z.object({
  data: z.array(TaskSchema),
});

export type Task = z.infer<typeof TaskSchema>;

export const fetchTasksFromBoard = async (boardId: number): Promise<Task[]> => {
  const response = await api.get(`/boards/${boardId}`);
  validateResponse(response);
  const result = TasksResponseSchema.safeParse(response.data);
  if (!result.data) {
    console.error(result.error);
    throw result.error;
  }
  return result.data.data;
}