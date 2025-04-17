import { useQuery } from "@tanstack/react-query";
import { fetchAllTasks } from "../api/Task";

export const useAllTasks = () => {
  const query = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchAllTasks,
  });

  const { data, isFetching, isError } = query;
  return { data, isFetching, isError };
}