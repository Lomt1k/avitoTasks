import axios, { AxiosResponse } from "axios";
import { z } from "zod";

export const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  timeout: 1000,
  validateStatus: () => true,
});

export const ErrorMessageSchema = z.object({
  error: z.string(),
  message: z.string(),
});

export type ErrorMessage = z.infer<typeof ErrorMessageSchema>;

export const validateResponse = (response: AxiosResponse): void => {
  if (response.status === 200) {
    return;
  }

  const result = ErrorMessageSchema.safeParse(response.data);
  if (result.data) {
    const error = new Error(result.data.message);
    error.name = result.data.error;
    console.error(error);
    throw error;
  }

  const error = new Error(`${response.status} ${response.statusText}`);
  error.name = 'Network Error';
  console.error(error);
  throw error;
}