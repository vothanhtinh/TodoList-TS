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

      queryClient.setQueriesData<InboxType[]>(
        [QUERY_KEYS.GET_INBOXS],
        (oldData: any) => {
          if (oldData.data) {
            const dataUpdate = [...inboxs];
            return dataUpdate;
          }
          return oldData.data;
        }
      );
      return { previousInboxs };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_INBOXS] });
    },
  });
  return mutation;
};
