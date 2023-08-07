// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

// Constants
import { QUERY_KEYS } from "constants/queries";

// Services
import { updateToday } from "services/today.api";

// Types
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
          return oldData;
        }
      );

      return { previousTodays };
    },
    onSuccess: () => {
      toast.success("Cập nhật thông tin thành công");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_TODAYS] });
    },
  });
  return mutation;
};
