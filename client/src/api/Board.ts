import { z } from "zod";
import { api, validateResponse } from "./api";

export const GeneralBoardInfoSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  taskCount: z.number(),
});

export const GeneralBoardInfoResponseSchema = z.object({
  data: z.array(GeneralBoardInfoSchema),
});

export type GeneralBoardInfo = z.infer<typeof GeneralBoardInfoSchema>;

export const fetchBoards = async (): Promise<GeneralBoardInfo[]> => {
  const response = await api.get('/boards');
  validateResponse(response);
  const result = GeneralBoardInfoResponseSchema.safeParse(response.data);
  if (!result.data) {
    console.error(result.error);
    throw result.error;
  }
  return result.data.data;
}