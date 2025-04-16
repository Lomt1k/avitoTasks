import { useQuery } from "@tanstack/react-query";
import { fetchBoards } from "../api/Board";

export const useBoards = () => {
  const query = useQuery({
    queryKey: ['boards', 'list'],
    queryFn: fetchBoards
  });

  const { data, isFetching, isError } = query;
  return { data, isFetching, isError };
}