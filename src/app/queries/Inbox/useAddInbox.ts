// Libraries
import { useQueryClient, useMutation } from "@tanstack/react-query";

// Constants
import { QUERY_KEYS } from "constants/queries";

// Services
import { createInbox } from "services/inbox.api";

// Types
import { InboxType, InboxsType } from "types/inbox.type";

export const useAddInbox = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newInbox: Partial<InboxType>) => createInbox(newInbox),
    onMutate: async (newInbox: Partial<InboxType>) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.GET_INBOXS] });

      const previousInboxs: any = queryClient.getQueryData<InboxsType>([
        QUERY_KEYS.GET_INBOXS,
      ]);

      queryClient.setQueryData(
        [QUERY_KEYS.GET_INBOXS],
        [...previousInboxs.data, newInbox]
      );
      return { previousInboxs };
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_INBOXS] });
    },
    onError: (err, variables, context) => {
      if (context?.previousInboxs) {
        queryClient.setQueryData<InboxsType>(
          [QUERY_KEYS.GET_INBOXS],
          context.previousInboxs
        );
      }
    },
  });
  return mutation;
};
