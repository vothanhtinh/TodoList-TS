// Libraries
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

// Constants
import { QUERY_KEYS } from "constants/queries";

// Services
import { createToday } from "services/today.api";

// Types
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

      queryClient.setQueryData([QUERY_KEYS.GET_TODAYS], (old: any) => [
        ...old,
        newToday,
      ]);

      return { previousTodays };
    },
    onSuccess: () => {
      toast.success("Thêm thành công");
    },

    onSettled: () => {
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
