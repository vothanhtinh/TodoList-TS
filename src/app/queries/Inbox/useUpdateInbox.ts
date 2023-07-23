// Libraries
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

// Constants
import { QUERY_KEYS } from "constants/queries";

// Services
import { updateInbox } from "services/inbox.api";

// Types
import { InboxType, InboxsType } from "types/inbox.type";

export const useUpdateInbox = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (inbox: InboxType) => updateInbox(inbox),
    onMutate: async (inbox: InboxType) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.GET_INBOXS] });

      const previousInboxs: any = queryClient.getQueryData<InboxsType>([
        QUERY_KEYS.GET_INBOXS,
      ]);

      // Update the inboxsType data in the cache
      queryClient.setQueryData<InboxsType>(
        [QUERY_KEYS.GET_INBOXS],
        (oldData: any) => {
          if (oldData) {
            const dataUpdate = oldData?.map((item: InboxType) =>
              item._id === inbox._id ? { ...item, ...inbox } : item
            );
            return dataUpdate;
          }
          return oldData;
        }
      );

      return { previousInboxs };
    },
    onSuccess: () => {
      toast.success("Cập nhật thông tin thành công");

      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_INBOXS] });
    },
  });
  return mutation;
};
