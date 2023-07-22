import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queries";
import { deleteToday } from "services/today.api";
import { TodayType } from "types/today.type";

export const useDeleteToday = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (today: Partial<TodayType>) => await deleteToday(today),
    onMutate: (today: Partial<TodayType>) => {},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_TODAYS] });
    },
  });
  return mutation;
};
