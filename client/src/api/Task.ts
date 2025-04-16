import { z } from "zod";
import { AssigneeSchema } from "./User";
import { api, validateResponse } from "./api";

export const TaskSchema = z.object({
  assignee: AssigneeSchema,
  boardId: z.number(),
  boardName: z.string(),
  description: z.string(),
  id: z.number(),
  priority: z.string(),
  status: z.string(),
  title: z.string(),
});

export const TaskWithoutBoardSchema = TaskSchema.omit({
  boardId: true,
  boardName: true,
});

export const TaskWithoutBoardResponseSchema = z.object({
  data: z.array(TaskWithoutBoardSchema),
});

export type Task = z.infer<typeof TaskSchema>;

export type TaskWithoutBoard = z.infer<typeof TaskWithoutBoardSchema>;

export const fetchTasksFromBoard = async (boardId: number): Promise<TaskWithoutBoard[]> => {
  const response = await api.get(`/boards/${boardId}`);
  validateResponse(response);
  const result = TaskWithoutBoardResponseSchema.safeParse(response.data);
  if (!result.data) {
    console.error(result.error);
    throw result.error;
  }
  return result.data.data;
}