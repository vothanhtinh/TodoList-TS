import { useQueryClient, useMutation } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queries";
import { createToday } from "services/today.api";
import { TodayType, TodaysType } from "types/today.type";

export const useAddToday = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newToday: Partial<TodayType>) => createToday(newToday),
    onMutate: async (newToday: Partial<TodayType>) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.GET_TODAYS] });

      const previousTodays: any = queryClient.getQueryData<TodaysType>([
        QUERY_KEYS.GET_TODAYS,
      ]);

      queryClient.setQueryData(
        [QUERY_KEYS.GET_TODAYS],
        [...previousTodays.data, newToday]
      );
      return { previousTodays };
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_TODAYS] });
    },
    onError: (err, variables, context) => {
      if (context?.previousTodays) {
        queryClient.setQueryData<TodaysType>(
          [QUERY_KEYS.GET_TODAYS],
          context.previousTodays
        );
      }
    },
  });
  return mutation;
};
