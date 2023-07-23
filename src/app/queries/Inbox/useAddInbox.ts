// Libraries
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

// Constants
import { QUERY_KEYS } from "constants/queries";

// Services
import { createInbox } from "services/inbox.api";

// Types
import { InboxType, InboxsType } from "types/inbox.type";

export type PrevData = {
  data?: InboxType[];
};

export const useAddInbox = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newInbox: Partial<InboxType>) => createInbox(newInbox),
    onMutate: async (newInbox: Partial<InboxType>) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.GET_INBOXS] });

      const previousInboxs: any = queryClient.getQueryData<InboxsType>([
        QUERY_KEYS.GET_INBOXS,
      ]);

      queryClient.setQueryData([QUERY_KEYS.GET_INBOXS], (old: any) => [
        ...old,
        newInbox,
      ]);

      return { previousInboxs };
    },
    onSuccess: () => {
      toast.success("Thêm thành công");
    },
    onSettled: () => {
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
