// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Constants
import { QUERY_KEYS } from "constants/queries";

// Services
import { updateInboxs } from "services/inbox.api";

// Types
import { InboxType } from "types/inbox.type";

export const useUpdateInboxs = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (inboxs: InboxType[]) => updateInboxs(inboxs),
    onMutate: async (inboxs: InboxType[]) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.GET_INBOXS] });

      const previousInboxs: any = queryClient.getQueryData<InboxType[]>([
        QUERY_KEYS.GET_TODAYS,
      ]);

      queryClient.setQueriesData<InboxType[]>([QUERY_KEYS.GET_INBOXS], inboxs);
      return { previousInboxs };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_INBOXS] });
    },
    onError: (error, variables, context) => {
      // Kiểm tra xem context có chứa dữ liệu trước khi update không
      if (context?.previousInboxs) {
        // Nếu có lỗi xảy ra trong quá trình update, khôi phục lại dữ liệu trước đó
        queryClient.setQueryData<InboxType[]>(
          [QUERY_KEYS.GET_INBOXS],
          context.previousInboxs
        );
      }
    },
  });
  return mutation;
};
