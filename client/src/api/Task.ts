import { z } from "zod";
import { AssigneeSchema } from "./User";
import { api, validateResponse } from "./api";

export enum TaskStatus {
  Backlog = 'Backlog',
  InProgress = 'InProgress',
  Done = 'Done',
};

export enum TaskPriority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export const TaskSchema = z.object({
  assignee: AssigneeSchema,
  boardId: z.number().optional(),
  boardName: z.string().optional(),
  description: z.string(),
  id: z.number(),
  priority: z.enum(Object.values(TaskPriority) as [string, ...string[]]),
  status: z.enum(Object.values(TaskStatus) as [string, ...string[]]),
  title: z.string(),
});

export const TasksResponseSchema = z.object({
  data: z.array(TaskSchema),
});

export const CreateTaskSchema = z.object({
  assigneeId: z.number(),
  boardId: z.number(),
  title: z.string()
    .nonempty('Необходимо указать название')
    .max(100, 'Должно быть не более 100 символов'),
  description: z.string()
    .nonempty('Необходимо указать описание')
    .max(500, 'Должно быть не более 500 символов'),
  priority: z.enum(Object.values(TaskPriority) as [string, ...string[]]),
});

export const UpdateTaskSchema = z.object({
  assigneeId: z.number(),
  title: z.string()
    .nonempty('Необходимо указать название')
    .max(100, 'Должно быть не более 100 символов'),
    description: z.string()
    .nonempty('Необходимо указать описание')
    .max(500, 'Должно быть не более 500 символов'),
  priority: z.enum(Object.values(TaskPriority) as [string, ...string[]]),
  status: z.enum(Object.values(TaskStatus) as [string, ...string[]]),
});

export type Task = z.infer<typeof TaskSchema>;

export type CreateTaskData = z.infer<typeof CreateTaskSchema>;

export type UpdateTaskData = z.infer<typeof UpdateTaskSchema>;

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

export const fetchAllTasks = async (): Promise<Task[]> => {
  const response = await api.get(`/tasks`);
  validateResponse(response);
  const result = TasksResponseSchema.safeParse(response.data);
  if (!result.data) {
    console.error(result.error);
    throw result.error;
  }
  return result.data.data;
}

export const fetchCreateTask = async (data: CreateTaskData): Promise<void> => {
  const response = await api.post('/tasks/create', data);
  validateResponse(response);
}

export const fetchUpdateTask = async (taskId: number, data: UpdateTaskData): Promise<void> => {
  const response = await api.put(`/tasks/update/${taskId}`, data);
  validateResponse(response);
}