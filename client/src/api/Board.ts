import { z } from "zod";
import { api, validateResponse } from "./api";

export const BoardSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  taskCount: z.number(),
});

export const BoardResponseSchema = z.object({
  data: z.array(BoardSchema),
});

export type Board = z.infer<typeof BoardSchema>;

export const fetchBoards = async (): Promise<Board[]> => {
  const response = await api.get('/boards');
  validateResponse(response);
  const result = BoardResponseSchema.safeParse(response.data);
  if (!result.data) {
    console.error(result.error);
    throw result.error;
  }
  return result.data.data;
}