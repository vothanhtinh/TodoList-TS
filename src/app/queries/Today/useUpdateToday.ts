import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "constants/queries";
import { updateToday } from "services/today.api";
import { TodayType, TodaysType } from "types/today.type";

export const useUpdateToday = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (today: TodayType) => updateToday(today),
    onMutate: async (today: TodayType) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.GET_TODAYS] });

      const previousTodays: any = queryClient.getQueryData<TodaysType>([
        QUERY_KEYS.GET_TODAYS,
      ]);

      // Update the TodaysType data in the cache
      queryClient.setQueryData<TodaysType>(
        [QUERY_KEYS.GET_TODAYS],
        (oldData: any) => {
          if (oldData) {
            const dataUpdate = oldData?.data?.map((item: TodayType) =>
              item._id === today._id ? { ...item, ...today } : item
            );
            return dataUpdate;
          }
          return oldData.data;
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
