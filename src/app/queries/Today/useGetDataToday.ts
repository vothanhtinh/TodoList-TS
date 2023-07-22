import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queries";
import { getToday } from "services/today.api";

export const useGetDataToday = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.GET_TODAYS],
    queryFn: getToday,
    keepPreviousData: true,
    staleTime: 5 * 1000,
  });
  return { data: data?.data, isLoading };
};
