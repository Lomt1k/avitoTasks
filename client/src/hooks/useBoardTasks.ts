import { useQuery } from "@tanstack/react-query";
import { fetchTasksFromBoard } from "../api/Task";

export const useBoardTasks = (boardId: number) => {
  const query = useQuery({
    queryKey: ['tasks'],
    queryFn: () => fetchTasksFromBoard(boardId),
  });

  const { data, isFetching, isError } = query;
  return { data, isFetching, isError };
}