// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Constants
import { QUERY_KEYS } from "constants/queries";

// Services
import { updateTodays } from "services/today.api";

// Typessrc/app/queries/Today/useUpdateTodays.ts
import { TodayType, TodaysType } from "types/today.type";

export const useUpdateTodays = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (todays: TodayType[]) => updateTodays(todays),
    onMutate: async (todays: TodayType[]) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.GET_TODAYS] });

      const previousTodays: any = queryClient.getQueryData<TodaysType>([
        QUERY_KEYS.GET_TODAYS,
      ]);

      // Update the TodaysType data in the cache
      queryClient.setQueryData<TodaysType[]>(
        [QUERY_KEYS.GET_TODAYS],
        (oldData: any) => {
          if (oldData) {
            const dataUpdate = [...todays];
            console.log(dataUpdate, "data update");

            return dataUpdate;
          }
          return oldData;
        }
      );

      return { previousTodays };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_TODAYS] });
    },
  });
  return mutation;
};
