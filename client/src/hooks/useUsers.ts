import { useQuery } from "@tanstack/react-query"
import { fetchUsers } from "../api/User";

export const useUsers = () => {
  const query = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    placeholderData: (prevData) => prevData,
  });

  const { data, isError } = query;
  return { data, isError };
}